
const TitlesBoxB = props => {


  const titleList = props.feedInfo.map(feedItem => {
    return (
      <a href={ feedItem.link }
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

