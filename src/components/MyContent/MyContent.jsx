import React from "react";
import moment from "moment";
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
      sortBy: "updatedAt",
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
    switch (this.state.sortBy) {
      case "updatedAt":
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      case "competionDate":
        return (
          new Date(b.completionDate).getTime() -
          new Date(a.completionDate).getTime()
        );
      case "responsible":
        return b.responsible.localeCompare(a.responsible);
    }
  };

  render() {
    const { tasks, removeItem, checkItem, openTask } = this.props;

    const taskLayout = (list) => {
      return list.map((item) => {
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
    };

    let sortedList = tasks.slice();
    sortedList = sortedList.sort(this.sortTasks);
    let sortedTasks = taskLayout(sortedList);

    let overdueTask = sortedList.filter((item) => {
      const daysDiff = moment(item.completionDate).diff(moment(), "days");
      return daysDiff < 0;
    });
    overdueTask = taskLayout(overdueTask);

    let tasksForToday = sortedList.filter((item) => {
      const daysDiff = moment(item.completionDate).diff(moment(), "days");
      return daysDiff === 0;
    });
    tasksForToday = taskLayout(tasksForToday);

    let tasksForWeek = sortedList.filter((item) => {
      const daysDiff = moment(item.completionDate).diff(moment(), "days");
      return daysDiff > 0 && daysDiff < 7;
    });
    tasksForWeek = taskLayout(tasksForWeek);

    let restTasks = sortedList.filter((item) => {
      const daysDiff = moment(item.completionDate).diff(moment(), "days");
      return daysDiff > 7;
    });
    restTasks = taskLayout(restTasks);

    return (
      <div className={"MyContent"}>
        <div className={"MyContent__container"}>
          <div className={"MyContent__tools"}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => {
                this.props.openTask({});
              }}
            >
              Create a task
            </Button>
            <FormControl>
              <InputLabel>sort</InputLabel>
              <Select
                label="sort"
                name="sortBy"
                value={this.state.sortBy}
                onChange={this.handleInputChange}
              >
                <MenuItem value={"updatedAt"}>modified date</MenuItem>
                <MenuItem value={"completionDate"}>completion date</MenuItem>
                <MenuItem value={"responsible"}>responsible</MenuItem>
              </Select>
            </FormControl>
          </div>
          {tasks.length === 0 ? (
            "loading..."
          ) : (
            <React.Fragment>
              {this.state.sortBy === "completionDate" ? (
                <div className={"MyContent__groups"}>
                  overdue
                  <div className={"MyContent__tasks"}>{overdueTask}</div>
                  for today
                  <div className={"MyContent__tasks"}>{tasksForToday}</div>
                  for the week
                  <div className={"MyContent__tasks"}>{tasksForWeek}</div>
                  rest
                  <div className={"MyContent__tasks"}>{restTasks}</div>
                </div>
              ) : (
                <div className={"MyContent__tasks"}>{sortedTasks}</div>
              )}
              {this.props.openedTask && (
                <div className="MyContent__popupTint">
                  <TaskEdit />
                </div>
              )}
            </React.Fragment>
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
