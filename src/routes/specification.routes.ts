import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "../modules/cars/usecases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();


const createSpecificationController = new CreateSpecificationController();


specificationsRoutes.post('/', createSpecificationController.handle)

export {specificationsRoutes};
