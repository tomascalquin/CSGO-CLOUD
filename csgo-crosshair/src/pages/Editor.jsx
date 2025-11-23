import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar.jsx';
import { saveCrosshair, getCrosshairById } from '../utils/storage';

export default function Editor() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // Para saber si estamos editando
  const [form, setForm] = useState({ nombre: '', mapa: '', codigo: '' });

  useEffect(() => {
    if (id) {
      const existing = getCrosshairById(id);
      if (existing) setForm(existing);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCrosshair(form, id);
    navigate('/dashboard');
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <h2>{id ? t('edit') : t('add_new')}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label>{t('name')}</label>
          <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
          
          <label>{t('map')}</label>
          <input value={form.mapa} onChange={e => setForm({...form, mapa: e.target.value})} required />

          <label>{t('code')}</label>
          <textarea rows="4" value={form.codigo} onChange={e => setForm({...form, codigo: e.target.value})} required />

          <button type="submit" style={{ background: '#eab308', padding: '10px', border: 'none', fontWeight: 'bold' }}>{t('save')}</button>
          <button type="button" onClick={() => navigate('/dashboard')}>{t('cancel')}</button>
        </form>
      </div>
    </div>
  );
}