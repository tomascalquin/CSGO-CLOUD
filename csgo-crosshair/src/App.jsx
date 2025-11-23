import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Gallery from './pages/Gallery'; 
import Practice from './pages/Practice'; // <--- IMPORTANTE: Importamos la página nueva

// Componente que protege las rutas (si no estás logueado, te saca)
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('csgo_current_user');
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Pública: Login */}
        <Route path="/" element={<Login />} />

        {/* Rutas Privadas (Solo con sesión iniciada) */}
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/editor" 
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/editor/:id" 
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/gallery" 
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          } 
        />

        {/* NUEVA RUTA: Práctica */}
        <Route 
          path="/practice" 
          element={
            <ProtectedRoute>
              <Practice />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;