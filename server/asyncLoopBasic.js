// example object 
const fruitBasket = {
  apple: 27,
  grape: 0,
  pear: 14
}

// timer function that returns a promise 
const timer = ms => {
  return new Promise( resolve => setTimeout(resolve, ms) )
}

// get the fruit! 
const getNumFruit = f => {
  return timer(2000)
    .then ( v => fruitBasket[f] )
}



// -----------await with map loop -------------
// Essentially we create an array of promises in the map that then get 
// resolved with promise.all 

// what do we want to get from the object? 
const fruitsToGet = ['apple', 'grape', 'pear']

// outer async func: 
const mapLoop = async () => {

  console.log('async in a map loop start: ');

  // map loop 
  const promises = fruitsToGet.map( async (fruit) => {
    const numFruit = await getNumFruit(fruit)
    return numFruit
  })

  // now we wait for the array of promises to get resolved:
  const numFruits = await Promise.all(promises)

  console.log( numFruits );
  console.log( 'End' )

}

mapLoop()



// //multiple hard-coded async calls in one async function example:
// ( async () => {

//   console.log('hard coded async calls: start')

//   const numApples = await getNumFruit('apple') 
//   console.log(numApples)

//   const numGrapes = await getNumFruit('grape')
//   console.log(numGrapes)

//   const numPears = await getNumFruit('pear')
//   console.log(numPears)

//   console.log('End')

// })()
