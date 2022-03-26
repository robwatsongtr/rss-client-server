const FeedsBoxA = props => {

  const clicked = title => {
    props.clicked(title);
  }

  const feedList = props.feedInfo.map(feedTitle => {
    return (
      <span key={feedTitle} onClick={ clicked.bind(this, feedTitle) }>
          { feedTitle }
      </span>
    )
  })

  return (
    <div className="box-1">
      {feedList}
    </div>
  )

}

export default FeedsBoxA;