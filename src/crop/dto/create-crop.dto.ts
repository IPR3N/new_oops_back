import { CropVariety } from "src/crop_variety/entities/crop_variety.entity";
import { Project } from "src/project/entities/project.entity";

export class CreateCropDto {
    id: number
    nom: string;
    description: string;
    planting_date: Date;
    fertilizer_used?: string;
    yield?: string;
    water_usage?: string;
    projects?: Project[];
    cropVariety?: CropVariety[]
}

