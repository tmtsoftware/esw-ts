const isRunningInProduction = process.env.NODE_ENV === 'production'

export const LocationConfig: { hostName: string; port: number } = {
  hostName: isRunningInProduction ? 'production-dns-entry.com' : 'localhost',
  port: isRunningInProduction ? 8765 : 7654
}
