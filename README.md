# Grupo D Juegos en red 

**--------------------------------------------FASE 1--------------------------------------------**

**Nombre del juego:** Fight for the hood

**Diseño del juego**

*Descripción:* Juego de lucha con temática de mafia americana de los años 1920, shooter de plataformas, tipo Super Smash Bros o Brawlhalla. Dos jugadores se enfrentan en duelo (PvP) con armas de fuego y cuerpo a cuerpo. El escenario será un callejón sucio marginal de Nueva York, con escaleras de emergencia a modo de plataformas, siguiendo esquemas arcade.

*Mecánicas:* 
- Movimiento
- Salto
- Recoger y tirar objetos
- Disparar
- Munición del arma
- Atacar cuerpo a cuerpo
- Barra de vida
- Subir y bajar plataformas metálicas

*Dinámica:* Los personajes se presentarán en el mapa sin armas y aparecerán una serie de drops o armas en el entorno que podrán recoger para atacar a su contrincante.
Los objetos recogidos volverán a aparecer en un tiempo aleatorio, mientras que las soltadas por el jugador desaparecen a los pocos segundos.
Las armas de fuego tendrán munición finita y escasa. Se tendrán barras de vida que se reducirán si el jugador logra dañar al oponente, en función del arma empleada. 

La partida se gana cuando el rival tenga la barra de vida a cero, en una competición al mejor de tres rondas (hay que ganar tres rondas).

*Armas plantedas:*
- Fusil tipo Thompson: Disparo a ráfagas de tres balas.
- Pistola: Disparo individual semiautomático
- Escopeta: Disparo en ráfaga de corta distancia y mucho daño
- Puño americano: Ataque cuerpo a cuerpo cercano
- Bate de baseball: Ataque cuerpo a cuerpo cercano

**Referencias artísticas**
El estilo visual de este juego estará basado en la estética de los beat'm up de los años 90, imitando la manera de la textura, iluminación y calles. El movimiento de los personajes, sin embargo, se ajustará únicamente al eje horizontal y vertical, sin profundidad. Los personajes tampoco ocuparán tanto espacio en pantalla, para dar algo más de protagonismo a los elementos del escenario.

![...](http://pixeljoint.com/files/icons/full/mafia2d_mockup_final.png)

(Equilibrix, Mafia 2D mock-up,http://pixeljoint.com/pixelart/28588.htm)


![...](https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE4XFxcLzAyXFxcLzAzMTYzNDQ3XFxcL3NvcjIuanBnXCIsXCJ3aWR0aFwiOjc2NyxcImhlaWdodFwiOjQzMSxcImRlZmF1bHRcIjpcImh0dHBzOlxcXC9cXFwvd3d3LmpvZS5pZVxcXC9hc3NldHNcXFwvaW1hZ2VzXFxcL2pvZVxcXC9uby1pbWFnZS5wbmc_dj01XCJ9IiwiaGFzaCI6IjAyYmUwYzFhZjJmZTJkYTAyYjMzNTliZmMyZThjNWRkNDY3OWQ4N2YifQ==/sor2.jpg)

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


**Integrantes del equipo de desarrollo:**  

**Nombre:** Luis Miguel Moreno López **Correo** lm.moreno.2016@alumnos.urjc.es           **Cuenta GitHub:** lmml-l

**Nombre:** Denis Gudiña Nuñez  **Correo:**  d.gudina.2016@alumnos.urjc.es               **Cuenta GitHub:**  KaptainSportaco

**Nombre:** Fernando Moreno Díaz **Correo** f.moreno.2016@alumnos.urjc.es                **Cuenta GitHub:** FernandoMoreno98

**Nombre:** Alejandro José Carrillo Ezcurra  **Correo:**  aj.carrilloe@alumnos.urjc.es   **Cuenta GitHub:** Tenusiano


