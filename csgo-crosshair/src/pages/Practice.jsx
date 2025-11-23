import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar.jsx';
import { getCrosshairs, deleteCrosshair } from '../utils/storage'; 

export default function Dashboard() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  // Cargar datos al iniciar
  useEffect(() => {
    setItems(getCrosshairs());
  }, []);

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de querer borrar esta mira?")) {
      deleteCrosshair(id);
      setItems(getCrosshairs()); // Recargar lista visualmente
    }
  };

  // Función para Copiar al Portapapeles
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("¡Código copiado al portapapeles!");
  };

  // Lógica del Filtro (Busca en nombre O mapa)
  const filteredItems = items.filter(item => 
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mapa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
      <Navbar />
      <div style={{ padding: '30px 20px', maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Barra superior con Título y Botón Crear */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '2rem', color: '#1f2937' }}>{t('dashboard_title')}</h2>
            <p style={{ margin: '5px 0 0 0', color: '#6b7280' }}>Gestiona tu colección personal</p>
          </div>
          
          <Link to="/editor" style={{ 
              background: '#eab308', 
              color: 'black', 
              padding: '12px 25px', 
              textDecoration: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(234, 179, 8, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
          }}>
            <span>+</span> {t('add_new')}
          </Link>
        </div>

        {/* INPUT DEL BUSCADOR */}
        <div style={{ marginBottom: '25px' }}>
            <input 
                type="text" 
                placeholder="🔍 Buscar en mis miras..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                    width: '100%', 
                    padding: '15px 20px', 
                    borderRadius: '12px', 
                    border: '1px solid #e5e7eb', 
                    fontSize: '16px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    outline: 'none'
                }}
            />
        </div>

        {/* Lista de Items Filtrados */}
        {filteredItems.length === 0 ? (
          <div style={{textAlign: 'center', padding: '50px', background: 'white', borderRadius: '12px', border: '2px dashed #e5e7eb'}}>
            <p style={{color: '#9ca3af', fontSize: '1.1rem'}}>No se encontraron miras.</p>
            <Link to="/editor" style={{color: '#eab308', fontWeight: 'bold', textDecoration: 'none'}}>¡Crea la primera!</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {filteredItems.map(item => (
              <div key={item.id} style={{ border: '1px solid #e5e7eb', padding: '25px', borderRadius: '16px', background: 'white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                
                {/* Encabezado de la Tarjeta */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px'}}>
                    <div>
                      <h3 style={{margin: '0 0 8px 0', color: '#111827', fontSize: '1.25rem'}}>{item.nombre}</h3>
                      <span style={{background: '#f3f4f6', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85em', color: '#4b5563', fontWeight: '500'}}>
                          🗺️ {item.mapa}
                      </span>
                    </div>
                    <div style={{display: 'flex', gap: '8px'}}>
                        <Link to={`/editor/${item.id}`}>
                            <button style={{cursor: 'pointer', padding: '8px 12px', background: '#f3f4f6', border: 'none', borderRadius: '6px', transition: '0.2s'}}>✏️</button>
                        </Link>
                        <button onClick={() => handleDelete(item.id)} style={{cursor: 'pointer', padding: '8px 12px', background: '#fee2e2', border: 'none', borderRadius: '6px', color: '#ef4444'}}>🗑️</button>
                    </div>
                </div>

                {/* Área de Código y Copiar */}
                <div style={{ display: 'flex', alignItems: 'center', background: '#111827', padding: '12px', borderRadius: '8px', gap: '15px', border: '1px solid #374151' }}>
                    <code style={{ color: '#4ade80', flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                      {item.codigo}
                    </code>
                    <button onClick={() => handleCopy(item.codigo)} style={{background: '#eab308', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', color: 'black', fontSize: '0.85rem'}}>
                      COPIAR
                    </button>
                </div>
                
                {/* Área QR */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px', borderTop: '1px solid #f3f4f6', paddingTop: '20px' }}>
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(item.codigo)}`} 
                      alt="QR" 
                      style={{border: '1px solid #e5e7eb', padding: '5px', borderRadius: '8px'}}
                    />
                    <div>
                      <strong style={{display: 'block', fontSize: '1rem', color: '#374151', marginBottom: '4px'}}>Versión Móvil</strong>
                      <span style={{fontSize: '0.9em', color: '#6b7280'}}>Escanea para llevar esta configuración a tu celular.</span>
                    </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}