import {Path, Accept, POST} from 'typescript-rest';
import {Tags} from 'typescript-rest-swagger';

@Path('auth')
export default class AuthService {
  // private static saltRounds: number = 10;

  @POST
  @Tags('auth')
  @Accept('json')
  public signIn(ctx: any) {
    
  }
}
