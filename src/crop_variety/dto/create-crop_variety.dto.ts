import { Crop } from "src/crop/entities/crop.entity";

export class CreateCropVarietyDto {
    id: number;
    nom: string;
    description: string;
    standard_temperature: string;
    standard_humidity: string;
    days_to_croissant: number;
    days_to_germinate: number;
    days_to_maturity: number;
    crop: number;
    created_at: Date;
    updated_at: Date;
}

