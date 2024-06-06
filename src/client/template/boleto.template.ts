export function boleto_template(Datos: any, qrData) {
    const html_boleto = `
    <TYPE html>
    <html lang="en">
    <head>
        <title>Yellow Pass</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 120px;
                padding: 20px;
                margin-top: 25;
            }
            .container {
                width: 540px;
                height: 500px;     
                max-width: 300px;    
            }
            .header {
                text-align: center;
                color: #f1c40f;
                font-size: 24px;
                margin:0;
            }
            .content {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .left, .right{
                padding: 10px;
                box-sizing: border-box;
                border-radius: 10px;
                height: 500px;
                width: 520px;
                box-shadow: 10px 0px 15px -5px rgba(0, 0, 0, 0.1), -10px 0px 15px -5px rgba(0, 0, 0, 0.1);
            }
            .rigth{
                background: linear-gradient(to bottom right, #FFD700, #FFA500);
            }
            .left {
                background-color: #E9E9E9;
                padding: 50px;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-gap:40px; 
                background: linear-gradient(to bottom left, #EBEBEB, #fff);
            }

            .right {
                background-color: #FFCC00;
            }
        p {
            font-weight: 600;
            font-size: 20px;
            color: #979797;
            margin-bottom: 5px; /* Ajuste de margen inferior */
        }
        h3 {
            color: #ADADAD;
            font-size: 20px;
            margin-top: 0; /* Ajuste de margen superior */
        }
            .qr-code img{
                width: 280px;
                border-radius: 15px;
                margin: 0 110px;
            }
            .qr-code p{
                font-size: 18px;
                color: #ffff;
                margin: 30px 70px;
            }
            .asiento{
                margin-top: 30px;
            }
        </style>
    </head>
    <body>
        <div class="container">

            <div class="content">
             <div class="right">
                         <div class="header">
                <h2 style="background-color: transparent; color: #Ffff; font-weight: 800; ">Yellow Pass</h1>
            </div>
                    <div class="qr-code">
                           <img src="${qrData}" alt="QR Code">
                        <p>Presente este QR al abordar el autobús</p>
                    </div>
                </div>
                <div class="left">
                    <div style="position: absolute; top: 590px;">
                        <h3 >Nombre: </h3>
                        <p >${Datos.Nombre} ${Datos.Apellidos}</p>
                        <hr style="width: 430px; position: absolute; top: 70px;"> 
                        <hr style="width: 430px; position: absolute; top: 300px;"> 
                    </div>
                    <div class="info" style="padding-top: 85px;" >
                        <h3>Hora:</h3>
                        <p>${Datos.Hora_Salida}</p>
                        <h3>Origen: </h3>
                        <p>${Datos.Origen_Viaje}</p>
                        <h3>Precio:</h3>
                        <p>${Datos.Precio}</p>
                        <h3 class="asiento">Número de Asiento: </h3>
                        <p>${Datos.Asiento}</p>
                    </div>
                    <div class="info" style="padding-top: 85px;" >
                        <h3>Fecha: </h3>
                        <p>${Datos.Fecha_Salida}</p>
                        <h3>Destino:</h3>
                        <p>${Datos.Destino_Viaje}</p>
                        <h3>Puerta:</h3>
                        <p>${Datos.Puerta}</p>
                        <h3 class="asiento">Tipo de Asiento:</h3>
                        <p>${Datos.Categoria}</p>
                    </div>
                </div>  
            </div>
            </div>
        </div>
    </body>
    </html>
       `;

    return html_boleto;
}