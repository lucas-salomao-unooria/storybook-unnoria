import React from 'react';
import { Icon } from '../Icon';

/**
 * Glifos do cromo de sistema do PhoneFrame: sinal móvel, conexão sem fio e
 * bateria. São genéricos e próprios do Unoovista — ligaduras do Material
 * Symbols Rounded, a mesma biblioteca do `Icon` —, e não reproduzem a barra de
 * status de nenhum aparelho. Herdam a cor do contêiner (`currentColor`).
 */

/**
 * Tamanho padrão dos glifos da barra de status, em pixels.
 */
const STATUS_GLYPH_SIZE = 18;

/**
 * Propriedades dos glifos de sistema.
 */
export interface UnvDeviceGlyphProps {
  /**
   * Aresta da caixa do glifo, em pixels.
   * @default 18
   */
  size?: number;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Indicador de intensidade do sinal móvel.
 */
export const MobileSignalGlyph: React.FC<UnvDeviceGlyphProps> = ({
  size = STATUS_GLYPH_SIZE,
  className,
}) => <Icon name="signalCellular" size={size} tone="inherit" className={className} />;

/**
 * Indicador de conexão sem fio.
 */
export const WifiGlyph: React.FC<UnvDeviceGlyphProps> = ({
  size = STATUS_GLYPH_SIZE,
  className,
}) => <Icon name="wifi" size={size} tone="inherit" className={className} />;

/**
 * Indicador de bateria.
 */
export const BatteryGlyph: React.FC<UnvDeviceGlyphProps> = ({
  size = STATUS_GLYPH_SIZE,
  className,
}) => <Icon name="battery" size={size} tone="inherit" className={className} />;
