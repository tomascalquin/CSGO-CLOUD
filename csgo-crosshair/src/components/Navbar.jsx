import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabaseClient';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path 
    ? "text-cs-yellow bg-cs-yellow/10" 
    : "text-gray-300 hover:text-white hover:bg-white/5";

  const linkClass = "px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2";

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-cs-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2 group">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">⚡</span>
                <span className="text-xl font-black tracking-tighter text-white group-hover:text-cs-yellow transition-colors">
                  CS:GO <span className="text-cs-yellow">CLOUD</span>
                </span>
            </Link>
            
            {/* MENU ESCRITORIO - AHORA TRADUCIDO */}
            <div className="hidden md:flex items-center gap-2">
                <Link to="/dashboard" className={`${linkClass} ${isActive('/dashboard')}`}>
                    🎯 {t('nav_dashboard')}
                </Link>
                <Link to="/gallery" className={`${linkClass} ${isActive('/gallery')}`}>
                    🏆 {t('nav_gallery')}
                </Link>
                <Link to="/practice" className={`${linkClass} ${isActive('/practice')}`}>
                    🛠️ {t('nav_practice')}
                </Link>
                <Link to="/binds" className={`${linkClass} ${isActive('/binds')}`}>
                    ⌨️ {t('nav_binds')}
                </Link>
                <Link to="/autoexec" className={`${linkClass} ${isActive('/autoexec')}`}>
                    ⚙️ {t('nav_config')}
                </Link>
            </div>
          </div>
          
          {/* IDIOMA Y LOGOUT */}
          <div className="flex items-center gap-3">
            <div className="flex bg-cs-card rounded-lg p-1 border border-cs-border">
              <button onClick={() => i18n.changeLanguage('es')} className={`px-2 py-1 rounded text-xs font-bold ${i18n.language === 'es' ? 'bg-cs-border text-white' : 'text-gray-400 hover:text-white'}`}>ES</button>
              <button onClick={() => i18n.changeLanguage('en')} className={`px-2 py-1 rounded text-xs font-bold ${i18n.language === 'en' ? 'bg-cs-border text-white' : 'text-gray-400 hover:text-white'}`}>EN</button>
            </div>
            
            <div className="h-6 w-px bg-cs-border mx-1"></div>

            <button 
              onClick={handleLogout} 
              className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 border border-red-500/20"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}