export interface User {
  id?: string;
  nombre: string;
  correo: string;
  telefono: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  phoneNumber: string;
  tiendaId: string;
  rolId: string;
  activo: boolean;
  authUid?: string;
}
