import React from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload({ onFileUpload }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 10 * 1024 * 1024,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    }
  });

  return (
    <div {...getRootProps()} style={{
      border: '2px dashed #888',
      padding: '30px',
      margin: '20px 0',
      textAlign: 'center',
      background: isDragActive ? '#f0f0f0' : '#fff',
      cursor: 'pointer'
    }}>
      <input {...getInputProps()} />
      <p>📤 Drag and drop a PDF or image file here, or click to select one (max 10MB)</p>
    </div>
  );
}

export default FileUpload;
