export type Spawned = {
  _type: 'Spawned'
}

export type Killed = {
  _type: 'Killed'
}

export type Failed = {
  _type: 'Failed'
  msg: string
}

export type SpawnResponse = Spawned | Failed
export type KillResponse = Killed | Failed
