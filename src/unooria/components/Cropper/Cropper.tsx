import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  CropperProps,
  CropperStep,
  CropResult,
} from './Cropper.types';
import './Cropper.css';

// Ícones SVG oficiais
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const CameraIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const RemoveZoomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const AddZoomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const DefaultAvatarPlaceholder = () => (
  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" opacity="0.6">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

/**
 * Componente Cropper - Design System Plataforma Unooria
 * Especificação Fiel ao Figma Node #12694:9694 / Component Set #12694:9703
 */
export const Cropper: React.FC<CropperProps> = ({
  currentImage,
  initialImage,
  initialStep,
  shape = 'circle',
  viewMode = 'inline',
  theme = 'light',
  onClose,
  onSave,
  onDelete,
  onStepChange,
  customTexts = {},
  maxFileSizeMB = 10,
  className = '',
  style,
}) => {
  // Textos oficiais do Figma #12694:9703
  const texts = {
    changePhotoTitle: customTexts.changePhotoTitle || 'Alterar foto do perfil',
    changePhotoSubtitle: customTexts.changePhotoSubtitle || 'Escolha uma nova imagem para atualizar sua foto de perfil.',
    changeButtonLabel: customTexts.changeButtonLabel || 'Editar',
    deleteButtonLabel: customTexts.deleteButtonLabel || 'Remover',

    uploadTitle: customTexts.uploadTitle || 'Atualize sua foto de perfil',
    uploadSubtitle: customTexts.uploadSubtitle || 'Use a galeria ou a câmera do seu dispositivo.',
    uploadButtonLabel: customTexts.uploadButtonLabel || 'Fazer upload',
    cameraButtonLabel: customTexts.cameraButtonLabel || 'Tire uma foto',

    cropTitle: customTexts.cropTitle || 'Visualize sua nova foto',
    cropSubtitle: customTexts.cropSubtitle || 'Gostou do resultado? Clique em Salvar para confirmar.',
    cancelButtonLabel: customTexts.cancelButtonLabel || 'Cancelar',
    saveButtonLabel: customTexts.saveButtonLabel || 'Salvar',
  };

  // Determinação do passo inicial
  const [step, setStep] = useState<CropperStep>(() => {
    if (initialStep) return initialStep;
    if (initialImage) return 'crop-preview';
    if (currentImage) return 'change-photo';
    return 'upload';
  });

  const [activeImage, setActiveImage] = useState<string | null>(initialImage || currentImage || null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const changeStep = useCallback(
    (newStep: CropperStep) => {
      setStep(newStep);
      onStepChange?.(newStep);
    },
    [onStepChange]
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      alert(`Arquivo muito grande. Máximo permitido: ${maxFileSizeMB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setActiveImage(event.target.result);
        setZoom(1);
        setPan({ x: 0, y: 0 });
        changeStep('crop-preview');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (step !== 'crop-preview') return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || step !== 'crop-preview') return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSaveCrop = () => {
    if (!activeImage) return;

    const result: CropResult = {
      dataUrl: activeImage,
      blob: null,
      width: 387,
      height: 387,
      zoom,
      rotation: 0,
      cropCoordinates: { x: pan.x, y: pan.y, size: 387 },
    };

    onSave?.(result);
  };

  const cropperContent = (
    <div
      className={`unooria-cropper unooria-cropper--theme-${theme} ${className}`.trim()}
      style={style}
      data-theme={theme}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Input de arquivo invisível */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {/* Cabeçalho Oficial (#12694:9706) */}
      <header className="unooria-cropper__header">
        <div className="unooria-cropper__header-text">
          <h2 className="unooria-cropper__title">
            {step === 'change-photo' && texts.changePhotoTitle}
            {step === 'upload' && texts.uploadTitle}
            {step === 'crop-preview' && texts.cropTitle}
          </h2>
          <p className="unooria-cropper__subtitle">
            {step === 'change-photo' && texts.changePhotoSubtitle}
            {step === 'upload' && texts.uploadSubtitle}
            {step === 'crop-preview' && texts.cropSubtitle}
          </p>
        </div>
        {onClose && (
          <button type="button" className="unooria-cropper__close-btn" onClick={onClose} aria-label="Fechar">
            <CloseIcon />
          </button>
        )}
      </header>

      {/* Área Central / Canvas 387x387px */}
      <div
        ref={canvasRef}
        className={`unooria-cropper__canvas-container unooria-cropper__canvas-container--${shape}`}
        onMouseDown={handleMouseDown}
      >
        {activeImage ? (
          <img
            src={activeImage}
            alt="Preview de corte"
            className="unooria-cropper__image"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            }}
            draggable={false}
          />
        ) : (
          <div className="unooria-cropper__placeholder-avatar">
            <DefaultAvatarPlaceholder />
          </div>
        )}
      </div>

      {/* Controles de Zoom para o Passo 3 'crop-preview' (#12694:9743) */}
      {step === 'crop-preview' && (
        <div className="unooria-cropper__zoom-container">
          <button
            type="button"
            className="unooria-cropper__zoom-btn"
            onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
            aria-label="Diminuir zoom"
          >
            <RemoveZoomIcon />
          </button>
          <input
            type="range"
            min="1"
            max="3"
            step="0.05"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="unooria-cropper__slider"
            aria-label="Controle de Zoom"
          />
          <button
            type="button"
            className="unooria-cropper__zoom-btn"
            onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
            aria-label="Aumentar zoom"
          >
            <AddZoomIcon />
          </button>
        </div>
      )}

      {/* Rodapé / Botões de Ação por Passo */}
      <footer className="unooria-cropper__actions">
        {/* Passo 1: Alterar foto do perfil (#12694:9716) */}
        {step === 'change-photo' && (
          <>
            <button
              type="button"
              className="unooria-cropper__btn unooria-cropper__btn--danger"
              onClick={() => {
                setActiveImage(null);
                onDelete?.();
                changeStep('upload');
              }}
            >
              <span className="unooria-cropper__btn-icon">
                <DeleteIcon />
              </span>
              <span>{texts.deleteButtonLabel}</span>
            </button>
            <button
              type="button"
              className="unooria-cropper__btn unooria-cropper__btn--subtle"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="unooria-cropper__btn-icon">
                <EditIcon />
              </span>
              <span>{texts.changeButtonLabel}</span>
            </button>
          </>
        )}

        {/* Passo 2: Atualize sua foto de perfil (#12694:9731) */}
        {step === 'upload' && (
          <>
            <button
              type="button"
              className="unooria-cropper__btn unooria-cropper__btn--subtle"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="unooria-cropper__btn-icon">
                <UploadIcon />
              </span>
              <span>{texts.uploadButtonLabel}</span>
            </button>
            <button
              type="button"
              className="unooria-cropper__btn unooria-cropper__btn--subtle"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="unooria-cropper__btn-icon">
                <CameraIcon />
              </span>
              <span>{texts.cameraButtonLabel}</span>
            </button>
          </>
        )}

        {/* Passo 3: Visualize sua nova foto (#12694:9749) */}
        {step === 'crop-preview' && (
          <>
            <button
              type="button"
              className="unooria-cropper__btn unooria-cropper__btn--subtle"
              onClick={() => {
                if (currentImage) changeStep('change-photo');
                else changeStep('upload');
              }}
            >
              {texts.cancelButtonLabel}
            </button>
            <button
              type="button"
              className="unooria-cropper__btn unooria-cropper__btn--filled"
              onClick={handleSaveCrop}
            >
              {texts.saveButtonLabel}
            </button>
          </>
        )}
      </footer>
    </div>
  );

  if (viewMode === 'modal') {
    return <div className="unooria-cropper-modal-overlay">{cropperContent}</div>;
  }

  return cropperContent;
};

Cropper.displayName = 'Cropper';
