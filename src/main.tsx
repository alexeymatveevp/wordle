import React from 'react'
import ReactDOM from 'react-dom/client'
import { Wordle } from './Wordle'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Wordle />
    </React.StrictMode>,
)
