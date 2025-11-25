import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import Navbar from '../components/Navbar.jsx';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCrosshairs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('crosshairs').select('*').order('created_at', { ascending: false });
    if (error) toast.error(error.message);
    else setItems(data);
    setLoading(false);
  };

  useEffect(() => { fetchCrosshairs(); }, []);

  const handleDelete = async (id) => {
    if (confirm(t('delete_confirm'))) {
      const { error } = await supabase.from('crosshairs').delete().eq('id', id);
      if (error) toast.error('Error');
      else { toast.success('Eliminado'); fetchCrosshairs(); }
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(t('copy_success'));
  };

  const filteredItems = items.filter(item => item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || item.mapa.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-cs-dark text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tight mb-2">{t('dashboard_title')}</h2>
            <p className="text-cs-muted text-lg">{t('dashboard_subtitle')}</p>
          </div>
          <Link to="/editor" className="group relative inline-flex items-center gap-2 bg-cs-yellow text-black px-6 py-3 rounded-xl font-bold text-lg overflow-hidden transition-transform active:scale-95 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="relative">+ {t('add_new')}</span>
          </Link>
        </div>

        <div className="relative mb-10 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><span className="text-gray-500 text-xl">🔍</span></div>
            <input type="text" placeholder={t('search_placeholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-cs-card border border-cs-border text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-cs-yellow focus:ring-1 focus:ring-cs-yellow transition-all shadow-lg text-lg placeholder-gray-500" />
        </div>

        {loading ? <div className="text-center py-20 animate-pulse text-cs-muted">Cargando...</div> : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-cs-card/50 border-2 border-dashed border-cs-border rounded-2xl">
            <p className="text-cs-muted text-xl mb-4">{t('no_crosshairs_found')}</p>
            <Link to="/editor" className="text-cs-yellow hover:underline font-bold text-lg">{t('create_first')}</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-cs-card border border-cs-border rounded-2xl p-6 hover:border-cs-yellow/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white truncate max-w-[200px]">{item.nombre}</h3>
                      <span className="inline-block mt-1 px-3 py-1 bg-black/30 rounded-full text-xs font-medium text-cs-muted border border-white/5">🗺️ {item.mapa}</span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/editor/${item.id}`} className="p-2 hover:bg-white/10 rounded-lg transition-colors">✏️</Link>
                        <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">🗑️</button>
                    </div>
                </div>
              
                <div className="bg-black/40 rounded-lg p-3 mb-6 border border-white/5 flex items-center gap-3 group/code cursor-pointer overflow-hidden" onClick={() => handleCopy(item.codigo)}>
                    <code className="flex-1 min-w-0 text-green-400 text-xs font-mono truncate">{item.codigo}</code>
                    <span className="text-xs font-bold text-cs-yellow opacity-0 group-hover/code:opacity-100 transition-opacity whitespace-nowrap">COPY</span>
                </div>
               

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-4">
                    <div className="bg-white p-1 rounded"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent(item.codigo)}`} alt="QR" className="w-12 h-12" /></div>
                    <div><strong className="block text-sm text-white mb-1">{t('mobile_version')}</strong><p className="text-xs text-cs-muted leading-tight">{t('scan_qr')}</p></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}