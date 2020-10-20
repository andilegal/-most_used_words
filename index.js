const path = require("path")
const { removeEmpty } = require("./helpers")
const fn = require('./helpers')

const pathArchive = path.join(__dirname, 'Data', 'Legends')

const symbols = [ 
  '.','?','-',',','"','', '_','<i>','</i>', '\r', '[', ']', '(',')' 
]

fn.readDirectory(pathArchive)
  .then(archives => fn.elementsFinishsWith(archives, '.srt'))
  .then(archivesSRT => fn.readArchives(archivesSRT))
  .then(fn.joinContent)
  .then(fn.separateTextFor('\n'))
  .then(lines => removeEmpty(lines))
  .then(lines => fn.removeIfInclude(lines ,'-->'))
  .then(lines => fn.removeOnlyNumber(lines))
  .then(fn.removeSymbols(symbols))
  .then(fn.joinContent)
  .then(fn.separateTextFor(' '))
  .then(lines => removeEmpty(lines))
  .then(lines => fn.removeOnlyNumber(lines))
  .then(fn.agroupWords)
  .then(fn.orderForAttrNumber('qtde', 'desc'))
  .then(console.log)
