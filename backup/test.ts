// import User from 'models/user'
import { request, summary, query, path, body, tags } from 'koa-swagger-decorator'

const testTag = tags(['test'])

const userSchema = {
  name: { type: 'string', required: true },
  gender: { type: 'string', required: false, example: 'male' },
  groups: {
    type: 'array',
    required: true,
    items: { type: 'string', example: 'group1' }, // item's type will also be validated
  },
}

export default class Test {
  @request('get', '/users')
  @summary('get user list')
  @testTag
  @query({
    type: { type: 'number', required: true, default: 1, description: 'type' },
  })
  static async getUsers(ctx: any) {
    const users = [{ name: 'sardor' }]
    ctx.body = { users }
  }

  @request('get', '/users/{id}')
  @summary('get user info by id')
  @testTag
  @path({
    id: { type: 'number', required: true, default: 1, description: 'id' },
  })
  static async getUser(ctx: any) {
    // const { id } = ctx.validatedParams
    const user = { name: 'sardor' }
    ctx.body = { user }
  }

  @request('post', '/users')
  @testTag
  @body(userSchema)
  static async postUser(ctx: any) {
    // const body = ctx.request.body;
    const body = ctx.validatedBody
    ctx.body = { result: body }
  }

  static async temp(ctx: any) {
    ctx.body = { result: 'success' }
  }
}