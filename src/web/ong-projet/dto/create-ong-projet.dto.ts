export class CreateOngProjetDto {
  nom: string;
  description: string;
  beneficiaireIds?: number[];
  partenaireId: number;
  regionId: number;
  dateDebut: Date;
  dateFinPrevue: Date;
  createdAt: Date;
  updatedAt: Date;
}
