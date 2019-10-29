const screenshotTweet = require('screenshot-tweet').default
const {
  isValidTweetUrl,
  generateFilenameFromUrl,
  uploadFile
} = require('./helpers')

const actionHandler = async url => {
  return new Promise((resolve, reject) => {
    try {
      if (!isValidTweetUrl(url)) {
        reject(new Error(`The ${url} is not valid.`))
      }

      const fileName = generateFilenameFromUrl(url)

      screenshotTweet(url, fileName)
        .then(() => {
          return fileName
        })
        .then(uploadFile)
        .then(url => {
          resolve(url)
        })
        .catch(er => {
          // @TODO: Log
          reject(er)
        })
    } catch (er) {
      reject(er)
    }
  })
}

module.exports = { actionHandler }
