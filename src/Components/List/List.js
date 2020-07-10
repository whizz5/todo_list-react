import React, { Component } from "react";
import ListItem from "./ListBody/ListItem/ListItem";
import classes from "./List.module.css";
import SemanticButton from "../../Components/Button/Button";
import ListOptions from "../List/ListOptions/ListOptions";

import Draggable from "react-draggable";
import { connect } from "react-redux";

import * as actionTypes from '../../store/actions';

class List extends Component {
  constructor(props) {
    super(props);
    this.dragRef = React.createRef();
  }

  state = {
    listData: [],
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

    let currentDate = new Date();
    currentDate = currentDate.toDateString();
    console.log("currentDate: ", currentDate);

    switch (name) {
      case "newItemEntry":
        if (this.props.newItem !== "") {
          this.setState((prevState) => {
            const updatedList = [...prevState.listData]; //copies prevState.list into new []
            updatedList.push({
              //pushes {} into new []
              id: Math.floor(Math.random() * 1000), //lazy way of giving unique id numbers
              task: prevState.newItem, //assigns task from old state - from input field
              complete: false,
              showItemOptions: false,
              editingDisabled: true,
              dateCreated: currentDate,
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
    const arrayIndex = this.props.listData.findIndex((listItem) => {
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

    const arrayIndex = this.props.listData.findIndex((listItem) => {
      return listItem.id === itemId;
    });

    let updatedListData = [...this.props.listData];
    updatedListData[arrayIndex].editingDisabled = false;
    this.setState({ listData: updatedListData });

    // this.setState(prevState=>({
    //   listData: {
    //     ...prevState.listData,
    //     [prevState.listData[arrayIndex].editingDisabled]: false
    //   }
    // }))

    console.log("listData: ", this.props.listData);
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

    // console.log(this.props.listData);
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
    const todoItems = this.props.listData.map((item) => (
      <ListItem
        key={item.id}
        mouseHover={this.mouseHover}
        mouseExit={this.mouseExit}
        changed={this.props.reduxInputUpdate}
        item={item}
        clicked={this.buttonClickHandler}
        submit={this.submitHandler}
        color={this.props.listColor}
        dateCreated={item.dateCreated}
      />
    ));

    return (
      //<Draggable>
      <div className={`${classes.listBody} ${classes[this.props.listColor]}`}>
        <div
          className={` ${classes.noteHeader} ${classes[this.props.listColor]} `}
        >
          <SemanticButton clicked={this.props.clicked} iconUsed="plus" />
          <h1>Task List </h1>
          <SemanticButton
            clicked={this.buttonClickHandler}
            iconUsed="angle down"
          />
        </div>
        {this.props.showListOptions ? (
          <ListOptions
            color={this.props.listColor}
            clicked={this.buttonClickHandler}
            deleteClicked={this.props.clicked}
            listId={this.props.listId}
          />
        ) : null}
        <form name="newItemEntry" onSubmit={this.props.reduxSubmitHandler}>
          <input
            className={`${classes[this.props.listColor]}`}
            name="newItem"
            value={this.props.newItem}
            onChange={(event)=>this.props.reduxInputUpdate(event)}
            placeholder="Add a task"
            type="text"
          />
        </form>
        <ul>{this.props.listData.length > 0 ? todoItems : null}</ul>
      </div>
      //</Draggable>
    );
  }
}

///////////////////////////////////
//mapStateToProps defines which part of the state is being used in this container
const mapStateToProps = (state) => {
  return {
    /* 
Properties from within state (as seen in reducer.js) are assigned as props which can then be used in the container
*/
    listData: state.listData,
    newItem: state.newItem,
    showListOptions: state.showListOptions,
    listColor: state.listColor,
  };
};

//mapDispatchToProps defines which actions are being used in this container
const mapDispatchToProps = (dispatch) => {
  return {
reduxInputUpdate: (event)=>dispatch({type: actionTypes.UPDATE_LIST,  value: event} ),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
