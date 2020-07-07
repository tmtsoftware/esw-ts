const os = require('os')
const fs = require('fs')
const path = require('path')
/**
 *
 * available arguments to this reporter
 * append=true/false
 * output=relative-path-to-output-file
 * example usage :
 * > jest unit --reporters=./test/testReporter.js -- append=true output=./output.txt
 */

const PIPE = '|'
const PIPE_WITH_SPACES = ' | '
const COMMA = ','
const args = process.argv.slice(2)
const appendArg = parseAppendable(args)
// default output path is pointing to top level RTM folder
const outputFilePath = parseOutput(args) || '../../RTM/test-story-mapping.txt'
const OUTPUT_PATH = path.resolve(path.join(__dirname, outputFilePath))
// by default append is false
const append = appendArg || false

class TestReporter {
  results = []

  async onTestResult(_test, _testResult, _results) {
    _testResult.testResults.forEach((test) => {
      const [name, storyIds] = test.fullName.split(PIPE)
      if (!!storyIds) {
        storyIds
          .split(COMMA)
          .forEach((storyId) =>
            this.addResult(storyId, name, test.status)
          )
      } else {
        this.addResult('None', name, test.status)
      }
    })
  }


  addResult(storyId, name, status) {
    return this.results.push(`${storyId.trim() + PIPE_WITH_SPACES + name.trim() + PIPE_WITH_SPACES + status}`)
  }

  async onRunComplete(_, __) {
    if(!append && fs.existsSync(OUTPUT_PATH)) {
      deleteFile(OUTPUT_PATH)
    }
    writeArrayToFile(this.results, OUTPUT_PATH)
    console.log('Successfully written test - story mapping.');
  }
}


function getArgumentValue(data, outputRegex) {
  return data.filter(x => x.match(outputRegex)).map(x => x.split('=')[1])[0]
}

function parseOutput(args, outputRegex = 'output|OUTPUT') {
  return getArgumentValue(args, outputRegex)
}

function parseAppendable(args, appendRegex = 'append|APPEND') {
  return getArgumentValue(args, appendRegex) === 'true'
}

function deleteFile(outputPath) {
  fs.unlink(outputPath, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

function writeArrayToFile(results, OUTPUT_PATH) {
  const stream = fs.createWriteStream(OUTPUT_PATH, { flags: append ? 'a' : 'w' })
  stream.on('open', () => {
    results.forEach(function(item) {
      stream.write(item + os.EOL)
    })
    stream.end()
  })
}

module.exports = TestReporter
