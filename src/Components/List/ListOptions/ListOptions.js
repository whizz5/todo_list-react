import React from "react";
import SemanticButton from "../../Button/Button";

import classes from "./ListOptions.module.css";

const ListOptions = (props) => {
  return (
    <div>
      <ul>
        <li className={`${classes.listOptions} ${classes[props.color]}`}>
          <span className={classes.colorPalette}>
            <SemanticButton
              clicked={props.clicked}
              name="none"
              id="orange"
              solidButton={true}
              color="orange"
              iconUsed="paint brush"
            />
            <SemanticButton
              clicked={props.clicked}
              name="none"
              id="olive"
              solidButton={true}
              color="olive"
              iconUsed="paint brush"
            />
            <SemanticButton
              clicked={props.clicked}
              name="none"
              id="purple"
              solidButton={true}
              color="purple"
              iconUsed="paint brush"
            />
          </span>
          <SemanticButton
            color="red"
            clicked={props.deleteClicked}
            iconUsed="trash"
            id={props.listId}
          />
        </li>
      </ul>
    </div>
  );
};

export default ListOptions;
