// Slomux - реализация Flux, в которой, как следует из названия, что-то сломано.
// Нужно починить то, что сломано, и подготовить Slomux к использованию на больших проектах, где крайне важна производительность

// ВНИМАНИЕ! Замена slomux на готовое решение не является решением задачи
import ReactDOM from 'react-dom';
import React from "react";
import MyContent from "./components/MyContent/MyContent";

// const themes = {
//     light: {
//         foreground: '#000000',
//         background: '#eeeeee',
//     },
//     dark: {
//         foreground: '#ffffff',
//         background: '#222222',
//     },
// };
//
// const ThemeContext = React.createContext(
//     themes.dark // default value
// );
//
// const MyContext = React.createContext('hello world');
//
// class DeepComponent extends React.Component {
//
//     render() {
//         let {text, changeText} = this.context
//         return (
//             <div>
//                 deep component
//                 <div
//                     onClick={() => {changeText('my new text')}}
//                 >
//                     {text}
//                 </div>
//             </div>
//         )
//     }
// }
//
// DeepComponent.contextType = MyContext;
//
// class ThemedButton extends React.Component {
//     render() {
//         let props = this.props;
//         let theme = this.context;
//         return (
//             <button
//                 {...props}
//                 style={{backgroundColor: theme.background}}
//             />
//         );
//     }
// }
//
// ThemedButton.contextType = ThemeContext;
//
// // An intermediate component that uses the ThemedButton
// function Toolbar(props) {
//     return (
//         <ThemedButton onClick={props.changeTheme}>
//             Change Theme
//         </ThemedButton>
//     );
// }
//
// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             text: 'some text in parental component'
//         };
//
//         this.changeText = (newText) => {
//             this.setState(state => ({
//                 text: newText
//             }));
//         };
//     }
//
//     render() {
//         // The ThemedButton button inside the ThemeProvider
//         // uses the theme from state while the one outside uses
//         // the default dark theme
//         return (
//             <div>
//                 <MyContext.Provider value={{text: this.state.text, changeText: this.changeText}}>
//                     <DeepComponent changeText={this.changeText}/>
//
//                 </MyContext.Provider>
//
//                 {/*<ThemeContext.Provider value={this.state.text}>*/}
//                 {/*    <Toolbar changeTheme={this.toggleTheme}/>*/}
//                 {/*</ThemeContext.Provider>*/}
//                 {/*<ThemedButton/>*/}
//             </div>
//         );
//     }
// }
//
//
// ReactDOM.render(
//     <App/>,
//     document.getElementById('root')
// )


const createStore = (reducer, initialState) => {
    let currentState = initialState
    let listeners = []

    let getState = currentState;
    const dispatch = action => {
        getState = reducer(currentState, action)
        listeners.forEach(listener => listener())
    }

    const subscribe = listener => listeners.push(listener)

    return {getState, dispatch, subscribe}
}

const useSelector = selector => {
    const ctx = React.useContext(React.createContext(null))
    if (!ctx) {
        return 0
    }

    return selector(ctx.store.getState())
}
const useDispatch = () => {
    const ctx = React.useContext(React.createContext(null))
    if (!ctx) {
        return () => {
        }
    }
    return ctx.store.dispatch
}

let myContext = React.createContext('hello');

class MyComponent extends React.Component {

    static contextType = myContext;

    clickHandler = () => {
        console.log('handler')
        this.context.store.changeState('newText');
        // const action = updateCounter(4);
        // console.log(this.context.store.getState().counter)
        // this.context.dispatch(action)
        // console.log('store')
        // console.log(this.context.getState)

        // this.context.changeText('newText');
    }

    render() {
        // console.log(this.context.getState.counter)

        // let {text, changeText} = this.context
        return (
            <div onClick={this.clickHandler}>
                {this.context.store.state.text}
                {/*{this.context.store.getState.myText}*/}
            </div>
        )
    }
}

const Provider = ({store, context, children}) => {
    // console.log('store')
    // console.log(store)
    // console.log(store.getState())
    const Context = myContext;
    const [myText, changeText] = React.useState('my text');
    let state = {
        text: 'my text'
    }
    const changeState = (newText) => {
        console.log('changeState')
        state = {...state, text: newText}
        newStore = {
            ...newStore,
            state: {
                state,
                changeState,
                dispatch: {},
                subscribe: {}
            }
        }
    }
    let newStore = {
        state,
        changeState,
        dispatch: {},
        subscribe: {}
    }
    return (
        <Context.Provider
            value={newStore}>
            {/*value={{myText, changeText: changeText}}>*/}
            {children}
        </Context.Provider>
    )
}

// APP

// actions
const UPDATE_COUNTER = 'UPDATE_COUNTER'
const CHANGE_STEP_SIZE = 'CHANGE_STEP_SIZE'

// action creators
const updateCounter = value => ({
    type: UPDATE_COUNTER,
    payload: value,
})

const changeStepSize = value => ({
    type: CHANGE_STEP_SIZE,
    payload: value,
})


// reducers
const defaultState = {
    counter: 1,
    stepSize: 1,
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case UPDATE_COUNTER:
            console.log('reducer')
            console.log(action.payload)
            const counter = state.counter + action.payload;
            return {...state, counter}
        case CHANGE_STEP_SIZE:
            const stepSize = action.payload
            return {...state, stepSize}
        default: {
            return {...state}
        }
    }
}

// ВНИМАНИЕ! Использование собственной реализации useSelector и dispatch обязательно
const Counter = (props) => {
    const counter = useSelector(state => state.counter)
    // console.log("props")
    // console.log(props)
    const dispatch = useDispatch()

    return (
        <div>
            <button onClick={() => dispatch(updateCounter(-1))}>-</button>
            <span> {counter} </span>
            <button onClick={() => dispatch(updateCounter(1))}>+</button>
        </div>
    )
}

const Step = () => {
    const stepSize = useSelector(state => state.stepSize, (current, prev) => current === prev)
    const dispatch = useDispatch

    return (
        <div>
            <div>Значение счётчика должно увеличиваться или уменьшаться на заданную величину шага</div>
            <div>Текущая величина шага: {stepSize}</div>
            <input
                type="range"
                min="1"
                max="5"
                value={stepSize}
                onChange={({target}) => dispatch(changeStepSize(target.value))}
            />
        </div>
    )
}

ReactDOM.render(
    // <Provider store={createStore(reducer, defaultState)}>
    <Provider store={createStore(reducer, defaultState)}>
        {/*    <Step/>*/}
        {/*    <Counter />*/}
        <MyComponent/>
    </Provider>,
    document.getElementById('root')
)
