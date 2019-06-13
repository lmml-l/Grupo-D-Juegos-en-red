# Grupo D Juegos en red 

## Fases de junio

### Fase 4 - Junio

En esta fase implementamos websockets para que nuestro juego pueda ser multijugador entre dos equipos en línea.
En esta documentación explicaremos de forma básica el funcionamiento y la organización interna de dicha implementación.

Partimos de la anterior fase 3 de junio, que al igual que esta hereda los cambios realizados en diciembre en la fase 5.

**Partida multijugador**

Partimos desde la implementación anterior de API REST, en el que dos jugadores pueden conectarse a una sala. Esta vez, en lugar de dar paso a una partida local, acceden a una verdadera partida multijugador.

![...](https://i.imgur.com/ZK3E93K.jpg)

Una vez que dos clientes hayan accedido a la sala, ambos jugadores pasan a la pantalla de selección de personaje. Al primer jugador que entre se le indica que es el *host*. El segundo jugador deberá esperar a que el host elija para poder escoger, tras lo cual comienza la partida. Mientras la sala de espera esté llena, no podrán acceder más jugadores.

![...](https://i.imgur.com/Tge4djb.jpg)

Durante la partida, el jugador maneja a su personaje por el entorno de juego, teniendo ambos clientes las mismas armas disponibles en el escenario, mismo tiempo restante y, en definitiva, la misma información de partida. Una vez que uno de los jugadores gane la pelea, al mejor de tres rondas, se acaba el combate y se reinicia.

En la imagen, un ejemplo de partida sobre un mismo ordenador, pero que sirve para mostrar la sincronización de ambas partidas.

![...](https://i.imgur.com/mmRxQyY.jpg)

**Websockets y mensajes**

A nivel lógico, cada cliente genera por su cuenta toda la información necesaria para ejecutar una partida, como si fuera en local. Dado que necesitamos modificar información que se refleje de la misma manera para ambos jugadores sobre un escenario común, uno de los clientes, el primero en entrar al *lobby*, actuará como *host* para algunas comunicaciones.

Se utilizan cuatro websockets para el envío y recepción de mensajes:
- **Echo**- Informacion que se comunica a todos los clientes en partida. 
   Se compone de los siguientes protocolos recogidos en el manejador *WebsocketEchoHandler*:
    - *GetReady* - En el selector de personajes, da la señal de que el cliente está listo para comenzar
    - *Skin* - Se comunica el aspecto (skin) que tendrá el personaje al iniciar la partida
    - *Jugador* - Durante la pelea, se indica información de la clase Jugador como la posición, la vida, el arma o las acciones que realiza (moverse, disparar, etc).
    
    La información de *Jugador* se obtiene de forma predictiva, puesto que cada cliente conoce las acciones del otro, las calcula y, periódicamente, las corrige con datos absolutos, como puede ser la posición o la vida.
    
- **Drop**- Información que se actualiza desde el cliente *host* al otro.
   Armas del escenario (drops) y posición inicial.
   Se compone de los siguientes protocolos recogidos en el manejador *WebsocketDropHandler*:
    - *Drops* - Se envían las armas generadas desde el *host*
    - *Posicion* - Se envía la posición inicial generada desde el *host* para que ambos jugadores se coloquen en el mismo sitio
    
- **Tiempo**- Información que se actualiza desde el cliente *host* al otro.
    Sincroniza el tiempo restante por ronda entre los dos jugadores e indica quién es el jugador *host*.
    Se compone de los siguientes protocolos recogidos en el manejador *WebsocketTimeHandler*:
    - *Tiempo* - En partida envía el tiempo restante generado en el *host*
    - *Host* - En el selector de personajes indica únicamente al jugador *host* su estatus como tal
    
- **Puntuación** - En prevención de errores, envía desde el *host* el número de victorias conseguido por ambos jugadores.

**Diagrama de clases**

Para la implementación de la comunicación asíncrona, se han añadido cuatro websockets, cada uno con su manejador. Todos ellos se encargan de la agrupación de sesiones, diferenciándose únicamente por los protocolos que gestionan y por el número de clientes que gestionan el mensaje. Es decir, si éstos mensajes son escuchados por los dos jugadores o sólo por uno de ellos.

![...](https://i.imgur.com/pXgX1Vb.png)

**Vídeo**

En este vídeo, resumimos las características de nuestro juego y una demonstración de partida. 

Recomendamos verlo en pantalla completa, pues al subirse a Youtube, muchos monitores acaban distorsionando la imagen con un *efecto Moiré*, no monstrándose como es en realidad a menos de abrir la pantalla completa. 

Pinche en la imagen para ver el vídeo:

[![](http://img.youtube.com/vi/ThUG2cx4QaQ/0.jpg)](http://www.youtube.com/watch?v=ThUG2cx4QaQ "Vídeo")


**--------------------------------------------FIN DE FASE 3 - JUNIO --------------------------------------------**

### Fase 3 - Junio

En esta fase, heredamos las actualizaciones de la fase 5, presentada en la convocatoria de diciembre, para solucionar los fallos de comunicación entre el cliente y el servidor mediante API REST. Por tanto, la implementación de websockets no será objeto de esta memoria y su implementación se mantendrá como estaba por el momento, incluyendo fallos que serán arreglados en la siguiente fase del proyecto.

A continuación, actualizamos la información de esta fase.

**Diagrama de navegación**

En la pantalla inicial, podemos escoger entre una partida local, online o a una guía de los controles.

- *Partida local:*  Pasamos a una pantalla de selección de personajes y de ahí a un combate en un único ordenador.

- *Partida multijugador:* Como principal novedad, el jugador deberá identificarse por su apodo y contraseña. Si no estuviera registrado, en la misma pantalla puede hacerlo. Una vez haya accedido, entrará en un *lobby*, donde esperará a que otro jugador entre a la partida. Después, cada jugador deberá escoger su personaje e indicar que está listo. Cuando ambos estén preparados, comienza la partida.

- *Controles:* Indicación de las teclas que se usan para navegar y jugar

Aunque se indiquen en el diagrama, en esta fase, ignoraremos la implementación y navegación una vez en el *lobby* y en el combate, ya que no dependen de API REST y no son objeto de esta fase.

![...](https://i.imgur.com/MO1lE5V.png)

**Información persistente**

Para que el registro de los usuarios sea efectivo, guardamos de forma persistente la lista de usuarios. Cada uno de ellos es representado por su apodo y su contraseña.

En el archivo UsuariosRegistradosReaderWriter, gestionamos la escritura y lectura de los datos desde el documento *UsuariosRegistrados.txt*.

**Diagrama de clases**

En esta fase, se incluyen las siguientes clases:

![...](https://i.imgur.com/Bq96DRA.png)

**Capturas de pantalla**

Pantalla de registro y login.

![...](https://i.imgur.com/Bi0cRhI.jpg)

Pantalla de lobby, esperando a más jugadores.

![...](https://i.imgur.com/oTBVW0R.jpg)

**Intrucciones para ejecutar**

Con el IDE Spring Tool Suite 4 (STS) se puede importar el directorio e inicializar el servidor seleccionando, con clic derecho, el archivo app.java y marcar *Run as->Java Application*
Por otro lado, en este repositorio está el ejecutable de java **fireforthehood-0.0.1-SNAPSHOT.jar**, que se ejecuta como cualquier otro archivo .jar:
- En Windows, se debe abrir desde la consola de comandos (cmd) con la instrucción *java -jar fireforthehood-0.0.1-SNAPSHOT.jar*

Una vez esté en marcha el servidor, en un navegador web se deberá direccionar a **localhost:8080** para iniciar un cliente del juego.


**--------------------------------------------FIN DE FASE 3 - JUNIO --------------------------------------------**


## Fases de la primera convocatoria

**--------------------------------------------FASE 1--------------------------------------------**

**Nombre del juego:** Fight for the hood

**Diseño del juego**

- Moviento
- Salto
- Recoger/Tirar objetos
- Disparar
- Munición del arma
- Atacar cuerpo a cuerpo
- Escudo
- Barra de vida
- Subir y bajar plataformas metálicas

*Dinámica:* Los personajes se presentarán en el mapa sin armas y aparecerán una serie de drops o armas en el entorno que podrán recoger para atacar a su contrincante.
Los objetos recogidos volverán a aparecer en un tiempo aleatorio, mientras que las soltadas por el jugador desaparecen a los pocos segundos.
Las armas de fuego tendrán munición finita y escasa. Se tendrán barras de vida que se reducirán si el jugador logra dañar al oponente, en función del arma empleada. 

La partida se gana cuando el rival tenga la barra de vida a cero, en una competición al mejor de tres rondas (hay que ganar tres rondas).
Las armas de fuego tendrán munición finita y escasa. Se tendrán barras de vida que se reducirán si el jugador logra dañar al oponente, en función del arma empleada. Cuando no se tiene arma, se podrán usar los puños para empujar al rival. 
Ambos luchadores pueden defenderse con un *escudo* esférico, que se dañará al ser impactado hasta romperse. No te podrás mover al usar el escudo.
Durante el combate, se podrá interacturar con algunas elementos del escenario, algunos aleatorios, para perjudicar al rival, o bien evitar peligros.
Existe un tiempo límite por ronda; si vence éste sin ganador se produce un evento de desempate, sin tiempo, en el que vendrá la policía e irá dispararando aleatoriamente por el escenario, hasta finalizar la ronda.
La partida se gana cuando el rival tenga la barra de vida a cero, en una competición al mejor de cinco rondas (hay que ganar tres rondas).

*Elementos externos:*
Para evitar bloqueos en el flujo de partida, tendremos elementos interaccionables y eventos aleatorios.

- Boca de incendio: al destruírse crearán chorros de agua que empujarán a los jugadores
- Tanque de combustible: al destruírse estalla e incendia el alrededor
- Tendido de alta tensión averiado: se activa sólo en ocasiones y daña al personaje si está cerca
- Mafiosos: pueden aparecer en ventanas y disparar
- Jauría de perros: aparecen en el callejón y atacan a quien esté
- Más por determinar

*Armas plantedas:*
- Fusil tipo Thompson: Disparo a ráfagas de tres balas.
- Pistola: Disparo individual semiautomático
- Escopeta: Disparo en ráfaga de corta distancia y mucho daño
- Puño americano: Ataque cuerpo a cuerpo cercano
- Bate de baseball: Ataque cuerpo a cuerpo cercano
- Fusil tipo Thompson
- Pistola
- Escopeta
- Puño americano
- Bate de baseball

**Referencias artísticas**
El estilo visual de este juego estará basado en la estética de los beat'm up de los años 90, imitando la manera de la textura, iluminación y calles. El movimiento de los personajes, sin embargo, se ajustará únicamente al eje horizontal y vertical, sin profundidad. Los personajes tampoco ocuparán tanto espacio en pantalla, para dar algo más de protagonismo a los elementos del escenario.
El estilo visual de este juego estará basado en la estética de los beat'm up d
(Sega, Streets of Rage, 1991)


**--------------------------------------------FIN DE FASE 1--------------------------------------------**

**FASE 2**

*Nombre del juego:* Fight for the Hood

**Organización de trabajo**

En GitHub tenemos asignados dos ramas (*branches*) dentro del repositorio.

Hemos ido subiendo los archivos y modificaciones necesarias diariamente en la rama **Pruebas** y las versiones finales de cada fase, realizadas con *merges*,  en la rama **master**.

Esto no quiere decir que hayamos hecho un commit por fase (de hecho, la rama Pruebas alcanza los 240 commits), sino que distinguimos los commits rutinarios y los finales para evitar confusiones.


**Diseño del juego**

*Mecánicas:*  Moverse, saltar, recoger objetos, tirar objetos, disparar, atacar cuerpo a cuerpo.

- El personaje se presentará en el mapa sin armas, y aparecerán una serie de drops o armas en el entorno que podrá recoger para disparar a su contrincante.
- Los personajes tendrán barras de vida que se reducirán si el jugador logra impactar sus ataques al oponente.
- Las armas son de cuerpo a cuerpo o de fuego, éstas con munición limitada.
- Cada arma tiene unas propiedades distintas (cadencia, alcance, velocidad de la bala...).

*Dinámica:*
- El objetivo del juego es dejar sin vida al oponente.
- La partida se gana al mejor de cinco rondas. Es necesario ganar tres combates para obtener la victoria.
- Tiempo máximo de 90 segundos. Se reinicia la partida si el contador llega a cero.

*Controles del juego:*
 
Menús:
- Indistintamente las teclas W y S o las flechas arriba(↑) y abajo(↓) para subir o bajar el índice de selección.
- En la pantalla de controles, teclas Enter o Back para salir.

En partida:

J1: W          -> Saltar
    A          -> Mover a la izquierda
    D          -> Mover a la derecha
    R          -> Coger/Soltar arma
    T          -> Atacar
    
J2: ↑Arriba    -> Saltar
    ←Izquierda -> Izquierda, 
    →Derecha   -> Mover a la derecha
    O          -> Coger/Soltar arma
    P          -> Atacar

**Diagrama de navegación, secuencia del juego y pantallas:**

![...](https://i.imgur.com/ZUyX79J.png)

El juego comienza la pantalla de inicio donde podremos seleccionar con el teclado las siguientes funcionalidades: *jugar en local*, *jugar online* y *controles*.
- *Jugar en local*: Dirige a un menú de selección de selección de personajes para una partida local.
- *Jugar online*: En futuras fases dirigirá a una partida multijugador en línea. Al no estar implementado, funciona igual que el anterior.
- *Controles*: Indica las teclas y su función.

![...](https://i.imgur.com/j6UoskT.jpg)

En la pantalla de controles se indican las teclas para cada jugador y su función. Su única interacción es retroceder a la pantalla anterior.

![...](https://i.imgur.com/mvQt6lM.jpg)

Desde esta pantalla podremos acceder a la selección de personajes. Cada jugador mueve su icono correspondiente (*J1* o *J2*) hacia el sprite del personaje deseado. Una vez los dos confirmen su selección, que no se podrá cambiar, se inicia la partida.

![...](https://i.imgur.com/KKcfNzv.jpg)

En la pantalla de juego los jugadores podrán manejar a sus avatares entre las plataformas -atravesables desde abajo- y edificios del escenario. En unas zonas marcadas, irán apareciendo aleatoriamente distintas armas. Los jugadores podrán atacar con ellas o soltarlas cuando necesiten. En la parte baja, se encuentra una zona (HUD) con información de partida, como la vida, tiempo restante o rondas ganadas.

En esta captura se enumeran los elementos de la pantalla de juego:

![...](https://gyazo.com/2b12fc98ff9cafcd43ddcff82e4dec1b.png)

**--------------------------------------------FIN DE FASE 2--------------------------------------------**

**--------------------------------------------FASE 3--------------------------------------------**

En esta fase se ha implementado la  API REST para el servidor mediante SpringBoot

*Nombre del juego:* Fight for the Hood

**Organización de trabajo**

En GitHub tenemos asignados dos ramas (*branches*) dentro del repositorio.

Hemos ido subiendo los archivos y modificaciones necesarias diariamente en la rama **Pruebas** y las versiones finales de cada fase, realizadas con *merges*,  en la rama **master**.

Este proceso ha sido igual que en las fases anteriores, (donde se superaron más de 240 commits).

**Secuencias, Diagramas de navegación y de clases:**

Las pantallas de navegación(secuencias) del juego son las mismas que las de la fase anterior con excepción de que ahora el modo online, sale una pantalla para seleccionar tu nombre, que te dirige a un lobby abstracto donde empezarás la partida igual que si jugarás en local.

Para ello mostramos el nuevo diagrama de navegación del juego: 

![...](https://cdn.discordapp.com/attachments/506061008255582209/514547689459810325/Sin_titulo-1.png)

En la implementación del API REST encontramos el siguiente diagrama de clases explicativo: 

![...](https://i.gyazo.com/4718af632aba776e12e0c00ba0d3143c.png)

Por lo que respecta a esta fase, no se han realizado cambios mayores a destacar.

**--------------------------------------------FIN FASE 3--------------------------------------------**

**--------------------------------------------FASE 4--------------------------------------------**

En esta fase implementamos websockets para que nuestro juego pueda ser multijugador entre dos equipos en línea.
En esta documentación explicaremos de forma básica el funcionamiento y la organización interna de dicha implementación.

**Partida multijugador**

Partimos desde la implementación anterior de API REST, en el que dos jugadores pueden conectarse a una sala. Esta vez, en lugar de dar paso a una partida local, acceden a una verdadera partida multijugador.

![...](https://i.imgur.com/ZK3E93K.jpg)

Una vez que dos clientes hayan accedido a la sala, ambos jugadores pasan a la pantalla de selección de personaje. Al primer jugador que entre se le indica que es el *host*. El segundo jugador deberá esperar a que el host elija para poder escoger, tras lo cual comienza la partida. Mientras la sala de espera esté llena, no podrán acceder más jugadores.

![...](https://i.imgur.com/Tge4djb.jpg)

Durante la partida, el jugador maneja a su personaje por el entorno de juego, teniendo ambos clientes las mismas armas disponibles en el escenario, mismo tiempo restante y, en definitiva, la misma información de partida. Una vez que uno de los jugadores gane la pelea, al mejor de tres rondas, se acaba el combate y se reinicia.

En la imagen, un ejemplo de partida sobre un mismo ordenador, pero que sirve para mostrar la sincronización de ambas partidas.

![...](https://i.imgur.com/mmRxQyY.jpg)

**Websockets y mensajes**

A nivel lógico, cada cliente genera por su cuenta toda la información necesaria para ejecutar una partida, como si fuera en local. Dado que necesitamos modificar información que se refleje de la misma manera para ambos jugadores sobre un escenario común, uno de los clientes, el primero en entrar al *lobby*, actuará como *host* para algunas comunicaciones.

Se utilizan cuatro websockets para el envío y recepción de mensajes:
- **Echo**- Informacion que se comunica a todos los clientes en partida. 
   Se compone de los siguientes protocolos recogidos en el manejador *WebsocketEchoHandler*:
    - *GetReady* - En el selector de personajes, da la señal de que el cliente está listo para comenzar
    - *Skin* - Se comunica el aspecto (skin) que tendrá el personaje al iniciar la partida
    - *Jugador* - Durante la pelea, se indica información de la clase Jugador como la posición, la vida, el arma o las acciones que realiza (moverse, disparar, etc).
    
    La información de *Jugador* se obtiene de forma predictiva, puesto que cada cliente conoce las acciones del otro, las calcula y, periódicamente, las corrige con datos absolutos, como puede ser la posición o la vida.
    
- **Drop**- Información que se actualiza desde el cliente *host* al otro.
   Armas del escenario (drops) y posición inicial.
   Se compone de los siguientes protocolos recogidos en el manejador *WebsocketDropHandler*:
    - *Drops* - Se envían las armas generadas desde el *host*
    - *Posicion* - Se envía la posición inicial generada desde el *host* para que ambos jugadores se coloquen en el mismo sitio
    
- **Tiempo**- Información que se actualiza desde el cliente *host* al otro.
    Sincroniza el tiempo restante por ronda entre los dos jugadores e indica quién es el jugador *host*.
    Se compone de los siguientes protocolos recogidos en el manejador *WebsocketTimeHandler*:
    - *Tiempo* - En partida envía el tiempo restante generado en el *host*
    - *Host* - En el selector de personajes indica únicamente al jugador *host* su estatus como tal
    
- **Puntuación** - En prevención de errores, envía desde el *host* el número de victorias conseguido por ambos jugadores.

**Diagrama de clases**

Para la implementación de la comunicación asíncrona, se han añadido cuatro websockets, cada uno con su manejador. Todos ellos se encargan de la agrupación de sesiones, diferenciándose únicamente por los protocolos que gestionan y por el número de clientes que gestionan el mensaje. Es decir, si éstos mensajes son escuchados por los dos jugadores o sólo por uno de ellos.

![...](https://i.imgur.com/pXgX1Vb.png)

**Vídeo**

En este vídeo, resumimos las características de nuestro juego y una demonstración de partida. 

Recomendamos verlo en pantalla completa, pues al subirse a Youtube, muchos monitores acaban distorsionando la imagen con un *efecto Moiré*, no monstrándose como es en realidad a menos de abrir la pantalla completa. 

Pinche en la imagen para ver el vídeo:

[![](http://img.youtube.com/vi/ThUG2cx4QaQ/0.jpg)](http://www.youtube.com/watch?v=ThUG2cx4QaQ "Vídeo")

**--------------------------------------------FIN FASE 4--------------------------------------------**

**Integrantes del equipo de desarrollo:**  

**Nombre:** Luis Miguel Moreno López **Correo** lm.moreno.2016@alumnos.urjc.es           **Cuenta GitHub:** lmml-l

**Nombre:** Denis Gudiña Nuñez  **Correo:**  d.gudina.2016@alumnos.urjc.es               **Cuenta GitHub:**  KaptainSportaco

**Nombre:** Fernando Moreno Díaz **Correo** f.moreno.2016@alumnos.urjc.es                **Cuenta GitHub:** FernandoMoreno98

**Nombre:** Alejandro José Carrillo Ezcurra  **Correo:**  aj.carrilloe@alumnos.urjc.es   **Cuenta GitHub:** Tenusiano


