import React, { Component } from 'react'
import { Router, Route, HashHistory } from 'react-router'
import logo from './logo.svg'
import './App.css'

class App extends Component {
    render () {
        return (
            <Router>
                <Route path="/">
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1 className="App-title">Welcome to React </h1>
                        </header>
                        <p className="App-intro">To get started, edit <code>src/App.js</code> and save to reload.</p>
                    </div>
                </Route>
            </Router>
        )
    }
}

export default App
