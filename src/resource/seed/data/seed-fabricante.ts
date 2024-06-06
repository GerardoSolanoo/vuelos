interface Fabricante {
  fabricante_Nombre: string;
  fabricante_Descripcion: string;
  fabricante_Telefono: string;
  fabricante_Email: string;
}

export function registrarFabricantes() {
  const fabricantes_Nombres: string[] = [
    'AeroSky Dynamics',
    'Global Jets Industries',
    'Skyline Aviation Manufacturing',
    'Horizon Aerospace',
    'Pioneer Plane Corp',
    'Nova Wing Technologies',
    'Eagle Aeronautics',
    'Orion Aircraft Corporation',
    'Phantom Aviation',
    'Meridian Airframes',
    'VistaJet Engineering',
    'Celestial Craftworks',
    'Aether Aviation',
    'Nimbus Aircraft Systems',
    'StratoFlyer Inc',
  ];

  const fabricantes_generados = [];

  for (let i = 0; i < 100; i++) {
    // Tomar fabricante random
    const fabricante = generar_Fabricantes(
      fabricantes_Nombres[
        Math.floor(Math.random() * fabricantes_Nombres.length)
      ],
    );
    fabricantes_generados.push(fabricante);
  }

  return fabricantes_generados;
}

function generar_Fabricantes(fabricante: string) {
  const fabricante_Nombre = fabricante;
  const fabricante_Descripcion =
    fabricante_Nombre +
    ' es un fabricante de aviones que se especializa en la fabricación de aviones de pasajeros y carga.';
  const fabricante_Telefono = generar_Numeros_Telefono();
  const fabricante_Email = generar_Correos_Electronicos(fabricante_Nombre);
  const Fabricante: Fabricante = {
    fabricante_Nombre: fabricante_Nombre,
    fabricante_Descripcion: fabricante_Descripcion,
    fabricante_Telefono: fabricante_Telefono,
    fabricante_Email: fabricante_Email,
  };
  return Fabricante;
}

function generar_Correos_Electronicos(fabricantes_Nombre: string) {
  const correos_Array = [
    '@gmail.com',
    '@yahoo.com',
    '@outlook.com',
    '@hotmail.com',
    '@protonmail.com',
    '@aol.com',
    '@mail.com',
    '@icloud.com',
    '@zoho.com',
    '@yandex.com',
  ];

  return (
    fabricantes_Nombre.toLowerCase().replace(/ /g, '') +
    correos_Array[Math.floor(Math.random() * correos_Array.length)]
  );
}

function generar_Numeros_Telefono() {
  const numeros = [];
  for (let i = 0; i < 10; i++) {
    numeros.push(Math.floor(Math.random() * 10));
  }
  return numeros.join('');
}
