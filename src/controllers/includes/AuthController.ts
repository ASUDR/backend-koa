import Router from '@koa/router';
import { AuthService } from '../../services';
import {
  routerExceptionsCatcher,
  Context, BaseApiSchema
} from '../../utils';

const router: Router = new Router({
  prefix: '/auth'
});
export default class AuthController {
  private static service: AuthService = new AuthService();

  @routerExceptionsCatcher
  public static async signIn(ctx: Context): Promise<void> {
    try {
      const result: BaseApiSchema = {
        success: true,
        data: {
          id: ctx.session!.passport.user
        }
      };

      ctx.body = result;
    } catch (err) {
      console.error(err);
    }
  }

  @routerExceptionsCatcher
  public static async logout(ctx: Context & { logout: Function }): Promise<void> {
    await ctx.logout();
    ctx.session = null;

    const result: BaseApiSchema = {
      success: true
    };

    ctx.body = result;
  }
}
