'use client';

import React, { forwardRef, useState, useRef } from 'react';
import { FileUploadProps, UploadFileItem } from './UploadFileModal.types';
import { Icon } from '../Icon/Icon';
import './UploadFileModal.css';

/**
 * Função utilitária para formatar bytes em KB, MB ou GB
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Componente FileUpload (Dropzone e Lista de Arquivos) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 18661:2161 / Component Set 18647:26131)
 */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      files,
      defaultFiles = [],
      onFilesChange,
      onUpload,
      onRemove,
      accept = '.jpeg,.jpg,.png,.pdf,.mp4',
      maxSize = 52428800, // 50 MB
      multiple = true,
      maxFiles,
      label = 'Input Label',
      required = false,
      dropzoneTitle = 'Solte seu arquivo aqui ou clique para escolher',
      dropzoneSubtitle = 'Formatos JPEG, PNG, PDF e MP4, até 50 MB',
      disabled = false,
      hideDropzone = false,
      theme = 'light',
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    const [internalFiles, setInternalFiles] = useState<UploadFileItem[]>(defaultFiles);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = files !== undefined;
    const currentFiles = isControlled ? files : internalFiles;

    const handleFilesAdded = (rawFiles: FileList | null) => {
      if (!rawFiles || rawFiles.length === 0 || disabled) return;

      const newFileArray = Array.from(rawFiles);
      onUpload?.(newFileArray);

      const mappedItems: UploadFileItem[] = newFileArray.map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: file.name,
        size: formatFileSize(file.size),
        progress: 100,
        status: file.size > maxSize ? 'error' : 'completed',
        file,
        error: file.size > maxSize ? 'Arquivo excede o limite de 50 MB' : undefined,
      }));

      const updated = multiple ? [...currentFiles, ...mappedItems] : mappedItems;
      const limited = maxFiles ? updated.slice(0, maxFiles) : updated;

      if (!isControlled) {
        setInternalFiles(limited);
      }
      onFilesChange?.(limited);
    };

    const handleRemove = (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const updated = currentFiles.filter((item) => item.id !== id);
      if (!isControlled) {
        setInternalFiles(updated);
      }
      onRemove?.(id);
      onFilesChange?.(updated);
    };

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (!disabled && e.dataTransfer.files) {
        handleFilesAdded(e.dataTransfer.files);
      }
    };

    const handleDropzoneClick = () => {
      if (!disabled && inputRef.current) {
        inputRef.current.click();
      }
    };

    const themeClass = theme === 'dark' ? 'unooria-file-upload--theme-dark' : '';
    const containerClassName = ['unooria-file-upload', themeClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={containerClassName} style={style} {...rest}>
        {/* Rótulo Superior */}
        {label && (
          <div className="unooria-file-upload__label-row">
            <span className="unooria-file-upload__label">{label}</span>
            {required && <span className="unooria-file-upload__required">*</span>}
          </div>
        )}

        {/* Input Nativo Invisível */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFilesAdded(e.target.files)}
          className="unooria-file-upload__input"
          aria-label={typeof label === 'string' ? label : 'Upload de arquivo'}
        />

        {/* Área de Dropzone */}
        {!hideDropzone && (
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={handleDropzoneClick}
            onKeyDown={(e) => {
              if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleDropzoneClick();
              }
            }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`unooria-file-upload__dropzone ${
              isDragOver ? 'unooria-file-upload__dropzone--dragover' : ''
            } ${disabled ? 'unooria-file-upload__dropzone--disabled' : ''}`}
          >
            <div className="unooria-file-upload__icon-circle">
              <Icon name="upload" size="s" color="currentColor" />
            </div>

            <p className="unooria-file-upload__title">{dropzoneTitle}</p>
            <p className="unooria-file-upload__subtitle">{dropzoneSubtitle}</p>
          </div>
        )}

        {/* Lista de Cards de Arquivos */}
        {currentFiles.length > 0 && (
          <div className="unooria-file-upload__list">
            {currentFiles.map((file) => {
              const isError = file.status === 'error' || !!file.error;
              return (
                <div
                  key={file.id}
                  className={`unooria-file-card ${isError ? 'unooria-file-card--error' : ''}`}
                >
                  <div className="unooria-file-card__info-row">
                    <div className="unooria-file-card__text-col">
                      <span className="unooria-file-card__name" title={file.name}>
                        {file.name}
                      </span>
                      <span className="unooria-file-card__size">
                        {typeof file.size === 'number' ? formatFileSize(file.size) : file.size}
                      </span>
                    </div>

                    {!disabled && (
                      <button
                        type="button"
                        aria-label={`Remover ${file.name}`}
                        onClick={(e) => handleRemove(file.id, e)}
                        className="unooria-file-card__remove-btn"
                      >
                        <Icon name="close" size="xs" color="currentColor" />
                      </button>
                    )}
                  </div>

                  <div className="unooria-file-card__progress-row">
                    <div className="unooria-file-card__progress-track">
                      <div
                        className={`unooria-file-card__progress-fill ${
                          isError ? 'unooria-file-card__progress-fill--error' : ''
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, file.progress))}%` }}
                      />
                    </div>
                    <span className="unooria-file-card__percentage">
                      {isError ? 'Erro' : `${Math.round(file.progress)}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
