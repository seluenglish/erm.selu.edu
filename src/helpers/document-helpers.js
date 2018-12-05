import { getUrl } from './url-helper'
import NAME_TYPES from './name-types.json'
import { firstLetterCapital } from './case-helper'
import _ from 'lodash'

const FILE_TYPES = [
  {
    type: 'apparatus',
    locatedAt: 'apparatuses',
    showInSearch: true,
    subTypes: [
      { type: 'manuscript', showInSearch: true },
      { type: 'work', showInSearch: true },
    ],
  },
  {
    type: 'glosses',
    locatedAt: 'glosses',
    showInSearch: true,
    subTypes: [
      { type: 'contextual', showInSearch: true },
      { type: 'textual', showInSearch: true },
    ],
  },
  {
    type: 'note',
    locatedAt: 'notes',
    showInSearch: true,
    subTypes: [
      { type: 'bibliographical', showInSearch: true },
      { type: 'biographical', showInSearch: true },
      { type: 'contextual', showInSearch: true },
      { type: 'geographical', showInSearch: true },
    ],
  },
  {
    type: 'figure',
    locatedAt: 'figures',
    showInSearch: true,
    subTypes: [
      { type: 'drawing', showInSearch: false },
    ],
  },
  {
    type: 'witness',
    showInSearch: true,
    locatedAt: 'witnesses',
    subTypes: [
      { type: 'anthology', showInSearch: true },
      { type: 'drama', showInSearch: true },
      { type: 'essay', showInSearch: true },
      { type: 'poem', showInSearch: true },
      { type: 'gloss', showInSearch: true },
    ],
  },
  {
    type: 'bibliography',
    locatedAt: 'notes',
    showInSearch: true,
  },
  {
    type: 'corpus',
    locatedAt: 'corpuses',
    showInSearch: true,
  },
  {
    type: 'essay',
    locatedAt: 'essays',
    showInSearch: false,
  },
  {
    type: 'webpage',
    locatedAt: 'webpages',
    showInSearch: false,
  },
  {
    type: 'title',
    locatedAt: 'witnesses',
    showInSearch: false,
  },
]

const searchNameTypeOptions = []
const searchNameSubTypeOptions = {}
const searchFileTypeOptions = []

export function getFileTypeSearchOptions() {
  if (!searchFileTypeOptions.length) {
    FILE_TYPES.forEach(fileType => {
      if (fileType.showInSearch)
        searchFileTypeOptions.push({ value: fileType.type, label: firstLetterCapital(fileType.type) })

      if (fileType.subTypes) {
        fileType.subTypes.forEach(subType => {
          if (!subType.showInSearch) return

          const value = `${fileType.type}.${subType.type}`
          const label = `　${firstLetterCapital(subType.type)}`
          searchFileTypeOptions.push({ value, label })
        })
      }
    })
  }

  return searchFileTypeOptions
}

export function getNameTypeSearchOptions() {
  if(!searchNameTypeOptions.length){
    NAME_TYPES.forEach(nameType => {
      searchNameTypeOptions.push({value: nameType.type, label: firstLetterCapital(nameType.type)})
    })
  }

  return searchNameTypeOptions
}

export function getNameSubTypeSearchOptions(nameType) {
  if(!searchNameSubTypeOptions[nameType]) {

    searchNameSubTypeOptions[nameType] = []

    const item = NAME_TYPES.find(x => x.type === nameType)
    item.subTypes.forEach(nameSubType => {
      searchNameSubTypeOptions[nameType].push({value: nameSubType.type, label: firstLetterCapital(nameSubType.type)})
    })
  }

  return searchNameSubTypeOptions[nameType]
}

export function getDocumentUrl(document) {
  if (!document.type) return ''
  const fileType = FILE_TYPES.find(x => x.type === document.type)

  return getUrl(`${fileType.locatedAt}/${document.fileId}`)
}
