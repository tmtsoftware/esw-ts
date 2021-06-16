export type LocationInfo = { hostName: string; port: number }
const defaultLocationInfo: LocationInfo = {
  hostName: 'localhost',
  port: 7654
}
export const LocationConfig = async (): Promise<LocationInfo> => {
  return fetch('/location-url')
    .then((res) => res.json())
    .then<LocationInfo>((json) => JSON.parse(json))
    .catch(() => defaultLocationInfo)
}
