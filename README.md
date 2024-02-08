<H3>El despertar de los dioses</H3>
<img src="imagenes\portada.jpeg" width="480"/>
<h3>Ambientación</h3>
<p>Un estudiante de arqueología le encargan un trabajo de investigación en Egipto. Su trabajo es inspeccionar una nueva sala que se ha descubierto en una de las pirámides de Guiza, pero al pisar una baldosa suelta, cae en una trampa oculta y queda atrapado en las profundidades de la antigua estructura. 
Al seguir investigando en la nueva sala, descubre un sarcófago que al abrirlo deja escapar los espíritus de los dioses del Antiguo Egipto que protegían los secretos de la pirámide. Tras un temblor, el estudiante se da cuenta que la sala se está empezando a inundar. 
Deberá usar sus habilidades para esquivar trampas, vencer enemigos y encontrar una salida antes de que sea demasiado tarde y quede ahogado entre las paredes de la pirámide.</p>
<h3>Personaje</h3>
<p>Los jugadores van a ponerse en la piel de un estudiante de arqueología de la complutense llamado Laura Cruz
El personaje va a poder desplazarse por el mapa pudiendo ir hacia la derecha, izquierda, saltar y agacharse en un plano 2D. En el mapa habrá objetos como escaleras o cuerdas para subir y bajar.
Al principio del nivel el personaje podrá atacar a sus enemigos golpeándolos y según vaya consiguiendo objetos y poderes podrá usarlos contra ellos.
El personaje tiene un mochila con una capacidad de 3 para objetos que recoja en el nivel y podrá usarlos exclusivamente en ese nivel, cuando termine el nivel el inventario de la mochila se vaciará, pero los poderes se mantendrán.
	<li>Vendas</li> <img src="imagenes\diseñosVendas.jpeg" width="100"/>
	<li>Arma cuerpo a cuerpo</li> <img src="imagenes\antorcha.jpeg" width="100"/>
	<li>Desplazamiento rápido</li>
</p>
<h3>Sistema de vidas</h3>
<p>El personaje va a tener una barra de vida. Los distintos enemigos y obstáculos que vaya encontrando a lo largo de los mapas le restarán vida a la barra en distintas proporciones y podrá recuperar vida usando objetos como las vendas. Cada vez que este muera (la barra de vida se acabe) volverá al punto de inicio del nivel, perderá los objetos que haya encontrado (excepto los medallones).</p>

<h3>Objetivo</h3>
<p>El objetivo final es salir de la pirámide. Para ello deberá superar los distintos niveles y derrotar a los jefes finales para conseguir todos los medallones que te permitirán abrir la compuerta final</p>

<h3>Niveles</h3>
<p>Los niveles sucederán en el interior de una piramide. Cada nivel consinsitirá en un mapa en todas las direcciones con plataformas, trampas y enemigos. El mapa se irá inundando progresivamente con un líquido nocivo de abajo a arriba, haciendo que el jugador tenga un tiempo límite para superar el nivel antes de que le mate. Cada vez que esté en contacto con el líquido le hará un daño por cada segundo y lo ralentizará. Al llegar a la salida del nivel, el líquido dejará de inundar el mapa para poder enfrentarse al jefe.
Los niveles contarán con cofres de dificil acceso que te proporcionarán objetos que puedes guardar en la mochila y utilizarlos a lo largo de ese nivel.
Para superar el nivel deberá llegar a la salida y enfrentarse al jefe. Al matar al jefe conseguirá el medallón y un nuevo poder que usará en el siguiente nivel.</p>

<h3>Enemigos</h3>
<p>Los enemigos son más dificiles de superar de forma progresiva
Todos los enemigos quitan vida en distintas proporciones y te pueden aportar o no objetos</p>
<li>Momia: Aportan vendas. Debilidad: fuego (antorcha/poder del sol) y puños</li> <img src="imagenes\momia1.jpeg" width="100"/>
<li>Serpientes: Aportan antídoto. Paralizan al personaje. Debilidad: flauta para encantarlas</li> <img src="imagenes\serpiente.jpeg" width="100"/>
<li> </li>

<h3>Inspiracion</h3>
<p>https://www.youtube.com/watch?v=Uc0tHRkB-Po</p>

<h3>Posibles niveles</h3>
<p>Nivel 1: se enfrenta a Horus, en caso de vencerle obtiene el medallon de la protección.</p> <img src="imagenes\arteConceptualHorus.jpeg" width="100"/>
<p>Nivel 2: se enfrenta a Ra, en caso de vencerle obtiene el medallon de la energia del sol</p>
<p>Nivel 3: nivel final, para salir de la piramide hay que superar al dios Osiris (dios de la vida y de la muerte)</p>
<img src="imagenes\nivel1.jpeg" width="100"/>



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
