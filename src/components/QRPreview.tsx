import { QRCodeSVG } from 'qrcode.react';

interface QRPreviewProps {
  url: string;
  iconPath: string | null;
  isDarkMode: boolean;
}

export const QRPreview = ({ url, iconPath, isDarkMode }: QRPreviewProps) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px',
    background: isDarkMode 
      ? 'rgba(15, 23, 42, 0.4)' 
      : 'rgba(255, 255, 255, 0.6)',
    borderRadius: '20px',
    border: isDarkMode 
      ? '2px solid rgba(59, 130, 246, 0.2)' 
      : '2px solid rgba(59, 130, 246, 0.3)',
    backdropFilter: 'blur(15px)',
    boxShadow: isDarkMode
      ? '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 0 30px rgba(59, 130, 246, 0.1)'
      : '0 20px 40px rgba(0, 0, 0, 0.15), inset 0 0 30px rgba(59, 130, 246, 0.1)'
  };

  const qrContainerStyle = {
    position: 'relative' as const,
    display: 'inline-block',
    padding: '20px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: isDarkMode
      ? '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 212, 255, 0.1)'
      : '0 15px 35px rgba(0, 0, 0, 0.2), 0 0 25px rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  };

  const iconContainerStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
    border: '2px solid rgba(255, 255, 255, 0.9)'
  };

  const iconStyle = {
    width: '48px',
    height: '48px',
    objectFit: 'contain' as const,
    borderRadius: '8px',
    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))'
  };

  return (
    <div style={containerStyle}>
      <div style={qrContainerStyle}>
        <QRCodeSVG
          id="qr-code-svg"
          value={url}
          size={280}
          bgColor="#ffffff"
          fgColor="#000000"
          level="M"
          includeMargin={true}
        />
        {iconPath && (
          <div style={iconContainerStyle}>
            <img
              src={iconPath}
              alt="QR Icon"
              style={iconStyle}
            />
          </div>
        )}
      </div>
    </div>
  );
};