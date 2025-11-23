import React from 'react';

export default function CrosshairPreview({ config }) {
  const { size, gap, thickness, color, dot, outline, alpha } = config;

  // Estilo base para las líneas de la mira
  const lineStyle = {
    position: 'absolute',
    background: `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`,
    boxShadow: outline ? '0 0 0 1px black' : 'none',
  };

  // El contenedor simula el centro de la pantalla
  const containerStyle = {
    width: '100%',
    height: '400px',
    background: 'url("https://cdn.akamai.steamstatic.com/apps/csgo/images/inferno/new_inferno.jpg") center/cover no-repeat', // Imagen de fondo (Inferno)
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    border: '2px solid #4b5563',
    overflow: 'hidden'
  };

  return (
    <div style={containerStyle}>
      {/* Píxel central (Dot) */}
      {dot && (
        <div style={{
          ...lineStyle,
          width: `${thickness}px`,
          height: `${thickness}px`,
          zIndex: 10
        }} />
      )}

      {/* Línea Superior */}
      <div style={{
        ...lineStyle,
        width: `${thickness}px`,
        height: `${size * 10}px`,
        transform: `translateY(-${(size * 5) + (gap * 2)}px)`
      }} />

      {/* Línea Inferior */}
      <div style={{
        ...lineStyle,
        width: `${thickness}px`,
        height: `${size * 10}px`,
        transform: `translateY(${(size * 5) + (gap * 2)}px)`
      }} />

      {/* Línea Izquierda */}
      <div style={{
        ...lineStyle,
        width: `${size * 10}px`,
        height: `${thickness}px`,
        transform: `translateX(-${(size * 5) + (gap * 2)}px)`
      }} />

      {/* Línea Derecha */}
      <div style={{
        ...lineStyle,
        width: `${size * 10}px`,
        height: `${thickness}px`,
        transform: `translateX(${(size * 5) + (gap * 2)}px)`
      }} />
    </div>
  );
}