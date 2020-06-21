import React from "react";
import { Button } from "semantic-ui-react";

const ButtonExampleIcon = (props) => (
  <Button
    
    color={props.color}
    basic={!props.solidButton}
    inverted
    
    onClick={props.clicked}
    name={props.name ||props.iconUsed}
    id={props.id}
    icon={props.iconUsed}
  >
{props.chidlren}
    </Button>
);

export default ButtonExampleIcon;
