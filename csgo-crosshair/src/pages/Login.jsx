import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let error = null;

      // CORRECCIÓN: Llamamos a las funciones DIRECTAMENTE para no romper Supabase
      if (isRegistering) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        error = signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        error = signInError;
      }

      if (error) throw error;

      if (isRegistering) {
        toast.success('¡Cuenta creada! Ya puedes iniciar sesión.');
        setIsRegistering(false);
      } else {
        toast.success('¡Bienvenido!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cs-dark px-4 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cs-yellow/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-md w-full bg-cs-card border border-cs-border rounded-2xl p-8 shadow-xl backdrop-blur-xl transition-colors duration-300">
        <div className="text-center mb-8">
            <span className="text-4xl mb-2 block">⚡</span>
            <h2 className="text-3xl font-black text-white tracking-tight mb-1">
              CS:GO <span className="text-cs-yellow">CLOUD</span>
            </h2>
            <p className="text-cs-muted">
              {isRegistering ? t('register_title') : t('login_title')}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-white mb-2">Email</label>
            <input 
              type="email" 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              required 
              className="w-full bg-cs-dark border border-cs-border rounded-lg px-4 py-3 text-white focus:border-cs-yellow focus:ring-1 focus:ring-cs-yellow focus:outline-none transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">{t('password')}</label>
            <input 
              type="password" 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              required 
              className="w-full bg-cs-dark border border-cs-border rounded-lg px-4 py-3 text-white focus:border-cs-yellow focus:ring-1 focus:ring-cs-yellow focus:outline-none transition-all" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-cs-yellow hover:bg-cs-yellowHover text-black font-bold py-3 rounded-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? '...' : (isRegistering ? t('btn_register') : t('btn_login'))}
          </button>
        </form>
        
        <p 
          onClick={() => setIsRegistering(!isRegistering)} 
          className="text-center mt-6 text-cs-yellow hover:text-white text-sm font-medium cursor-pointer transition-colors"
        >
          {isRegistering ? t('toggle_login') : t('toggle_register')}
        </p>
      </div>
    </div>
  );
}