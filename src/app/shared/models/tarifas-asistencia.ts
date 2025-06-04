export interface TarifasAsistencia {
  id?: string;
  nombre: string;
  valorInicio: number;
  valorFin: number;
  estado: boolean;
  contrato?: File;
}
