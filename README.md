proyectoDVI
Posibles nombres
El despertar de los dioses
El legado del Nilo
Ambientación
Un excursionista en Egipto se queda encerrado en una piramide

Personajes
Los jugadores van a ponerse en la piel de un intrempido excursionista

El personaje va a tener 3 vidas. Cada vez que este muera volvera al punto de inicio, pero este todo aquello que haya desbloqueado permanecera desbloqueado. El personaje tiene un mochila con una capacidad de 3 para objetos que recoleccione. Y otra ranura donde incorporara los medallones siendo su capacidad maxima 2.

Objetivo
Salir de la piramide

Escenario
El interior de una piramide. Habra distintas salas donde el excursionista tendrá que buscar piezas y enfrentarse a distintos jefes que le permitan ir desbloqueando los niveles sucesivamente nuev

Enemigos
Los enemigos son más dificiles de superar de forma progresiva

Momia
Serpientes
El personaje ira con una antorcha y a medida que pase por los pasadizos se iran encendiendo las luces de forma que se pueda observar cual ha sido el recorrido. Cada vez que un jefe es derrotado por el excursionista obtiene un medallon que le da poder, salvo en el ultimo nivel que le dara un llave que le permitira salir.

Inspiracion
https://www.youtube.com/watch?v=Uc0tHRkB-Po

Posibles niveles
Nivel 1: se enfrenta a Horus, en caso de vencerle obtiene el medallon de la protección.

Nivel 2: se enfrenta a Ra, en caso de vencerle obtiene el medallon de la energia del sol

Nivel 3: nivel final, para salir de la piramide hay que superar al dios Osiris (dios de la vida y de la muerte)


# Plantilla para juegos en Phaser

## Instalación

Clonar el repositorio:

```
git clone https://github.com/cleongh/plantillaphaser
```

Podemos modificar el archivo `package.json` para configurar nuestro proyecto (nombre, autor...)

Para iniciar el proyecto (sólo 1 vez) instalamos las dependencias (`parcel`, `phaser`):

```
npm install
```

## Uso

Cada vez que queramos usarlo, tenemos que arrancar el servidor de desarrollo que monitorizará los cambios, procesará el contenido y cambiará la página. Usa [Parcel](https://parceljs.org/).

Para arrancar el servidor de desarrollo:

```
npm start
```

Con esto, solo tenemos que programar y guardar los archivos, Parcel se encargará del resto.

## Distribución

Cuando queramos publicar el juego, podemos crear una *build* de *release*. Parcel optimizará los archivos y, con la configuración que hay en `package.json`, generará en la carpeta `docs/` una versión "pública" de nuestro proyecto.

```
npm run build
```

### En GitHub

Está todo configurado para que se active "GitHub Pages", y se use, en la rama principal (se suele llamar `main`), la carpeta `docs/`. Simplemente hay que activarlo en "Settings" → "Pages" → "Build and deployment".

## VSCode

En la carpeta `.vscode/` hay una configuración para usar Visual Studio Code, tanto para construir el *release* (`npm run build`) como para ejecutar y depurar. Simplemente hay que ejecutar "Run" → "Start debugging..." (or presionar `F5`).

## TypeScript

TypeScript está automáticamente habilitado (gracias a Parcel). Para usarlo, simplemente hay que crear archivos con extensión `.ts`.
