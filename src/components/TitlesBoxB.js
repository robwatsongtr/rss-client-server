
const TitlesBoxB = props => {

  const clicked = e => {
    e.preventDefault();
    props.clicked(e.target.id);
  }

  // let parsed = JSON.parse(props.feedInfo)

  // const titles = parsed.map( (item, idx) => {
  //   return(
  //     <span 
  //       key={idx}
  //     >
  //      {item.title}
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

        { props.feedInfo.items[1].title }
       <br></br>
       { props.feedInfo.items[1].link }
       
      </div>
    </>
  )

}

export default TitlesBoxB;