import React from "react";
import Task from "../Task/Task";
import "./MyContent.css";
import WithAuth from "../WithAuth";
import { connect } from "react-redux";
import {
  addItem,
  openTask,
  getTodoData,
  removeItem,
} from "../../actions/ToDoListActions";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import TaskEdit from "../TaskEdit/TaskEdit";

class MyContent extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date().toString(),
      todoData: null
    };
  }

  componentDidMount() {
    this.props.getTodoData();
  }

  handleAddButton = () => {
    if (this.state.input) {
      const newItem = {
        title: this.state.input,
      };
      this.props.addItem(newItem);
      this.setState({
        input: "",
      });
    }
  };

  render() {
    const { toDoList, removeItem, checkItem } = this.props;

    const todoList =
      toDoList &&
      toDoList.map((item) => {
        return (
          <Task
            key={item.key}
            item={item}
            editButtonHandler={() => {
              this.props.openTask(item);
            }}
            removeButtonHandler={() => {
              removeItem(item.id);
            }}
          />
        );
      });
    return (
      <div className={"MyContent"}>
        <div className="MyContent__container">
          {todoList.length === 0 ? (
            "loading..."
          ) : (
            <div>
              {todoList}
              {this.props.openedTask && (
                <div className="MyContent__popupTint">
                  <TaskEdit openedTask={this.props.openedTask}/>
                </div>
              )}
              <input
                type="text"
                className={"MyContent__new-item-input"}
                value={this.state.input}
                onChange={this.handleInputChange}
                onKeyPress={this.handleInputKeys}
                placeholder={"Input new item"}
              />
              {this.state.input !== "" && (
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    this.handleAddButton();
                  }}
                >
                  add
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (title) => dispatch(addItem(title)),
    removeItem: (id) => dispatch(removeItem(id)),
    getTodoData: () => dispatch(getTodoData()),
    openTask: (pressedItem) => dispatch(openTask(pressedItem)),
  };
};

const mapStateToProps = (store) => {
  return {
    toDoList: store.todoList.list,
    openedTask: store.todoList.openedTask,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithAuth(MyContent));
