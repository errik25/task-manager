import React from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import './MyContent.css';
import WithAuth from "../WithAuth";
import {connect} from "react-redux";
import {addItem, checkItem, getTodoData, removeItem} from "../../actions/ToDoListActions";
import {Button, Card, CardContent} from '@material-ui/core'

class MyContent extends React.Component {
    constructor() {
        super();
        this.state = {
            time: new Date().toString(),
            todoData: null,
            input: ''
        }
    }

    componentDidMount() {
        this.props.getTodoData();
    }

    handleInputChange = (event) => {
        this.setState({
                input: event.target.value
            }
        )
    }

    handleInputKeys = (event) => {
        if (event.key === "Enter") {
            this.handleAddButton()
        }
    }

    handleAddButton = () => {
        if (this.state.input) {
            const newItem = {
                title: this.state.input
            }
            this.props.addItem(newItem)
            this.setState({
                input: ''
            })
        }
    }

    render() {
        const {toDoList, removeItem, checkItem} = this.props;

        const todoList = toDoList && toDoList.map((item) => {
            return (
                <ToDoItem
                    key={item.key}
                    item={item}
                    checkboxHandler={(e) => {
                        checkItem({...item, checked: e.target.checked})
                    }}
                    removeButtonHandler={() => {
                        removeItem(item.id)
                    }}
                />
            )
        })
        return (
            <div className={'MyContent'}>
                <div className="MyContent__container">
                    {todoList.length === 0 ?
                        'loading...'
                        :
                        <Card>
                            <CardContent className='MyContent__todoCard'>
                                {todoList}
                                <input type="text"
                                       className={'MyContent__new-item-input'}
                                       value={this.state.input}
                                       onChange={this.handleInputChange}
                                       onKeyPress={this.handleInputKeys}
                                       placeholder={'Input new item'}
                                />
                                {this.state.input !== '' &&
                                <Button variant="text" size='small'
                                        onClick={() => {
                                            this.handleAddButton()
                                        }}>
                                    add
                                </Button>
                                }
                            </CardContent>
                        </Card>
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem: title => dispatch(addItem(title)),
        removeItem: id => dispatch(removeItem(id)),
        getTodoData: () => dispatch(getTodoData()),
        checkItem: pressedItem => dispatch(checkItem(pressedItem))
    }
}

const mapStateToProps = store => {
    return {
        toDoList: store.todoList.list
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(MyContent))
