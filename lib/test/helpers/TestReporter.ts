import type { BaseReporter } from '@jest/reporters'
import type { Context, Test } from '@jest/reporters/build/types'
import type { AggregatedResult, TestResult } from '@jest/test-result'
// eslint-disable-next-line import/no-nodejs-modules
import fs from 'fs'
// eslint-disable-next-line import/no-nodejs-modules
import os from 'os'
// eslint-disable-next-line import/no-nodejs-modules
import path from 'path'
/**
 *
 * available arguments to this reporter
 * append=true/false
 * output=relative-path-to-output-file
 * example usage :
 * > jest unit --reporters=./dist/test/helpers/testReporter.js -- append=true output=./output.txt
 */
type CustomReporter = Pick<BaseReporter, 'onTestResult'> & Pick<BaseReporter, 'onRunComplete'>

const PIPE = '|'
const PIPE_WITH_SPACES = ' | '
const COMMA = ','
const args = process.argv.slice(2)

const deleteFile = (outputPath: string) => {
  fs.unlink(outputPath, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

const writeArrayToFile = (results: string[], OUTPUT_PATH: string) => {
  const stream = fs.createWriteStream(OUTPUT_PATH, { flags: append ? 'a' : 'w' })
  stream.on('open', () => {
    results.forEach(function (item) {
      stream.write(item + os.EOL)
    })
    stream.end()
  })
}

const getArgumentValue = (data: string[], outputRegex: RegExp) => {
  return data.filter((x) => x.match(outputRegex)).map((x) => x.split('=')[1])[0]
}

const parseOutput = (args: string[], outputRegex = new RegExp('output|OUTPUT')) => {
  return getArgumentValue(args, outputRegex)
}

const parseAppendable = (args: string[], appendRegex = new RegExp('append|APPEND')) => {
  return getArgumentValue(args, appendRegex) === 'true'
}

const appendArg = parseAppendable(args)

// default output path is pointing to top level RTM folder from dist/lib/testReporter.js
const outputFilePath = parseOutput(args) ?? '../../../../RTM/testStoryMapping.txt'
const OUTPUT_PATH = path.resolve(path.join(__dirname, outputFilePath))
console.log(OUTPUT_PATH)
// default append is false
const append = appendArg ?? true

class TestReporter implements CustomReporter {
  private results: string[] = []
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onTestResult(_test?: Test, testResult?: TestResult) {
    if (testResult) {
      testResult.testResults.forEach((test) => {
        const [name, storyIds] = test.fullName.split(PIPE)
        if (Boolean(storyIds)) {
          storyIds.split(COMMA).forEach((storyId) => this.addResult(storyId, name, test.status))
        } else {
          this.addResult('None', name, test.status)
        }
      })
    }
  }

  addResult(storyId: string, name: string, status: string) {
    return this.results.push(
      `${storyId.trim() + PIPE_WITH_SPACES + name.trim() + PIPE_WITH_SPACES + status}`
    )
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onRunComplete(_context?: Set<Context>, _results?: AggregatedResult) {
    if (!append && fs.existsSync(OUTPUT_PATH)) {
      deleteFile(OUTPUT_PATH)
    }
    writeArrayToFile(this.results, OUTPUT_PATH)
    console.log('Successfully written test - story mapping.')
  }
}

module.exports = TestReporter
