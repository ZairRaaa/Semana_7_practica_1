UNIVERSIDAD NACIONAL DEL CENTRO DEL PERÚ
FACULTAD DE INGENIERÍA DE SISTEMAS
DEPARTAMENTO ACADÉMICO DE INGENIERÍA DE SISTEMAS
PROGRAMA DE INGENIERÍA DE SISTEMAS
GUÍA PRÁCTICA SEMANA 07
Asignatura: Desarrollo de Aplicaciones Web (IS093A)
Unidad I: Desarrollo Web Frontend
Tema: React Hooks: useState, useEffect, useContext, useRef, useReducer,
useCallback, useMemo y Hooks Personalizados
Modalidad: Presencial / Laboratorio
Fecha: 14.10.2026
Duración: 90 minutos
APELLIDOS Y NOMBRES: ______________________________________________
OBJETIVO DE LA PRÁCTICA
Dominar el ciclo de renderizado de React mediante el uso estratégico de Hooks
nativos, aplicar useEffect para efectos secundarios y limpieza, gestionar estado
global con useContext, optimizar rendimiento con useMemo/useCallback, manejar
referencias inmutables con useRef, refactorizar lógica compleja con useReducer, y
encapsular comportamientos reutilizables en Hooks Personalizados. Validar el
flujo de re-renders con React DevTools Profiler.
RECURSOS REQUERIDOS
• Node.js LTS (≥20.x) + npm/pnpm
• Visual Studio Code (Extensiones: ES7+ React Snippets, React Developer
Tools, ESLint, Error Lens)
• Proyecto base Vite + React (heredado de Semana 06 o scaffold nuevo)
• Navegador moderno + React DevTools (pestaña Profiler y Components)
• Documentación oficial: react.dev/reference/react
• Conexión a internet
PARTE 1: EJERCICIO PASO A PASO
Paso Actividad Concepto Clave
Restricción/Nota
Técnica
1
Revisar ciclo de render:
identificar qué dispara re-render
en useState vs props. Configurar
React.StrictMode y Profiler
Render cycle, batch
updates, doubleinvoke in dev
No usar
console.log para
medir
rendimiento. Usar
Profiler
UNIVERSIDAD NACIONAL DEL CENTRO DEL PERÚ
FACULTAD DE INGENIERÍA DE SISTEMAS
DEPARTAMENTO ACADÉMICO DE INGENIERÍA DE SISTEMAS
PROGRAMA DE INGENIERÍA DE SISTEMAS
Paso Actividad Concepto Clave
Restricción/Nota
Técnica
2
Refactorizar fetch de API: migrar
.then() a async/await dentro de
useEffect, añadir array de
dependencias y función de
limpieza (AbortController)
Side effects,
dependency array,
cleanup, memory
leaks
Explicar por qué [ ]
≠ "se ejecuta una
vez" en StrictMode
3
Implementar useContext para
tema global o estado de sesión.
Crear Provider y consumirlo sin
prop drilling
Context API, Provider
pattern,
performance impact
Evitar contextos
gigantes. Separar
por dominio
(ThemeContext,
AuthContext)
4
Optimizar render: envolver filtros
pesados en useMemo,
estabilizar callbacks en
useCallback, usar useRef para
DOM/input focus sin re-render
Referential equality,
memoization, DOM
refs, avoid overoptimization
Documentar
métricas: Why Did
You Render? o
Profiler commits
5
Extraer lógica repetitiva en Hook
Personalizado (useFetch o
useForm). Validar reglas de
Hooks y testear reutilización
Composition over
inheritance, Hook
rules, encapsulation
Prohibido llamar
Hooks dentro de
loops, condiciones
o funciones
anidadas
USO DE HERRAMIENTAS DE IA (Recomendado para optimizar el ejercicio)
Herramienta Uso Permitido Prompt Ejemplo Uso Prohibido
ChatGPT/Claude/Copilot Explicar
dependency array
pitfalls, refactorizar
a useReducer,
depurar
useCallback
"¿Por qué mi
useEffect se
ejecuta en loop
infinito al pasar un
objeto como
dependencia?"
"Genera la app
completa con
todos los hooks
y
optimizaciones"
React DevTools Profiler Medir render
commits,
identificar
(Extensión oficial) Usar Profiler
solo para "ver si
funciona", sin
UNIVERSIDAD NACIONAL DEL CENTRO DEL PERÚ
FACULTAD DE INGENIERÍA DE SISTEMAS
DEPARTAMENTO ACADÉMICO DE INGENIERÍA DE SISTEMAS
PROGRAMA DE INGENIERÍA DE SISTEMAS
Herramienta Uso Permitido Prompt Ejemplo Uso Prohibido
componentes que
se renderizan
innecesariamente,
comparar
before/after memo
analizar
métricas
ESLint eslint-pluginreact-hooks
Validar reglas de
Hooks, detectar
dependencias
faltantes, advertir
sobre antipatrones
(Automático) Desactivar
reglas de lint sin
justificación
técnica
documentada
Regla de laboratorio: El 80% de la implementación de hooks debe escribirse
manualmente. Cada intervención de IA para resolver ciclos de render o
dependencias debe llevar // IA: [problema] → Solución manual: [explicación]
Evidencias del Ejercicio Desarrollado:
• Añada capturas de pantalla de cada paso realizado en Visual Studio Code.
• Añada capturas de la Página web funcional tipo SPA (Single Page
Application)implementada de manera local
• Proporcione el enlace de Github de su proyecto
Adicional: crear una video corto explicando los 5 pasos del ejercicio subirlo a
Google drive y compartir con el correo miguelaguilaruncpfis@gmail.com para su
revisión posterior.