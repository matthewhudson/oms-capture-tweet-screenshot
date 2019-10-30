const UploadStream = require('s3-stream-upload')
const S3 = require('aws-sdk').S3
const fs = require('fs')
const path = require('path')

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
  AWS_S3_BUCKET_PREFIX
} = process.env

const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})

/**
 * Verify a URL is a tweet
 *
 * @example
 * const url = 'https://twitter.com/jamessocol/status/717902576210067456'
 * const fileName = isValidTweetUrl(url) // Returns `true`
 *
 * @param {String} url
 * @returns {Boolean}
 */
const isValidTweetUrl = url => {
  const { host, pathname } = new URL(url)

  if (host !== 'twitter.com') {
    return false
  }

  if (pathname.indexOf('status') === -1) {
    return false
  }

  return true
}

/**
 * Generate a file name from a URL's path. For example,
 * `/jamessocol/status/717902576210067456` becomes
 * `jamessocol-status-717902576210067456.jpg`
 *
 * @example
 * const url = 'https://twitter.com/jamessocol/status/717902576210067456'
 * const fileName = generateFilenameFromUrl(url) // Returns `jamessocol-status-717902576210067456.jpg`
 *
 * @param {String} url
 * @returns {String}
 */
const generateFilenameFromUrl = (url, fileType = 'jpg') => {
  const { pathname } = new URL(url)
  const fileName = pathname.substring(1, pathname.length).replace(/\//gi, '-')
  return `${fileName}.${fileType}`
}

/**
 * Upload screenshot to AWS S3.
 *
 * @param {String} fileName
 * @returns {Promise}
 */
const uploadFile = fileName => {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, '..')

    fs.createReadStream(`${filePath}/${fileName}`)
      .pipe(
        UploadStream(s3, {
          Bucket: AWS_S3_BUCKET_NAME,
          Key: `${AWS_S3_BUCKET_PREFIX}/${fileName}`,
          ContentType: 'image/jpeg'
        })
      )
      .on('error', err => {
        reject(err)
      })
      .on('finish', () => {
        const url = `https://${AWS_S3_BUCKET_NAME}/${AWS_S3_BUCKET_PREFIX}/${fileName}`
        resolve(url)
      })
  })
}

module.exports = { isValidTweetUrl, generateFilenameFromUrl, uploadFile }
