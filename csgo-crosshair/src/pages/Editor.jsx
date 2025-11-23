import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import Navbar from '../components/Navbar.jsx';
import CrosshairPreview from '../components/CrosshairPreview.jsx';
import { supabase } from '../supabaseClient';

export default function Editor() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [crosshair, setCrosshair] = useState({ size: 5, gap: 2, thickness: 1, color: { r: 0, g: 255, b: 0 }, dot: false, outline: true, alpha: 1 });
  const [meta, setMeta] = useState({ nombre: '', mapa: 'Mirage' });

  useEffect(() => {
    if (id) {
      const fetchOne = async () => {
        const { data } = await supabase.from('crosshairs').select('*').eq('id', id).single();
        if (data) {
          setMeta({ nombre: data.nombre, mapa: data.mapa });
          if (data.config) setCrosshair(data.config);
        }
      };
      fetchOne();
    }
  }, [id]);

  const generateConsoleCode = () => 
    `cl_crosshairsize ${crosshair.size}; cl_crosshairgap ${crosshair.gap}; cl_crosshairthickness ${crosshair.thickness}; cl_crosshaircolor_r ${crosshair.color.r}; cl_crosshaircolor_g ${crosshair.color.g}; cl_crosshaircolor_b ${crosshair.color.b}; cl_crosshairdot ${crosshair.dot ? 1 : 0}; cl_crosshair_drawoutline ${crosshair.outline ? 1 : 0};`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return toast.error("Login required");

    const payload = { user_id: user.id, ...meta, codigo: generateConsoleCode(), config: crosshair };
    const query = id ? supabase.from('crosshairs').update(payload).eq('id', id) : supabase.from('crosshairs').insert([payload]);
    const { error } = await query;

    if (error) toast.error(error.message);
    else { toast.success('¡Guardado!'); navigate('/dashboard'); }
  };

  const SliderControl = ({ label, value, min, max, step, onChange }) => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-bold text-cs-muted">{label}</label>
        <span className="text-sm font-mono text-white bg-black/30 px-2 rounded">{value}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step || 1} value={value} 
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-cs-dark rounded-lg appearance-none cursor-pointer accent-cs-yellow hover:accent-cs-yellowHover"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-cs-dark text-white pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* CONTROLES (Izquierda - 7 columnas) */}
        <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-cs-border">
                <h2 className="text-3xl font-black text-white">{id ? t('edit_title') : t('create_title')}</h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-cs-card border border-cs-border rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-cs-muted">{t('crosshair_name')}</label>
                        <input value={meta.nombre} onChange={e => setMeta({...meta, nombre: e.target.value})} required className="w-full bg-cs-dark border border-cs-border rounded-lg px-4 py-2 text-white focus:border-cs-yellow focus:outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2 text-cs-muted">{t('map')}</label>
                        <input value={meta.mapa} onChange={e => setMeta({...meta, mapa: e.target.value})} required className="w-full bg-cs-dark border border-cs-border rounded-lg px-4 py-2 text-white focus:border-cs-yellow focus:outline-none" />
                    </div>
                </div>

                <div className="space-y-2 mb-8">
                    <h3 className="text-lg font-bold text-cs-yellow mb-4">{t('settings_title')}</h3>
                    <SliderControl label={t('size')} value={crosshair.size} min={0} max={10} step={0.5} onChange={v => setCrosshair({...crosshair, size: v})} />
                    <SliderControl label={t('gap')} value={crosshair.gap} min={-5} max={10} onChange={v => setCrosshair({...crosshair, gap: v})} />
                    <SliderControl label={t('thickness')} value={crosshair.thickness} min={0.5} max={5} step={0.5} onChange={v => setCrosshair({...crosshair, thickness: v})} />
                </div>

                <div className="flex flex-wrap gap-6 mb-8">
                    {[{k:'dot', l:t('dot')}, {k:'outline', l:t('outline')}].map(opt => (
                        <label key={opt.k} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" checked={crosshair[opt.k]} onChange={e => setCrosshair({...crosshair, [opt.k]: e.target.checked})} className="w-5 h-5 rounded text-cs-yellow bg-cs-dark border-cs-border focus:ring-cs-yellow accent-cs-yellow" />
                            <span className="text-white group-hover:text-cs-yellow transition-colors">{opt.l}</span>
                        </label>
                    ))}
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-bold mb-3 text-cs-muted">{t('color')}</label>
                    <div className="flex gap-3">
                        {[{r:0,g:255,b:0},{r:0,g:255,b:255},{r:255,g:0,b:0},{r:255,g:255,b:0},{r:255,g:0,b:255},{r:255,g:255,b:255}].map((c, i) => (
                            <button key={i} type="button" onClick={() => setCrosshair({...crosshair, color: c})} 
                                className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${crosshair.color.r===c.r && crosshair.color.g===c.g ? 'border-white ring-2 ring-white/20' : 'border-transparent'}`}
                                style={{backgroundColor: `rgb(${c.r},${c.g},${c.b})`}} />
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-cs-border">
                    <button type="submit" className="flex-1 bg-cs-yellow text-black font-bold py-3 rounded-lg hover:bg-cs-yellowHover transition-all">{t('save')}</button>
                    <button type="button" onClick={() => navigate('/dashboard')} className="px-6 py-3 rounded-lg border border-cs-border hover:bg-white/5 text-cs-muted hover:text-white transition-all">{t('cancel')}</button>
                </div>
            </form>
        </div>

        {/* PREVIEW (Derecha - 5 columnas - Sticky) */}
        <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
                <div className="bg-cs-card border border-cs-border rounded-2xl p-1 overflow-hidden shadow-2xl">
                    <CrosshairPreview config={crosshair} />
                </div>
                
                <div className="bg-black/40 border border-cs-border rounded-xl p-4">
                    <p className="text-xs text-cs-muted mb-2 uppercase font-bold tracking-wider">{t('generated_code')}</p>
                    <code className="block text-green-400 text-xs font-mono break-all">{generateConsoleCode()}</code>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}