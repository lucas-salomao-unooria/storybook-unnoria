"""
Recorta o mascote do agente de IA do professor e gera os dois tamanhos do busto.

Uso (uma vez, quando o desenho mudar):

    python3 scripts/recortar-mascote-agente.py <mascote-original.png>
    node scripts/embutir-mascote-agente.mjs

Precisa de Pillow e numpy (não são dependência do pacote nem do repositório:
o script roda na máquina de quem atualiza o desenho, e o que entra no git são
só os dois .webp e o módulo gerado a partir deles).

O original é um PNG de 1254 x 1254 px, RGB, com fundo cinza-claro uniforme
(#F7F7F7, medido na borda). O recorte:

1. Fundo = pixels a menos de 24 níveis do cinza da borda E conectados a ela
   (preenchimento a partir da borda). O brilho dos olhos e as mãos claras não
   estão conectados à borda, e ficam.
2. O desenho já tem um fio cinza em volta da figura. Tudo o que está dentro dele
   (inclusive o brilho azul-claro da chama) é figura e fica opaco. Só os 2 px de
   fora do contorno ganham alfa parcial, proporcional à distância ao fundo, com
   a cor descontada do cinza. Uma tentativa anterior, com "cor para alfa" numa
   faixa de 14 px, deixava o brilho de dentro da chama semitransparente —
   manchado sobre fundo escuro.
3. Busto quadrado de 720 px a partir de (200, 40): chama, rosto, mãos e o tablet.
   Em 32 px o rosto é o que se reconhece; o corpo inteiro ficaria miúdo.
4. Redução em alfa pré-multiplicado (a borda não escurece) para 128 e 256 px,
   WebP com perda (qualidade 82, alfa 90).
"""
import os
import sys

import numpy as np
from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAIDA = os.path.join(RAIZ, 'src', 'unooria', 'assets', 'agent')

entrada = sys.argv[1]
im = np.asarray(Image.open(entrada).convert('RGB')).astype(np.float64)
h, w, _ = im.shape

borda = np.concatenate([im[0], im[-1], im[:, 0], im[:, -1]])
fundo_cor = np.median(borda, axis=0)
dist = np.abs(im - fundo_cor).max(axis=2)


def dilatar(m, n=1):
    for _ in range(n):
        d = m.copy()
        d[1:] |= m[:-1]
        d[:-1] |= m[1:]
        d[:, 1:] |= m[:, :-1]
        d[:, :-1] |= m[:, 1:]
        m = d
    return m


perto = dist < 24
fundo = np.zeros_like(perto)
fundo[0], fundo[-1] = perto[0], perto[-1]
fundo[:, 0], fundo[:, -1] = perto[:, 0], perto[:, -1]
while True:
    novo = dilatar(fundo) & perto
    if (novo == fundo).all():
        break
    fundo = novo

faixa = dilatar(fundo, 2) & ~fundo
alfa = np.ones((h, w))
alfa[fundo] = 0
alfa[faixa] = np.clip(dist[faixa] / 40, 0, 1)

a3 = alfa[..., None]
frente = np.where(a3 > 0, (im - (1 - a3) * fundo_cor) / np.maximum(a3, 1e-6), 0)
frente = np.clip(frente, 0, 255)

rgba = np.dstack([frente, alfa * 255]).round().astype(np.uint8)
figura = Image.fromarray(rgba, 'RGBA')

x0, y0, lado = 200, 40, 720
busto = figura.crop((x0, y0, x0 + lado, y0 + lado))

os.makedirs(SAIDA, exist_ok=True)
for tam in (128, 256):
    reduzido = busto.convert('RGBa').resize((tam, tam), Image.LANCZOS).convert('RGBA')
    destino = os.path.join(SAIDA, f'agente-{tam}.webp')
    reduzido.save(destino, 'WEBP', quality=82, alpha_quality=90, method=6)
    print(destino, os.path.getsize(destino), 'bytes')
