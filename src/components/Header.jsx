import { Gauge, Moon, Sun, Layers, Car } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useGarage } from '../context/GarageContext';

export const Header = ({ onToggleShowroom, showShowroom }) => {
  const { theme, toggleTheme } = useTheme();
  const { garage } = useGarage();

  return (
    <header className="app-header">
      <div className="header-top">
        <div>
          <span className="brand-badge">
            <Gauge size={14} /> Laboratorio de Alto Rendimiento
          </span>
          <div className="header-title-row">
            <div className="header-logo-icon">
              <Car size={26} />
            </div>
            <div>
              <h1 className="header-title">Apex Supercars - React Hooks</h1>
              <p className="header-subtitle">
                Domina el ciclo de renderizado, optimizaciones y gestión de estado: {' '}
                <span className="header-hooks-list">
                  useState, useEffect, useContext, useRef, useReducer, useCallback, useMemo y Hooks Personalizados
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <button 
            className="btn btn-outline-info" 
            onClick={onToggleShowroom}
            title="Alternar entre vista de Laboratorio y Showroom Web"
          >
            <Layers size={16} /> {showShowroom ? "Ver Pasos del Lab" : "Ver Showroom Web"}
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={toggleTheme}
            title="Cambiar tema de la aplicación con useContext"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? "Modo Día" : "Modo Pista"}
          </button>

          <span className="brand-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', borderColor: 'rgba(56, 189, 248, 0.3)', color: '#38bdf8' }}>
            Garaje: {garage.length} {garage.length === 1 ? 'auto' : 'autos'}
          </span>
        </div>
      </div>
    </header>
  );
};
