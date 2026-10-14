import { useState, useEffect, useCallback } from 'react';
import { SUPERCARS_DATA } from '../data/carsData';

// IA: Replicar fetch manual en varios componentes → Solución manual: Custom hook useSupercars encapsulando AbortController y estado
export const useSupercars = (simulatedLatency = 800, shouldFail = false) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = useCallback(() => {
    setRefetchTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    // Reglas de Hooks: Creamos la instancia del AbortController dentro del efecto
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      if (signal.aborted) {
        return;
      }

      if (shouldFail) {
        setError("Error 500: Fallo de telemetría al conectar con la ECU central.");
        setLoading(false);
      } else {
        setData(SUPERCARS_DATA);
        setLoading(false);
      }
    }, simulatedLatency);

    // Función de limpieza para cancelar peticiones pendientes si el componente se desmonta o cambia
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [simulatedLatency, shouldFail, refetchTrigger]);

  return { data, loading, error, refetch };
};
