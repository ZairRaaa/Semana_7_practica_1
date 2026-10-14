import { createContext, useContext, useState } from 'react';

// IA: Manejo de autos favoritos y sesión sin acoplamiento → Solución manual: GarageContext
export const GarageContext = createContext();

export const GarageProvider = ({ children }) => {
  const [garage, setGarage] = useState([
    { id: 1, name: "Koenigsegg Jesko Absolut", hp: 1600, brand: "Koenigsegg" }
  ]);
  const [driverName, setDriverName] = useState("Piloto Demo");

  const toggleCarInGarage = (car) => {
    setGarage(prev => {
      const exists = prev.some(item => item.id === car.id);
      if (exists) {
        return prev.filter(item => item.id !== car.id);
      } else {
        return [...prev, car];
      }
    });
  };

  const isInGarage = (carId) => {
    return garage.some(c => c.id === carId);
  };

  return (
    <GarageContext.Provider value={{ garage, driverName, setDriverName, toggleCarInGarage, isInGarage }}>
      {children}
    </GarageContext.Provider>
  );
};

export const useGarage = () => {
  const context = useContext(GarageContext);
  if (!context) {
    throw new Error('useGarage debe ser usado dentro de un GarageProvider');
  }
  return context;
};
