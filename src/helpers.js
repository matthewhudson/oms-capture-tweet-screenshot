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

module.exports = { isValidTweetUrl, generateFilenameFromUrl }
