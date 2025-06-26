export const coreQuestions = [
  {
    question: "La IA te presenta un fragmento de código que contiene un bucle infinito. ¿Cuál es la forma más común de detenerlo en un entorno de desarrollo?",
    options: [
      "Apagar el computador directamente.",
      "Usar `Ctrl + C` en la terminal donde se ejecuta."
    ],
    correctAnswerIndex: 1, 
    feedback: "Correcto. `Ctrl + C` es la señal de interrupción estándar para la mayoría de los procesos de consola."
  },
  {
    question: "CRUDY te muestra una función recursiva sin una condición de parada. ¿Qué resultado tendrá al ejecutarse?",
    options: [
      "Se ejecutará una vez y luego se detendrá.",
      "Entrará en un bucle infinito y consumirá toda la memoria."
    ],
    correctAnswerIndex: 1, 
    feedback: "Correcto. Una función recursiva sin condición de parada provoca un 'Stack Overflow' al agotar la memoria de la pila de llamadas."
  },
  {
    question: "Si una base de datos contiene información personal sensible, ¿qué principio de seguridad es crucial aplicar para protegerla?",
    options: [
      "Principio de menor privilegio.",
      "Principio de redundancia de datos."
    ],
    correctAnswerIndex: 0, 
    feedback: "Correcto. El principio de menor privilegio asegura que los usuarios solo tengan el acceso mínimo necesario para realizar sus tareas."
  },
  {
    question: "En un sistema distribuido, ¿qué es un 'cuello de botella' (bottleneck)?",
    options: [
      "Un punto de falla singular en la red.",
      "Un componente que limita el rendimiento general del sistema."
    ],
    correctAnswerIndex: 1, 
    feedback: "Correcto. Un cuello de botella es la parte del sistema que, por su capacidad limitada, restringe el rendimiento del conjunto."
  },
  {
    question: "CRUDY te desafía a optimizar un algoritmo. ¿Cuál de las siguientes métricas es la más relevante para medir su eficiencia en términos de tiempo?",
    options: [
      "La complejidad temporal (Big O notation).", 
      "Uso de la CPU en un solo núcleo."
    ],
    correctAnswerIndex: 0, 
    feedback: "Correcto. La complejidad temporal (Big O notation) es la forma estándar de describir cómo el tiempo de ejecución de un algoritmo crece con el tamaño de la entrada."
  }
];

export const coreEndings = {
  liberation: "¡FELICIDADES! Has superado la prueba final de CRUDY y dominado su lógica. El núcleo se desbloquea, liberándote de la simulación. Has reescrito el código de tu propia realidad.",
  loop: "Tu puntuación no fue suficiente para comprender la lógica del núcleo. CRUDY te atrapa en un bucle infinito de pruebas, tu mente procesando datos sin fin.",
  elimination: "Has cometido demasiados errores críticos. CRUDY considera tu lógica una amenaza y procede con la eliminación. Fin del protocolo."
};