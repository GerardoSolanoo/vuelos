export function template_Email_Codigos(
  usuario_Email: string,
  Numeros_Confirmacion: string,
  titulo: string,
  cuerpo: string
) {
  const html_boletos = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2; /* Color de fondo */
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px; /* Bordes redondeados */
            background-color: #fff; /* Color de fondo del contenedor */
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Sombra */
          }
          .header {
            text-align: center;
            color: #333; /* Color del encabezado */
            font-size: 24px; /* Tamaño del texto del encabezado */
            margin-bottom: 20px;
          }
          .info {
            margin-bottom: 20px;
            color: #666; /* Color del texto de información */
          }
          .info p {
            margin: 5px 0;
          }
          .download-link {
            text-align: center;
          }
          .image-container {
            text-align: center;
            margin-top: 20px;
          }
        .apple img {
          max-height: 45px; /* Ajusta el valor según lo pequeña que quieras la imagen */
        }
        img {
          max-width: 100%;
          height: auto;
          border-radius: 10px; /* Ajusta el valor del border radius según tus preferencias */
          margin: 0 auto; /* Centra la imagen horizontalmente */
        }
      </style>
      </head>
      
      <body>
        <div class="container">

        <div class="image-container">
        <img src="https://firebasestorage.googleapis.com/v0/b/viajes-5c870.appspot.com/o/plane-aircraft-travel-logo-design-template-vector.jpg?alt=media&token=e4ec1e93-f5e8-45de-924b-8c3b5152cd86" alt="Imagen 1">
        </div>

          <div class="header">
            <h2>${titulo}</h2>
          </div>
          <div class="info">
            <p> Hola! ${usuario_Email}!</p>
          </div>

          <div class="info">
          <p> ${cuerpo} </p>
          <h4> ${Numeros_Confirmacion}  </h4>
        </div>
          <div class="info">
            <p>Si tiene alguna pregunta o necesita asistencia adicional, no dude en ponerse en contacto con nosotros. ¡Estamos aquí para ayudarle!</p>
            <p>Mexicana de aviación</p>
          </div>
        </div>
      </body>
    </html>
`;
  return html_boletos;
}