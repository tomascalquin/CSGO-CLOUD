import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar.jsx';
import { games, CS2_YAW } from '../utils/sensitivityData';

export default function Sensitivity() {
  const { t } = useTranslation();
  
  // Estados
  const [dpi, setDpi] = useState(800);
  const [selectedGame, setSelectedGame] = useState(games[0].id); // Por defecto Valorant
  const [inputSens, setInputSens] = useState(0.5);

  // 1. Buscar el juego seleccionado
  const gameData = games.find(g => g.id === selectedGame);

  // 2. Calcular la sensibilidad convertida a CS2
  // Fórmula: (SensiJuego * YawJuego) / YawCS2
  const cs2Sens = ((inputSens * gameData.yaw) / CS2_YAW).toFixed(3);

  // 3. Calcular eDPI (en CS2) y cm/360
  const edpi = (dpi * parseFloat(cs2Sens)).toFixed(0);
  const cm360 = ((360 / (parseFloat(cs2Sens) * CS2_YAW)) / dpi * 2.54).toFixed(1);

  return (
    <div className="min-h-screen bg-cs-dark text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-2">🖱️ {t('sens_title')}</h2>
            <p className="text-cs-muted text-lg">{t('sens_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* PANEL DE ENTRADA (Origen) */}
            <div className="bg-cs-card border border-cs-border rounded-2xl p-8 shadow-lg h-fit">
                <h3 className="text-xl font-bold text-cs-yellow mb-6 border-b border-white/10 pb-2 flex items-center gap-2">
                    <span>🎮</span> {t('input_game_title')}
                </h3>

                <div className="space-y-6">
                    {/* Selector de Juego */}
                    <div>
                        <label className="block text-sm font-bold text-cs-muted mb-2">{t('select_game')}</label>
                        <select 
                            value={selectedGame}
                            onChange={e => setSelectedGame(e.target.value)}
                            className="w-full bg-cs-dark border border-cs-border rounded-lg px-4 py-3 text-white focus:border-cs-yellow focus:outline-none text-lg"
                        >
                            {games.map(g => (
                                <option key={g.id} value={g.id}>{g.icon} {g.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sensibilidad en ese juego */}
                    <div>
                        <label className="block text-sm font-bold text-cs-muted mb-2">
                            {t('game_sens')} ({gameData.name})
                        </label>
                        <input 
                            type="number" 
                            step="0.001"
                            value={inputSens} 
                            onChange={e => setInputSens(e.target.value)}
                            className="w-full bg-cs-dark border border-cs-border rounded-lg px-4 py-3 text-white focus:border-cs-yellow focus:outline-none text-lg font-mono"
                        />
                    </div>

                    {/* DPI */}
                    <div>
                        <label className="block text-sm font-bold text-cs-muted mb-2">DPI (Mouse)</label>
                        <input 
                            type="number" 
                            value={dpi} 
                            onChange={e => setDpi(Number(e.target.value))}
                            className="w-full bg-cs-dark border border-cs-border rounded-lg px-4 py-3 text-white focus:border-cs-yellow focus:outline-none text-lg font-mono"
                        />
                    </div>
                </div>
            </div>

            {/* PANEL DE RESULTADOS (Destino CS2) */}
            <div className="space-y-6">
                
                {/* RESULTADO PRINCIPAL: CS2 SENS */}
                <div className="bg-gradient-to-br from-cs-yellow/20 to-cs-dark border-2 border-cs-yellow rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(234,179,8,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-cs-yellow"></div>
                    <h4 className="text-cs-yellow font-black uppercase tracking-widest text-sm mb-2">
                        {t('converted_sens')} (CS2)
                    </h4>
                    <span className="text-6xl font-black text-white tracking-tighter">{cs2Sens}</span>
                    <p className="text-sm text-cs-muted mt-2">Copia esto en tu consola</p>
                </div>

                {/* TARJETAS SECUNDARIAS */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-cs-card border border-cs-border rounded-xl p-5 text-center">
                        <h4 className="text-cs-muted text-xs font-bold uppercase mb-1">eDPI (CS2)</h4>
                        <span className="text-2xl font-black text-white">{edpi}</span>
                    </div>
                    <div className="bg-cs-card border border-cs-border rounded-xl p-5 text-center">
                        <h4 className="text-cs-muted text-xs font-bold uppercase mb-1">cm/360°</h4>
                        <span className="text-2xl font-black text-white">{cm360} <span className="text-sm font-normal text-cs-muted">cm</span></span>
                    </div>
                </div>

                <div className="bg-black/20 rounded-lg p-4 text-sm text-cs-muted border border-white/5">
                    <p>💡 <strong>Tip:</strong> {t('sens_tip')}</p>
                </div>

            </div>

        </div>
      </div>
    </div>
  );
}