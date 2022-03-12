const FeedsBoxA = props => {

  const clicked = e => {
    e.preventDefault();
    props.clicked(e.target.id);
  }

  const title = props.feedInfo.title;
  const link = props.feedInfo.link;

  return (
    <> 
      <div className="box-1">    
        <a href={ link }
          target="_blank" 
          rel="noopener noreferrer"
        >
          { title }
        </a>
      </div>
    </>
  )

}

export default FeedsBoxA;