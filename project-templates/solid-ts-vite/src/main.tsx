import { render } from 'solid-js/web'
import Counter from './Counter'
import './style.css'

const App = () => {
    return <div id='app'>
        <h1>Hello Solid</h1>
        <h4>Counters: <span><Counter /> | <Counter /></span></h4>
    </div>
}

render(() => <App />, document.getElementById('root')!)

