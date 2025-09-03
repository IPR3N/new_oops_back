import { Crop } from "src/crop/entities/crop.entity";
import { CropVariety } from "src/crop_variety/entities/crop_variety.entity";
import { ProjectMemberShip } from "src/project-member-ship/entities/project-member-ship.entity";
import { User } from "src/user/entities/user.entity";

export class CreateProjectDto {
    id: number;
    nom: string;
    description: string;
    start_date: Date;
    end_date: Date;
    // status: string;
    owner: User
    crop_id: number
    cropVariety_id: number
    memberShip?: string | number[];
    image_url: string;
    estimated_quantity_produced: string;
    base_price: string;
    created_at: Date;
    updated_at: Date;

}

