import { LOG_LEVELS, LOG_FATAL, LOG_ERROR, LOG_WARNING, LOG_INFO } from './logging'

export const createValidator = (log) => {
  const validateDoc = (xmlData, doc) => {
    if (!xmlData) {
      log([ LOG_ERROR, 'XML data could not be parsed.' ])
      return false
    }

    if (!doc) {
      log([ LOG_ERROR, 'database document could not be created.' ])
      return false
    }

    if (!doc.title)
      log([ LOG_WARNING, 'document has no title.' ])

    if (!doc.type) {
      log([ LOG_ERROR, 'document type not found.' ])
      return false
    }

    if (!doc.fileId) {
      log([ LOG_ERROR, 'document has no fileId.' ])
      return false
    }

    if (doc.type === 'glosses' && !doc.subType) {
      log([ LOG_WARNING, 'gloss does not specify type.' ])

    }

    return true
  }

  return validateDoc
}
