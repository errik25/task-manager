import React from "react";
import Task from "../Task/Task";
import "./MyContent.css";
import WithAuth from "../WithAuth";
import { connect } from "react-redux";
import { openTask, getTodoData, removeItem } from "../../actions/TasksActions";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import TaskEdit from "../TaskEdit/TaskEdit";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

class MyContent extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date().toString(),
      sortBy: 'updatedAt'
    };
  }

  componentDidMount() {
    this.props.getTodoData();
  }

  handleInputChange = (event) => {
    const newState = {};
    newState[event.target.name] = event.target.value || "";
    this.setState(newState);
  };

  sortTasks = (a, b) => {
    switch(this.state.sortBy) {
      case 'updatedAt':
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case 'competionDate':
        return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
      case 'responsible':
        return b.responsible.localeCompare(a.responsible)
    }
  }

  render() {
    const { tasks, removeItem, checkItem, openTask } = this.props;
    let sortedList = tasks.slice();
    sortedList = sortedList.sort(this.sortTasks);
    let sortedTasks =
      sortedList.map((item) => {
        return (
          <Task
            key={item.id}
            item={item}
            editButtonHandler={() => {
              openTask(item);
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
          <FormControl>
            <InputLabel>sort</InputLabel>
            <Select
              label="sort"
              name="sortBy"
              value={this.state.sortBy}
              onChange={this.handleInputChange}
            >
              <MenuItem value={"updatedAt"}>modified date</MenuItem>
              <MenuItem value={"competionDate"}>completion date</MenuItem>
              <MenuItem value={"responsible"}>responsible</MenuItem>
            </Select>
          </FormControl>
          {tasks.length === 0 ? (
            "loading..."
          ) : (
            <div>
              {sortedTasks}
              {this.props.openedTask && (
                <div className="MyContent__popupTint">
                  <TaskEdit />
                </div>
              )}
              <Button
                size="medium"
                onClick={() => {
                  this.props.openTask({});
                }}
              >
                Create a task
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => dispatch(removeItem(id)),
    getTodoData: () => dispatch(getTodoData()),
    openTask: (pressedItem) => dispatch(openTask(pressedItem)),
  };
};

const mapStateToProps = (store) => {
  return {
    tasks: store.tasks.list,
    openedTask: store.tasks.openedTask,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithAuth(MyContent));
