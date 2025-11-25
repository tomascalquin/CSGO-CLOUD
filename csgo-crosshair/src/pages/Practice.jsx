import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import Navbar from '../components/Navbar.jsx';

export default function Practice() {
  const { t } = useTranslation();
  

  const [options, setOptions] = useState({
    infiniteAmmo: true,
    showImpacts: true,
    trajectory: true,
    godMode: true,
    kickBots: true,
    buyAnywhere: true,
    noclipKey: 'alt'
  });

  const [generatedCode, setGeneratedCode] = useState("");


  useEffect(() => {
    let code = "// CS:GO Cloud Practice Script\nsv_cheats 1;\n";
    
    if (options.kickBots) code += "bot_kick;\n";
    if (options.infiniteAmmo) code += "sv_infinite_ammo 1;\n";
    if (options.showImpacts) code += "sv_showimpacts 1;\n";
    if (options.trajectory) code += "sv_grenade_trajectory_prac_pipreview 1;\n"; 
    if (options.godMode) code += "god;\n";
    if (options.buyAnywhere) code += "mp_buy_anywhere 1; mp_maxmoney 60000; mp_startmoney 60000;\n";
    
    code += "mp_roundtime_defuse 60; mp_freezetime 0; mp_restartgame 1;\n";
    code += `bind "${options.noclipKey}" "noclip";\n`;
    code += 'echo "--- PRACTICE CONFIG LOADED ---";';

    setGeneratedCode(code);
  }, [options]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success(t('script_copied'));
  };

  return (
    <div className="min-h-screen bg-cs-dark text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        
        {/* Título */}
        <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-2">🛠️ {t('practice_title')}</h2>
            <p className="text-cs-muted text-lg">{t('practice_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            
            <div className="bg-cs-card border border-cs-border rounded-2xl p-8 shadow-lg h-fit">
                <h3 className="text-xl font-bold text-cs-yellow mb-6 border-b border-white/10 pb-2">
                    {t('options_title')}
                </h3>
                
                <div className="space-y-4">
                    
                    {[
                        { key: 'infiniteAmmo', label: 'infinite_ammo' },
                        { key: 'trajectory', label: 'grenade_trajectory' },
                        { key: 'showImpacts', label: 'show_impacts' },
                        { key: 'godMode', label: 'god_mode' },
                        { key: 'buyAnywhere', label: 'buy_anywhere' }
                    ].map((opt) => (
                        <label key={opt.key} className="flex items-center gap-3 cursor-pointer group hover:bg-white/5 p-2 rounded-lg transition-colors">
                            <input 
                                type="checkbox" 
                                checked={options[opt.key]} 
                                onChange={e => setOptions({...options, [opt.key]: e.target.checked})} 
                                className="w-5 h-5 rounded text-cs-yellow bg-cs-dark border-cs-border focus:ring-cs-yellow accent-cs-yellow cursor-pointer"
                            />
                            <span className="text-white font-medium group-hover:text-cs-yellow transition-colors">
                                {t(opt.label)}
                            </span>
                        </label>
                    ))}
                    
                   
                    <div className="pt-4 border-t border-white/10 mt-4">
                        <label className="block text-sm font-bold text-cs-muted mb-2 uppercase tracking-wider">
                            {t('noclip_key')}
                        </label>
                        <input 
                            type="text" 
                            value={options.noclipKey} 
                            onChange={e => setOptions({...options, noclipKey: e.target.value})} 
                            className="w-full bg-cs-dark border border-cs-border rounded-lg px-4 py-3 text-white focus:border-cs-yellow focus:outline-none font-mono text-center font-bold"
                        />
                    </div>
                </div>
            </div>

           
            <div className="lg:col-span-2 bg-cs-card border border-cs-border rounded-2xl p-8 shadow-lg flex flex-col">
                <h3 className="text-xl font-bold text-cs-yellow mb-4">
                    {t('result_title')}
                </h3>
                
                <div className="relative flex-1">
                    <textarea 
                        value={generatedCode}
                        readOnly
                        className="w-full h-full min-h-[300px] bg-black/40 text-green-400 p-6 rounded-xl border border-white/5 font-mono text-sm resize-none focus:outline-none focus:border-cs-yellow/30 transition-colors"
                    />
                </div>

                <button 
                    onClick={handleCopy} 
                    className="mt-6 w-full bg-cs-yellow text-black font-bold py-4 rounded-xl hover:bg-cs-yellowHover transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:scale-[1.02]"
                >
                    <span>📋</span> {t('copy_script')}
                </button>
            </div>

        </div>
      </div>
    </div>
  );
}