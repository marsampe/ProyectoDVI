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


<br><br>

# Descripción General

### Personaje
Los jugadores van a ponerse en la piel de un estudiante de arqueología de la complutense llamado Laura Cruz

El personaje va a poder desplazarse por el mapa pudiendo ir hacia la derecha, izquierda, saltar y agacharse en un plano 2D. En el mapa habrá objetos como escaleras o cuerdas para subir y bajar.

Al principio del nivel el personaje podrá atacar a sus enemigos golpeándolos y según vaya consiguiendo objetos y poderes podrá usarlos contra ellos.

### Niveles
Los niveles sucederán en el interior de una piramide. Cada nivel consinsitirá en un mapa en todas las direcciones con plataformas, trampas y enemigos. El mapa se irá inundando progresivamente con un líquido nocivo de abajo a arriba, haciendo que el jugador tenga un tiempo límite para superar el nivel antes de que le mate. Cada vez que esté en contacto con el líquido le hará un daño por cada segundo y lo ralentizará. Al llegar a la salida del nivel, el líquido dejará de inundar el mapa para poder enfrentarse al jefe.

Los niveles contarán con cofres de dificil acceso que te proporcionarán objetos que puedes guardar en la mochila y utilizarlos a lo largo de ese nivel.

Para superar el nivel deberá llegar a la salida y enfrentarse al jefe. Al matar al jefe conseguirá el medallón y un nuevo poder que usará en el siguiente nivel.
