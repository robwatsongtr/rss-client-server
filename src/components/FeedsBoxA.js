const FeedsBoxA = props => {

  const clicked = title => {
    props.clicked(title);
  }

  const feedList = props.feedInfo.sort().map(feedTitle => {
    return (
      <div key={feedTitle} className="box-1" onClick={clicked.bind(this, feedTitle)}>
          { feedTitle }
      </div>
    )
  })

  return (
    <>
      {feedList}
    </>
  )

}

export default FeedsBoxA;