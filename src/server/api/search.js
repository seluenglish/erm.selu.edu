import { Document, Name } from 'server/database/models'
import { getMatchingSearches } from 'server/serverHelpers/search'
import _ from 'lodash'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

export default async function (ctx) {
  const searchParams = ctx.request.body
  // TODO validate search params
  
  let { searchText, beginAt, endAt, fullTextChecked, searchIn, type, subType } = searchParams
  
  if (beginAt === undefined) beginAt = 0
  
  if (typeof beginAt !== 'number')
    throw new Error('beginAt must be a number')
  
  const filter = new RegExp(searchText, 'i')
  
  let query
  
  if (fullTextChecked) {
    query = Document.find({ fullText: filter })
  } else if (!type || type === 'all') {
    query = Document.find({ title: filter })
  } else {
    let names
    
    if (subType && subType !== 'all') {
      names = await Name.find({ text: filter, type, subType })
      
    } else {
      names = await Name.find({ text: filter, type })
    }
    
    if (!names.length) names = [ ObjectId() ]
    
    const nameIds = names.map(x => x._id.toString())
    
    query = Document.find({
      names: {
        $in: nameIds,
      },
    })
    
  }
  
  if (searchIn !== 'all') {
    const [ type, subType ] = searchIn.split('.')
    if (subType) {
      query = query.find({ type, subType })
    }else{
      query = query.find({ type })
    }
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
  
  // const names = await Name.find({})
  // let nResult = []
  // names.forEach(name => {
  //   let nItem = nResult.find( x => x.type === name.type)
  //
  //   if (!nItem) {
  //     nItem = {
  //       type: name.type,
  //       subTypes: [],
  //     }
  //
  //     nResult.push(nItem)
  //   }
  //
  //   if (name.subType) {
  //     let subType = nItem.subTypes.find(x => x.type === name.subType)
  //
  //     if(!subType) {
  //       subType = {
  //         type: name.subType,
  //       }
  //
  //       nItem.subTypes.push(subType)
  //     }
  //   }
  //
  // })
  //
  // nResult = _.sortBy(nResult, x => x.type)
  // console.log(JSON.stringify(nResult, null, 2))
  //
  
  ctx.response.body = {
    totalHits: _.sum(result.map(x => x.matches.length)), // total results
    totalDocumentHits: count, // total documents
    listItems: result,
  }
}
