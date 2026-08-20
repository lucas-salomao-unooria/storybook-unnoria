'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { UploadFileModalProps, UploadFileItem } from './UploadFileModal.types';
import { FileUpload } from './FileUpload';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import './UploadFileModal.css';

/**
 * Componente oficial UploadFileModal (Modal de Upload de Arquivos) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 18661:2161 / Component Set 18647:26131)
 */
export const UploadFileModal = forwardRef<HTMLDivElement, UploadFileModalProps>(
  (
    {
      isOpen,
      onClose,
      title = 'Upload de arquivo',
      description,
      onSubmit,
      submitText = 'Enviar documento',
      cancelText = 'Cancelar',
      isSubmitting = false,
      files,
      defaultFiles = [],
      onFilesChange,
      theme = 'light',
      modalClassName = '',
      ...fileUploadProps
    },
    ref
  ) => {
    const [currentFiles, setCurrentFiles] = useState<UploadFileItem[]>(
      files !== undefined ? files : defaultFiles
    );

    useEffect(() => {
      if (files !== undefined) {
        setCurrentFiles(files);
      }
    }, [files]);

    // Fechar ao pressionar a tecla ESC
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleFilesChange = (updatedFiles: UploadFileItem[]) => {
      setCurrentFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    const handleSubmit = () => {
      onSubmit?.(currentFiles);
    };

    const themeClass = theme === 'dark' ? 'unooria-upload-modal--theme-dark' : '';
    const modalClasses = ['unooria-upload-modal', themeClass, modalClassName]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        className="unooria-upload-modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
        role="presentation"
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby="unooria-upload-modal-title"
          className={modalClasses}
        >
          {/* Cabeçalho do Modal */}
          <div className="unooria-upload-modal__header">
            <div className="unooria-upload-modal__title-group">
              <h3 id="unooria-upload-modal-title" className="unooria-upload-modal__title">
                {title}
              </h3>
              {description && (
                <p className="unooria-upload-modal__description">{description}</p>
              )}
            </div>

            <button
              type="button"
              aria-label="Fechar modal"
              onClick={onClose}
              className="unooria-upload-modal__close-btn"
            >
              <Icon name="close" size="xs" color="currentColor" />
            </button>
          </div>

          {/* Corpo do Modal (FileUpload) */}
          <FileUpload
            files={currentFiles}
            onFilesChange={handleFilesChange}
            theme={theme}
            {...fileUploadProps}
          />

          {/* Rodapé com Botões de Ação */}
          <div className="unooria-upload-modal__footer">
            <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
              {cancelText}
            </Button>

            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={currentFiles.length === 0 || isSubmitting}
            >
              {submitText}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

UploadFileModal.displayName = 'UploadFileModal';

export default UploadFileModal;
