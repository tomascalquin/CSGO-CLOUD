import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../components/Navbar.jsx';
import { proPlayers } from '../utils/presets';
import { supabase } from '../supabaseClient';

export default function Gallery() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAdd = async (player) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return toast.error("Login required");

    const { error } = await supabase.from('crosshairs').insert([{
        user_id: user.id, nombre: `${player.nombre} (Config)`, mapa: player.mapa, codigo: player.codigo
    }]);

    if (error) toast.error(error.message);
    else { toast.success(t('added_to_profile', { name: player.nombre })); navigate('/dashboard'); }
  };

  return (
    <div className="min-h-screen bg-cs-dark text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white tracking-tight mb-4">🏆 {t('gallery_title')}</h2>
            <p className="text-xl text-cs-muted max-w-2xl mx-auto">{t('gallery_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proPlayers.map(player => (
            <div key={player.id} className="bg-cs-card border border-cs-border rounded-2xl overflow-hidden hover:border-cs-yellow/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
              
              {/* Header Amarilla */}
              <div className="bg-cs-yellow p-4 flex justify-between items-center">
                <h3 className="text-xl font-black text-black uppercase tracking-wide">{player.nombre}</h3>
                <span className="text-xs font-bold bg-black/20 text-black px-2 py-1 rounded backdrop-blur-sm">{player.equipo}</span>
              </div>

              <div className="p-6 flex-1 flex flex-col items-center">
                <div className="bg-white p-3 rounded-xl shadow-inner mb-6 group-hover:scale-105 transition-transform duration-300">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(player.codigo)}`} alt="QR" />
                </div>
                
                <div className="w-full text-center mb-6">
                    <div className="inline-flex items-center gap-2 text-cs-muted text-sm mb-3">
                        <span>🗺️</span> <span className="font-medium text-white">{player.mapa}</span>
                    </div>
                    <div className="bg-black/40 rounded p-2 border border-white/5">
                        <code className="block text-xs text-green-400 font-mono truncate">{player.codigo}</code>
                    </div>
                </div>

                <button onClick={() => handleAdd(player)} className="w-full mt-auto border-2 border-cs-yellow text-cs-yellow hover:bg-cs-yellow hover:text-black font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                    <span>💾</span> {t('save_to_profile')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}