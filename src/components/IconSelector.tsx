import type { IconData } from '../types';

interface IconSelectorProps {
  icons: IconData[];
  selectedIcon: string | null;
  onIconChange: (iconPath: string | null) => void;
  isDarkMode: boolean;
}

export const IconSelector = ({ icons, selectedIcon, onIconChange, isDarkMode }: IconSelectorProps) => {
  const labelStyle = {
    display: 'block',
    marginBottom: '12px',
    fontWeight: '600',
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    fontSize: '16px',
    letterSpacing: '0.5px'
  };

  const selectStyle = {
    width: '100%',
    padding: '12px 16px',
    border: isDarkMode
      ? '2px solid rgba(59, 130, 246, 0.3)'
      : '2px solid rgba(59, 130, 246, 0.4)',
    borderRadius: '12px',
    fontSize: '16px',
    background: isDarkMode 
      ? 'rgba(15, 23, 42, 0.6)' 
      : 'rgba(255, 255, 255, 0.8)',
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    backdropFilter: 'blur(10px)',
    outline: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  return (
    <div>
      <label htmlFor="icon-select" style={labelStyle}>
        ICON SELECTION:
      </label>
      <select
        id="icon-select"
        value={selectedIcon || ''}
        onChange={(e) => onIconChange(e.target.value || null)}
        style={selectStyle}
      >
        <option value="">NONE</option>
        {icons.map((icon) => (
          <option key={icon.path} value={icon.path}>
            {icon.name.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};