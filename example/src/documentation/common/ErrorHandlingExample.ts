const someService = {
  api: () => {}
}

//#generic-error
import { ServiceError } from '@tmtsoftware/esw-ts'

try {
  const response = await someService.api()
} catch (e) {
  if (e instanceof ServiceError) {
    console.log(e.errorType)
    console.log(e.message)
    console.log(e.status)
    console.log(e.statusText)
    // Generic error has following fields
    //   `status` : Http status (400, 403,404, 500, etc)
    //   `statusText` : Text corresponding to the `status` field
    //   `message`: message from backend server. (for example: this message field will contain `Event server is unavailable` in case of GatewayException of type `EventServerUnavailable`)
    //   `errorType` : A type of `GatewayException` or `"TransportError"`
  }
}
//#generic-error
