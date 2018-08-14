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

const searchOptions = []

export function getSearchOptions() {
  if (!searchOptions.length) {
    FILE_TYPES.forEach(fileType => {
      if (fileType.showInSearch)
        searchOptions.push({ value: fileType.type, label: fileType.type })
      
      if (fileType.subTypes) {
        fileType.subTypes.forEach(subType => {
          if (!subType.showInSearch) return
          
          const value = `${fileType.type}.${subType.type}`
          const label = `${fileType.type} -> ${subType.type}`
          searchOptions.push({ value, label })
        })
      }
    })
  }
  
  return searchOptions
  
}
