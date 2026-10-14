import { useState } from 'react';
import { BookOpen, Play, CheckCircle2, Sliders, RefreshCw, AlertTriangle, Database } from 'lucide-react';
import { useSupercars } from '../hooks/useSupercars';

export const Step5CustomHook = ({ isActive, onToggleActive }) => {
  const [showNarrative, setShowNarrative] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  
  // Consumimos el Hook Personalizado creado según las Reglas de Hooks
  const { data, loading, error, refetch } = useSupercars(900, simulateError);

  return (
    <div className={`step-card ${isActive ? 'active' : ''}`}>
      <div className="step-card-header">
        <div className="step-title-area">
          <div className="step-number-circle">5</div>
          <div>
            <h2 className="step-title-text">Hook Personalizado: useSupercars</h2>
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
            <Play size={14} /> {isActive ? 'Paso 5 Activo' : 'Activar Paso 5'}
          </button>
        </div>
      </div>

      <p className="step-description">
        Extraer lógica repetitiva en Hook Personalizado (useSupercars/useFetch). Validar reglas de Hooks y testear reutilización.
      </p>

      {/* Narrativa Explicativa */}
      {showNarrative && (
        <div className="narrative-box">
          <div className="narrative-title">
            <BookOpen size={18} /> Composición sobre herencia: El poder de los Custom Hooks
          </div>
          <div className="narrative-content">
            <p style={{ marginBottom: '0.6rem' }}>
              Un <strong>Hook Personalizado</strong> es simplemente una función JavaScript cuyo nombre empieza por <code>use</code> y que puede invocar a otros hooks como <code>useState</code>, <code>useEffect</code> o <code>useCallback</code>. Permite compartir lógica con estado sin alterar la jerarquía de componentes.
            </p>
            <p style={{ fontWeight: 600, marginTop: '0.5rem', marginBottom: '0.3rem' }}>
              Reglas infranqueables de los Hooks:
            </p>
            <ol style={{ paddingLeft: '1.25rem', marginBottom: '0.6rem' }}>
              <li><strong>Solo llamar en el nivel superior:</strong> Prohibido llamar hooks dentro de bucles (<code>for/while</code>), condiciones (<code>if/else</code>) o funciones anidadas.</li>
              <li><strong>Solo llamar desde funciones de React:</strong> Llámalo solo desde componentes funcionales o desde otros custom hooks.</li>
            </ol>
          </div>
          <div className="narrative-key-concept">
            <Sliders size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Patrón implementado:</strong> Nuestro hook <code>useSupercars</code> encapsula el estado <code>data</code>, <code>loading</code>, <code>error</code>, la cancelación con <code>AbortController</code> y una función <code>refetch</code> memoizada para que cualquier vista consuma la flota de vehículos en una sola línea.
            </div>
          </div>
        </div>
      )}

      {/* Componente Interactivo */}
      {isActive && (
        <div className="interactive-container">
          <div className="interactive-header">
            <Database size={18} color="#38bdf8" />
            <span>Consumo en Vivo del Hook <code>useSupercars()</code></span>
          </div>

          <div className="controls-row">
            <button className="btn btn-outline-info" onClick={refetch} disabled={loading}>
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> {loading ? 'Cargando...' : 'Re-ejecutar Hook (refetch)'}
            </button>
            <button 
              className={`btn ${simulateError ? 'btn-danger' : 'btn-secondary'}`}
              onClick={() => {
                setSimulateError(!simulateError);
                refetch();
              }}
            >
              <AlertTriangle size={14} /> {simulateError ? 'Modo Error Activo' : 'Simular Error en Hook'}
            </button>
          </div>

          <div className="yellow-summary-box">
            <span>
              {loading && '⏳ Estado: loading = true (Petición en curso con AbortController activo)...'}
              {!loading && !error && `🏁 Estado: Éxito | ${data.length} hiperautos disponibles en memoria.`}
              {!loading && error && `⚠️ Estado: Fallo capturado por el hook.`}
            </span>
          </div>

          {error && (
            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
              {error}
            </div>
          )}

          <div className="checklist-group">
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Hook nombrado con convención <code>useSupercars</code> respetando las Reglas de Hooks.</span>
            </div>
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Retorna objeto reactivo estándar: <code>{`{ data, loading, error, refetch }`}</code>.</span>
            </div>
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Reutilizable en cualquier parte de la aplicación sin duplicar código de ciclo de vida.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
