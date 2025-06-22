import { useState, useEffect } from 'react';
import { isValidUrl } from '../utils/isValidUrl';
import { useIconList } from '../hooks/useIconList';
import { ValidationMessage } from './ValidationMessage';
import { IconSelector } from './IconSelector';
import { QRPreview } from './QRPreview';

export const QRGenerator = () => {
  const [url, setUrl] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [generatedQR, setGeneratedQR] = useState<{ url: string; icon: string | null } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const icons = useIconList();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const validation = isValidUrl(url);
  const canGenerate = url.trim() && validation.isValid;

  const handleGenerate = () => {
    if (canGenerate) {
      setGeneratedQR({ url, icon: selectedIcon });
    }
  };

  const handleDownload = () => {
    if (!generatedQR) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgElement = document.querySelector('#qr-code-svg') as SVGElement;
    
    if (!ctx || !svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'qr-code.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      });
      
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
  };

  const containerStyle = {
    minHeight: '100vh',
    background: isDarkMode 
      ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0a 100%)'
      : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #7dd3fc 75%, #38bdf8 100%)',
    padding: '24px',
    fontFamily: "'Orbitron', 'Courier New', monospace"
  };

  const cardStyle = {
    maxWidth: '700px',
    margin: '0 auto',
    background: isDarkMode 
      ? 'rgba(15, 23, 42, 0.8)' 
      : 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    padding: '40px',
    backdropFilter: 'blur(20px)',
    border: isDarkMode 
      ? '1px solid rgba(59, 130, 246, 0.3)' 
      : '1px solid rgba(59, 130, 246, 0.2)',
    boxShadow: isDarkMode
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(59, 130, 246, 0.1)'
      : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(59, 130, 246, 0.1)'
  };

  const titleStyle = {
    textAlign: 'center' as const,
    marginBottom: '40px',
    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
    fontWeight: '700',
    color: '#ffffff',
    textShadow: isDarkMode 
      ? '0 0 30px rgba(0, 212, 255, 0.8), 0 0 60px rgba(0, 212, 255, 0.4)' 
      : '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
    letterSpacing: '1px',
    lineHeight: '1.2'
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    border: isDarkMode
      ? `2px solid ${validation.isValid || !url.trim() ? 'rgba(59, 130, 246, 0.3)' : 'rgba(239, 68, 68, 0.6)'}`
      : `2px solid ${validation.isValid || !url.trim() ? 'rgba(59, 130, 246, 0.4)' : 'rgba(239, 68, 68, 0.6)'}`,
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
    background: isDarkMode 
      ? 'rgba(15, 23, 42, 0.6)' 
      : 'rgba(255, 255, 255, 0.8)',
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px 32px',
    background: canGenerate
      ? (isDarkMode 
          ? 'linear-gradient(45deg, #00d4ff, #0099cc)'
          : 'linear-gradient(45deg, #3b82f6, #06b6d4)')
      : (isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(156, 163, 175, 0.5)'),
    color: canGenerate ? '#ffffff' : (isDarkMode ? '#9ca3af' : '#6b7280'),
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: canGenerate ? 'pointer' : 'not-allowed',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    boxShadow: canGenerate 
      ? (isDarkMode 
          ? '0 10px 30px rgba(0, 212, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.2)'
          : '0 10px 30px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)')
      : 'none'
  };

  const downloadButtonStyle = {
    marginTop: '20px',
    padding: '12px 24px',
    background: 'linear-gradient(45deg, #10b981, #059669)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3), 0 0 15px rgba(16, 185, 129, 0.2)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '12px',
    fontWeight: '600',
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    fontSize: '16px',
    letterSpacing: '0.5px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>
          QR CODE<br />GENERATOR
        </h1>
        
        <div style={{ marginBottom: '32px' }}>
          <label htmlFor="url-input" style={labelStyle}>
            URL INPUT:
          </label>
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            style={inputStyle}
          />
          <ValidationMessage validation={validation} />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <IconSelector
            icons={icons}
            selectedIcon={selectedIcon}
            onIconChange={setSelectedIcon}
            isDarkMode={isDarkMode}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            style={buttonStyle}
          >
            GENERATE QR CODE
          </button>
        </div>

        {generatedQR && (
          <div style={{ textAlign: 'center' }}>
            <QRPreview 
              url={generatedQR.url} 
              iconPath={generatedQR.icon}
              isDarkMode={isDarkMode}
            />
            <button
              onClick={handleDownload}
              style={downloadButtonStyle}
            >
              DOWNLOAD QR CODE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};