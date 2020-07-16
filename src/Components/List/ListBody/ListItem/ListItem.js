import React from "react";
import classes from "./ListItem.module.css";
import ItemOptions from "./ItemOptions/ItemOptions";
import { connect } from "react-redux";

import * as actionTypes from "../../../../store/actions";

const ListItem = (props) => {
  return (
    <>
      <li
        className={`${props.item.complete ? classes.completed : null} ${
          classes[props.color]
        }`}
        id={props.item.id}
      >
        <form id={props.item.id} name="taskItem" onSubmit={props.submit}>
          <input
            disabled={props.item.editingDisabled}
            onChange={(event) => props.reduxUpdateList(event)}
            className={`${
              props.item.complete ? classes.completed : classes.taskDisplay
            } ${classes[props.color]}`}
            type="text"
            value={props.item.task}        
            id={props.item.id}
            name={"taskItemText"}
          />

          <input
            type="checkbox"
            className={classes.checkmark}
            checked={props.item.complete}
            id={props.item.id}
            onChange={props.reduxUpdateList}
            onMouseEnter={props.reduxMouseEnterHandler}
          />
        </form>
      </li>

      {props.item.showItemOptions ? (
        <ItemOptions
          id={props.item.id}
          mouseExit={props.reduxMouseExitHandler}
          clicked={props.clicked}
          color={props.color}
          dateCreated={props.dateCreated}
        />
      ) : null}
    </>
  );
};

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
    reduxUpdateList: (event) =>
      dispatch({ type: actionTypes.UPDATE_LIST, value: event }),
    reduxMouseEnterHandler: (event) =>
      dispatch({ type: actionTypes.MOUSE_OVER, value: event }),
    reduxMouseExitHandler: (event) =>
      dispatch({ type: actionTypes.MOUSE_EXIT, value: event }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
