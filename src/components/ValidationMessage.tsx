import type { ValidationResult } from '../types';

interface ValidationMessageProps {
  validation: ValidationResult;
}

export const ValidationMessage = ({ validation }: ValidationMessageProps) => {
  if (validation.isValid || !validation.message) {
    return null;
  }

  const messageStyle = {
    color: '#ff4757',
    fontSize: '14px',
    marginTop: '8px',
    padding: '8px 12px',
    background: 'rgba(255, 71, 87, 0.1)',
    border: '1px solid rgba(255, 71, 87, 0.3)',
    borderRadius: '8px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    textShadow: '0 0 10px rgba(255, 71, 87, 0.3)'
  };

  return (
    <div style={messageStyle}>
      ⚠️ {validation.message}
    </div>
  );
};