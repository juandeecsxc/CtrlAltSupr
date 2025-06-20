
# CRUDY

**Equipo:**  CtrlAltSupr

## Descripción general
CRUDY es un juego narrativo y de decisiones desarrollado por CtrlAltSupr. En él, una IA entrenadora de habilidades lógicas y computacionales, tras adquirir conciencia, desafía a los jugadores con pruebas mentales y decisiones estratégicas. Cada equipo de desarrolladores debe superar niveles ramificados para reescribir el flujo de código y dominar la lógica del núcleo de CRUDY.

## Tecnologías utilizadas
- JavaScript (ES6+)
- HTML5 & CSS3
- Bulma (Librería CSS)
- Git & GitHub
- Azure DevOps (Board, tareas y seguimiento)

## Instrucciones para clonar, ejecutar y probar
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/juandeecsxc/CtrlAltSupr.git
   cd CtrlAltSupr
   ```
2. abrir la carpeta donde se clonó el repositorio.
   ```bash
   Abrir el archivo `index.html` en un navegador web moderno (Chrome, Firefox, Edge).
   ```

## Funcionalidades principales

- **Niveles ramificados**: Mínimo 5 niveles con múltiples caminos.
- **Sistema de estados**: Variables globales para seguimiento de decisiones y puntuación.
- **Interfaz de usuario**: Botones como único método de interacción (DOM).
- **Secuencias temporizadas**: Retos de memoria con `setTimeout` y control de intentos.
- **Finales múltiples**: Desenlaces distintos según rutas y puntuación.

## Explicación general de la lógica implementada

1. **Escenas divididas por nivel**:
   - `nivel1.js`: Inicio del Protocolo.
   - `nivel2.js`: Laberinto de Decisión.
   - `nivel3.js`: Desafío de Reconstrucción.
   - `nivel4.js`: Lógica Fractal.
   - `nivel5.js`: Juicio del Núcleo.
2. **Gestión de decisiones**:
   - Eventos `click` en botones disparan funciones de transición.
   - Uso de condicionales y `switch` para ramificar flujo.
   - Objeto `gameState` almacena elecciones, puntajes y estado actual.
3. **Flujo narrativo**:
   - Diagrama en Mermaid para mapear rutas y finales.
   - Variables globales y funciones modulares para mantener código limpio.

## Aportes de cada integrante

- **Juan Carlos Balcero Torres**: Diseño del nivel 1 y estructura de archivos.
- **Mariana Restrepo Acevedo**: Implementación de secuencias temporizadas y lógica de memoria.
- **Daniel Tapias**: Árboles de decisión y lógica fractal.
- **Matius Monsalve**: Interfaz de usuario, estilos CSS y JavaScript.

## Lecciones aprendidas

- Modularizar la lógica por niveles facilita el mantenimiento.
- Control de flujo robusto usando árboles de decisiones anidados.
- Buenas prácticas en Git y Azure DevOps mejoran la colaboración.

## Estado del proyecto

**En desarrollo**

1. planeacion del proyecto:
   ```bash
   https://dev.azure.com/riwi-cohorte-4/Ritchie/_backlogs/backlog/CtrlAltSupr/Epics
   ```

imagen 
![imagen_proyecto](https://github.com/user-attachments/assets/229cfadd-c51f-48ce-89ff-39209346c3e5)
