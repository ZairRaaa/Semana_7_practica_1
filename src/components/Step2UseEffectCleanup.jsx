import { useState, useEffect } from 'react';
import { BookOpen, Play, CheckCircle2, CloudDownload, AlertCircle, RefreshCw, XCircle, ShieldCheck } from 'lucide-react';
import { SUPERCARS_DATA } from '../data/carsData';

export const Step2UseEffectCleanup = ({ isActive, onToggleActive }) => {
  const [showNarrative, setShowNarrative] = useState(false);
  const [dataStatus, setDataStatus] = useState('idle'); // idle | loading | success | error | cleaned
  const [carsList, setCarsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [triggerCount, setTriggerCount] = useState(0);
  const [forceError, setForceError] = useState(false);
  const [cleanupLogs, setCleanupLogs] = useState([]);

  useEffect(() => {
    // Si no está activo o está en idle inicial, no ejecutamos
    if (!isActive) return;

    const controller = new AbortController();
    const signal = controller.signal;

    setDataStatus('loading');
    setErrorMessage('');

    const fetchTimer = setTimeout(() => {
      if (signal.aborted) {
        return;
      }

      if (forceError) {
        setDataStatus('error');
        setErrorMessage('Error de red: La telemetría satelital del superdeportivo falló.');
      } else {
        setDataStatus('success');
        setCarsList(SUPERCARS_DATA.slice(0, 3));
      }
    }, 1200);

    // Función de limpieza de useEffect (Cleanup function)
    return () => {
      controller.abort();
      clearTimeout(fetchTimer);
      setCleanupLogs(prev => [
        `AbortController.abort() ejecutado a las ${new Date().toLocaleTimeString()}`,
        ...prev.slice(0, 2)
      ]);
      setDataStatus('cleaned');
    };
  }, [isActive, triggerCount, forceError]);

  const handleManualLoad = () => {
    setForceError(false);
    setTriggerCount(prev => prev + 1);
  };

  const handleSimulateSuccess = () => {
    setForceError(false);
    setTriggerCount(prev => prev + 1);
  };

  const handleSimulateError = () => {
    setForceError(true);
    setTriggerCount(prev => prev + 1);
  };

  const handleSimulateCleanup = () => {
    setDataStatus('cleaned');
    setCleanupLogs(prev => [
      `Limpieza manual forzada (AbortController disparado)`,
      ...prev.slice(0, 2)
    ]);
  };

  return (
    <div className={`step-card ${isActive ? 'active' : ''}`}>
      <div className="step-card-header">
        <div className="step-title-area">
          <div className="step-number-circle">2</div>
          <div>
            <h2 className="step-title-text">useEffect con async/await y Cleanup</h2>
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
            <Play size={14} /> {isActive ? 'Paso 2 Activo' : 'Activar Paso 2'}
          </button>
        </div>
      </div>

      <p className="step-description">
        Refactorizar fetch de API: migrar .then() a async/await dentro de useEffect, añadir array de dependencias y AbortController.
      </p>

      {/* Narrativa Explicativa */}
      {showNarrative && (
        <div className="narrative-box">
          <div className="narrative-title">
            <BookOpen size={18} /> ¿Por qué es vital el Cleanup en useEffect?
          </div>
          <div className="narrative-content">
            <p style={{ marginBottom: '0.6rem' }}>
              En una aplicación de autos deportivos donde recibimos telemetría en tiempo real, si el usuario cambia de pestaña mientras se descargan especificaciones del motor, la promesa sigue viva en memoria. Al resolverse sobre un componente desmontado se produce una fuga de memoria (<em>memory leak</em>) y condiciones de carrera (<em>race conditions</em>).
            </p>
            <p style={{ fontWeight: 600, marginTop: '0.5rem', marginBottom: '0.3rem' }}>
              ¿Por qué [ ] no significa "se ejecuta solo una vez"?
            </p>
            <p style={{ marginBottom: '0.6rem' }}>
              En <code>React.StrictMode</code> de desarrollo, React monta el componente, lo desmonta inmediatamente y lo vuelve a montar: <strong>Montar → Desmontar (Cleanup) → Montar</strong>. Esto garantiza que tu función de retorno (<code>return () =&gt; controller.abort()</code>) realmente limpie suscripciones e interrupciones de red.
            </p>
          </div>
          <div className="narrative-key-concept">
            <ShieldCheck size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Regla de oro:</strong> Nunca hagas la función del useEffect asíncrona directamente (<code>useEffect(async () =&gt; ...)</code> está prohibido). Define la función async dentro o utiliza promesas cancelables con AbortController.
            </div>
          </div>
        </div>
      )}

      {/* Componente Interactivo */}
      {isActive && (
        <div className="interactive-container">
          <div className="interactive-header">
            <CloudDownload size={18} color="#38bdf8" />
            <span>Carga de Telemetría de Autos con useEffect y AbortController</span>
          </div>

          <div className="controls-row">
            <button className="btn btn-outline-info" onClick={handleManualLoad}>
              <RefreshCw size={14} /> Cargar
            </button>
            <button className="btn btn-success" onClick={handleSimulateSuccess}>
              <CheckCircle2 size={14} /> Éxito
            </button>
            <button className="btn btn-danger" onClick={handleSimulateError}>
              <AlertCircle size={14} /> Error
            </button>
            <button className="btn btn-warning" onClick={handleSimulateCleanup}>
              <XCircle size={14} /> Cleanup
            </button>
          </div>

          {/* Yellow status box matching user screenshot */}
          <div className="yellow-summary-box" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.35rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
              <ShieldCheck size={16} /> Estado del Ciclo de Vida: {dataStatus.toUpperCase()}
            </div>
            <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>
              {dataStatus === 'loading' && '⚡ Transfiriendo paquetes de datos del vehículo...'}
              {dataStatus === 'success' && `✅ ${carsList.length} especificaciones de superautos recibidas correctamente.`}
              {dataStatus === 'error' && `❌ ${errorMessage}`}
              {dataStatus === 'cleaned' && '🧹 Cleanup ejecutado: AbortController canceló la petición y liberó memoria.'}
            </div>
          </div>

          <div className="checklist-group">
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>AbortController.abort() llamado al desmontar o re-ejecutar.</span>
            </div>
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Event listeners y temporizadores removidos del motor de render.</span>
            </div>
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>Memoria liberada y condiciones de carrera neutralizadas.</span>
            </div>
            <div className="checklist-item checked">
              <CheckCircle2 size={16} color="#10b981" />
              <span>La función <code>return () =&gt; controller.abort()</code> protege el ciclo de vida.</span>
            </div>
          </div>

          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <strong>Estado:</strong> {dataStatus} | <strong>Dependencias:</strong> [isActive, triggerCount, forceError]
          </div>
        </div>
      )}
    </div>
  );
};
