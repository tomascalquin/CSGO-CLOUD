export const configCategories = [
  {
    id: 'performance',
    title: 'performance_title',
    items: [
      { id: 'fps_max', cmd: 'fps_max', type: 'number', label: 'fps_max_label', min: 0, max: 999, default: 400 },
      { id: 'rate', cmd: 'rate', type: 'select', label: 'rate_label', options: [
          { value: '196608', label: 'Mala Conexión' },
          { value: '786432', label: 'Buena Conexión (Max)' }
      ], default: '786432' }
    ]
  },
  {
    id: 'audio',
    title: 'audio_title',
    items: [
      { id: 'volume', cmd: 'volume', type: 'range', label: 'master_volume', min: 0, max: 1, step: 0.05, default: 0.6 },
      { id: 'snd_voipvolume', cmd: 'snd_voipvolume', type: 'range', label: 'voice_volume', min: 0, max: 1, step: 0.05, default: 0.5 },
      { id: 'snd_deathcamera_volume', cmd: 'snd_deathcamera_volume', type: 'range', label: 'death_volume', min: 0, max: 1, step: 0.05, default: 0 }
    ]
  },
  {
    id: 'radar',
    title: 'radar_title',
    items: [
      { id: 'cl_radar_scale', cmd: 'cl_radar_scale', type: 'range', label: 'radar_scale', min: 0.25, max: 1, step: 0.05, default: 0.7 },
      { id: 'cl_radar_always_centered', cmd: 'cl_radar_always_centered', type: 'checkbox', label: 'radar_center', default: true },
      { id: 'cl_hud_radar_scale', cmd: 'cl_hud_radar_scale', type: 'range', label: 'hud_scale', min: 0.8, max: 1.3, step: 0.05, default: 1 }
    ]
  },
  {
    id: 'viewmodel',
    title: 'viewmodel_title',
    items: [
      { id: 'viewmodel_fov', cmd: 'viewmodel_fov', type: 'range', label: 'fov', min: 54, max: 68, step: 1, default: 60 },
      { id: 'viewmodel_offset_x', cmd: 'viewmodel_offset_x', type: 'range', label: 'offset_x', min: -2, max: 2.5, step: 0.5, default: 1 },
      { id: 'viewmodel_offset_y', cmd: 'viewmodel_offset_y', type: 'range', label: 'offset_y', min: -2, max: 2, step: 0.5, default: 1 },
      { id: 'viewmodel_offset_z', cmd: 'viewmodel_offset_z', type: 'range', label: 'offset_z', min: -2, max: 2, step: 0.5, default: -1 }
    ]
  }
];