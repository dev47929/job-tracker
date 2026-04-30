const Error = (props) =>{
  if(props.err == ""){
    return(
      <></>
    )
  }else return (<>
    <div className="bg-red-300 h-1/2">

    </div>
  </>)
}

export default Error;