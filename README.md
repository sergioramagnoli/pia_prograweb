# Sobre la aplicación

Se trata de una aplicación muy simple de notas. Permite a un usuario crear, editar, eliminar y actualizar notas.

# Cómo correrla

## Prerequisitos

1. Tener [Node.js](https://nodejs.org/es/ 'Node.js') instalado
2. Tener [Docker](https://www.docker.com/ 'Docker') instalado

## Pasos a seguir

1. Clonar el [repositorio](https://github.com/sergioramagnoli/pia_prograweb 'pia_pograweb - GitHub').
2. Abrir una terminal en la carpeta donde se clonó y correr `npm install`. Esto instalará las dependencias necesarias para el front-end.
3. Correr `cd server` y luego `npm run install`. Esto instalará las dependencias necesarias para el back-end.
4. Correr `npm run create`. Esto crea un contendor de Docker, en donde estará corriendo la base de datos de Postgres.
5. Correr `npm run dev`. Esto pondrá a correr nuestra base de datos localmente, en el puerto 3000. Y la terminal donde está corriendo deberá dejarse abierta.
6. Abrir una nueva terminal en carpeta server y correr `npm run migrate`. Esto crea las tablas y relaciones necesarias para que la base de datos funcione correctamente.
7. Por último, correr `cd ..` para volver a la carpeta raíz, y `npm run dev`, para exponer el front-end.

Si todo lo anterior salió bien, se podrá acceder a la app localmente en el puerto 5137.

# Cómo funciona

## Estructura

Nuestra aplicación tiene la siguiente estructura:

```
|-- public/
|---- icons/
|------ ...
|-- server/
|---- migrations/
|------ ...
|---- models/
|------ ...
|---- routes/
|------- notesRouter.js
|---- seeds/
|------- ...
|---- index.cjs
|---- knexfile.js
|---- setup.js
|---- ...
|-- src/
|---- assets/
|------- types.ts
|---- notePage/
|------ EditorMenu.tsx
|------ Message.tsx
|------ NoNoteMenu.tsx
|------ NoteGrid.tsx
|------ NotesProvider.tsx
|---- apiCalls.ts
|---- App.tsx
|---- Header.tsx
|---- index.css
|---- main.tsx
|-- index.html
|-- ...
```

## Qué hace cada archivo
A continuación explicaré a detalle para qué sirve cada uno de estos archivos.

Comencemos con el directorio `public`. Dentro de él hay una única carpeta: `icons`. En esta se guardan svgs de íconos que se usan en el front-end de nuestra aplicación.

Luego entramos a la carpeta `server`. Dentro de esta, encontramos todo lo relevante para el back-end. Siguiendo el orden establecido arriba, comenzamos con el directorio `migrations`, los archivos que contiene esta carpeta se encargan de crear o tirar las tablas necesarias, aquí se define la estructura de las mismas, y también sirve como un registro de todos los cambios que se hacen en las tablas a lo largo de tiempo.

Luego vamos con la carpeta `models`. Aquí se crean modelos de nuestras entidades. En nuestro caso, tenemos una entidad de nota (`note.js`) y otra de usuario (`user.js`). En estos mismos documentos establecemos la relaciones que nuestras entidades puedan tener entre sí. Por ejemplo, en nuestro caso, cada nota tiene una relación con un usuario, porque cada nota debe pertenecer a un usuario.

La siguiente carpeta es la `routes`. Como su nombre lo indica, aquí se definen las rutas que se deberán seguir cuando se quiera obtener algo del back-end. Dado a que este un proyecto pequeño, con solo una entidad relevante, aquí solo tenemos un archivo (`notesRouter`), donde se definen las rutas relevantes a mi entidad de notas. Se sigue la convención RESTFul, de manera que si obtener todas mis notas enviaré una petición GET a `/notes`, pero si quiero obtener una sola nota, la enviaré a `notes/:id`, siendo `:id` el id de la nota que busco.

Luego tenemos la carpeta `seeds`, los archivos que contiene en realidad no son relevantes para el usuario, pero son muy útiles a la hora de desarrollar. Lo que te permiten es insertar datos predefinidos a tu base de datos, de esta manera, puedes tener un montón de datos con los que hacer pruebas y demás.

Después está `index.cjs`, pero me lo saltaré y me iré a `knexfile.js`, donde especifico a un ORM llamado Objection, que a su vez está construido sobre un constructor de consultas SQL llamado Knex, cosas como las credenciales de mi servidor de Postgres y demás:

```js
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "notesapp",
      user: "postgres",
      password: "mysecretpassword",
    },
    // ...
  },
};
```

Esta información la toma Objection en `setup.js` y después me permite hacer consultas como la siguiente:

```js
const notes = await Note.query().orderBy("updated_at", "desc");
```

Ahora bien, volvemos a `index.cjs`, qie quise dejar al último porque aquí es donde se inicializa todo. El el centro de nuestro back-end. Se hacen tres cosas esenciales:

1. Se manda a configurar Objection
2. Se inicializa una app de Express
3. Se le pasan las rutas especificadas en `routes/notesRouter.js`
4. Se le asigna el puerto el que se va a exponer

Es cuando corremos este archivo con `node index.cjs`, que nuestra base de datos es utilizable.

Habiendo explicado los contenidos de nuestra carpeta `server`, pasamos a `src`, donde está la mayoría de los archivos relevantes al front-end, si bien también hay varios directamente en la carpeta raíz del proyecto.

Primero tenemos una carpeta `assets`, donde tenemos un único archivo (`type.ts`), donde definimos algunos tipos, ya que la mayoría del proyecto de front-end está escrito con TypeScript.

Después de `assets` está `notesPage`, aquí hay varios archivos `.tsx`, la extensión que usa React (el framework que usé) para sus archivos que es TypeScript XML (también se pueden usar archivos `.jsx`, pero por motivos de preferencia usé `.tsx`). Vamos a notar que en varios de estos archivos se mandan a llamar otros de los mismos. Por ejemplo, en `NoteEditor.tsx`, mando a llamar a `EditorMenu.tsx`, esto habiéndolo exportado primero, y luego importándolo donde lo quiero usar:

```ts
// ...
<EditorMenu
  editar={editar}
  setEditar={setEditar}
  setMessageUseCase={setMessageUseCase}
  title={title}
  setTitle={setTitle}
  body={body}
  setBody={setBody}
  setUpdatedAt={setUpdatedAt}
/>
// ...
```

No voy a explicar a detalle la sintaxis de React porque es algo que tiene su propia documentación y que tampoco conozco lo suficiente para explicar, pero diré, a grandes rasgos, que es lo que hace cada archivo. `EditorMenu.tsx` renderiza el menú que aparece en la parte superior cuando se está editando una nota, `Message.tsx` renderiza un mensaje cuando es necesario mostrarlo (para confirmar la eliminación de una nota o simplemente informar que se guardaron cambios), `NoNoteMenu.tsx` es el menú que se muestra cuando no hay ninguna nota seleccionada. `NoteEditor.tsx` junta todo lo mencionad antes y añade el mero "editor", `NotesGrid.tsx` renderiza el listado de notas que existe a un lado del editor, donde se pueden ver las notas guardadas anteriormente. Por último está `NotesProvider.tsx`, que es un archivo con una funcionalidad más complicada que los anteriores, pero, en esencia, lo que hace es informar a todos los demás componentes de cuál es la nota que el usuario tiene seleccionada al momento.

Saliendo de la carpeta `notePage`, tenemos a `apiCalls.ts`, donde defino algunas funciones para interactuar con mi base de datos a través de `axios`, estas se exportan y se mandan a llamar a través de toda la aplicación. Por ejemplo, cuando quiera traer todas las notas de mi base de datos, llamaré la siguiente función:

```ts
export const getAllNotes = async () => {
  const res = await axios.get(SERVER_URL + "/notes");
  return res.data;
};
```

Luego está `App.tsx`. Aquí junto los elementos de toda mi aplicación en un lugar, y los renderizó en `main.tsx`, que (como dije que `index.cjs` era el centro de nuestro back-end) es el corazón de nuestro front-end.

Ahora bien, nos queda `Header.tsx`, que es un componente que al final no utilicé. Y también `index.css`, donde están los estilos que se usan en toda la aplicación. De notarse una sintaxis extraña aquí es debido a que usé un framework llamado Tailwind para escribir mi CSS. Tampoco detallaré su funcionamiento.

Por último, tenemos, fuera de la carpeta `src`, está `index.html`. Aquí se manda a llamar `main.tsx`, y aparte del título de la página solo contiene un `div` con el id de `root`, que es el mismo que busca `main.tsx`, dentro del cual se renderiza toda la aplicación.

Sé que hay aún más archivos en el proyecto, pero son archivos de configuración que sería inútil explicar en este escenario. También me salté la carpeta `node-modules` tanto en la raíz como en `sever`, pero ahí es donde se instalan las dependencias de los paquetes que uso en la aplicación. Los archivos `package.json` y `package-lock.json` llevan un registro de estas dependencias.
