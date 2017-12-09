import React from 'react'
import './index.css'

export default class Header extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            src: props.src
        }
        this.changeHeaderImg = this.changeHeaderImg.bind(this)
    }

    changeHeaderImg () {
        this.props.changeHeaderImg('https://gss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2017-09-27/297f5edb1e984613083a2d3cc0c5bb36.png')
    }

    componentWillReceiveProps (nextProps) {
        this.setState({src: nextProps.src})
    }

    render () {
        let src = this.state.src
        return <img className="img-default" src={src} onClick={this.changeHeaderImg} />
    }
}
