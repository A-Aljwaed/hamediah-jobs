import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login functionality
    console.log('Login attempt:', { username, password });
  };

  return (
    <section className="max-w-sm mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{t('auth.login.title')}</h1>
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
          />
        </div>
        <button 
          type="submit"
          className="bg-black text-white w-full py-2 rounded"
        >
          {t('auth.login.button')}
        </button>
      </form>
    </section>
  );
};

export default Login;