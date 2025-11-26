import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabaseClient';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path 
    ? "text-yellow-600 dark:text-cs-yellow bg-yellow-50 dark:bg-cs-yellow/10" 
    : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5";

  const linkClass = "px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2";

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-cs-dark/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
   
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">⚡</span>
                <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-cs-yellow transition-colors">
                  CS:GO <span className="text-yellow-600 dark:text-cs-yellow">CLOUD</span>
                </span>
            </Link>
            
           
            <div className="hidden md:flex items-center gap-2">
                <Link to="/dashboard" className={`${linkClass} ${isActive('/dashboard')}`}>🎯 {t('nav_dashboard')}</Link>
                <Link to="/gallery" className={`${linkClass} ${isActive('/gallery')}`}>🏆 {t('nav_gallery')}</Link>
                <Link to="/practice" className={`${linkClass} ${isActive('/practice')}`}>🛠️ {t('nav_practice')}</Link>
                <Link to="/binds" className={`${linkClass} ${isActive('/binds')}`}>⌨️ {t('nav_binds')}</Link>
                <Link to="/autoexec" className={`${linkClass} ${isActive('/autoexec')}`}>⚙️ {t('nav_config')}</Link>
                <Link to="/sensitivity" className={`${linkClass} ${isActive('/sensitivity')}`}>🖱️ {t('nav_sens')}</Link>
            </div>
          </div>
          
       
          <div className="flex items-center gap-3">
            
      
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-cs-card text-xl border border-gray-200 dark:border-cs-border hover:scale-105 transition-transform">
                {theme === 'dark' ? '🌙' : '☀️'}
            </button>

         
            <div className="hidden md:flex bg-gray-100 dark:bg-cs-card rounded-lg p-1 border border-gray-200 dark:border-cs-border">
              <button onClick={() => i18n.changeLanguage('es')} className={`px-2 py-1 rounded text-xs font-bold ${i18n.language === 'es' ? 'bg-white dark:bg-cs-border text-black dark:text-white shadow-sm' : 'text-gray-400'}`}>ES</button>
              <button onClick={() => i18n.changeLanguage('en')} className={`px-2 py-1 rounded text-xs font-bold ${i18n.language === 'en' ? 'bg-white dark:bg-cs-border text-black dark:text-white shadow-sm' : 'text-gray-400'}`}>EN</button>
            </div>

            <button onClick={handleLogout} className="hidden md:block bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 px-4 py-2 rounded-lg text-sm font-bold border border-red-200 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
              {t('logout')}
            </button>

   
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-slate-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none border border-transparent focus:border-gray-300 dark:focus:border-white/20"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-white/10 bg-white dark:bg-cs-dark px-4 pt-4 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-5 duration-200 absolute w-full left-0 z-50">
          
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className={`block w-full ${linkClass} ${isActive('/dashboard')}`}>🎯 {t('nav_dashboard')}</Link>
          <Link to="/gallery" onClick={() => setIsOpen(false)} className={`block w-full ${linkClass} ${isActive('/gallery')}`}>🏆 {t('nav_gallery')}</Link>
          <Link to="/practice" onClick={() => setIsOpen(false)} className={`block w-full ${linkClass} ${isActive('/practice')}`}>🛠️ {t('nav_practice')}</Link>
          <Link to="/binds" onClick={() => setIsOpen(false)} className={`block w-full ${linkClass} ${isActive('/binds')}`}>⌨️ {t('nav_binds')}</Link>
          <Link to="/autoexec" onClick={() => setIsOpen(false)} className={`block w-full ${linkClass} ${isActive('/autoexec')}`}>⚙️ {t('nav_config')}</Link>
          <Link to="/sensitivity" onClick={() => setIsOpen(false)} className={`block w-full ${linkClass} ${isActive('/sensitivity')}`}>🖱️ {t('nav_sens')}</Link>
          
          <div className="h-px bg-gray-200 dark:bg-white/10 my-4"></div>
          
          <div className="flex gap-3 mb-4">
             <button onClick={() => i18n.changeLanguage('es')} className={`flex-1 py-3 rounded-lg font-bold text-center border ${i18n.language === 'es' ? 'bg-yellow-500 border-yellow-500 text-white' : 'bg-gray-50 dark:bg-cs-card border-gray-200 dark:border-cs-border text-gray-500'}`}>Español</button>
             <button onClick={() => i18n.changeLanguage('en')} className={`flex-1 py-3 rounded-lg font-bold text-center border ${i18n.language === 'en' ? 'bg-yellow-500 border-yellow-500 text-white' : 'bg-gray-50 dark:bg-cs-card border-gray-200 dark:border-cs-border text-gray-500'}`}>English</button>
          </div>

          <button onClick={handleLogout} className="w-full text-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold shadow-lg transition-colors">
            {t('logout')}
          </button>
        </div>
      )}
    </nav>
  );
}