// import { AuthService } from '../../services';
import {
  routerExceptionsCatcher,
  Context, Response
} from '../../utils';

export default class AuthController {
  // private static service: AuthService = new AuthService();

  @routerExceptionsCatcher
  public static async signIn(ctx: Context): Promise<void> {
    new Response(ctx, true, { id: ctx.session?.passport.user.id });
  }

  @routerExceptionsCatcher
  public static async logout(ctx: Context): Promise<void> {
    await ctx.logout();
    ctx.session = null;
    new Response(ctx, true);
  }
}
