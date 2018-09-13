import { SERVER_ROOT, getUrl } from './url-helper'

const FILE_TYPES = [
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
]

const NAME_TYPES = [
  {
    'type': 'ana',
    'subTypes': []
  },
  {
    'type': 'animal',
    'subTypes': []
  },
  {
    'type': 'annual',
    'subTypes': []
  },
  {
    'type': 'anthology',
    'subTypes': []
  },
  {
    'type': 'apparatus',
    'subTypes': []
  },
  {
    'type': 'archive',
    'subTypes': []
  },
  {
    'type': 'artwork',
    'subTypes': []
  },
  {
    'type': 'astronomical',
    'subTypes': []
  },
  {
    'type': 'autobiography',
    'subTypes': []
  },
  {
    'type': 'bibliography',
    'subTypes': []
  },
  {
    'type': 'bibliography_text',
    'subTypes': []
  },
  {
    'type': 'biliography_text',
    'subTypes': []
  },
  {
    'type': 'biography',
    'subTypes': []
  },
  {
    'type': 'biography_text',
    'subTypes': []
  },
  {
    'type': 'book',
    'subTypes': []
  },
  {
    'type': 'books',
    'subTypes': []
  },
  {
    'type': 'botanical',
    'subTypes': []
  },
  {
    'type': 'building',
    'subTypes': []
  },
  {
    'type': 'catalog_auction',
    'subTypes': []
  },
  {
    'type': 'catalogue_auction',
    'subTypes': []
  },
  {
    'type': 'collected_art',
    'subTypes': []
  },
  {
    'type': 'collected_letters',
    'subTypes': []
  },
  {
    'type': 'collected_poems',
    'subTypes': []
  },
  {
    'type': 'collected_sketches',
    'subTypes': []
  },
  {
    'type': 'composite',
    'subTypes': []
  },
  {
    'type': 'composition',
    'subTypes': []
  },
  {
    'type': 'compostie',
    'subTypes': []
  },
  {
    'type': 'dictionary',
    'subTypes': []
  },
  {
    'type': 'dictionary_entry',
    'subTypes': []
  },
  {
    'type': 'drama',
    'subTypes': []
  },
  {
    'type': 'engraving',
    'subTypes': []
  },
  {
    'type': 'essay',
    'subTypes': []
  },
  {
    'type': 'fictional',
    'subTypes': []
  },
  {
    'type': 'fictional_person',
    'subTypes': []
  },
  {
    'type': 'fictional_place',
    'subTypes': []
  },
  {
    'type': 'figure',
    'subTypes': []
  },
  {
    'type': 'geological',
    'subTypes': []
  },
  {
    'type': 'gloss',
    'subTypes': []
  },
  {
    'type': 'guidebook',
    'subTypes': []
  },
  {
    'type': 'law',
    'subTypes': []
  },
  {
    'type': 'lesson',
    'subTypes': []
  },
  {
    'type': 'letter',
    'subTypes': []
  },
  {
    'type': 'magazine',
    'subTypes': []
  },
  {
    'type': 'manual_guide',
    'subTypes': []
  },
  {
    'type': 'manuscipt',
    'subTypes': []
  },
  {
    'type': 'manuscriipt',
    'subTypes': []
  },
  {
    'type': 'manuscript',
    'subTypes': []
  },
  {
    'type': 'manuscropt',
    'subTypes': []
  },
  {
    'type': 'map',
    'subTypes': []
  },
  {
    'type': 'maunuscript',
    'subTypes': []
  },
  {
    'type': 'mauscript',
    'subTypes': []
  },
  {
    'type': 'novel',
    'subTypes': []
  },
  {
    'type': 'opera',
    'subTypes': []
  },
  {
    'type': 'peom',
    'subTypes': []
  },
  {
    'type': 'periodical',
    'subTypes': []
  },
  {
    'type': 'person',
    'subTypes': []
  },
  {
    'type': 'place',
    'subTypes': [
      { type: 'building' },
      { type: 'fictional' },
      { type: 'scriptural' },
      { type: 'architecture' },
      { type: 'geographical' },
      { type: 'organization' },
    ],
  },
  {
    'type': 'poem',
    'subTypes': []
  },
  {
    'type': 'pome',
    'subTypes': []
  },
  {
    'type': 'program',
    'subTypes': []
  },
  {
    'type': 'prose',
    'subTypes': []
  },
  {
    'type': 'reference',
    'subTypes': []
  },
  {
    'type': 'scriptural_person',
    'subTypes': []
  },
  {
    'type': 'scripture',
    'subTypes': []
  },
  {
    'type': 'series',
    'subTypes': []
  },
  {
    'type': 'sermon',
    'subTypes': []
  },
  {
    'type': 'sketch',
    'subTypes': []
  },
  {
    'type': 'story',
    'subTypes': []
  },
  {
    'type': 'tale',
    'subTypes': []
  },
  {
    'type': 'vessel',
    'subTypes': []
  },
  {
    'type': 'witness',
    'subTypes': []
  },
  {
    'type': 'work',
    'subTypes': []
  }
]

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
