import type { ValidationResult } from '../types';

export const isValidUrl = (urlString: string): ValidationResult => {
  if (!urlString.trim()) {
    return { isValid: false };
  }

  try {
    const url = new URL(urlString);
    const isValidProtocol = url.protocol === 'http:' || url.protocol === 'https:';
    
    if (!isValidProtocol) {
      return { 
        isValid: false, 
        message: 'URLはhttp://またはhttps://で始まる必要があります' 
      };
    }

    return { isValid: true };
  } catch {
    return { 
      isValid: false, 
      message: '有効なURL形式で入力してください' 
    };
  }
};