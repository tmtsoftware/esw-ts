import { TokenFactory } from 'esw-ts'

function handleErr(response: Response) {
  if (response.ok) return response
  else throw new Error(response.statusText)
}

export const post = async (
  url: string,
  callback: (arg: string) => void,
  input = ''
) => {
  const init = {
    method: 'POST',
    headers: new Headers([['Content-Type', 'application/json']]),
    body: input
  }
  return callback(await handleErr(await fetch(url, init)).text())
}

export const sPost = async (
  url: string,
  callback: (arg: string) => void,
  token: TokenFactory,
  input = ''
) => {
  const init = {
    method: 'POST',
    headers: new Headers([
      ['Content-Type', 'application/json'],
      ['Authorization', `Bearer ${token()}`]
    ]),
    body: input
  }
  return callback(await handleErr(await fetch(url, init)).text())
}

export const get = async (url: string, callback: (res: string) => void) => {
  const init = {
    method: 'GET',
    headers: new Headers([['Content-Type', 'application/json']])
  }
  return callback(await handleErr(await fetch(url, init)).text())
}
