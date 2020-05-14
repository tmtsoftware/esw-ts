import { post } from 'utils/post'
import { ListEntries } from 'clients/location/models/PostCommand'
import { Location } from 'clients/location/models/Location'
import { Prefix } from 'models'

let timer: NodeJS.Timeout

const fetchLocation = (prefix: Prefix) => {
  post<ListEntries, Location[]>('localhost', 7654, new ListEntries())
    .catch((_: Error) => {
      console.log(`${prefix.componentName} service not found`)
      return []
    })
    .then(getOnfulfilled(prefix))
}

function getOnfulfilled(prefix: Prefix) {
  return async (result: Location[]) => {
    if (result.length > 0) {
      console.log('connection', result[0].connection)
      if (result[0].connection.prefix === prefix) {
        await callUntil(prefix, true)
      }
    } else {
      await callUntil(prefix)
    }
  }
}

export const callUntil = (prefix: Prefix, resolved = false) => {
  return new Promise((resolve) => {
    if (resolved) {
      clearTimeout(timer)
      resolve()
    } else {
      timer = setTimeout(() => fetchLocation(prefix), 1000)
    }
  })
}
