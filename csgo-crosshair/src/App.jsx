import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { supabase } from './supabaseClient'; 


// Páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Gallery from './pages/Gallery'; 
import Practice from './pages/Practice';
import Binds from './pages/Binds';
import Autoexec from './pages/Autoexec';
import Sensitivity from './pages/Sensitivity';

// Componente de Ruta Protegida Inteligente
const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Verificamos sesión actual al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Escuchamos cambios (login/logout) en tiempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>Cargando...</div>;
  
  if (!session) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Login />} />
        
        {}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/editor" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
        <Route path="/editor/:id" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
        <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
        <Route path="/practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
        <Route path="/binds" element={<ProtectedRoute><Binds /></ProtectedRoute>} />
        <Route path="/autoexec" element={<ProtectedRoute><Autoexec /></ProtectedRoute>} />
        <Route path="/sensitivity" element={<ProtectedRoute><Sensitivity /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;