import { getUrl } from './url-helper'
import NAME_TYPES from './name-types.json'
import _ from 'lodash'

const FILE_TYPES = _.sortBy([
  {
    type: 'witness',
    showInSearch: true,
    locatedAt: 'witnesses',
    subTypes: [
      { type: 'essay', showInSearch: true },
      { type: 'poem', showInSearch: true },
      { type: 'prose', showInSearch: false },
    ],
  },
  {
    type: 'apparatus',
    locatedAt: 'apparatuses',
    showInSearch: true,
  },
  {
    type: 'bibliography',
    locatedAt: 'notes',
    showInSearch: true,
  },
  {
    type: 'glosses',
    locatedAt: 'glosses',
    showInSearch: true,
  },
  {
    type: 'essay',
    locatedAt: 'essays',
    showInSearch: true,
  },
  {
    type: 'figure',
    locatedAt: 'witnesses',
    showInSearch: true,
  },
  {
    type: 'drawing',
    locatedAt: 'witnesses',
    showInSearch: true,
  },
  {
    type: 'note',
    locatedAt: 'notes',
    showInSearch: true,
  },
  {
    type: 'webpage',
    locatedAt: 'webpages',
    showInSearch: true,
  },
  {
    type: 'title',
    locatedAt: 'witnesses',
    showInSearch: true,
  },
], x => x.type)

const searchNameTypeOptions = []
const searchNameSubTypeOptions = {}
const searchFileTypeOptions = []

export function getFileTypeSearchOptions() {
  if (!searchFileTypeOptions.length) {
    FILE_TYPES.forEach(fileType => {
      if (fileType.showInSearch)
        searchFileTypeOptions.push({ value: fileType.type, label: fileType.type })

      if (fileType.subTypes) {
        fileType.subTypes.forEach(subType => {
          if (!subType.showInSearch) return

          const value = `${fileType.type}.${subType.type}`
          const label = `${fileType.type} -> ${subType.type}`
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
      searchNameTypeOptions.push({value: nameType.type, label: nameType.type})
    })
  }

  return searchNameTypeOptions
}

export function getNameSubTypeSearchOptions(nameType) {
  if(!searchNameSubTypeOptions[nameType]) {

    searchNameSubTypeOptions[nameType] = []

    const item = NAME_TYPES.find(x => x.type === nameType)
    item.subTypes.forEach(nameSubType => {
      searchNameSubTypeOptions[nameType].push({value: nameSubType.type, label: nameSubType.type})
    })
  }

  return searchNameSubTypeOptions[nameType]
}

export function getDocumentUrl(document) {
  if (!document.type) return ''
  // console.log(document.type)
  const fileType = FILE_TYPES.find(x => x.type === document.type)

  return getUrl(`${fileType.locatedAt}/${document.fileId}.php`)
}
