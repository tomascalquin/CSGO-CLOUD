import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loginUser, registerUser } from '../utils/storage';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const action = isRegistering ? registerUser : loginUser;
    const result = action(formData.username, formData.password);
    
    if (result.success) {
        if(isRegistering) loginUser(formData.username, formData.password);
        navigate('/dashboard');
    } else {
        setError(result.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ padding: '30px', border: '1px solid #ddd', borderRadius: '8px', width: '300px' }}>
        <h2>{t('app_title')}</h2>
        <h3>{isRegistering ? t('register_title') : t('login_title')}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder={t('username')} onChange={e => setFormData({...formData, username: e.target.value})} required />
          <input type="password" placeholder={t('password')} onChange={e => setFormData({...formData, password: e.target.value})} required />
          {error && <p style={{color: 'red'}}>{error}</p>}
          <button type="submit" style={{background: '#eab308', padding: '10px', border: 'none'}}>{isRegistering ? t('btn_register') : t('btn_login')}</button>
        </form>
        <p onClick={() => setIsRegistering(!isRegistering)} style={{color: 'blue', cursor: 'pointer', marginTop: '10px'}}>
          {isRegistering ? t('toggle_login') : t('toggle_register')}
        </p>
      </div>
    </div>
  );
}