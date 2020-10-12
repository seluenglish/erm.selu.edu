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
  dates: [ { type: mongoose.Schema.Types.ObjectId, ref:'DateModel' } ],
}, null, { cache: false })


export const DateModel = mongoose.model('DateModel', {
  notBefore: { type: Date, required: true },
  notAfter: { type: Date, required: true },
  content: String,
  searchText: String,
}, null, { cache: false })
