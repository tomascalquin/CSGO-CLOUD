import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import Navbar from '../components/Navbar.jsx';
import { weaponCategories } from '../utils/weapons';

export default function Binds() {
  const { t } = useTranslation();
  
  // Estado: Tecla elegida y lista de armas seleccionadas
  const [key, setKey] = useState('f1');
  const [selectedWeapons, setSelectedWeapons] = useState([]);
  const [generatedCode, setGeneratedCode] = useState('');

  // Toggle de selección (si ya está, lo quita; si no, lo agrega)
  const toggleWeapon = (id) => {
    if (selectedWeapons.includes(id)) {
      setSelectedWeapons(selectedWeapons.filter(item => item !== id));
    } else {
      setSelectedWeapons([...selectedWeapons, id]);
    }
  };

  // Generar código en tiempo real
  useEffect(() => {
    if (selectedWeapons.length === 0) {
      setGeneratedCode('');
      return;
    }
    // Crea string tipo: "buy ak47; buy flashbang; buy vesthelm;"
    const buyString = selectedWeapons.map(w => `buy ${w}`).join('; ');
    setGeneratedCode(`bind "${key}" "${buyString};"`);
  }, [key, selectedWeapons]);

  const handleCopy = () => {
    if (!generatedCode) return toast.error(t('select_something'));
    navigator.clipboard.writeText(generatedCode);
    toast.success(t('bind_copied'));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#111827', color: 'white' }}>
      <Navbar />
      <div style={{ padding: '30px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', color: '#eab308' }}>⌨️ {t('binds_title')}</h2>
            <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>{t('binds_subtitle')}</p>
        </div>

        {/* CONTROLES SUPERIORES */}
        <div style={{ background: '#1f2937', padding: '20px', borderRadius: '12px', marginBottom: '30px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            
            <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#eab308', fontWeight: 'bold' }}>{t('key_label')}</label>
                <input 
                    type="text" 
                    value={key} 
                    onChange={e => setKey(e.target.value)} 
                    placeholder="Ej: f1, kp_enter, p"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #374151', background: '#111827', color: 'white', fontSize: '1.1rem' }}
                />
            </div>

            <div style={{ flex: 2, display: 'flex', gap: '10px' }}>
                <input 
                    readOnly 
                    value={generatedCode} 
                    placeholder={t('code_placeholder')}
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #374151', background: '#374151', color: '#4ade80', fontFamily: 'monospace' }}
                />
                <button 
                    onClick={handleCopy}
                    style={{ background: '#eab308', color: 'black', border: 'none', padding: '0 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    {t('copy_button')}
                </button>
            </div>
        </div>

        {/* GRILLA DE ARMAS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {weaponCategories.map(cat => (
                <div key={cat.id} style={{ background: '#1f2937', padding: '15px', borderRadius: '12px', border: '1px solid #374151' }}>
                    <h3 style={{ textTransform: 'capitalize', borderBottom: '1px solid #374151', paddingBottom: '10px', marginBottom: '15px', color: '#9ca3af' }}>
                        {t(cat.label)}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {cat.items.map(item => {
                            const isSelected = selectedWeapons.includes(item.id);
                            return (
                                <button 
                                    key={item.id}
                                    onClick={() => toggleWeapon(item.id)}
                                    style={{
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: isSelected ? '1px solid #eab308' : '1px solid transparent',
                                        background: isSelected ? 'rgba(234, 179, 8, 0.1)' : '#111827',
                                        color: isSelected ? '#eab308' : 'white',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: '0.2s',
                                        fontWeight: isSelected ? 'bold' : 'normal'
                                    }}
                                >
                                    {isSelected ? '✅ ' : ''}{item.name}
                                </button>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}