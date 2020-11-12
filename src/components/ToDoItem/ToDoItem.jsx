import React from 'react';
import './ToDoItem.css';
import CircleChecked from '../../images/circleChecked';
import Circle from '../../images/circle';
import Bin from '../../images/bin';
import {Checkbox} from '@material-ui/core';

export default class ToDoItem extends React.Component {

    render() {
        return (
            <div className={'ToDoItem'}>
                <div className="ToDoItem__container">
                    <Checkbox icon={<Circle style={{height: 15}}/>}
                              checkedIcon={<CircleChecked />}
                              checked={this.props.item.checked}
                              onChange={this.props.checkboxHandler}
                    />
                    <div
                        className={['ToDoItem__title', this.props.item.checked ? "ToDoItem__title_checked" : null].join(' ')}>
                        {this.props.item.title}
                    </div>
                </div>
                <div className="ToDoItem__removeMark"
                     onClick={() => {
                         this.props.removeButtonHandler()
                     }}>
                    <Bin/>

                </div>
            </div>
        )
    }
}
