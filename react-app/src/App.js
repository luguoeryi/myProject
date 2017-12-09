import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from './utils/asyncComponent'
import { Layout } from 'element-react'

const Home = asyncComponent(() => import('./views/index'))
const Login = asyncComponent(() => import('./views/login'))
const Reg = asyncComponent(() => import('./views/reg'))
const Notfound = asyncComponent(() => import('./views/notFound'))
const NavBar = asyncComponent(() => import('./views/components/navbar'))

/**
 * @for Router
 * @param {string} basename 基础路径
 * @param {Boolean} forceRefresh 当浏览器不支持 HTML5 的 history API 时强制刷新页面
 * @param {function} getUserConfirmation 导航到此页面前执行的函数，默认使用 window.confirm
*/

/**
 * @for Route
 * @param {component} Switch - 开关，用于路由组，404
 * @param {component} Redirect - 重定向， 用于错误页面； push - 不允许返回
*/

class App extends Component {
    render () {
        return (
            <Router>
                <div>
                    {/* <NavBar/> */}
                    <Layout.Row className="tac">
                        <Layout.Col span="4">
                            <NavBar />
                        </Layout.Col>
                        <Layout.Col span="20">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/reg" component={Reg }/>
                                <Redirect from="/rrrrrr" to="/" push />
                                <Route component={Notfound}></Route>
                            </Switch>
                        </Layout.Col>
                    </Layout.Row>
                </div>
            </Router>
        )
    }
}

/**
 * @param {string} message 弹出信息
 * @param {function} callback 回掉函数
*/

const getUserConfirmation = (message, callback) => {
    let allowTransition = window.confirm(message)
    callback && callback(allowTransition)
}

export default App
