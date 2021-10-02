const httphttpStatusCodes: {
  OK: number,
  BAD_REQUEST: number,
  UNAUTHORIZED: number,
  NOT_FOUND: number,
  TOO_MANY_REQUESTS: number,
  INTERNAL_SERVER: number
} = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER: 500
};

export default httphttpStatusCodes;
