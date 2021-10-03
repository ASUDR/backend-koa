import Koa from 'koa';
import passport from 'koa-passport';
import { koaSwagger } from 'koa2-swagger-ui';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import router from './routes/mainRouter';
import config from './configs/koaSession';
import { Context, Next } from './utils';
import swaggerOptions from './swagger.json';
import './db';

const app: Koa = new Koa();
const port: number = +process.env.BACKEND_PORT!;

app.keys = [process.env.KOA_KEY!];
app.use(async (ctx: Context, next: Next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  await next();
});
app.use(bodyParser({ strict: false }));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
app.use(session(config, app));
app
  .use(router.routes())
  .use(router.allowedMethods());
app.use(
  koaSwagger({
    swaggerOptions: {
      spec: swaggerOptions
    }
  })
);

if (process.env.NODE_ENV === 'production') {
  app.proxy = true;
}

app.listen(port, () => console.log(
  `listening on port ${port}, timestamp ${new Date()}`
));
