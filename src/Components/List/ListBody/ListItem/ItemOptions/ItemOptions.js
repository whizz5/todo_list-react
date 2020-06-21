import React from "react";
import classes from "./ItemOptions.module.css";
import SemanticButton from "../../../../Button/Button";

const ItemOptions = (props) => {
  return (
    <ol>
      <li
        className={`${classes.optionsBody} ${classes[props.color]}`}
        id={props.id}
        onMouseLeave={props.mouseExit}
      >
        <span className={classes.optionsContainer}>
          <span>Created: {props.dateCreated} </span>
          <span>
            <SemanticButton
              color="blue"
              clicked={props.clicked}
              id={props.id}
              iconUsed="edit"
            />
            <SemanticButton
              color="red"
              clicked={props.clicked}
              id={props.id}
              iconUsed="trash"
            />
          </span>
        </span>
      </li>
    </ol>
  );
};

export default ItemOptions;
