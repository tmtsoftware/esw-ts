import {
  ConfigData,
  ConfigFileInfo,
  ConfigFileRevision,
  ConfigId,
  ConfigMetadata,
  ConfigService,
  FileType,
  Option
} from '@tmtsoftware/esw-ts'

//#config-data

const dataArray = ['file-contents']

const configDataFromBlob: ConfigData = ConfigData.from(new Blob(dataArray))
const configDataFromFile: ConfigData = ConfigData.fromFile(
  new File(dataArray, 'filename')
)
const configDataFromString: ConfigData = ConfigData.fromString(
  'someFileDataAsString'
)

//accessing data
const dataAsBlobContent: Blob = configDataFromString.toBlob()

// notice use of async-await here. because this is an IO read call
const readData = async (configData: ConfigData) => {
  const dataAsString: string = await configData.fileContentAsString()
}
//#config-data
//#models

// Most probably you will not have to create these models in applications.
// since it will be created at backend and you will be receiving these models from backend.
const configId: ConfigId = new ConfigId('some-id')

const configFileInfo: ConfigFileInfo = {
  path: 'filepath',
  id: configId,
  comment: 'some comment',
  author: 'author'
}

const configFileRevision: ConfigFileRevision = {
  id: configId,
  comment: 'some comment',
  author: 'author',
  time: '2017-05-17T08:00:24.246Z'
}

const configMetadata: ConfigMetadata = {
  repoPath: 'some/path',
  annexPath: 'some/other/path',
  maxConfigFileSize: '10MB',
  annexMinFileSize: '20MB'
}
const annexFileType: FileType = 'Annex'
const normalFileType: FileType = 'Normal'
//#models
const auth = {
  token: ''
}
//#config-service
const tokenFactory = () => auth.token

const configService: ConfigService = await ConfigService(tokenFactory)
//#config-service

//#create
const path = 'esw/sequencer/obsMode.conf'
const comment = 'observation configuration on 21st november 2020'
const author = 'OCS-Sequencer admin: Dave'
const data = `
esw-sm {
  obsModes: {
    IRIS_Darknight: {
      resources: [IRIS, TCS, NFIRAOS]
      sequencers: [IRIS, ESW, TCS]
    },
    IRIS_Cal: {
      resources: [IRIS, NSCU, NFIRAOS]
      sequencers: [IRIS, ESW, AOESW]
    },
    WFOS_Cal: {
      resources: [WFOS]
      sequencers: [WFOS, ESW]
    }
  }
}
`
const configData = ConfigData.fromString(data)

const sequencerConfigId: ConfigId = await configService.create(
  path,
  configData,
  false,
  comment
)
//#create
//#update
const filePath = 'esw/sequencer/obsMode.conf'
const commentOnUpdate = 'observation configuration on 23rd november 2020'
const updatedData = `
esw-sm {
  obsModes: {
    IRIS_Darknight: {
      resources: [IRIS]
      sequencers: [IRIS]
    },
    IRIS_Cal: {
      resources: [IRIS, NSCU, NFIRAOS]
      sequencers: [IRIS, ESW, AOESW]
    }
  }
}
`
const updatedConfigData = ConfigData.fromString(updatedData)

const newSequencerConfigId: ConfigId = await configService.update(
  filePath,
  updatedConfigData,
  commentOnUpdate
)
//#update
//#get-active
const file = 'esw/sequencer/obsMode.conf'

const maybeActiveConfigData: Option<ConfigData> = await configService.getActive(
  file
)
//#get-active

//#get-latest
const filepath = 'esw/sequencer/obsMode.conf'
const maybeLatestConfigData: Option<ConfigData> = await configService.getLatest(
  filepath
)
//#get-latest

