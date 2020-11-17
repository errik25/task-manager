import React from "react";
import "./TaskEdit.css";
import WithAuth from "../WithAuth";
import { connect } from "react-redux";
import { Button, Card, CardContent, TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { editTask, createTask, closeTask } from "../../actions/ToDoListActions";

class TaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewTask: !props.openedTask.createdAt,
      title: props.openedTask.title || "",
      status: props.openedTask.status || "todo",
      priority: props.openedTask.priority || "medium",
      description: props.openedTask.description || "",
      responsible: props.openedTask.responsible || "",
      completionDate: props.openedTask.completionDate || new Date(),
    };
  }

  handleInputChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleAddButton = () => {
    const task = {
      ...this.props.openedTask,
      title: this.state.title,
      status: this.state.status,
      priority: this.state.priority,
      description: this.state.description,
      responsible: this.state.responsible,
      completionDate: this.state.completionDate,
    }
    this.state.isNewTask ? this.props.createTask(task) : this.props.editTask(task);
  };

  handleInputChange = (event) => {
    const newState = {};
    newState[event.target.name] = event.target.value || "";
    this.setState(newState);
  };

  handleChange = (event) => {
    const newState = {};
    newState["age"] = event.target.value;
    this.setState(newState);
  };

  render() {
    return (
      <Card className={"TaskEdit"}>
        <CardContent className="TaskEdit__container">
          <TextField
            label="title"
            defaultValue={this.state.title}
            className={"TaskEdit__title-edit"}
            type="text"
            name={"title"}
            onChange={this.handleInputChange}
          />
          <TextField
            label="description"
            defaultValue={this.state.description}
            className={"TaskEdit__description-edit"}
            type="text"
            name={"description"}
            onChange={this.handleInputChange}
          />
          <FormControl>
            <InputLabel>priority</InputLabel>
            <Select
              label="priority"
              name="priority"
              value={this.state.priority}
              onChange={this.handleInputChange}
            >
              <MenuItem value={"low"}>low</MenuItem>
              <MenuItem value={"medium"}>medium</MenuItem>
              <MenuItem value={"high"}>high</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>status</InputLabel>
            <Select
              label="status"
              name="status"
              value={this.state.status}
              onChange={this.handleInputChange}
            >
              <MenuItem value={"todo"}>todo</MenuItem>
              <MenuItem value={"doing"}>doing</MenuItem>
              <MenuItem value={"done"}>done</MenuItem>
              <MenuItem value={"cancalled"}>cancalled</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="responsible"
            defaultValue={this.state.responsible}
            className={"TaskEdit__responsible-edit"}
            type="text"
            name={"responsible"}
            onChange={this.handleInputChange}
          />
          <TextField
            id="completionDate"
            label="completion date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={this.state.completionDate.toISOString().slice(0, 10)}
            className={"TaskEdit__completionDate-edit"}
          />
          <div className="Tast_edit__buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleAddButton();
              }}
              disabled={
                !(
                  this.state.title &&
                  this.state.status &&
                  this.state.priority &&
                  this.state.description &&
                  this.state.responsible &&
                  this.state.completionDate
                )
              }
            >
            {this.state.isNewTask ? 'Create' : 'Save'}
            </Button>
            <Button
              onClick={() => {
                this.props.closeTask();
              }}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editTask: (item) => dispatch(editTask(item)),
    createTask: (item) => dispatch(createTask(item)),
    closeTask: (item) => dispatch(closeTask()),
  };
};

const mapStateToProps = (store) => {
  return {
    openedTask: store.todoList.openedTask,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(TaskEdit));
