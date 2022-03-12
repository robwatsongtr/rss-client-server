const FeedsBoxA = props => {

  const clicked = e => {
    e.preventDefault();
    props.clicked(e.target.id);
  }

  const title = props.feedInfo.title
  

  return (
    <> 
      <div className="box-1">    
        { title }  
      </div>
    </>
  )

}

export default FeedsBoxA;