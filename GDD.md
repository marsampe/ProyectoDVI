# Game Design Document (GDD)

### El despertar de los dioses

**![](https://lh7-us.googleusercontent.com/S2tFSjQ9pkwz0DEzPe4HG8SldZW1898bwRIrbVsBTNgd668wFKCutV26ERfU9Bgd6QNww8sIyh9lnCBLF8GtOwQHprxDw-p_6pasD8fNRUbJ50rbdPnBVYJbz5qkv0dd7MoHDs0Q2mj3bhiKeUhwaGw)**

Por GIM Studios:

Gonzalo Ramos
Isabel Zamarrón
Marta Sampedro



# 1.  Introducción
## 1.1. Concepto del juego
### 1.1.1 Información básica

**Título:** El despertar de los dioses

**Estudio/Diseñadores:** GIM Studios

**Género:** Plataformas

**Plataformas:** Web

**Versión:** 1.0

### 1.1.2. Descripción

El despertar de los dioses es un juego de plataformas en el que deberás ayudar a Laura a escapar de las profundidades de la pirámide donde se ha quedado atrapada. Para ello se deberán explorar los diferentes niveles en busca de las puertas que nos permitan salir. Deberá sobrevivir a las numerosas trampas y criaturas que se encuentran protegiendo la antigua estructura antes de que sea demasiado tarde y quede atrapada entre las paredes de la pirámide.

### 1.1.3. Objetivo

El objetivo final es salir de la pirámide. Para ello deberá superar los distintos niveles y derrotar a los jefes finales para conseguir todos los medallones que te permitirán abrir la compuerta final.

### 1.1.4. Riesgos

Las principales dificultades encontradas han sido el poder controlar correctamente los movimientos del personaje y los enemigos con sus correspondientes colisiones. También aquellos problemas derivados de las colisiones con elementos del fondo de cada nivel.

1.2 Estetica
------------

### 1.2.1. Arte

Las principales herramientas que hemos empleado han sido pixelart para la creación de los distintos objetos, del personaje principal y de los enemigos. Junto con paint que se utilizó para retoques más específicos.

Para el fondo se ha utilizado el programa Tiled a continuación se detalla los pasos que se siguieron:

En primer lugar los fondos de los distintos niveles se han creado utilizando diversos tileset.
**![](https://lh7-us.googleusercontent.com/NBoCY0XpwqEYRl25ZpWQsxebbcwpwtm7pAXe3pZzMiJ6tF_Xg0V3sVBSGGCZw70ba9ouH63DepeEOd1fddQl-C-nT6OOug_7-KptuGw8aRtHre2MsArRB_J6ZKId8KAydOxeQCx0XjGsGMgJHgJlZ68)**

Y  en cuanto a estructuras se refiere optamos por el uso de capas de objetos donde declaramos la posición determinada que queríamos que tuviera un determinado objeto. 

### 1.2.2. Sonidos

En el despertar de los dioses queríamos que la experiencia auditiva del usuario fuera lo mejor posible, por lo que consideramos que la música de fondo jugaría un papel crucial en la inmersión del juego. Para ello, hemos escogido en cada escena unas melodías principalmente compuestas por instrumentos tradicionales egipcios con los que se pretende transportar a los jugadores al corazón del antiguo Egipto.

Además, se han incluido diversos sonidos tanto al personaje como a los enemigos y a los objetos, haciendo más inmersivo el juego.

Los sonidos del juego se han sacado de [https://freesound.org/](https://freesound.org/).

 # 2. Mecánicas principales
    
   ## 2.1 El jugador
        
La protagonista de nuestra historia va a ser Laura Cruz, una joven estudiante de arqueología a la que el encargo de un trabajo de investigación en una nueva sala que se ha descubierto en una de las pirámides de Guiza en Egipto se convertirá en una aventura. Tras pisar una baldosa suelta, cae en una trampa y queda atrapada en las profundidades de la antigua estructura. Al seguir investigando en la nueva sala, descubre un sarcófago que al abrirlo deja escapar los espíritus de los dioses del Antiguo Egipto que protegían los secretos de la pirámide. Tras un temblor, el estudiante se da cuenta que la sala se está empezando a inundar. Deberá usar sus habilidades para esquivar trampas, vencer enemigos y encontrar una salida antes de que sea demasiado tarde y quede ahogado entre las paredes de la pirámide.
**![](https://lh7-us.googleusercontent.com/pfR3faDMIn0ofBPbM1FMnIzVojNuUq6bvHyirXHS3BWm3jTCiDbpb_fUfbHUAyXXmqa_K10FEqH_1xQfT33d9t3vYdVGiVM5BjFSIYZ8YX-MzVV8XYserfahDF2oqcqHU5Mr3coq0tiesAN0eiBnSig)**

Al principio del nivel el personaje podrá atacar a sus enemigos golpeándolos y según vaya consiguiendo objetos y poderes podrá usarlos contra ellos.

Las habilidades que va a poseer son:

*   Ataque
    
*   Desplazamiento por el mapa
    
*   Coger y utilizar objetos.
    

Va a poseer una mochila que en el juego se muestra como casillas de inventario, pudiendo tener un espacio máximo de 3 objetos que recoja en el a medida que avanza y podrá usarlos exclusivamente en ese nivel, Cuando termine el nivel el inventario de la mochila se vaciará, pero los poderes se mantendrán. 

También contará con una interfaz compuesta por una barra de vida, a la que a partir nivel 2 se le añadirá una nueva barra que será el  escudo.
Los distintos enemigos y obstáculos que vaya encontrando a lo largo de los mapas le restarán vida a la barra en distintas proporciones y podrá recuperar vida usando objetos que recoja ya sea matando enemigos como en los distintos cofres. Cada vez que este muera (la barra de vida se acabe) volverá al punto de inicio del nivel, perderá los objetos que haya encontrado (excepto los medallones).

El nivel de vida que posee es : 200

El daño que sufre y las curas se explican en sus apartados.

## 2.2 Enemigos
    
Los enemigos son más difíciles de superar de forma progresiva. Todos ellos quitan vida en distintas proporciones y te pueden aportar o no objetos.


| **Momia** |  |
|--|--|
| Descripción | Enemigo cuyo objetivo es matar a nuestro personaje. Lo podemos encontrar rondando por las plataformas y cuando nuestro personaje se acerca recibe un ataque. Su debilidad principal es la antorcha |
|Ataque|Golpe de la Eternidad: - 30 vida|
|Vida|100|
 |Niveles|1, 2, 3|
|Recompensa|Vendas|
|Spritesheet|**![](https://lh7-us.googleusercontent.com/GoDee3zv6Ey1kHn0XZQyMtGKdEej9Zbg4j2tX78fCseqEufiTh0pCxf4X5eQxVsIoDQMM1SVqSNEvAGuVjpg-SvNC7KvkN1sxaHVGFukcB91HzBYtF9zpP7PPALnpBoz1R8DjM2LZhTKxFrJIXyMOxM)**|

----

| **Serpiente** |  |
|--|--|
| Descripción | Enemigo cuyo objetivo es matar a nuestro personaje, cuando este se encuentra cerca le persigue y ataca. Su mordedura paraliza temporalmente al jugador |
|Ataque|Mordedura venenosa: - 60 vida|
|Vida|100|
 |Niveles| 2, 3|
|Recompensa|Antídoto|
|Spritesheet|**![](https://lh7-us.googleusercontent.com/pJ3J-GVQs-qp9gFFxCO2Cu0V0ZUHeHTy703unZJdCwgmJmxUWXwWEATcVQHwwS95FJM5Q8_BqDfImHYVVcU3C2ts8nJnGWZu8xTonXM0fgOrfn5xly1OdZZgjX53W2Riu5DYPgGK533x8_OeLLmRgA4)**|

****


| **Escarabajo** |  |
|--|--|
| Descripción | Enemigo cuyo objetivo es matar al personaje escupiendo bolas de veneno.|
|Ataque|Bola de veneno: - 30 vida|
|Vida|100|
 |Niveles|3|
|Recompensa||
|Spritesheet|**![](https://lh7-us.googleusercontent.com/_QMtWJSpguKQMTOqFCxBKxklIkVi-cWaXGkVNvjCEk-Dx9LOi9sPv_HtcXyPXGFa8KA4REwBgmIAmS_cGZYPvIDDBUTAVejLpbukgdrjBU_9hth3vbiU3738oBLwOmdhXkKtQFyMa3CDcJ7q0yNKDLY)**|

----

## 2.3 Items
    

### 2.3.1 Objetos nivel

        

#### Puerta

Nos permitirá cambiar de una escena a otra, se encuentran en el extremo derecho del nivel, basta con que el personaje se acerque a ella.

#### Cofre

Objetos dispuestos en el nivel que el jugador deberá abrir para obtener objetos que guardará en su inventario

#### Inventario

Lugar donde se almacenarán los distintos objetos que se vayan recogiendo. Tiene 3 espacios.

#### Interfaz usuario

Se encuentra compuesto por una barra de vida, una barra de escudo y distintos medallones que se van adquiriendo.



### 2.3.2 Objetos inventario
    

Son objetos que el personaje podrá obtener ya sea en un cofre o al matar a un enemigo. A continuación se detallan sus características principales:

#### Vendas

Aumentan la vida del personaje:

#### Antídoto

Aumentan la vida del personaje:

#### Antorcha

Herramienta que el personaje utiliza como arma

Daño que causa:

### 2.3.3 Trampas
    

Son objetos que se encuentran estáticos en las distintas escenas y que provocan daño en la vida del personaje. Pueden ser de varios tipos:

#### Estacas

Daño que causa:

#### Trampa lateral

Daño que causa:

#### Flechas

Daño que causa:

## 2.4 Mecánicas
    
Las mecánicas principales son:

*   **Movimiento**: el jugador podrá moverse de izquierda a derecha por las plataformas.
    
*   **Salto**: el jugador podrá saltar para ascender a plataformas superiores.
    
*   **Luchar**: el jugador podrá enfrentarse a enemigos tanto con o sin arma.
    
*   **Coger objetos:** el jugador podrá recoger objetos acercándose a ellos.
    
*   **Habilidades especiales:** el jugador podrá usar los objetos que ha recogido para aumentar su vida o escudo.
    
*   **Cámara:** se usará una cámara 2D que permitirá hacer zoom y seguir al jugador a través del nivel.
    
*   **Controles:** Los controles que se utilizaran son los siguientes:
    
    *   Flecha hacia la izquierda/derecha para desplazarnos
        
    *   Flecha hacia arriba para saltar
        
    *   Tecla S para atacar a un enemigo
        
    *   Tecla  para abrir un cofre
        
    *   Tecla para usar un objeto del inventario
        

1.  Mundo del juego
    

Nuestro juego se conforma de 3 niveles de plataformas más uno de tutorial. Se van sucediendo progresivamente a medida que encontramos las puertas de los distintos niveles.

1.  Nivel tutorial
    
2.  Nivel 1
    
3.  Nivel 2
    
4.  Nivel 3
    
5.  Muestras de ejemplo
    

Menú principal: se muestra al usuario dos botones, uno para realizar el nivel tutorial (botón “tutorial”) y otro para comenzar el juego (botón “start”). Se muestra nada más acceder a la página web y una vez se finaliza el juego.

Escena nivel

Escena fin de partida: una vez se finalizan los niveles se muestra una pantalla y despues pulsando la tecla enter se vuelve al menu principal.

### **Personaje**

**Los jugadores van a ponerse en la piel de un estudiante de arqueología de la complutense llamado Laura Cruz**

**El personaje va a poder desplazarse por el mapa pudiendo ir hacia la derecha, izquierda, saltar y agacharse en un plano 2D. En el mapa habrá objetos como escaleras o cuerdas para subir y bajar.**

**Al principio del nivel el personaje podrá atacar a sus enemigos golpeándolos y según vaya consiguiendo objetos y poderes podrá usarlos contra ellos.**







### **Niveles**

**Los niveles sucederán en el interior de una piramide. Cada nivel consinsitirá en un mapa en todas las direcciones con plataformas, trampas y enemigos. El mapa se irá inundando progresivamente con un líquido nocivo de abajo a arriba, haciendo que el jugador tenga un tiempo límite para superar el nivel antes de que le mate. Cada vez que esté en contacto con el líquido le hará un daño por cada segundo y lo ralentizará. Al llegar a la salida del nivel, el líquido dejará de inundar el mapa para poder enfrentarse al jefe.**

**Los niveles contarán con cofres de dificil acceso que te proporcionarán objetos que puedes guardar en la mochila y utilizarlos a lo largo de ese nivel.**

**Para superar el nivel deberá llegar a la salida y enfrentarse al jefe. Al matar al jefe conseguirá el medallón y un nuevo poder que usará en el siguiente nivel.**

**![](imagenes\nivel1.jpeg)**



### **Inspiracion**

**https://www.youtube.com/watch?v=Uc0tHRkB-Po**

### **Posibles niveles**

**Nivel 1: se enfrenta a Horus, en caso de vencerle obtiene el medallon de la protección.**

**Nivel 2: se enfrenta a Ra, en caso de vencerle obtiene el medallon de la energia del sol**

**Nivel 3: nivel final, para salir de la piramide hay que superar al dios Osiris (dios de la vida y de la muerte)**

 