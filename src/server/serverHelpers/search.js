import _ from 'lodash'

export function getMatchingSearches(fullText, escapedSearchText, matchBounds=100) {
  const occuranceFilter = new RegExp(escapedSearchText, 'gi')
  
  const occurencesAt = []
  let m;
  
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
<mark>${showText.slice(wordShownAt, wordShownAt+escapedSearchText.length)}</mark>\
${showText.slice(wordShownAt+escapedSearchText.length)}`
    
    occurencesAt.push({
      beginAt,
      endAt,
      showText,
      wordShownAt,
    })
  }
  
  return occurencesAt
}
