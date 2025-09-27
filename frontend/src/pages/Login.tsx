import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(username, password);
    
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password');
    }
    
    setLoading(false);
  };

  return (
    <section className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{t('auth.login.title')}</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">
            {t('auth.username')}
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded w-full px-3 py-2"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">
            {t('auth.password')}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full px-3 py-2"
            required
            disabled={loading}
          />
        </div>
        <button 
          type="submit"
          className="bg-black text-white w-full py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging in...' : t('auth.login.button')}
        </button>
      </form>
      <div className="text-sm text-gray-600 text-center">
        Default credentials: admin / password
      </div>
    </section>
  );
};

export default Login;