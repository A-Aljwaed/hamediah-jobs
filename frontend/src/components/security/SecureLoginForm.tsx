import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import Captcha, { CaptchaRef } from './Captcha';
import { loginRateLimiter } from '../../utils/rateLimiter';

interface SecureLoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const SecureLoginForm: React.FC<SecureLoginFormProps> = ({ onSuccess, onError }) => {
  const { t } = useTranslation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [requiresCaptcha, setRequiresCaptcha] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  
  const captchaRef = useRef<CaptchaRef>(null);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = t('auth.username') + ' ' + t('common.required').toLowerCase();
    }

    if (!formData.password) {
      newErrors.password = t('auth.password') + ' ' + t('common.required').toLowerCase();
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Require CAPTCHA after 2 failed attempts
    if (requiresCaptcha && !captchaToken) {
      newErrors.captcha = 'Please complete the security verification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check rate limiting
    const rateLimitKey = formData.username || 'anonymous';
    if (!loginRateLimiter.isAllowed(rateLimitKey)) {
      const timeUntilUnblocked = loginRateLimiter.getTimeUntilUnblocked(rateLimitKey);
      const minutesLeft = Math.ceil(timeUntilUnblocked / (1000 * 60));
      toast.error(`Too many login attempts. Please try again in ${minutesLeft} minutes.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await login(formData.username, formData.password);
      
      if (success) {
        // Reset rate limiter on successful login
        loginRateLimiter.reset(rateLimitKey);
        setAttemptCount(0);
        setRequiresCaptcha(false);
        toast.success('Login successful!');
        onSuccess?.();
      } else {
        // Increment attempt count and show CAPTCHA after 2 attempts
        const newAttemptCount = attemptCount + 1;
        setAttemptCount(newAttemptCount);
        
        if (newAttemptCount >= 2) {
          setRequiresCaptcha(true);
          toast.error('Multiple failed attempts detected. Please complete the security verification.');
        } else {
          toast.error('Invalid username or password');
        }
        
        // Reset CAPTCHA on failed login
        if (requiresCaptcha) {
          captchaRef.current?.reset();
          setCaptchaToken(null);
        }
        
        onError?.('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      onError?.('Login failed');
      
      // Reset CAPTCHA on error
      if (requiresCaptcha) {
        captchaRef.current?.reset();
        setCaptchaToken(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const remainingAttempts = loginRateLimiter.getRemainingAttempts(formData.username || 'anonymous');

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Shield className="w-5 h-5 text-primary-600" />
          {t('auth.login.title')}
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          {t('auth.login.subtitle')}
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Security Warning */}
          {requiresCaptcha && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <p className="text-sm text-amber-800">
                Security verification required due to multiple failed attempts
              </p>
            </div>
          )}

          {/* Rate Limit Warning */}
          {remainingAttempts <= 2 && remainingAttempts > 0 && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="text-sm text-red-800">
                {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining before temporary lockout
              </p>
            </div>
          )}

          {/* Username Field */}
          <div>
            <Input
              label={t('auth.username')}
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
              required
              autoComplete="username"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <Input
                label={t('auth.password')}
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* CAPTCHA */}
          {requiresCaptcha && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Security Verification <span className="text-red-500">*</span>
              </label>
              <Captcha
                ref={captchaRef}
                onVerify={setCaptchaToken}
                onExpire={() => setCaptchaToken(null)}
                onError={() => setCaptchaToken(null)}
                size="compact"
              />
              {errors.captcha && (
                <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting || (requiresCaptcha && !captchaToken)}
            className="w-full"
          >
            {isSubmitting ? 'Signing in...' : t('auth.login.button')}
          </Button>

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <a
              href="#"
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              {t('auth.forgotPassword')}
            </a>
            <p className="text-sm text-gray-600">
              {t('auth.login.noAccount')}{' '}
              <a
                href="/register"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {t('auth.login.signUp')}
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SecureLoginForm;
