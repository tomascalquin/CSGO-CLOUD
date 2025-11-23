import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { proPlayers } from '../utils/presets'; // Importamos la lista
import { saveCrosshair } from '../utils/storage'; // Para guardar en tu perfil

export default function Gallery() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAddToMyProfile = (player) => {
    // Guardamos una copia en TU localStorage
    saveCrosshair({
      nombre: `${player.nombre} (Config)`,
      mapa: player.mapa,
      codigo: player.codigo
    });
    // Te llevamos al dashboard para que veas que se guardó
    alert(`¡La mira de ${player.nombre} se agregó a tu perfil!`);
    navigate('/dashboard');
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>🏆 Pro Players Gallery</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Escanea el QR directamente o guarda la configuración en tu perfil.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {proPlayers.map(player => (
            <div key={player.id} style={{ border: '1px solid #eab308', borderRadius: '10px', overflow: 'hidden', background: '#1e1e1e', color: 'white' }}>
              
              {/* Header de la Tarjeta */}
              <div style={{ background: '#eab308', padding: '10px', color: 'black', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                <span>{player.nombre}</span>
                <span style={{ fontSize: '0.8em', opacity: 0.8 }}>{player.equipo}</span>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                
                {/* EL QR GIGANTE (Lo que pediste) */}
                <div style={{ background: 'white', padding: '10px', borderRadius: '5px' }}>
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(player.codigo)}`} 
                        alt={`QR ${player.nombre}`} 
                    />
                </div>
                
                <div style={{textAlign: 'center'}}>
                    <p style={{fontSize: '0.9em', margin: '5px 0', color: '#ccc'}}>Mapa favorito: {player.mapa}</p>
                    <code style={{display: 'block', fontSize: '0.7em', color: '#eab308', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {player.codigo}
                    </code>
                </div>

                {/* Botón de Acción */}
                <button 
                    onClick={() => handleAddToMyProfile(player)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        background: 'transparent',
                        border: '1px solid #eab308',
                        color: '#eab308',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: '0.3s'
                    }}
                    onMouseOver={(e) => {e.target.style.background = '#eab308'; e.target.style.color = 'black'}}
                    onMouseOut={(e) => {e.target.style.background = 'transparent'; e.target.style.color = '#eab308'}}
                >
                    💾 Guardar en Mis Miras
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}