
const TitlesBoxB = props => {

  const clicked = e => {
    e.preventDefault();
    props.clicked(e.target.id);
  }


  // const titles = props.feedInfo.items.map( (item, idx) => {
  //   return(
  //     <span 
  //       key={idx}
  //     >
  //      {item.title}
  //     </span>
  //   )
  // })

  // const titles = props.feedInfo.items.forEach( item => {
  //   return (
  //     <div>
  //       { item.title }
  //     </div>
  //   )
  // })

  const titleList = props.feedInfo.map(feedItem => {
    return (
      
      <a href={ feedItem.url }
        target="_blank" 
        rel="noopener noreferrer"
      >
        { feedItem.title }
      </a>
    )
  })


  return (

    <div className="box-2">  
     {titleList}
     </div>

  )

}

export default TitlesBoxB;


// { props.feedInfo.items[1].title }

// { props.feedInfo.items[1].link }