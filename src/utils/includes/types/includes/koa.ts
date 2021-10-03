import Koa from 'koa';

export interface Context extends Koa.ExtendableContext {
  login(user: any, options?: any): Promise<void>;
  logout(): void;

  isAuthenticated(): boolean;
  isUnauthenticated(): boolean;
}
export type Next = Koa.Next;
