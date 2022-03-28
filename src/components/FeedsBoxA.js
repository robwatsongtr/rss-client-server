const FeedsBoxA = props => {

  const clicked = title => {
    props.clicked(title);
  }

  const feedList = props.feedInfo.map(feedTitle => {
    return (
      <div 
        key={feedTitle} 
        onClick={ clicked.bind(this, feedTitle) }>
       { feedTitle }
      </div>
    )
  })

  return (
    <div className="box-1">
      {feedList}
    </div>
  )

}

export default FeedsBoxA;