const d = async () => {
  //#get-by-id
  const configId: ConfigId = await configService.update(
    filePath,
    updatedConfigData,
    commentOnUpdate
  )

  const maybeConfigData: Option<ConfigData> = await configService.getById(
    filepath,
    configId
  )
  //#get-by-id
}
const dd = async () => {
  //#get-by-time
  const configId1: ConfigId = await configService.create(
    filePath,
    updatedConfigData,
    false,
    commentOnUpdate
  )

  const beforeUpdate = new Date()

  const configId2: ConfigId = await configService.update(
    filePath,
    configData,
    commentOnUpdate
  )
  const afterUpdate = new Date()

  const maybeConfigData: Option<ConfigData> = await configService.getByTime(
    filepath,
    beforeUpdate
  )
  // maybeConfigData == updatedConfigData (i.e Initial revision of config)

  const newlyUpdatedData: Option<ConfigData> = await configService.getByTime(
    filepath,
    afterUpdate
  )
  // newlyUpdatedData == configData (i.e Latest revision of config)

  //#get-by-time
}

//#exists
const exists: boolean = await configService.exists(filePath)

const exist: boolean = await configService.exists(filePath, configId)
//#exists
const ddd = async () => {
  //#delete
  const filePath = 'esw/sequencer/obsMode.conf'

  await configService.delete(filePath, 'deleting the invalid config entry')
  //#delete
}
//#list
const allAnnexFilesInfo: ConfigFileInfo[] = await configService.list({
  type: 'Annex'
})
const allNormalFilesInfo: ConfigFileInfo[] = await configService.list({
  type: 'Normal'
})
const allHcdAnnexFilesInfo: ConfigFileInfo[] = await configService.list({
  type: 'Annex',
  pattern: '.*hcd.*'
})
const allConfNormalFilesInfo: ConfigFileInfo[] = await configService.list({
  type: 'Normal',
  pattern: '.*conf'
})
//#list
const dddd = async () => {
  //#history
  const filePath = 'esw/sequencer/obsMode.conf'
  const from = new Date(2019, 12, 31)
  const to = new Date(2020, 12, 31)

  // upto 200 file revisions from 31st dec 2019 - 31st dec 2020 will be fetched
  const fileRevisions: ConfigFileRevision[] = await configService.history(
    filePath,
    from,
    to,
    200
  )
  //#history
}

const g = async () => {
  //#history-active
  const filePath = 'esw/sequencer/obsMode.conf'
  const from = new Date(2019, 12, 31)
  const to = new Date(2020, 12, 31)

  // upto 200 active file revisions from 31st dec 2019 - 31st dec 2020 will be fetched
  const activeFileRevisions: ConfigFileRevision[] =
    await configService.historyActive(filePath, from, to, 200)
  //#history-active
}

const gg = async () => {
  //#set-active-version
  const filePath = 'esw/sequencer/obsMode.conf'
  const id: ConfigId = await configService.create(
    path,
    configData,
    false,
    comment
  )
  const commentWhileSetting = `Making ${id} active on 1st dec 2020`

  await configService.setActiveVersion(filePath, id, commentWhileSetting)
  //#set-active-version
}

const ggg = async () => {
  //#reset-active-version
  const filePath = 'esw/sequencer/obsMode.conf'
  const id: ConfigId = await configService.create(
    path,
    configData,
    false,
    comment
  )
  const commentWhileResetting = `Making ${id} active version to latest as of 1st dec 2020`

  await configService.resetActiveVersion(filePath, commentWhileResetting)
  //#reset-active-version
}
const gggg = async () => {
  //#get-active-version
  const filePath = 'esw/sequencer/obsMode.conf'

  const maybeConfigId: Option<ConfigId> = await configService.getActiveVersion(
    filePath
  )
  //#get-active-version
}

const ff = async () => {
  //#get-active-by-time
  const filePath = 'esw/sequencer/obsMode.conf'
  const at = new Date(2019, 12, 31)

  const maybeConfigData: Option<ConfigData> =
    await configService.getActiveByTime(filePath, at)
  //#get-active-by-time
}

//#get-metadata
const metadata: ConfigMetadata = await configService.getMetadata()
//#get-metadata
