import React, { Component } from "react";
import List from "./Components/List/List";

class App extends Component {
  state = {
    
    listArray: [
      {
        id: 1,
      },
    ],
  };

createListHandler=()=>{
this.setState(prevState=>{
  const updatedList = [...prevState.listArray]
  updatedList.push({
    id: Math.floor(Math.random() * 1000)
  })
  return{
    listArray: updatedList
  }
  
})
console.log(this.state.listArray)
}

  deleteListHandler=(event)=>{
    const listId = Number(event.currentTarget.id)

const arrayIndex = this.state.listArray.findIndex(list=>{
  return list.id === listId
})

this.setState(prevState=>{
  return{
    listArray: prevState.listArray.filter(list=>{
     return prevState.listArray.indexOf(list) !== arrayIndex
    })

  }
})

  }

  appClickHandler = (event) => {
   
    switch(event.currentTarget.name){
      case "plus":
      this.createListHandler()
      break;
      case "trash":
      this.deleteListHandler(event)
      break;


      default:
        console.log("App js - click handler -default case")
    }
  };

  render() {

    const generatedLists = this.state.listArray.map(list=>
      <List key={list.id} listId={list.id} clicked={this.appClickHandler}/>
    )
    return (
      <>
       {generatedLists}
      </>
    );
  }
}

export default App;
