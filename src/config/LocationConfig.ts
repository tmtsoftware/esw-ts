export type LocationInfo = { hostName: string; port: number }
const defaultLocationInfo: LocationInfo = {
  hostName: 'localhost',
  port: 8080
}
export const LocationConfig = async (): Promise<LocationInfo> => {
  return fetch('/location-url')
    .then<LocationInfo>((res) => res.json())
    .catch(() => defaultLocationInfo)
}
