import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Tipo_Transaccion } from '../enums/tipo_Transaccion.enum';

@Injectable()
export class TransaccionService {
  constructor(private connection: Connection) {}

  async transaction(
    tipo: Tipo_Transaccion,
    entidad: any,
    datos_entidad: any,
    campo_actualizar?: string,
    campo_id?: string,
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    switch (tipo) {
      case Tipo_Transaccion.Guardar:
        try {
          const resultado = await queryRunner.manager.save(
            entidad,
            datos_entidad,
          );
          await queryRunner.commitTransaction();
          return {
            mensaje: 'Éxito',
            resultado: resultado,
          };
        } catch (error) {
          await queryRunner.rollbackTransaction();
          return 'Error';
        } finally {
          await queryRunner.release();
        }
      case Tipo_Transaccion.Guardar_Con_Parametros:
        try {
          await queryRunner.manager.save(entidad, {
            [campo_actualizar]: datos_entidad,
          });
          await queryRunner.commitTransaction();
          return 'Éxito';
        } catch (error) {
          await queryRunner.rollbackTransaction();
          return 'Error';
        } finally {
          await queryRunner.release();
        }
      case Tipo_Transaccion.Actualizar:
        try {
          await queryRunner.manager.update(entidad, campo_id, datos_entidad);
          await queryRunner.commitTransaction();
          return 'Éxito';
        } catch (error) {
          await queryRunner.rollbackTransaction();
          return 'Error';
        } finally {
          await queryRunner.release();
        }
      case Tipo_Transaccion.Actualizar_Con_Parametros:
        try {
          await queryRunner.manager.update(entidad, campo_id, {
            [campo_actualizar]: datos_entidad,
          });
          await queryRunner.commitTransaction();
          return 'Éxito';
        } catch (error) {
          await queryRunner.rollbackTransaction();
          return 'Error';
        } finally {
          await queryRunner.release();
        }
      case Tipo_Transaccion.Eliminar:
        try {
          await queryRunner.manager.delete(entidad, datos_entidad);
          await queryRunner.commitTransaction();
          return 'Éxito';
        } catch (error) {
          await queryRunner.rollbackTransaction();
          return 'Error';
        } finally {
          await queryRunner.release();
        }
      case Tipo_Transaccion.Eliminar_Con_Parametros:
        try {
          await queryRunner.manager.delete(entidad, {
            [campo_actualizar]: campo_id,
          });
          await queryRunner.commitTransaction();
          return 'Éxito';
        } catch (error) {
          await queryRunner.rollbackTransaction();
          return 'Error';
        } finally {
          await queryRunner.release();
        }
      case Tipo_Transaccion.Consultar:
        try {
          return await queryRunner.manager.find(entidad);
        } catch (error) {
          return 'Error';
        } finally {
          await queryRunner.release();
        }
      case Tipo_Transaccion.Consultar_Con_Parametros:
        try {
          return await queryRunner.manager.find(entidad, {
            where: { [campo_actualizar]: campo_id },
          });
        } catch (error) {
          return 'Error';
        } finally {
          await queryRunner.release();
        }
      default:
        break;
    }
  }
}
