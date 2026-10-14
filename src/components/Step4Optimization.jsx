import { useState, useMemo, useCallback, useRef } from 'react';
import { BookOpen, Play, CheckCircle2, Cpu, Search, Zap, Gauge } from 'lucide-react';
import { SUPERCARS_DATA } from '../data/carsData';

export const Step4Optimization = ({ isActive, onToggleActive }) => {
  const [showNarrative, setShowNarrative] = useState(false);
  const [minHp, setMinHp] = useState(800);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [counterUnrelated, setCounterUnrelated] = useState(0);

  // useRef para enfocar el campo de búsqueda sin disparar re-render
  const searchInputRef = useRef(null);

  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.style.borderColor = '#ef4444';
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.style.borderColor = 'var(--border-color)';
        }
      }, 1000);
    }
  };

  // useMemo: Filtro pesado de telemetría y especificaciones de superdeportivos
  const filteredCars = useMemo(() => {
    // Simulamos un cálculo iterativo intensivo
    let iterations = 0;
    for (let i = 0; i < 200000; i++) {
      iterations++;
    }

    return SUPERCARS_DATA.filter(car => {
      const matchesHp = car.hp >= minHp;
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            car.brand.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesHp && matchesSearch;
    });
  }, [minHp, searchTerm]);

  // useCallback: Estabilizamos la referencia de la función para evitar re-render de componentes hijos
  const handleSelectCar = useCallback((car) => {
    setSelectedCar(car);
  }, []);

  return (
    <div className={`step-card ${isActive ? 'active' : ''}`}>
      <div className="step-card-header">
        <div className="step-title-area">
          <div className="step-number-circle">4</div>
          <div>
            <h2 className="step-title-text">Optimización: useMemo, useCallback, useRef</h2>
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
            <Play size={14} /> {isActive ? 'Paso 4 Activo' : 'Activar Paso 4'}
          </button>
        </div>
      </div>

      <p className="step-description">
        Optimizar render: envolver filtros pesados en useMemo, estabilizar callbacks en useCallback, usar useRef para DOM/input focus sin re-render.
      </p>

      {/* Narrativa Explicativa */}
      {showNarrative && (
        <div className="narrative-box">
          <div className="narrative-title">
            <BookOpen size={18} /> ¿Cuándo usar y cuándo NO usar optimizaciones?
          </div>
          <div className="narrative-content">
            <p style={{ marginBottom: '0.6rem' }}>
              En React, la sobre-optimización prematura agrega complejidad y consumo de memoria. Usamos cada hook para su propósito exacto:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.6rem' }}>
              <li><strong>useMemo:</strong> Recuerda el <em>resultado</em> de un cálculo costoso (ej. procesar telemetría de 1,000 vehículos o filtros matemáticos complejos). Solo se recalcula si cambian sus dependencias.</li>
              <li><strong>useCallback:</strong> Recuerda la <em>definición de la función</em> para mantener igualdad referencial (<code>===</code>) entre renders y evitar que componentes memorizados se re-pinten.</li>
              <li><strong>useRef:</strong> Mantiene una referencia mutable que persiste en todo el ciclo de vida sin disparar jamás un re-render, ideal para acceso directo al DOM (foco de inputs) o temporizadores.</li>
            </ul>
          </div>
          <div className="narrative-key-concept">
            <Cpu size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Regla de oro:</strong> Si una operación tarda menos de 1-2ms, useMemo es innecesario. Úsalo cuando filtras colecciones grandes o realizas transformaciones de datos exigentes.
            </div>
          </div>
        </div>
      )}

      {/* Componente Interactivo */}
      {isActive && (
        <div className="interactive-container">
          <div className="interactive-header">
            <Cpu size={18} color="#38bdf8" />
            <span>Banco de Pruebas de Rendimiento y Memoización</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '220px', display: 'flex', gap: '0.5rem' }}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar por marca o modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', fontSize: '0.88rem' }}
              />
              <button className="btn btn-outline-info btn-sm" onClick={handleFocusSearch} title="Enfocar con useRef">
                <Search size={14} /> Foco useRef
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Min Potencia:</span>
              <select
                value={minHp}
                onChange={(e) => setMinHp(Number(e.target.value))}
                style={{ padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', fontSize: '0.88rem' }}
              >
                <option value={500}>≥ 500 HP</option>
                <option value={800}>≥ 800 HP</option>
                <option value={1000}>≥ 1000 HP</option>
                <option value={1500}>≥ 1500 HP</option>
              </select>
            </div>

            {/* Botón que causa re-render en el padre pero NO recalcula el useMemo */}
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={() => setCounterUnrelated(c => c + 1)}
              title="Disparar re-render ajeno al filtro para demostrar useMemo"
            >
              Re-render Padre ({counterUnrelated})
            </button>
          </div>

          {/* Lista filtrada optimizada con useMemo */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            {filteredCars.map(car => (
              <div 
                key={car.id} 
                onClick={() => handleSelectCar(car)}
                style={{ 
                  padding: '0.75rem', 
                  borderRadius: '8px', 
                  background: selectedCar?.id === car.id ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0,0,0,0.2)', 
                  border: selectedCar?.id === car.id ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{car.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  <span>{car.hp} HP</span>
                  <span>{car.topSpeed} km/h</span>
                </div>
              </div>
            ))}
          </div>

          <div className="yellow-summary-box">
            <span>⚡ useMemo memorizó {filteredCars.length} autos que superan los {minHp} HP</span>
            <span>Seleccionado: {selectedCar ? selectedCar.name : 'Ninguno'}</span>
          </div>

          <div className="checklist-group">
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>useMemo previene el reprocesamiento iterativo cuando cambia el estado ajeno (contador: {counterUnrelated}).</span>
            </div>
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>useCallback estabiliza la referencia de <code>handleSelectCar</code> para componentes memoizados.</span>
            </div>
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>useRef realiza el foco del buscador en el DOM directamente sin provocar re-renders del componente.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
