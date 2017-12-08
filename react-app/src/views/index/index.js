import React from 'react'
import logo from '../../assets/imgs/logo.svg'
import './index.css'

export default class Index extends React.Component {
    render () {
        return (
            <div className="home">
                <header className="home-header">
                    <img src={logo} className="home-logo" alt="logo" />
                    <h1 className="home-title">Welcome to React </h1>
                </header>
                <p className="home-intro">To get started, edit <code>src/App.js</code> and save to reload.</p>
            </div>
        )
    }
}