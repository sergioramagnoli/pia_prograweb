# Cómo correr la app
Prerequisito: tener Node y Docker instalados.
1. Clonar el repositorio
2. En la carpeta raíz correr `npm install`
3. Correr `cd ./server && npm install`
4. Correr `npm run create && npm run dev`. Esto pondrá a correr el servidor, y la terminal donde esté corriendo se deberá dejar abierta.
5. Correr `npm run migrate && npm run seed`
6. En otra terminal, volver a la carpeta raíz y correr `npm run dev`. Esto pondrá a correr el front-end.
7. Si todo lo anterior salió bien, se podrá acceder a la app localmente aquí: `http://127.0.0.1:5173/`
