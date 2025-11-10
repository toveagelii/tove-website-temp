"use client";
import { useState } from 'react';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div style={{ marginTop: '24px' }}>
  <label style={{ fontFamily: "'Neue Haas Grotesk', sans-serif", fontSize: '13px', color: 'var(--foreground)' }}>
        Upload an image:
        <input type="file" accept="image/*" onChange={handleChange} style={{ display: 'block', marginTop: '8px' }} />
      </label>
      {preview && (
        <div style={{ marginTop: '12px' }}>
          <img src={preview} alt="Preview" style={{ maxWidth: '200px', borderRadius: '8px' }} />
        </div>
      )}
    </div>
  );
}
