import { AuthService } from '../../services';
import {
  routerExceptionsCatcher,
  Context, Response
} from '../../utils';


export default class AuthController {
  private static service: AuthService = new AuthService();

  @routerExceptionsCatcher
  public static async signIn(ctx: Context): Promise<void> {
    ctx.body = new Response(true, { id: ctx.session!.passport.user });
  }

  @routerExceptionsCatcher
  public static async logout(ctx: Context & { logout: Function }): Promise<void> {
    await ctx.logout();
    ctx.session = null;
    ctx.body = new Response(true);
  }
}
