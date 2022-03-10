
const TitlesBoxB = props => {

  const clicked = e => {
    e.preventDefault();
    props.clicked(e.target.id);
  }

  // const titles = props.items.map( (title, idx) => {
  //   return(
  //     <span 
  //       key={idx}
  //     >
  //       {title.title}
  //     </span>
  //   )
  // })

  // const items = props.feedInfo.forEach( item => {
  //   return (
  //     <div>
  //       { item.title }
  //     </div>
  //   )
  // })

  return (
    <> 
      <div className="box-2">             
      box 2
      </div>
    </>
  )

}

export default TitlesBoxB;