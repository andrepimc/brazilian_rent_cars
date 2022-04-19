import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {

    private repository: Repository<Specification>;
    constructor(){
        this.repository = getRepository(Specification);
    }

    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specfication = this.repository.create({
            description,
            name
        });
        await this.repository.save(specfication)
    };

    async findByName(name: string): Promise<Specification> {
        const specfication = await this.repository.findOne({name});
        return specfication;
    }

}

export { SpecificationsRepository };