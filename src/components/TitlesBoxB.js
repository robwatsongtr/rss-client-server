
const TitlesBoxB = props => {

  const titleList = props.feedInfo.map( (feedItem, idx)  => {
    return (
      <a href={ feedItem.link }
        target="_blank" 
        rel="noopener noreferrer"
        key={idx}
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

