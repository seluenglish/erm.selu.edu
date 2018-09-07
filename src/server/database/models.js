import mongoose from 'mongoose'

export const Name = mongoose.model('Name', {
  type: String,
  subType: String,
  corresp: String,
  text: String,
  metaphone: String,
  keywords: [ { type: String } ],
}, null, { cache: false })

export const Document = mongoose.model('Document', {
  fileId: String,
  title: String,
  type: String,
  subType: String,
  fullText: String,
  url: String,
  keywords: [ { type: String } ],
  names: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Name' } ],
}, null, { cache: false })

