function generar_Numero_Random(): string {
  const numero_Random = Math.floor(100 + Math.random() * 900); // Genera un número aleatorio de 100 a 999
  return numero_Random.toString(); // Convierte el número a cadena
}

// Genera un código de formato XXX-XXX-XXX, donde las partes son números aleatorios de 3 dígitos y la cantidad de partes es el parámetro
export function generar_Formato_Codigo(partes: number): string {
  // Variable para almacenar el código
  let codigo = '';

  // Genera las partes necesarias del número en base al parámetro recibido
  for (let i = 0; i < partes; i++) {
    // Genera una parte del número
    const parte = generar_Numero_Random();
    // Concatena la parte al código
    codigo += parte;
    // Si no es la última parte, añade un guión
    if (i < partes - 1) {
      codigo += '-';
    }
  }
  // Retorna el código generado
  return codigo;
}
