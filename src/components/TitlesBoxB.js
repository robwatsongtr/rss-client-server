
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

  let title = props.feedInfo.items[2].title
  let url =  props.feedInfo.items[2].link 


  return (

    <> 
      <div className="box-2"> 
        <a href={ url }
          target="_blank" 
          rel="noopener noreferrer"
        >
          { title }
        </a>
      </div>
    </>

  )

}

export default TitlesBoxB;


// { props.feedInfo.items[1].title }

// { props.feedInfo.items[1].link }