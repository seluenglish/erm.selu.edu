import { Document } from 'server/database/models'
import { getMatchingSearches } from 'server/serverHelpers/search'
import _ from 'lodash'

export default async function (ctx) {
  const searchParams = ctx.request.body
  // TODO validate search params
  
  let { searchText, beginAt, endAt, fullTextChecked, searchIn, type, subType } = searchParams
  
  // TODO remove default values
  fullTextChecked = true
  // searchText = 'saltzburg'
  
  if(beginAt === undefined) beginAt = 0
  
  if (typeof beginAt !== 'number')
    throw new Error('beginAt must be a number')
  
  const filter = new RegExp(searchText, 'i')
  
  let query = Document
  
  if (fullTextChecked) {
    query = query.find({ fullText: filter })
  }
  
  const resultDocuments = await query
  const count = resultDocuments.length
  
  console.log('result count: ', count)
  
  let result = resultDocuments.map(doc => {
    const matches = getMatchingSearches(doc.fullText, searchText)
    const ret = {
      fileId: doc.fileId,
      title: doc.title,
      type: doc.type,
      subType: doc.subType,
      id: doc._id,
      
      url: doc._url,
      
      weight: matches.length,
      matches,
    }
    
    return ret
  })
  result = _.sortBy(result, x => -x.weight)
  
  ctx.response.body = {
    totalHits: _.sum(result.map(x => x.matches.length)), // total results
    totalDocumentHits: count, // total documents
    listItems: result,
  }
}
