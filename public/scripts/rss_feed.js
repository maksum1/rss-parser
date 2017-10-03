'use babel';

class RSSFeed extends React.Component{
    constructor(){
        super()
        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount(){
        Dispatchers.rss_feed.register(this.handleEvent)
    }

    handleEvent(event){
        switch (event.actionType) {
            case 'set-content':
                this.setState({items : event.content})
                break;
            default:
                console.log("RSSFeed::Undefined event :", event.actionType);
                break;
        }
    }

    render() {
        var rows = []
        console.log(this)
        console.log(this.state)
        if (this.state !== null) rows = this.state.items.map((item, i) => <RSSItem key = {i} data = {item} />)
        console.log(rows)
        return (
            <div>
                {rows}
            </div>
        );
    }
}

class RSSItem extends React.Component{
    render() {
        return (
            <div className="ff">
                <div className="title">
                    <a style={{marginLeft: 10 + "px"}} href={this.props.data.link}>
                        {this.props.data.title}
                    </a>
                </div>
                <div className="ff_all">
                    <div className="text_ff">
                        <p className="text_view_ff">
                            {this.props.data.content}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
