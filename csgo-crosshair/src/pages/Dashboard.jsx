import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar.jsx';

export default function Practice() {
  const { t } = useTranslation();
  
  // 1. AQUÍ GUARDAMOS EL ESTADO DE LOS INTERRUPTORES
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

  // 2. ESTE EFECTO SE EJECUTA CADA VEZ QUE CAMBIAS UNA OPCIÓN
  useEffect(() => {
    let code = "// CS:GO Cloud Practice Script\nsv_cheats 1;\n";
    
    // Vamos agregando líneas según qué esté activado
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
  }, [options]); // <--- Escucha cambios en 'options'

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    alert("¡Script copiado! Pégalo en tu consola.");
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', color: '#1f2937' }}>
      <Navbar />
      <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <h2 style={{ fontSize: '2rem', margin: 0 }}>🛠️ Generador de Práctica</h2>
            <p style={{ color: '#6b7280' }}>Crea tu configuración perfecta para entrenar granadas.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            
            {/* PANEL IZQUIERDO: CHECKBOXES */}
            <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{borderBottom: '2px solid #eab308', paddingBottom: '10px', marginBottom: '20px'}}>Opciones</h3>
                
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                        <input type="checkbox" checked={options.infiniteAmmo} onChange={e => setOptions({...options, infiniteAmmo: e.target.checked})} />
                        Munición Infinita
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                        <input type="checkbox" checked={options.trajectory} onChange={e => setOptions({...options, trajectory: e.target.checked})} />
                        Trayectoria de Granadas
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                        <input type="checkbox" checked={options.showImpacts} onChange={e => setOptions({...options, showImpacts: e.target.checked})} />
                        Ver Impactos
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                        <input type="checkbox" checked={options.godMode} onChange={e => setOptions({...options, godMode: e.target.checked})} />
                        Modo Dios
                    </label>
                    <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                        <input type="checkbox" checked={options.buyAnywhere} onChange={e => setOptions({...options, buyAnywhere: e.target.checked})} />
                        Tienda Global
                    </label>
                    
                    <div style={{marginTop: '10px'}}>
                        <label style={{display: 'block', fontSize: '0.9em', marginBottom: '5px', fontWeight: 'bold'}}>Tecla para volar (Noclip):</label>
                        <input type="text" value={options.noclipKey} onChange={e => setOptions({...options, noclipKey: e.target.value})} style={{padding: '5px', width: '100px', border: '1px solid #ccc', borderRadius: '4px'}} />
                    </div>
                </div>
            </div>

            {/* PANEL DERECHO: CÓDIGO GENERADO */}
            <div style={{ background: '#1f2937', padding: '25px', borderRadius: '12px', color: 'white', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{color: '#eab308', marginBottom: '15px'}}>Resultado</h3>
                <textarea 
                    value={generatedCode}
                    readOnly
                    style={{ flex: 1, background: '#111827', color: '#4ade80', border: 'none', padding: '15px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.85rem', resize: 'none', minHeight: '200px' }}
                />
                <button onClick={handleCopy} style={{ marginTop: '20px', background: '#eab308', color: 'black', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    COPIAR CÓDIGO
                </button>
            </div>

        </div>
      </div>
    </div>
  );
}