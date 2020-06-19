import request from 'superagent'
import { TokenFactory } from 'esw-ts/dist/src/utils/HttpTransport'

export const post = (url: string, callback: (arg: string) => void, input = '') => {
  request
    .post(url)
    .set('Content-Type', 'application/json')
    .send(input)
    .then(
      res => {
        callback(res.text)
      },
      err => {
        callback(err.response)
      },
    )
}

export const sPost = (url: string, callback: (arg: string) => void, token: TokenFactory, input = '') => {
  request
    .post(url)
    .set('Content-Type', 'text/plain')
    .set('Authorization', `Bearer ${token()}`)
    .send(input)
    .then(
      res => {
        callback(res.text)
      },
      err => {
        callback(err.toString())
      },
    )
}

export const get = (url: string, callback: (res: string)=> void) => {
  request
    .get(url)
    .set('Content-Type', 'application/json')
    .send()
    .then(
      res => {
        console.log(res.text)
        if (res.body) {
          callback(res.text)
        }
      },
      err => console.log(err),
    )
}
