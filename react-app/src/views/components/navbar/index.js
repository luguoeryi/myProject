import React from 'react'
import { Menu } from 'element-react'
import Head from './head'

export default class NavBar extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            src: 'https://www.baidu.com/img/bd_logo1.png'
        }
        this.changeHeaderImg = this.changeHeaderImg.bind(this)
    }

    changeHeaderImg (src) {
        this.setState({src: src})
    }

    render () {
        let src = this.state.src
        return (
            <div>
                <Head src={src} changeHeaderImg={this.changeHeaderImg} />
                <Menu mode="vertical" onSelect={onSelect} defaultActive="1" className="el-menu-vertical-demo">
                    <Menu.Item index="1"><i className="el-icon-message"></i>导航一</Menu.Item>
                    <Menu.Item index="2"><i className="el-icon-message"></i>导航二</Menu.Item>
                    <Menu.Item index="3"><i className="el-icon-message"></i>导航三</Menu.Item>
                    <Menu.Item index="4"><i className="el-icon-message"></i>导航四</Menu.Item>
                </Menu>
            </div>
        )
    }
}

function onSelect () {
    console.log(arguments)
}
