export class ApiErrors extends Error {
  public statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

// class ApiErrors extends Error {
//   public statusCode: number

//   constructor(message: string, statusCode: number) {
//     super(message)
//     this.statusCode = statusCode || 500
//     this.message = message || 'Internal Server Error'
//   }

//   static BadRequest(message: string) {
//     return new ApiErrors(message, 400)
//   }

//   static InternalServerError() {
//     return new ApiErrors('Internal Server Error', 500)
//   }

//   static NotFound(message: string) {
//     return new ApiErrors(message || 'Not Found', 404)
//   }

//   static Forbidden(message: string) {
//     return new ApiErrors(message, 403)
//   }

//   static Unauthorized(message: string) {
//     return new ApiErrors(message, 401)
//   }
// }

export default ApiErrors
