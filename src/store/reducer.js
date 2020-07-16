import * as actionTypes from "./actions"; //imports all from actions.js

const initialState = {
  listData: [],
  newItem: "",
  showListOptions: false,
  listColor: "purple",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_LIST_ITEM": {
      console.log("[CREATED LIST ITEM --- reducer]");

      let currentDate = new Date();
      currentDate = currentDate.toDateString();

      const updatedList = [...state.listData]; //copies prevState.list into new []
      updatedList.push({
        //pushes {} into new []
        id: Math.floor(Math.random() * 1000), //lazy way of giving unique id numbers
        task: state.newItem, //assigns task from old state - from input field
        complete: false,
        showItemOptions: false,
        editingDisabled: true,
        dateCreated: currentDate,
      });

      return {
        ...state,
        listData: updatedList, //assigns new [] to state prop
        newItem: "",
      };
    }

    case "DELETE_LIST_ITEM": {
      console.log("[DELETE LIST ITEM --- reducer]");
      const itemId = Number(action.value.currentTarget.id); //converts id to number
      /*
       Find the index of array element containing the list item event was triggered from
          */
      const arrayIndex = state.listData.findIndex((listItem) => {
        return listItem.id === itemId;
      });

      const updatedList = state.listData.filter((listItem) => {
        //using filter method  returns new array
        return state.listData.indexOf(listItem) !== arrayIndex;
      }); // filters out the element with matching id

      return { ...state, listData: updatedList };
    }

    case "EDIT_LIST_ITEM": {
      console.log("[EDIT LIST ITEM --- reducer]");
      const { id } = action.value.currentTarget; //object destructering
  
      const itemId = Number(id); //converts id to number

      const arrayIndex = state.listData.findIndex((listItem) => {
        return listItem.id === itemId;
      });

      const updatedListData = [...state.listData];
      updatedListData[arrayIndex].editingDisabled = false;
      return { ...state, listData: updatedListData };
    }
    case "CREATE_LIST":
      return {};
    case "DELETE_LIST": {
      const itemId = Number(action.value.id); //converts id to number
      /*
       Find the index of array element containing the list item event was triggered from
          */
      const arrayIndex = state.listData.findIndex((listItem) => {
        return listItem.id === itemId;
      });

      // this.setState((prevState) => {
      //   return {
      //     listData: prevState.listData.filter(
      //       (listItem) => {
      //         //setState using filter method which returns new array
      //         return prevState.listData.indexOf(listItem) !== arrayIndex;
      //       } // filters out the element with matching id
      //     ),
      //   };
      // });

      const updatedListData = [...state.listData].filter(
        //filter method returns new array based on condition
        (listItem) => {
          return state.listData.indexOf(listItem) !== arrayIndex;
        } // filters out the element with matching id
      );

      return { ...state, listData: updatedListData };
    }

    case "CHANGE_COLOR":{
      return {...state, 
      listColor: action.value.currentTarget.id
      };}


    case actionTypes.TOGGLE_MENU:{
      
      return{...state, 
        showListOptions: !state.showListOptions,};
    }
    case actionTypes.UPDATE_LIST: {
      // case "UPDATE_LIST":

      let { value, name, type, id } = action.value.target; //object destructering
 
      let itemId = Number(id); //converts id to number
      if (type === "checkbox") {
        //if we tick an item
        let updatedState = state.listData.map((task) => {
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
      } else if (name === "newItem") {
        //if we add a new item to the list
        return {
          ...state,
          newItem: value,
        };
      } else {
        //if item within the list has been changed
        const arrayIndex = state.listData.findIndex((listItem) => {
          return listItem.id === itemId;
        });

        let updatedListData = [...state.listData];
        updatedListData[arrayIndex].task = value;

        if (name === "taskItem") {
          updatedListData[arrayIndex].editingDisabled = true;
          
        }

        return { ...state, listData: updatedListData };
      }
    }

    case actionTypes.MOUSE_OVER: {
      // console.log("[MOUS OVER --- reducer]");
      const itemId = Number(action.value.target.id); //converts id to number

      const updatedListData = state.listData.map((task) => {
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
        ...state,
        listData: updatedListData,
      };
    }

    case actionTypes.MOUSE_EXIT: {
      // console.log("[MOUSE EXIT --- reducer]");
      const itemId = Number(action.value.target.id); //converts id to number

      const updatedListData = state.listData.map((task) => {
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
        ...state,
        listData: updatedListData,
      };
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
