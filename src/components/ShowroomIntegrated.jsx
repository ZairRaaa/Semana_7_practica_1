import { useState, useMemo, useRef, useCallback } from 'react';
import { useSupercars } from '../hooks/useSupercars';
import { useGarage } from '../context/GarageContext';
import { useTheme } from '../context/ThemeContext';
import { Gauge, Zap, Flame, Shield, Heart, Search, Check, Info, Filter } from 'lucide-react';

export const ShowroomIntegrated = () => {
  const { theme } = useTheme();
  const { garage, toggleCarInGarage, isInGarage, driverName } = useGarage();
  const { data: cars, loading, error, refetch } = useSupercars(600);

  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [minHp, setMinHp] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCarModal, setActiveCarModal] = useState(null);

  // useRef para enfocar el buscador instantáneo
  const searchInputRef = useRef(null);

  // useMemo para filtrar el catálogo pesado de superautos
  const filteredCatalog = useMemo(() => {
    return cars.filter(car => {
      const matchBrand = selectedBrand === 'ALL' || car.brand.toUpperCase() === selectedBrand.toUpperCase();
      const matchHp = car.hp >= minHp;
      const matchQuery = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchHp && matchQuery;
    });
  }, [cars, selectedBrand, minHp, searchQuery]);

  // useCallback para la acción de selección
  const handleOpenSpecs = useCallback((car) => {
    setActiveCarModal(car);
  }, []);

  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const brands = ['ALL', 'Koenigsegg', 'Bugatti', 'Lamborghini', 'Ferrari', 'Porsche', 'McLaren'];

  return (
    <div style={{ padding: '1rem 0' }}>
      {/* Hero Showcase */}
      <div style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(15,23,42,0.95) 100%), url("https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3.5rem 2.5rem',
        marginBottom: '2.5rem',
        border: '1px solid var(--border-color)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
      }}>
        <div style={{ maxWidth: '750px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem' }}>
            <Flame size={14} /> FLOTA EXCLUSIVA DE HIPERDEPORTIVOS
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.15, marginBottom: '1rem', color: '#ffffff' }}>
            Potencia, Precisión e Ingeniería Extrema
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Explora las leyendas del asfalto: Koenigsegg, Bugatti, Lamborghini, Ferrari y Porsche. Una experiencia SPA impulsada por React Hooks nativos y optimizaciones en tiempo real.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleFocusSearch}>
              <Search size={16} /> Explorar Catálogo
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(0,0,0,0.6)', padding: '0.4rem 1rem', borderRadius: '10px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Gauge size={18} color="#38bdf8" />
              <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>Piloto en sesión: <strong>{driverName}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filtros y Búsqueda */}
      <div style={{
        background: 'var(--bg-card)',
        padding: '1.25rem',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Input con useRef */}
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar por marca, modelo o especificación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.4rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-main)',
                fontSize: '0.92rem'
              }}
            />
          </div>

          {/* Filtro de Potencia mínima con useMemo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Zap size={16} color="#ef4444" />
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>Mínimo HP:</span>
            <select
              value={minHp}
              onChange={(e) => setMinHp(Number(e.target.value))}
              style={{
                padding: '0.55rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-main)',
                fontSize: '0.88rem'
              }}
            >
              <option value={0}>Todos los HP</option>
              <option value={600}>≥ 600 HP</option>
              <option value={1000}>≥ 1,000 HP (Hypercars)</option>
              <option value={1500}>≥ 1,500 HP (Megacars)</option>
            </select>
          </div>
        </div>

        {/* Píldoras de marcas */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginRight: '0.3rem' }}>
            <Filter size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Marca:
          </span>
          {brands.map(brand => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`btn btn-sm ${selectedBrand === brand ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: '9999px', fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Autos */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div className="telemetry-value" style={{ fontSize: '2rem' }}>Cargando catálogo...</div>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Sincronizando telemetría de superautos con AbortController...</p>
        </div>
      ) : error ? (
        <div style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid #ef4444', padding: '1.5rem', borderRadius: '12px', color: '#fca5a5', textAlign: 'center' }}>
          <p>{error}</p>
          <button className="btn btn-outline-info" onClick={refetch} style={{ marginTop: '0.75rem' }}>Reintentar</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredCatalog.map(car => {
            const inGarage = isInGarage(car.id);
            return (
              <div
                key={car.id}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                {/* Imagen del auto */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                  <img
                    src={car.image}
                    alt={car.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(4px)',
                    color: '#fff',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    {car.brand}
                  </div>

                  <button
                    onClick={() => toggleCarInGarage(car)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: inGarage ? '#ef4444' : 'rgba(0,0,0,0.6)',
                      border: 'none',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title={inGarage ? "Remover de mi garaje" : "Guardar en mi garaje (useContext)"}
                  >
                    <Heart size={18} fill={inGarage ? "white" : "none"} />
                  </button>
                </div>

                {/* Contenido de la tarjeta */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                    {car.name}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', lineClamp: 2 }}>
                    {car.description}
                  </p>

                  {/* Fila de especificaciones */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Potencia</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ef4444' }}>{car.hp} HP</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>0-100 km/h</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#38bdf8' }}>{car.acceleration}s</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Vel. Máx</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10b981' }}>{car.topSpeed} km/h</div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-outline-info"
                      style={{ flex: 1, justifyContent: 'center' }}
                      onClick={() => handleOpenSpecs(car)}
                    >
                      <Info size={14} /> Ver Ficha
                    </button>
                    <button
                      className={`btn ${inGarage ? 'btn-danger' : 'btn-primary'}`}
                      style={{ flex: 1, justifyContent: 'center' }}
                      onClick={() => toggleCarInGarage(car)}
                    >
                      {inGarage ? 'En Garaje' : 'Al Garaje'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Especificaciones */}
      {activeCarModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            maxWidth: '550px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}>
            <img src={activeCarModal.image} alt={activeCarModal.name} style={{ width: '100%', height: '230px', objectFit: 'cover' }} />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#ef4444', fontWeight: 700, textTransform: 'uppercase' }}>{activeCarModal.category}</span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{activeCarModal.name}</h2>
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>{activeCarModal.price}</span>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.75rem 0 1.25rem 0' }}>
                {activeCarModal.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.65rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Motorización:</span>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{activeCarModal.engine}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.65rem', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Rendimiento:</span>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{activeCarModal.hp} HP @ {activeCarModal.topSpeed} km/h</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button className="btn btn-secondary" onClick={() => setActiveCarModal(null)}>Cerrar</button>
                <button 
                  className={`btn ${isInGarage(activeCarModal.id) ? 'btn-danger' : 'btn-primary'}`}
                  onClick={() => toggleCarInGarage(activeCarModal)}
                >
                  {isInGarage(activeCarModal.id) ? 'Remover del Garaje' : 'Guardar en mi Garaje'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
