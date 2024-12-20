import { apiKeyModel } from "../models";
import { IApiKeys } from "../types";
import { BaseRepositoryAbstract } from "./base/base.abstract.repository";

interface IApiKeyRepository {}

class ApiKeyRepository
  extends BaseRepositoryAbstract<IApiKeys>
  implements IApiKeyRepository
{
  constructor(readonly entity: typeof apiKeyModel) {
    super(entity);
  }
}

const apiKeyRepository = new ApiKeyRepository(apiKeyModel);

export { apiKeyRepository };
