import React, { Component } from "react";
import ListItem from "./ListBody/ListItem/ListItem";
import classes from "./List.module.css";
import SemanticButton from "../../Components/Button/Button";
import ListOptions from "../List/ListOptions/ListOptions";
import classNames from "classnames/bind";

let cx = classNames.bind(classes);

class List extends Component {

  
  state = {
    listData: [],
    // listData: [
    //   {
    //     id: 1,
    //     task: "Order a Kindle",
    //     complete: true,
    //     showItemOptions: false,
    //     editingDisabled: true,
    //     dateCreated: Date()
    //   },
    //   {
    //     id: 2,
    //     task: "Update notes",
    //     complete: false,
    //     showItemOptions: false,
    //     editingDisabled: true,
    //     dateCreated: Date()
    //   },
    //   {
    //     id: 3,
    //     task: "Revisit pot design",
    //     complete: true,
    //     showItemOptions: false,
    //     editingDisabled: true,
    //     dateCreated: Date()
    //   },
    //   {
    //     id: 4,
    //     task: "Check order status",
    //     complete: false,
    //     showItemOptions: false,
    //     editingDisabled: true,
    //     dateCreated: Date()
    //   },
    // ],
    newItem: "",
    showListOptions: false,
    listColor: "purple",
  };

  onChangeHandler = (event) => {
    const { value, name, type, id } = event.target; //object destructering
    const itemId = Number(id); //converts id to number

    type === "checkbox"
      ? this.setState((prevState) => {
          const updatedState = prevState.listData.map((task) => {
            //new [] formed using map method
            if (task.id === itemId) {
              //checks id of current task against passed in id
              return {
                //returns new object so as not to edit state directly
                ...task, // uses spread operator to bring in old tasks properties
                complete: !task.complete, //flips completed property
              };
            }
            return task; //returns task and puts into updatedState
          });
          return {
            listData: updatedState,
          };
        })
      : name === "newItem"
      ? this.setState({
          newItem: value,
        })
      : this.setState((prevState) => {
          const arrayIndex = prevState.listData.findIndex((listItem) => {
            return listItem.id === itemId;
          });

          let updatedListData = [...prevState.listData];
          updatedListData[arrayIndex].task = value;

          console.log("updated: ", updatedListData);
          return { listData: updatedListData };
        });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const { name, id } = event.target; //object destructering
    const itemId = Number(id); //converts id to number
    console.log("itemId: ", itemId);
    console.log("event: ", event.currentTarget);

    let  currentDate = new Date();
    currentDate = currentDate.toDateString()
    console.log('currentDate: ', currentDate);

    switch (name) {
      case "newItemEntry":
        if (this.state.newItem !== "") {
          this.setState((prevState) => {
            const updatedList = [...prevState.listData]; //copies prevState.list into new []
            updatedList.push({
              //pushes {} into new []
              id: Math.floor(Math.random() * 1000), //lazy way of giving unique id numbers
              task: prevState.newItem, //assigns task from old state - from input field
              complete: false,
              showItemOptions: false,
              editingDisabled: true,
              dateCreated: currentDate

            });

            return {
              listData: updatedList, //assigns new [] to state prop
              newItem: "",
            };
          });
        }
        break;

      default:
        this.setState((prevState) => {
          const arrayIndex = prevState.listData.findIndex((listItem) => {
            return listItem.id === itemId;
          });
          let updatedList = [...prevState.listData];
          updatedList[arrayIndex].editingDisabled = true;
          return {
            listData: updatedList,
          };
        });
    }

  };

  deleteHandler = (event) => {
    const itemId = Number(event.currentTarget.id); //converts id to number
    /*
     Find the index of array element containing the list item event was triggered from
        */
    const arrayIndex = this.state.listData.findIndex((listItem) => {
      return listItem.id === itemId;
    });

    this.setState((prevState) => {
      return {
        listData: prevState.listData.filter(
          (listItem) => {
            //setState using filter method which returns new array
            return prevState.listData.indexOf(listItem) !== arrayIndex;
          } // filters out the element with matching id
        ),
      };
    });
  };

  editHandler = (event) => {
    const { id } = event.currentTarget; //object destructering
    const itemId = Number(id); //converts id to number

    const arrayIndex = this.state.listData.findIndex((listItem) => {
      return listItem.id === itemId;
    });

    let updatedListData = [...this.state.listData];
    updatedListData[arrayIndex].editingDisabled = false;
    this.setState({ listData: updatedListData });

    // this.setState(prevState=>({
    //   listData: {
    //     ...prevState.listData,
    //     [prevState.listData[arrayIndex].editingDisabled]: false
    //   }
    // }))

    console.log("listData: ", this.state.listData);
  };

  buttonClickHandler = (event) => {
    // console.log("event: ", event.currentTarget);

    switch (event.currentTarget.name) {
      case "trash":
        this.deleteHandler(event);
        // console.log("button click fwded to delete handler");
        break;
      case "edit":
        this.editHandler(event);
        break;

      case "angle down":
        this.setState((prevState) => ({
          showListOptions: !prevState.showListOptions,
        }));
        break;

      case "none":
        this.setState({
          listColor: event.currentTarget.id,
        });

        break;

      default:
        console.log("no clue m8");
    }
  };

  mouseHover = (event) => {
    const { id } = event.target; //object destructering
    const itemId = Number(id); //converts id to number

    this.setState((prevState) => {
      const updatedState = prevState.listData.map((task) => {
        if (task.id === itemId) {
          return {
            //returns new object so as not to edit state directly
            ...task, // uses spread operator to bring in old tasks properties
            showItemOptions: true,
          };
        }
        return task;
      });
      return {
        listData: updatedState,
      };
    });

    // console.log(this.state.listData);
  };

  mouseExit = (event) => {
    const { id } = event.target; //object destructering
    const itemId = Number(id); //converts id to number

    this.setState((prevState) => {
      const updatedState = prevState.listData.map((task) => {
        if (task.id === itemId) {
          return {
            //returns new object so as not to edit state directly
            ...task, // uses spread operator to bring in old tasks properties
            showItemOptions: false,
          };
        }
        return task;
      });
      return {
        listData: updatedState,
      };
    });
  };

  render() {
    const todoItems = this.state.listData.map((item) => (
      <ListItem
        key={item.id}
        mouseHover={this.mouseHover}
        mouseExit={this.mouseExit}
        changed={this.onChangeHandler}
        item={item}
        clicked={this.buttonClickHandler}
        submit={this.submitHandler}
        color={this.state.listColor}
        dateCreated={item.dateCreated}
      />
    ));

    

    return (
      <div className={`${classes.listBody} ${classes[this.state.listColor]}`}>
        <div
          className={` ${classes.noteHeader} ${classes[this.state.listColor]} `}
        >
          <SemanticButton clicked={this.props.clicked} iconUsed="plus" />
          <h1>Task List </h1>
          <SemanticButton
            clicked={this.buttonClickHandler}
            iconUsed="angle down"
          />
        </div>
        {this.state.showListOptions ? (
          <ListOptions
            color={this.state.listColor}
            clicked={this.buttonClickHandler}
            deleteClicked={this.props.clicked}
            listId={this.props.listId}
          />
        ) : null}
        <form name="newItemEntry" onSubmit={this.submitHandler}>
          <input
            className={`${classes[this.state.listColor]}`}
            name="newItem"
            value={this.state.newItem}
            onChange={this.onChangeHandler}
            placeholder="Add a task"
            type="text"
          />
        </form>
        <ul>{this.state.listData.length > 0 ? todoItems : null}</ul>
      </div>
    );
  }
}

export default List;
