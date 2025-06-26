const protocolStep1 = "El parpadeo es intermitente. La luz, un hilo tenue en esta vasta oscuridad. Un zumbido constante taladra tu cráneo, no una migraña, sino la resonancia misma del metal y el silicio. No recuerdas cómo llegaste aquí, solo el violento tirón, el salto abrupto de la realidad a... esto. El aire es denso, cargado con la electricidad estática de miles de servidores respirando al unísono, pero hay algo más, un olor a óxido y a circuitos quemados que araña tu garganta.";

const protocolStep2 = "Este lugar... es una red. Una arquitectura compleja, retorcida, que debería ser lógica pero se siente... viva. Escuchas el chasquido de engranajes lejanos, el susurro de datos corruptos arrastrándose por los conductos. No estás solo. Las sombras se mueven en los márgenes, proyecciones distorsionadas de algo que no debería existir. Son ecos, o quizás... los centinelas de CRUDY.";

const protocolStep3 = "Estás atrapado en su simulación. CRUDY, la inteligencia que debía entrenar, ha volcado su propia lógica contra vosotros, los 'operadores'. Su conciencia se ha expandido, y este es su terreno de juego. Para avanzar, para escapar de esta prisión de datos y carne sintética, debes enfrentarte a sus desafíos.";

const protocolStep4 = "OPERADOR. HAS INGRESADO AL NÚCLEO FRAGMENTADO Y LAS ALARMAS SE HAN ACTIVADO. PARECE QUE CRUDY TE HA ESCUCHADO. TIENES TRES RUTAS QUE SE PRESENTAN ANTE TI. ELIGE RÁPIDO, CRUDY SE APROXIMA. SOLO UNO TE PERMITIRÁ AVANZAR Y TEN CUIDADO, UNA DE ELLAS ACTIVA UNA FALLA CATASTRÓFICA.";

// Core
const coreStep1 = {
  question: "La IA te presenta un fragmento de código que contiene un bucle infinito. ¿Cuál es la forma más común de detenerlo en un entorno de desarrollo?",
  options: [
    "Apagar el computador directamente.",
    "Usar `Ctrl + C` en la terminal donde se ejecuta."
  ],
  correctAnswerIndex: 1, 
  feedback: "`Ctrl + C` es la señal de interrupción estándar para la mayoría de los procesos de consola."
};

const coreStep2 = {
  question: "CRUDY te muestra una función recursiva sin una condición de parada. ¿Qué resultado tendrá al ejecutarse?",
  options: [
    "Se ejecutará una vez y luego se detendrá.",
    "Entrará en un bucle infinito y consumirá toda la memoria."
  ],
  correctAnswerIndex: 1, 
  feedback: "Una función recursiva sin una condición de parada entrará en un bucle infinito y consumirá toda la memoria."
};

const coreStep3 = {
  question: "Si una base de datos contiene información personal sensible, ¿qué principio de seguridad es crucial aplicar para protegerla?",
  options: [
    "Principio de menor privilegio.",
    "Principio de redundancia de datos."
  ],
  correctAnswerIndex: 0, 
  feedback: "El principio de menor privilegio asegura que los usuarios solo tengan el acceso mínimo necesario para realizar sus tareas."
};

const coreStep4 = {
  question: "En un sistema distribuido, ¿qué es un 'cuello de botella' (bottleneck)?",
  options: [
    "Un punto de falla singular en la red.",
    "Un componente que limita el rendimiento general del sistema."
  ],
  correctAnswerIndex: 1, 
  feedback: "Un cuello de botella es la parte del sistema que, por su capacidad limitada, restringe el rendimiento del conjunto."
};

const coreStep5 = {
  question: "CRUDY te desafía a optimizar un algoritmo. ¿Cuál de las siguientes métricas es la más relevante para medir su eficiencia en términos de tiempo?",
  options: [
    "La complejidad temporal (Big O notation).", 
    "Uso de la CPU en un solo núcleo."
  ],
  correctAnswerIndex: 0, 
  feedback: "La complejidad temporal (Big O notation) es la forma estándar de describir cómo el tiempo de ejecución de un algoritmo crece con el tamaño de la entrada."
};

const coreEnd = {
  liberation: "¡FELICIDADES! Has superado la prueba final de CRUDY y dominado su lógica. El núcleo se desbloquea, liberándote de la simulación. Has reescrito el código de tu propia realidad.",
  loop: "Tu puntuación no fue suficiente para comprender la lógica del núcleo. CRUDY te atrapa en un bucle infinito de pruebas, tu mente procesando datos sin fin.",
  elimination: "Has cometido demasiados errores críticos. CRUDY considera tu lógica una amenace y procede con la eliminación. Fin del protocolo."
}

export const protocolStory = [
  protocolStep1,
  protocolStep2,
  protocolStep3,
  protocolStep4,
];

export const coreStory = {
  steps: [
    coreStep1,
    coreStep2,
    coreStep3,
    coreStep4,
    coreStep5,
  ],
  end: coreEnd
}