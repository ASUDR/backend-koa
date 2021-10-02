export default class Response {
  constructor(
    public success: boolean,
    public data?: any,
    public code: number = 200
  ) {}
}
