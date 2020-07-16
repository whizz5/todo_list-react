import React, { Component } from "react";
import ListItem from "./ListBody/ListItem/ListItem";
import classes from "./List.module.css";
import SemanticButton from "../../Components/Button/Button";
import ListOptions from "../List/ListOptions/ListOptions";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class List extends Component {
  constructor(props) {
    super(props);
    this.dragRef = React.createRef();
  }

  submitHandler = (event) => {
    event.preventDefault(); //prevents page refresh on submission

    //User is either creating a new list item or updating an existing list item
    const name = event.target.name; //object destructering

    switch (name) {
      case "newItemEntry":
        if (this.props.newItem !== "") {
          // if text has definitely been entered
          this.props.reduxCreateListItem();
        }
        break;

      default:
        this.props.reduxUpdateList(event);
    }
  };

  buttonClickHandler = (event) => {
    // console.log("event: ", event.currentTarget);
    switch (event.currentTarget.name) {
      case "trash":
        // this.deleteHandler(event);
        this.props.reduxDeleteItemHandler(event);
        // console.log("button click fwded to delete handler");
        break;
      case "edit":
        this.props.reduxEditHandler(event);
        break;
      case "angle down":
        this.props.reduxToggleMenu();
        break;
      case "none":
        this.props.reduxColorChange(event);
        break;
      default:
        console.log("no clue m8");
    }
  };

  render() {
    const todoItems = this.props.listData.map((item) => (
      <ListItem
        key={item.id}
        changed={this.props.reduxUpdateList}
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
        <form name="newItemEntry" onSubmit={this.submitHandler}>
          <input
            className={`${classes[this.props.listColor]}`}
            name="newItem"
            value={this.props.newItem}
            onChange={(event) => this.props.reduxUpdateList(event)}
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
    reduxUpdateList: (event) =>      dispatch({ type: actionTypes.UPDATE_LIST, value: event }),
    reduxCreateListItem: () => dispatch({ type: actionTypes.CREATE_LIST_ITEM }),
    reduxEditHandler: (event) =>      dispatch({ type: actionTypes.EDIT_LIST_ITEM, value: event }),
    reduxDeleteItemHandler: (event) =>      dispatch({ type: actionTypes.DELETE_LIST_ITEM, value: event }),
    reduxToggleMenu: () => dispatch({ type: actionTypes.TOGGLE_MENU }),
    reduxColorChange: (event) =>      dispatch({ type: actionTypes.CHANGE_COLOR, value: event }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
