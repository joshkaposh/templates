import React from 'react';
import Canvas from './canvas/Canvas';
import './assets/main.css'
export default function App() {
    const test = (canvas:any,ctx:any) => {
    }

    return <div className='main-container'>
        <Canvas callback={test} />
    </div>
}