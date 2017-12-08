import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Home from './views/index'
import Login from './views/login'
import Reg from './views/reg'
import Notfound from './views/notFound'
import NavBar from './views/components/nsvlink'

/**
 * @param Switch - 开关，用于路由组，404
 * @param Redirect - 重定向， 用于错误页面； push - 不允许返回
*/

class App extends Component {
    render () {
        return (
            <Router>
                <div>
                    <NavBar/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/reg" component={Reg }/>
                        <Redirect from="/rrrrrr" to="/" push />
                        <Route component={Notfound}></Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App
