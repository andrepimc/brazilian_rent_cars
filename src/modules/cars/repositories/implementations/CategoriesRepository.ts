import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';
import {getRepository, Repository} from 'typeorm';

// aqui precisamos usar o padrão singleton para não instânciar várias vezes essa mesma classe e criar divergentes repos

class CategoriesRepository implements ICategoriesRepository {

  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }


  async create({ description, name }: ICreateCategoryDTO): Promise<void> {

    const category = this.repository.create({
      description,
      name
    })

    await this.repository.save(category);

  }

  async list(): Promise<Category[]> {
    const categories =await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({name}); //as chaves representam o where
    return category;
  }
}

export { CategoriesRepository };
