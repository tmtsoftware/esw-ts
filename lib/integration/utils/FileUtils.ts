import fs from 'fs'
import path from 'path'
import { eventually } from './eventually'

export const pathDir = (rPath: string) => path.resolve(__dirname, rPath)

export const waitFor = (path: string) =>
  eventually(
    () =>
      new Promise((res, rej) => {
        if (fs.existsSync(path)) return res()
        else return rej()
      })
  )
