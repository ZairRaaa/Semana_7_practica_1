import { useState, useRef, useEffect } from 'react';
import { BookOpen, Play, CheckCircle2, RotateCcw, Plus, Minus, Zap } from 'lucide-react';

export const Step1RenderCycle = ({ isActive, onToggleActive }) => {
  const [showNarrative, setShowNarrative] = useState(false);
  const [speed, setSpeed] = useState(0); // km/h
  const [lastAction, setLastAction] = useState('inicio');
  
  // Usamos useRef para contabilizar los re-renders sin disparar re-renders adicionales
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
  });

  const handleAccelerate = () => {
    setSpeed(prev => prev + 25);
    setLastAction('acelerar (+25 km/h)');
  };

  const handleBrake = () => {
    setSpeed(prev => Math.max(0, prev - 25));
    setLastAction('frenar (-25 km/h)');
  };

  const handleReset = () => {
    setSpeed(0);
    setLastAction('reset');
  };

  return (
    <div className={`step-card ${isActive ? 'active' : ''}`}>
      <div className="step-card-header">
        <div className="step-title-area">
          <div className="step-number-circle">1</div>
          <div>
            <h2 className="step-title-text">Ciclo de Render y Re-renders</h2>
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
            <Play size={14} /> {isActive ? 'Paso 1 Activo' : 'Activar Paso 1'}
          </button>
        </div>
      </div>

      <p className="step-description">
        Identificar qué dispara re-renders con useState vs props. Configurar StrictMode y Profiler.
      </p>

      {/* Narrativa Explicativa */}
      {showNarrative && (
        <div className="narrative-box">
          <div className="narrative-title">
            <BookOpen size={18} /> ¿Qué estamos haciendo y por qué?
          </div>
          <div className="narrative-content">
            <p style={{ marginBottom: '0.6rem' }}>
              Imagina que React es un telemetrista de competición muy eficiente. 🏎️ Cada vez que cambia un dato crítico en tu superauto (como la velocidad o los RPM), React "repinta" la sección del panel de instrumentos. Esto se llama <strong>re-render</strong>.
            </p>
            <p style={{ fontWeight: 600, marginTop: '0.5rem', marginBottom: '0.3rem' }}>
              ¿Qué dispara un re-render? Dos factores principales:
            </p>
            <ol style={{ paddingLeft: '1.25rem', marginBottom: '0.75rem' }}>
              <li><strong>Cuando cambia el estado (useState):</strong> como al presionar el acelerador o frenar.</li>
              <li><strong>Cuando cambian las props recibidas:</strong> como si el box del equipo envía nuevas órdenes a la ECU del auto.</li>
            </ol>
            <p>
              <strong>StrictMode:</strong> Es como un banco de pruebas de fábrica. En modo desarrollo ejecuta los componentes dos veces intencionalmente para detectar efectos secundarios impuros antes de salir a la pista.
            </p>
          </div>
          <div className="narrative-key-concept">
            <Zap size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Concepto clave:</strong> No todos los re-renders son malos; son el mecanismo natural de actualización de React. El problema surge cuando componentes pesados se re-renderizan sin haber cambiado sus datos.
            </div>
          </div>
        </div>
      )}

      {/* Componente Interactivo cuando el paso está activo */}
      {isActive && (
        <div className="interactive-container">
          <div className="interactive-header">
            <Zap size={18} color="#38bdf8" />
            <span>Telemetría de Velocidad con useState</span>
          </div>

          <div className="telemetry-display">
            <div className="telemetry-value">{speed}</div>
            <div className="telemetry-label">km/h en pista</div>
          </div>

          <div className="controls-row">
            <button className="btn btn-danger" onClick={handleBrake}>
              <Minus size={16} /> Frenar
            </button>
            <button className="btn btn-success" onClick={handleAccelerate}>
              <Plus size={16} /> Acelerar
            </button>
            <button className="btn btn-warning" onClick={handleReset}>
              <RotateCcw size={16} /> Reset
            </button>
          </div>

          <div className="yellow-summary-box">
            <span>📊 Re-renders detectados: {renderCount.current}</span>
            <span>Última acción: {lastAction}</span>
          </div>

          <div className="checklist-group">
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Cada vez que alteras el estado (setSpeed), React recalcula y ejecuta un re-render.</span>
            </div>
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>React.StrictMode efectúa un doble montaje inicial en desarrollo para detectar fugas.</span>
            </div>
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>React DevTools Profiler cuantifica con precisión milimétrica la duración del renderizado.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
