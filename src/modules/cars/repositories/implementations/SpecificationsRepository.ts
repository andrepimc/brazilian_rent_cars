import { Specification } from "../../model/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {

    private specifications: Specification[];

    constructor(){
        this.specifications = [];
    }

    create({ description, name }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, { //passa as infos de dentro do array para o objeto specification
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);
    }

    findByName(name: string): Specification {
        const specfication = this.specifications.find(specification => specfication.name === name);
        return specfication;
    }

}

export { SpecificationsRepository };