// Program to parse a string into names

/*


split on:

space
comma space
comma space and space 

*/


// returns an array of names 
const splitStringNames = (names) => {
  const regEx = /\s*(?:,|$)\s*/
  const nameList = names.split(regEx)
  return nameList
}


console.log( 
  splitStringNames('Surya Mattu, Angie Waller, Simon Fondrie-Teitler, and Micha Gorelick ')
)

console.log( 
  splitStringNames('Colin Lecher and Surya Mattu ')
)