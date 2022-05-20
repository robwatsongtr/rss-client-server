// Program to parse a string into names, the string being
// the creator field in an rss feed

const parseCreatorNames = (names) => {
  const regEx = /\s*(?:(?:,|\band\b)\s*)+\s*/
  const nameList = names.trim().split(regEx)
  return nameList
}


console.log( 
  parseCreatorNames('Surya Mattu,Angie Waller, Simon Fondrie-Teitler, and Micha Gorelick ')
)
console.log(  parseCreatorNames('Colin Lecher and Surya Mattu ') )
console.log( parseCreatorNames('Colin Landcher and Surya Mattu ') )
console.log( parseCreatorNames(' Colin Landcher ') )