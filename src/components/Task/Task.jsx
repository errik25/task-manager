import React from "react";
import "./Task.css";
import CircleChecked from "../../images/circleChecked";
import Circle from "../../images/circle";
import Bin from "../../images/bin";
import { Checkbox } from "@material-ui/core";
import {Button, Card, CardContent} from '@material-ui/core'

export default class Task extends React.Component {
  render() {
    return (
      <div className={"Task"}>
        <Card>
          <CardContent className={`Task__card ${new Date(this.props.item.completionDate).getTime() < new Date().getTime() ? 'Task__card_overdue' : ''}  ${this.props.item.status === 'done' ? 'Task__card_completed' : ''}   `}>
            <div className="Task__container">
              <div className="Task__title">{this.props.item.title}</div>
              <div className="Task__completion-date">
                To {new Date(this.props.item.completionDate).toISOString().slice(0, 10)}
              </div>
              <div className="Task__responsible">
                Responsible - {this.props.item.responsible}
              </div>
              <div className="Task__status">
                Status - {this.props.item.status}
              </div>
              <div className="Task__priority">
                Priority - {this.props.item.priority}
              </div>
            </div>
            <div
              className="Task__removeMark"
              onClick={() => {
                this.props.removeButtonHandler();
              }}
            >
              <Bin />
            </div>
            <div
              className="Task__edit-button"
              onClick={() => {
                this.props.editButtonHandler();
              }}
            >
              edit
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
