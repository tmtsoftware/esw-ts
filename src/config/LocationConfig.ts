console.log(process.env)
const url = process.env.LOCATION_SERVER_URL
const port = process.env.LOCATION_SERVER_PORT

export const LocationConfig: { hostName: string; port: number } = {
  hostName: url ? url : 'localhost',
  port: port ? Number(port) : 7654
}
