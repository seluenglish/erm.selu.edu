import _ from 'lodash'

/**
 * Highlight text in search results
 *
 * @param fullText
 * @param options contains meta-data (example for date search)
 * @param matchBounds
 * @returns {Array}
 *
 * searchText: escaped Search Text
 */
export function getMatchingSearches(fullText, options, matchBounds=100) {
  const { searchText, type } = options

  const occuranceFilter = new RegExp(searchText, 'gi')

  const occurencesAt = []
  let m

  while (m = occuranceFilter.exec(fullText)) {
    let beginAt = m.index
    let endAt = m.index + m[0].length
    let showTextFrom = _.max([ beginAt - matchBounds, 0 ])
    let showTextUpto = _.min([ endAt + matchBounds, fullText.length -1 ])

    let showText = fullText.slice(showTextFrom, showTextUpto)

    if (showTextFrom !== 0) {
      let match = showText.match(/^[^\s]*\s/)
      showText = `...${showText.slice(match[0].length)}`
    }

    if (showTextUpto !== fullText.length - 1) {
      let match = showText.match(/\s[^\s]*$/)
      showText = `${showText.slice(0, match.index)}...`
    }

    const wordShownAt = showText.search(occuranceFilter)
    showText = `${showText.slice(0, wordShownAt)}\
<mark>${showText.slice(wordShownAt, wordShownAt+searchText.length)}</mark>\
${showText.slice(wordShownAt+searchText.length)}`

    occurencesAt.push({
      beginAt,
      endAt,
      showText,
      wordShownAt,
    })
  }

  return occurencesAt
}

export function cleanSearchText(text) {
  return text.replace(/^&[\w]+;/, '')

}

export function cleanName(text) {
  return text.replace(/^&[\w]+;/, '')
}
