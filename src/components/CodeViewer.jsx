import { useState } from 'react';
import { Code, Copy, Check, Terminal } from 'lucide-react';

const STEP_CODES = {
  1: `// Paso 1: Ciclo de Render y useState
import { useState, useRef, useEffect } from 'react';

// IA: Re-render infinito al medir renderCount en state → Solución manual: Uso de useRef inmutable
function SpeedTelemetry() {
  const [speed, setSpeed] = useState(0); // km/h
  const renderCount = useRef(1);

  // let normalVar = 0 (No causa re-render en React)

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div>
      <h3>{speed} km/h</h3>
      <button onClick={() => setSpeed(s => s + 25)}>Acelerar</button>
      <button onClick={() => setSpeed(s => Math.max(0, s - 25))}>Frenar</button>
      <p>Re-renders detectados: {renderCount.current}</p>
    </div>
  );
}

// React.StrictMode simula 2x ejecuciones en dev para detectar impurezas
// <React.StrictMode> <App /> </React.StrictMode>`,

  2: `// Paso 2: useEffect con async/await y Cleanup
import { useState, useEffect } from 'react';

// IA: Función asíncrona directa en useEffect causa advertencias → Solución manual: Async interna con AbortController
function CarsDataFetcher() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Instanciar controlador para evitar Memory Leaks y Race Conditions
    const controller = new AbortController();
    const signal = controller.signal;

    async function loadTelemetry() {
      try {
        setLoading(true);
        const res = await fetch('/api/supercars', { signal });
        const data = await res.json();
        setCars(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Fallo de red:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    loadTelemetry();

    // 2. Función Cleanup ejecutada al desmontar o re-renderizar
    return () => {
      controller.abort();
    };
  }, []); // [] bajo StrictMode corre montaje -> desmontaje -> montaje

  return <div>{loading ? "Cargando..." : cars.length + " autos listos"}</div>;
}`,

  3: `// Paso 3: useContext para Estado Global sin Prop Drilling
import { createContext, useContext, useState } from 'react';

// IA: Contexto global monolítico causa re-renders masivos → Solución manual: Contextos separados por dominio
export const ThemeContext = createContext();
export const GarageContext = createContext();

export function AppProviders({ children }) {
  const [theme, setTheme] = useState('dark');
  const [garage, setGarage] = useState([]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const addCar = (car) => setGarage(g => [...g, car]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <GarageContext.Provider value={{ garage, addCar }}>
        {children}
      </GarageContext.Provider>
    </ThemeContext.Provider>
  );
}

// Consumo directo en cualquier nivel sin prop drilling:
export const useTheme = () => useContext(ThemeContext);
export const useGarage = () => useContext(GarageContext);`,

  4: `// Paso 4: Optimización con useMemo, useCallback y useRef
import { useState, useMemo, useCallback, useRef } from 'react';

// IA: Cálculos de filtrado se recalculan en cada tecla ajena → Solución manual: useMemo y useCallback
function OptimizedCatalog({ allCars }) {
  const [minHp, setMinHp] = useState(800);
  const [search, setSearch] = useState('');
  const searchInputRef = useRef(null);

  // 1. useRef: Foco al input del DOM sin causar re-render
  const focusInput = () => searchInputRef.current?.focus();

  // 2. useMemo: Memoriza el resultado del filtrado pesado
  const filteredCars = useMemo(() => {
    return allCars.filter(c => c.hp >= minHp && c.name.toLowerCase().includes(search.toLowerCase()));
  }, [allCars, minHp, search]);

  // 3. useCallback: Estabiliza la referencia de función
  const handleSelect = useCallback((car) => {
    console.log("Auto seleccionado:", car.name);
  }, []);

  return (
    <div>
      <input ref={searchInputRef} value={search} onChange={e => setSearch(e.target.value)} />
      <button onClick={focusInput}>Foco</button>
      <CarList cars={filteredCars} onSelect={handleSelect} />
    </div>
  );
}`,

  5: `// Paso 5: Hook Personalizado (Custom Hook)
import { useState, useEffect, useCallback } from 'react';

// IA: Lógica de fetch repetida en varias vistas → Solución manual: Custom Hook useSupercars
export function useSupercars(latency = 500) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0);

  const refetch = useCallback(() => setVersion(v => v + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch('/api/supercars', { signal: controller.signal })
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(err => { if (err.name !== 'AbortError') { setError(err); setLoading(false); } });

    // Regla de Hooks: Cleanup garantizado
    return () => controller.abort();
  }, [latency, version]);

  return { data, loading, error, refetch };
}`
};

export const CodeViewer = ({ activeSteps }) => {
  const [copied, setCopied] = useState(false);

  const activeCount = Object.values(activeSteps).filter(Boolean).length;

  const getCombinedCode = () => {
    return Object.keys(activeSteps)
      .filter(step => activeSteps[step])
      .map(step => STEP_CODES[step])
      .join('\n\n' + '='.repeat(60) + '\n\n');
  };

  const handleCopy = () => {
    const code = getCombinedCode();
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <aside className="code-column">
      <div className="code-header">
        <div className="code-header-title">
          <Terminal size={18} />
          <span>Código JSX en Vivo</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {activeCount > 0 && (
            <button
              onClick={handleCopy}
              className="btn btn-outline-info btn-sm"
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
              title="Copiar código al portapapeles"
            >
              {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          )}

          <span className={`code-badge ${activeCount === 0 ? 'empty' : ''}`}>
            {activeCount === 0 ? 'Ninguno' : `${activeCount} activo(s)`}
          </span>
        </div>
      </div>

      <div className="code-scroll-area">
        {activeCount === 0 ? (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem' }}>
            <Code size={36} style={{ margin: '0 auto 1rem auto', opacity: 0.4, display: 'block' }} />
            <p>Activa un paso en la izquierda para ver su código JSX y Hook aquí en vivo...</p>
          </div>
        ) : (
          Object.keys(activeSteps).map(step => {
            if (!activeSteps[step]) return null;
            return (
              <div key={step} className="code-block-item">
                <span className="code-tag">PASO {step}</span>
                <pre className="code-pre">{STEP_CODES[step]}</pre>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
