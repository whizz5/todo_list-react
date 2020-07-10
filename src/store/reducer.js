import * as actionTypes from "./actions"; //imports all from actions.js

const initialState = {
  listData: [],
  newItem: "",
  showListOptions: false,
  listColor: "purple",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_LIST_ITEM":
      return {};
    case "DELETE_LIST_ITEM":
      return {};
    case "EDIT_LIST_ITEM":
      return {};
    case "CREATE_LIST":
      return {};
    case "DELETE_LIST":
      return {};
    case "CHANGE_COLOR":
      return {};
    case actionTypes.UPDATE_LIST:
      // case "UPDATE_LIST":
      console.log("[UPDATED LIST --- reducer]");
      const { value, name, type, id } = action.value.target; //object destructering
      const itemId = Number(id); //converts id to number
      if (type === "checkbox") { //if we check an item
        const updatedState = state.listData.map((task) => {
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
          ...state,
          listData: updatedState,
        };
      } else if (name === "newItem") { //if we add a new item to the list
        return {
          ...state,
          newItem: value,
        };
      } else { //if item within the list has been changed
        const arrayIndex = state.listData.findIndex((listItem) => {
          return listItem.id === itemId;
        });

        let updatedListData = [...state.listData];
        updatedListData[arrayIndex].task = value;

        console.log("updated: ", updatedListData);
        return { ...state, listData: updatedListData };
      }

    default:
      console.log("[DEFAULT --- reducer]");
      return state;
  }
};

export default reducer;

/* onChangeHandler = (event) => {
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
  }; */
