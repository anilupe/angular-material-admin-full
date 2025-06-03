export interface Store {
  id?: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  legalRepresentative: string;
  legalRepresentativeId: string;
  ruc: string;
  telefono: string;
  email: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
