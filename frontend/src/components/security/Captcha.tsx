import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';

interface CaptchaProps {
  onVerify: (token: string | null) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: 'light' | 'dark';
  size?: 'compact' | 'normal';
}

export interface CaptchaRef {
  reset: () => void;
  execute: () => void;
}

const Captcha = forwardRef<CaptchaRef, CaptchaProps>(({
  onVerify,
  onExpire,
  onError,
  theme = 'light',
  size = 'normal'
}, ref) => {
  const { i18n } = useTranslation();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Use a demo site key for development - replace with actual key in production
  const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  useImperativeHandle(ref, () => ({
    reset: () => {
      recaptchaRef.current?.reset();
    },
    execute: () => {
      recaptchaRef.current?.execute();
    }
  }));

  const handleChange = (token: string | null) => {
    onVerify(token);
  };

  const handleExpired = () => {
    onExpire?.();
    onVerify(null);
  };

  const handleError = () => {
    onError?.();
    onVerify(null);
  };

  return (
    <div className="flex justify-center">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={SITE_KEY}
        onChange={handleChange}
        onExpired={handleExpired}
        onError={handleError}
        theme={theme}
        size={size}
        hl={i18n.language} // Set language for CAPTCHA
      />
    </div>
  );
});

Captcha.displayName = 'Captcha';

export default Captcha;
