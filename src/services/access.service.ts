import { shopModel } from "models/shop.model"
import { encryptSync } from "utils/encrypt";
import { ROLE_SHOP } from "../constants";
import crypto from 'crypto';

class AccessService {
    static signUp({ email, name, password }) {
        return new Promise(async (resolve, reject) => {
            const findEmail = await shopModel.findOne(({ email })).lean();
            if (!!findEmail) {
                return resolve({
                    code: 'xxxx',
                    message: 'Shop already registered!'
                })
            }
            const passwordHash = encryptSync(password);

            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: [ROLE_SHOP.SHOP]
            });

            if(!!newShop) {

            }
        })
    }
}

export { AccessService }