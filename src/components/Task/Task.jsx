import React from 'react';
import './Task.css';
import { Checkbox, Button, Card, CardContent } from '@material-ui/core';
import CircleChecked from '../../images/circleChecked';
import Circle from '../../images/circle';
import Bin from '../../images/bin';

export default class Task extends React.Component {
  render() {
    const {
      title,
      status,
      priority,
      responsible,
      completionDate,
    } = this.props.item;
    return (
      <div
        className="Task"
        onClick={() => {
          this.props.editButtonHandler();
        }}
      >
        <Card>
          <CardContent
            className={`Task__card ${
              new Date(completionDate).getTime() < new Date().getTime() && status !== 'done'
                ? 'Task__card_overdue'
                : ''
            }  ${status === 'done' ? 'Task__card_completed' : ''}   `}
          >
            <div className="Task__container">
              <div className="Task__title">{title}</div>
              <div className="Task__completion-date">
                To {new Date(completionDate).toISOString().slice(0, 10)}
              </div>
              <div className="Task__responsible">
                Responsible - {responsible}
              </div>
              <div className="Task__status">Status - {status}</div>
              <div className="Task__priority">Priority - {priority}</div>
            </div>
            <div
              className="Task__removeMark"
              onClick={() => {
                this.props.removeButtonHandler();
              }}
            >
              <Bin />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
