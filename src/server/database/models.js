import mongoose from 'mongoose'

export const Document = mongoose.model('Document', {
  fileId: String,
  title: String,
  type: String,
  subType: String,
  fullText: String,
  url: String,
  keywords: [ { type: String } ],
}, null, { cache: false })


export const Name = mongoose.model('Name', {
  type: String,
  subType: String,
  corresp: String,
  text: String,
  metaphone: String,
  keywords: [ { type: String } ],
}, null, { cache: false })

export const Author = mongoose.model('Author', {
  name: String,
  handle: String,
  penNames: [ { type: String } ],
  keywords: [ { type: String } ],
}, null, { cache: false } )
