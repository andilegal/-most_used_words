const fs = require('fs')
const path = require('path')

function readDirectory(pathArchive) {
  return new Promise((resolve, reject) =>  {
    try {
      let archives = fs.readdirSync(pathArchive)
      archives = archives.map(archive => path.join(pathArchive, archive))
      resolve(archives)
    } catch(e)  {
      reject(e)
    }
  })
}

function readArchive(pathArchive)  {
  return new Promise((resolve, reject) => {
    try {
      const content = fs.readFileSync(pathArchive, {encoding: 'utf-8'})
      resolve(content.toString())
    } catch(e)  {
      reject(e)
    }
  })
}

function readArchives(pathArchives) {
  return Promise.all(pathArchives.map(pathArchives => readArchive(pathArchives)))
}

function elementsFinishsWith(array, defaultText)  {
  return array.filter(el => el.endsWith(defaultText))
}

function removeEmpty(array)  {
  return array.filter(el => el.trim())
}

function removeIfInclude(array, defaultText) {
  return array.filter(el => !el.includes(defaultText))
}

function removeOnlyNumber(array)  {
  return array.filter(el => {
    const number = parseInt(el.trim())
    return number !== number
  })
}

function removeSymbols(symbols) {
  return function(array)  {
    return array.map(el => {
      return symbols.reduce((acc, symbol)=> {
        return acc.split(symbol).join('')
      }, el)
    })
  } 
}  

function joinContent(array)  {
  return array.join(' ')
}

function separateTextFor(symbol)  {
  return function (text)  {
    return text.split(symbol)
  }
}

function agroupWords(words)  {
  return Object.values(words.reduce((acc, word) =>  {
    const el = word.toLowerCase()
    const qtde = acc[el] ? acc[el].qtde + 1 : 1
    acc[el] = { element: el,  qtde }
    return acc
  },{}))  
}

function orderForAttrNumber(attr, order = 'asc')  {
  return function(array)  {
    const asc = (obj1, obj2) => obj1[attr] - obj2[attr]
    const desc = (obj1, obj2) => obj2[attr] - obj1[attr]
    return array.sort(order === 'asc' ? asc : desc)
  
  }
}

module.exports =  {
  readDirectory, 
  elementsFinishsWith,
  readArchives,
  readArchive,
  removeEmpty,
  removeIfInclude,
  removeOnlyNumber,
  removeSymbols,
  joinContent,
  separateTextFor,
  agroupWords,
  orderForAttrNumber
}