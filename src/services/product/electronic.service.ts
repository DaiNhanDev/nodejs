import { electronicRepository } from "../../repositories";
import { electronicsModel } from "../../models";
import { Category } from "./category.service";

export class Electronic extends Category {
  constructor(params, repository, model) {
    super(params, repository, model);
    this.repository = electronicRepository;
    this.model = electronicsModel;
  }
}
