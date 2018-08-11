import mongoose from 'mongoose'

export const Document = mongoose.model('Document', {
  fileName: String,
  title: String,
  type: String,
  subType: String,
  fullText: String,
  url: String,
}, null, { cache: false })


export const Name = mongoose.model('Name', {
  type: String,
  subType: String,
  corresp: String,
  text: String,
  metaphone: String,
}, null, { cache: false })
