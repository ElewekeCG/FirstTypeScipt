import { v4 as uuidv4 } from "uuid";
import User from "../db/models/user";

import { UserAndCredentials, UserCreationParams } from "./models/auth-models";

export default class AuthService {
    //creating a function called reguster that takes in parameters of type usercreationparams
    //these values will be used by the user db model to create an instance of itself
  public async register(
    params: UserCreationParams
  ): Promise<UserAndCredentials> {
    //we now pass the input values to the create() function below
    const user = await User.create(params);
    const uuid = uuidv4();
    //now we ask the user db model object to create a JWT for us using the uuid we generated above
    const token = user.createJWT(uuid);
    //then we ask the db model to create a refresh tokenusing the same uuid, basically we are connecting the token and the refresh token with the same uuid
    const refresh = user.createRefresh(uuid);
    //next, we return the user object, the token and the refresh token as our result
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
      refresh,
    };
  }
}
