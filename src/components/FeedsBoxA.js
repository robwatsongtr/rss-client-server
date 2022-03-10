const FeedsBoxA = props => {

  const clicked = e => {
    e.preventDefault();
    props.clicked(e.target.id);
  }

  const feed = props.items.description;

  return (
    <> 
      <div className="box-1">             
        { feed }
      </div>
    </>
  )

}

export default FeedsBoxA;