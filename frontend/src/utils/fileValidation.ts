export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  warnings?: string[];
}

export interface FileValidationOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  allowedExtensions?: string[];
  checkMagicNumbers?: boolean;
  scanForMalware?: boolean;
}

// Magic numbers (file signatures) for common file types
const FILE_SIGNATURES: Record<string, number[][]> = {
  'application/pdf': [
    [0x25, 0x50, 0x44, 0x46], // %PDF
  ],
  'image/jpeg': [
    [0xFF, 0xD8, 0xFF, 0xE0], // JFIF
    [0xFF, 0xD8, 0xFF, 0xE1], // EXIF
    [0xFF, 0xD8, 0xFF, 0xE8], // SPIFF
  ],
  'image/png': [
    [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A], // PNG signature
  ],
  'application/msword': [
    [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1], // MS Office
  ],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    [0x50, 0x4B, 0x03, 0x04], // ZIP-based (DOCX)
    [0x50, 0x4B, 0x05, 0x06], // ZIP-based (DOCX)
    [0x50, 0x4B, 0x07, 0x08], // ZIP-based (DOCX)
  ],
};

// Suspicious file patterns that might indicate malware
const SUSPICIOUS_PATTERNS = [
  // Executable signatures
  [0x4D, 0x5A], // MZ (DOS/Windows executable)
  [0x7F, 0x45, 0x4C, 0x46], // ELF (Linux executable)
  [0xFE, 0xED, 0xFA, 0xCE], // Mach-O (macOS executable)
  [0xFE, 0xED, 0xFA, 0xCF], // Mach-O (macOS executable)
  
  // Script signatures
  [0x23, 0x21], // #! (shebang)
];

/**
 * Read the first few bytes of a file to check its signature
 */
async function readFileSignature(file: File, bytesToRead: number = 16): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const slice = file.slice(0, bytesToRead);
    
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(arrayBuffer);
      resolve(Array.from(bytes));
    };
    
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(slice);
  });
}

/**
 * Check if file signature matches expected type
 */
function verifyFileSignature(bytes: number[], mimeType: string): boolean {
  const signatures = FILE_SIGNATURES[mimeType];
  if (!signatures) return true; // No signature check available
  
  return signatures.some(signature => 
    signature.every((byte, index) => bytes[index] === byte)
  );
}

/**
 * Check for suspicious patterns that might indicate malware
 */
function checkForSuspiciousPatterns(bytes: number[]): boolean {
  return SUSPICIOUS_PATTERNS.some(pattern =>
    pattern.every((byte, index) => bytes[index] === byte)
  );
}

/**
 * Validate file extension against MIME type
 */
function validateExtension(fileName: string, mimeType: string): boolean {
  const extension = fileName.toLowerCase().split('.').pop();
  
  const mimeToExtension: Record<string, string[]> = {
    'application/pdf': ['pdf'],
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/gif': ['gif'],
    'application/msword': ['doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
    'text/plain': ['txt'],
    'text/csv': ['csv'],
  };
  
  const validExtensions = mimeToExtension[mimeType];
  return validExtensions ? validExtensions.includes(extension || '') : true;
}

/**
 * Comprehensive file validation
 */
export async function validateFile(
  file: File, 
  options: FileValidationOptions = {}
): Promise<FileValidationResult> {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['application/pdf'],
    allowedExtensions = ['pdf'],
    checkMagicNumbers = true,
    scanForMalware = true
  } = options;

  const warnings: string[] = [];

  // Check file size
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size (${(maxSize / 1024 / 1024).toFixed(2)}MB)`
    };
  }

  // Check MIME type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type "${file.type}" is not allowed. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  // Check file extension
  const extension = file.name.toLowerCase().split('.').pop();
  if (allowedExtensions.length > 0 && !allowedExtensions.includes(extension || '')) {
    return {
      isValid: false,
      error: `File extension ".${extension}" is not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`
    };
  }

  // Validate extension matches MIME type
  if (!validateExtension(file.name, file.type)) {
    warnings.push('File extension does not match the detected file type');
  }

  // Check magic numbers if enabled
  if (checkMagicNumbers || scanForMalware) {
    try {
      const bytes = await readFileSignature(file, 32);
      
      if (checkMagicNumbers && !verifyFileSignature(bytes, file.type)) {
        return {
          isValid: false,
          error: 'File signature does not match the declared file type. This may indicate a corrupted or malicious file.'
        };
      }
      
      if (scanForMalware && checkForSuspiciousPatterns(bytes)) {
        return {
          isValid: false,
          error: 'File contains suspicious patterns that may indicate malware. Upload blocked for security reasons.'
        };
      }
    } catch (error) {
      return {
        isValid: false,
        error: 'Unable to read file for security validation'
      };
    }
  }

  // Additional security checks
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    return {
      isValid: false,
      error: 'File name contains invalid characters'
    };
  }

  // Check for extremely small files (might be suspicious)
  if (file.size < 100) {
    warnings.push('File is unusually small');
  }

  // Check for files with no extension
  if (!extension) {
    warnings.push('File has no extension');
  }

  return {
    isValid: true,
    warnings: warnings.length > 0 ? warnings : undefined
  };
}

/**
 * Sanitize filename for safe storage
 */
export function sanitizeFileName(fileName: string): string {
  // Remove or replace dangerous characters
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special chars with underscore
    .replace(/\.+/g, '.') // Replace multiple dots with single dot
    .replace(/^\./, '') // Remove leading dot
    .substring(0, 255); // Limit length
}

/**
 * Generate a secure random filename while preserving extension
 */
export function generateSecureFileName(originalName: string): string {
  const extension = originalName.split('.').pop();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  
  return `${timestamp}_${random}${extension ? '.' + extension : ''}`;
}

// Predefined validation configurations
export const VALIDATION_CONFIGS = {
  RESUME: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['application/pdf'],
    allowedExtensions: ['pdf'],
    checkMagicNumbers: true,
    scanForMalware: true
  },
  
  PROFILE_IMAGE: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/jpeg', 'image/png'],
    allowedExtensions: ['jpg', 'jpeg', 'png'],
    checkMagicNumbers: true,
    scanForMalware: true
  },
  
  COMPANY_LOGO: {
    maxSize: 1 * 1024 * 1024, // 1MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/svg+xml'],
    allowedExtensions: ['jpg', 'jpeg', 'png', 'svg'],
    checkMagicNumbers: true,
    scanForMalware: true
  },
  
  DOCUMENT: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ],
    allowedExtensions: ['pdf', 'doc', 'docx', 'txt'],
    checkMagicNumbers: true,
    scanForMalware: true
  }
};
