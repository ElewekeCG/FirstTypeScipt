//this controller sits between the consumers of the api and the auth service itself
import { StatusCodes } from "http-status-codes";

import { 
  Body, 
  Controller, 
  OperationId, 
  Post, 
  Route, 
  Security,
  Tags 
} from "tsoa";

import {
  UserAndCredentials,
  UserCreationParams,
} from "src/services/models/auth-models";

import AuthService from "src/services/auth-services";

//here we are enforcing our auth controller class to have the route path of /api/v1/auth
@Route("/api/v1/auth")
@Tags("Auth")
//creating the actual authentication controller that extends the TSOA controller class
export class AuthController extends Controller {
    // telling tsoa that it is a post method called register() so we can reach it via the route
  @Post("register")
//   now we assign a name to our function which will be used in the autogenerated tsoa doc
// and will be the name of the function when we generate client code
  @OperationId("registerUser")
//   this is the actual function that will be exposed to the client
  public async register(
    @Body() requestBody: UserCreationParams
  ): Promise<UserAndCredentials> {
    this.setStatus(StatusCodes.CREATED);
    // now we instantiate our auth service and pass the input to it
    return new AuthService().register(requestBody);
  }
  @Post("dummy")
  @OperationId("dummy")
  @Security("jwt")
  public async dummy(): Promise<void> {
      this.setStatus(StatusCodes.OK);
      return Promise.resolve();
  }
}