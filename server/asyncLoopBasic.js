
const fruitBasket = {
  apple: 27,
  grape: 0,
  pear: 14
}

const timer = ms => {
  return new Promise( resolve => setTimeout(resolve, ms) )
}

const getNumFruit = f => {
  return timer(2000)
    .then ( v => fruitBasket[f] )
}

// getNumFruit('apple')
//   .then( num => console.log(num) )

const control = async _ => {
  console.log('start')

  const numApples = await getNumFruit('apple') 
  console.log(numApples)

  const numGrapes = await getNumFruit('grape')
  console.log(numGrapes)

  const numPears = await getNumFruit('pear')
  console.log(numPears)

  console.log('End')

}

control()