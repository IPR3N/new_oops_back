export class CreateTaskDto {
    id: number;
    titre: string;
    description: string;
    priority: string;
    start_date: Date;
    end_date: Date;
    status: string;
    taskOwner: number
    project: number
    created_at: Date;
    updated_at: Date;
}
