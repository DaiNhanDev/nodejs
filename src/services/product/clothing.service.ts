import { clothingRepository } from "../../repositories";
import { clothingsModel } from "../../models";
import { Category } from "./category.service";

export class Clothing extends Category {
  constructor(params, repository, model) {
    super(params, repository, model);
    this.repository = clothingRepository;
    this.model = clothingsModel;
  }
}
