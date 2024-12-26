import { clothingRepository } from "../../repositories";
import { Category } from "./category.service";

export class Clothing extends Category {
  constructor(params, repository) {
    super(params, repository);
    this.repository = clothingRepository;
  }
}
