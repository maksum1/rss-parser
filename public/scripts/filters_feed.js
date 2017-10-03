'use babel';

class FiltersFeed extends React.Component{
    constructor(){
        super()
        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount(){
        Dispatchers.filters_feed.register(this.handleEvent)
        API.getRSSSources(function(data){
            Dispatchers.filters_feed.dispatch({
                actionType : "set-content",
                content : data
            })
        })
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
        if (this.state !== null) rows = this.state.items.map((item, i) => <FilterItem key = {i} data = {item} index={i} />)
        console.log(rows)
        return (
            <div>
                {rows}
            </div>
        );
    }
}

class FilterItem extends React.Component{
    constructor(){
        super()
        this.onClick = this.onClick.bind(this)
    }
    onClick(e){
        API.getRSSContentForIndex(this.props.index, function(data){
            Dispatchers.rss_feed.dispatch({
                actionType : "set-content",
                content : data
            })
        });
    }

    render() {
        return (
            <a className="source" href="#" onClick={this.onClick}>
                {this.props.data}
            </a>
        );
    }
}
