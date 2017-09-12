class FormatName extends React.Component {
    render () {
        return <h1>
          Hello, {this.props.name}!
        </h1>
    }
}

ReactDOM.render(
    <FormatName name="Harper" />,
    document.getElementById('root')
);
