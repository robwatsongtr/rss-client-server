const FeedsBoxA = props => {

  const clicked = e => {
    e.preventDefault();
    props.clicked(e.target.id);
  }

  const title = props.feedInfo.title
  const feedDescription = props.feedInfo.description;

  return (
    <> 
      <div className="box-1">    
        { title }  
        <br></br>       
        { feedDescription }
      </div>
    </>
  )

}

export default FeedsBoxA;