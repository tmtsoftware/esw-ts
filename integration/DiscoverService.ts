import { Location } from 'clients/location/models/Location'
import { ListEntries } from 'clients/location/models/PostCommand'
import { Prefix } from 'models'
import { post } from 'utils/post'

const fetchLocation = (prefix: Prefix) => {
  return post<ListEntries, Location[]>('localhost', 7654, new ListEntries())
    .catch(() => {
      console.log(`${prefix.componentName} service not found`)
      return []
    })
    .then(getOnfulfilled(prefix))
}

const match = (prefix: Prefix) => {
  return (location: Location) => {
    const prefix1 = location.connection.prefix.toString()
    const prefix2 = prefix.toJSON().toString()

    return prefix1 === prefix2
  }
}

const getOnfulfilled = (prefix: Prefix) => {
  return async (result: Location[]) => {
    if (result.length > 0 && result.some(match(prefix))) {
      await callUntil(prefix, true)
    } else {
      await callUntil(prefix)
    }
  }
}

export const callUntil = (prefix: Prefix, resolved = false) => {
  return new Promise((resolve) => {
    if (resolved) {
      console.log(`${prefix.componentName} is resolved`)
      resolve()
    } else {
      setTimeout(() => fetchLocation(prefix).then(resolve), 1000)
    }
  })
}
