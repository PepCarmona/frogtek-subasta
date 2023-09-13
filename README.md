## App Subasta Frogtek

En este proyecto he ejecutado el ejercicio de entrevista que me entregó Borja a día 7 de Septiembre de 2023.
El proyecto está escrito en Vue3 utilizando la CompositionAPI. Está compuesto por una vista principal `Main.vue` que ejerce de pantalla única, sobre la que se desarrolla toda la interfaz dividida en componentes más pequeños. La mayoría de componentes cuentan con tests unitarios usando Vue Test Utils.

La mayor parte de la lógica específica de negocio se encuentra distribuida en tres stores que continen tanto el estado como las acciones necesarias para interactuar con esa lógica, también testeadas unitariamente.

---

### Instrucciones

- El proyecto puede verse en funcionamiento en este [deploy en Netlify](https://master--glowing-llama-36b683.netlify.app/)
- Para que la aplicación pueda acceder al API del tiempo meteorológico en local es necesario añadir la API key de OpenWeatherAPI que me proporcionasteis a un archivo `.env` en la raíz del proyecto con la key `VITE_WEATHER_API` siguiendo el formato `VITE_WEATHER_API=xxxxxxxxxxxxxxxxxxxxx`.
- Para ejecutar la aplicación es necesario instalar las dependencias con `npm i` o `yarn`. Posteriormente basta con correr `npm run dev` o `yarn dev`,lo que arrancará la aplicación en un servidor local en el puerto 5173 por defecto.
- Para correr los tests unitarios se debe ejecutar el comando `npm run test:unit`, que correrá la suite de tests unitarios en la terminal.
