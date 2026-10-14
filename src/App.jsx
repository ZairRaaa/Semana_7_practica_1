import { useState } from 'react';
import { Header } from './components/Header';
import { Step1RenderCycle } from './components/Step1RenderCycle';
import { Step2UseEffectCleanup } from './components/Step2UseEffectCleanup';
import { Step3UseContext } from './components/Step3UseContext';
import { Step4Optimization } from './components/Step4Optimization';
import { Step5CustomHook } from './components/Step5CustomHook';
import { ShowroomIntegrated } from './components/ShowroomIntegrated';
import { CodeViewer } from './components/CodeViewer';
import { ThemeProvider } from './context/ThemeContext';
import { GarageProvider } from './context/GarageContext';
import { CheckCheck, XCircle, Car, Sparkles } from 'lucide-react';

function AppContent() {
  const [activeSteps, setActiveSteps] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false
  });

  const [showShowroom, setShowShowroom] = useState(false);

  const toggleStep = (stepNumber) => {
    setActiveSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const handleActivateAll = () => {
    setActiveSteps({ 1: true, 2: true, 3: true, 4: true, 5: true });
  };

  const handleDeactivateAll = () => {
    setActiveSteps({ 1: false, 2: false, 3: false, 4: false, 5: false });
  };

  return (
    <div className="app-container">
      <Header 
        onToggleShowroom={() => setShowShowroom(!showShowroom)} 
        showShowroom={showShowroom} 
      />

      <main className="main-layout">
        {/* Columna Izquierda: Pasos de la práctica o Showroom Web Integrado */}
        <section className="steps-column">
          {showShowroom ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 700 }}>
                  <Sparkles size={20} />
                  <span>MODO WEB COMPLETA: Showroom de Superautos (Todos los Hooks Integrados)</span>
                </div>
                <button className="btn btn-outline-info btn-sm" onClick={() => setShowShowroom(false)}>
                  Volver a vista de Laboratorio
                </button>
              </div>
              <ShowroomIntegrated />
            </div>
          ) : (
            <>
              <Step1RenderCycle 
                isActive={activeSteps[1]} 
                onToggleActive={() => toggleStep(1)} 
              />

              <Step2UseEffectCleanup 
                isActive={activeSteps[2]} 
                onToggleActive={() => toggleStep(2)} 
              />

              <Step3UseContext 
                isActive={activeSteps[3]} 
                onToggleActive={() => toggleStep(3)} 
              />

              <Step4Optimization 
                isActive={activeSteps[4]} 
                onToggleActive={() => toggleStep(4)} 
              />

              <Step5CustomHook 
                isActive={activeSteps[5]} 
                onToggleActive={() => toggleStep(5)} 
              />

              {/* Botón Integrador al final de los pasos (tal como en la imagen del profesor) */}
              <div style={{
                marginTop: '1rem',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)',
                padding: '1.25rem 1.75rem',
                borderRadius: '16px',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                    Showroom de Autos Deportivos (Todos los Hooks Integrados)
                  </h3>
                  <p style={{ color: '#93c5fd', fontSize: '0.88rem', marginTop: '0.2rem' }}>
                    Visualiza la aplicación final con el catálogo de Koenigsegg, Ferrari, Bugatti y Porsche.
                  </p>
                </div>
                <button 
                  className="showroom-banner-btn"
                  onClick={() => setShowShowroom(true)}
                >
                  <Car size={18} /> Abrir Showroom Web
                </button>
              </div>
            </>
          )}
        </section>

        {/* Columna Derecha: Código JSX en Vivo */}
        <CodeViewer activeSteps={activeSteps} />
      </main>

      {/* Barra Flotante Inferior de Control Rápido */}
      {!showShowroom && (
        <aside className="bottom-bar">
          <button className="btn btn-success btn-sm" onClick={handleActivateAll}>
            <CheckCheck size={14} /> Activar Todos
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleDeactivateAll}>
            <XCircle size={14} /> Desactivar Todos
          </button>
        </aside>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GarageProvider>
        <AppContent />
      </GarageProvider>
    </ThemeProvider>
  );
}
