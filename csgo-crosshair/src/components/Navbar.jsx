import { useNavigate, Link } from 'react-router-dom';
    import { useTranslation } from 'react-i18next';
    import { logout } from '../utils/storage';

    export default function Navbar() {
      const { t, i18n } = useTranslation();
      const navigate = useNavigate();

      const handleLogout = () => {
        logout();
        navigate('/');
      };

      return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#000', borderBottom: '1px solid #333', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Link to="/dashboard" style={{ color: '#eab308', textDecoration: 'none', fontWeight: '900', fontSize: '1.5rem', letterSpacing: '-1px' }}>
                ⚡ CS:GO CLOUD
            </Link>
            
            <div style={{ display: 'flex', gap: '25px' }}>
                <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none', fontSize: '1rem', opacity: 0.9 }}>
                    🎯 Mis Miras
                </Link>
                <Link to="/gallery" style={{ color: '#fbbf24', textDecoration: 'none', fontSize: '1rem', fontWeight: 'bold' }}>
                    🏆 Pro Gallery
                </Link>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button onClick={() => i18n.changeLanguage('es')} style={{cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.5rem'}}>🇪🇸</button>
            <button onClick={() => i18n.changeLanguage('en')} style={{cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.5rem'}}>🇺🇸</button>
            
            <button onClick={handleLogout} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {t('logout')}
            </button>
          </div>
        </nav>
      );
    }