import { useState } from 'react';
import { BookOpen, Play, CheckCircle2, Layers, Sun, Moon, Plus, Trash2, User, Car } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useGarage } from '../context/GarageContext';
import { SUPERCARS_DATA } from '../data/carsData';

export const Step3UseContext = ({ isActive, onToggleActive }) => {
  const [showNarrative, setShowNarrative] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { garage, driverName, setDriverName, toggleCarInGarage, isInGarage } = useGarage();
  const [tempName, setTempName] = useState(driverName);

  return (
    <div className={`step-card ${isActive ? 'active' : ''}`}>
      <div className="step-card-header">
        <div className="step-title-area">
          <div className="step-number-circle">3</div>
          <div>
            <h2 className="step-title-text">useContext: Estado Global</h2>
          </div>
        </div>

        <div className="step-header-actions">
          <button 
            className="btn btn-outline-info btn-sm"
            onClick={() => setShowNarrative(!showNarrative)}
          >
            <BookOpen size={14} /> Narrativa
          </button>
          
          <button 
            className={`btn btn-sm ${isActive ? 'btn-active-state' : 'btn-primary'}`}
            onClick={onToggleActive}
          >
            <Play size={14} /> {isActive ? 'Paso 3 Activo' : 'Activar Paso 3'}
          </button>
        </div>
      </div>

      <p className="step-description">
        Implementar useContext para tema global y garaje de superautos. Crear Provider y consumirlo sin prop drilling.
      </p>

      {/* Narrativa Explicativa */}
      {showNarrative && (
        <div className="narrative-box">
          <div className="narrative-title">
            <BookOpen size={18} /> ¿Cómo solucionar el Prop Drilling con Context API?
          </div>
          <div className="narrative-content">
            <p style={{ marginBottom: '0.6rem' }}>
              En una aplicación compleja, pasar props desde la raíz a través de 5 niveles de componentes intermedios que no necesitan esos datos se llama <em>prop drilling</em>. Esto ensucia el código y dificulta el mantenimiento.
            </p>
            <p style={{ fontWeight: 600, marginTop: '0.5rem', marginBottom: '0.3rem' }}>
              La regla de oro: Separar contextos por dominio
            </p>
            <p style={{ marginBottom: '0.6rem' }}>
              Nunca crees un solo <code>GlobalContext</code> gigante con todo el estado de la app. Cada vez que cambie una propiedad insignificante, todos los componentes suscritos se re-renderizarán. En nuestro proyecto dividimos en:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.6rem' }}>
              <li><strong>ThemeContext:</strong> Controla el modo visual (Modo Pista Nocturna vs Showroom Diurno).</li>
              <li><strong>GarageContext:</strong> Controla el garaje privado del piloto y favoritos.</li>
            </ul>
          </div>
          <div className="narrative-key-concept">
            <Layers size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Concepto clave:</strong> El patrón Provider permite que cualquier componente hijo, sin importar su profundidad en el árbol DOM, consuma y actualice el estado directamente usando hooks dedicados como <code>useTheme()</code> y <code>useGarage()</code>.
            </div>
          </div>
        </div>
      )}

      {/* Componente Interactivo */}
      {isActive && (
        <div className="interactive-container">
          <div className="interactive-header">
            <Layers size={18} color="#38bdf8" />
            <span>Gestión de Estado Compartido (ThemeContext + GarageContext)</span>
          </div>

          {/* Fila 1: Cambio de tema visual */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tema Visual Actual: </span>
              <strong style={{ color: theme === 'dark' ? '#38bdf8' : '#f59e0b' }}>
                {theme === 'dark' ? 'Modo Pista Nocturna (Dark)' : 'Modo Showroom Diurno (Light)'}
              </strong>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />} Alternar Tema
            </button>
          </div>

          {/* Fila 2: Piloto de prueba */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
            <User size={18} color="#94a3b8" />
            <input 
              type="text" 
              value={tempName} 
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Nombre del piloto..."
              style={{ flex: 1, padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', fontSize: '0.88rem' }}
            />
            <button className="btn btn-primary btn-sm" onClick={() => setDriverName(tempName)}>
              Actualizar Piloto
            </button>
          </div>

          {/* Fila 3: Selección de autos en Garaje */}
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Añadir/Remover superdeportivos al Garaje Privado de {driverName}:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem', marginTop: '0.5rem' }}>
              {SUPERCARS_DATA.slice(0, 4).map(car => {
                const inGarage = isInGarage(car.id);
                return (
                  <button
                    key={car.id}
                    onClick={() => toggleCarInGarage(car)}
                    className={`btn btn-sm ${inGarage ? 'btn-danger' : 'btn-outline-info'}`}
                    style={{ justifyContent: 'space-between', width: '100%' }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {car.name}
                    </span>
                    {inGarage ? <Trash2 size={12} /> : <Plus size={12} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="yellow-summary-box">
            <span>🏎️ Autos en el Garaje Global: {garage.length}</span>
            <span>Piloto actual: {driverName}</span>
          </div>

          <div className="checklist-group">
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>ThemeContext y GarageContext estructurados por dominio independiente.</span>
            </div>
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Cero prop drilling: comunicación horizontal instantánea en el árbol de componentes.</span>
            </div>
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Encapsulado seguro con custom hooks <code>useTheme()</code> y <code>useGarage()</code>.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
