const FILE_TYPES = [
  {
    type: 'witness',
    showInSearch: true,
    subTypes: [
      { type: 'essay', showInSearch: true },
      { type: 'poem', showInSearch: true },
      { type: 'prose', showInSearch: false }
    ],
  },
  {
    type: 'apparatus',
    showInSearch: true
  },
  {
    type: 'gloss',
    showInSearch: false
  },
]

const NAME_TYPES = [
  {
    type: 'place',
    subTypes: [
      { type: 'building'},
      { type: 'fictional'},
      { type: 'scriptural'},
      { type: 'architecture'},
    ],
  },
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
