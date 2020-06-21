import React from "react";
import classes from "./ListItem.module.css";
import ItemOptions from "./ItemOptions/ItemOptions";

const ListItem = (props) => {
  return (
    <>
      <li
       
        className={`${props.item.complete ? classes.completed : null} ${classes[props.color]}`}
        id={props.item.id}
      >
        <form id={props.item.id} name="taskItem" onSubmit={props.submit}>
          <input
            disabled={props.item.editingDisabled}
            onChange={props.changed}
            className={
              `${props.item.complete ? classes.completed : classes.taskDisplay} ${classes[props.color]}`
            }
            type="text"
            value={props.item.task}
            id={props.item.id}
            name={"task item: " + props.item.id}
          />

          <input
            type="checkbox"
            className={classes.checkmark}
            checked={props.item.complete}
            id={props.item.id}
            // onChange={() => props.changed(props.item.id)}
            onChange={props.changed}
            onMouseEnter={props.mouseHover}
          />
        </form>
      </li>

      {props.item.showItemOptions ? (
        <ItemOptions
          id={props.item.id}
          mouseExit={props.mouseExit}
          clicked={props.clicked}
          color={props.color}
          dateCreated={props.dateCreated}
        />
      ) : null}
    </>
  );
};

export default ListItem;
