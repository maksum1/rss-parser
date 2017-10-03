'use babel';
//
// import React from 'react';
// import ReactDOM from 'react-dom';

class Page extends React.Component{
    componentDidMount(){
        API.getRSSContent(function(data){
            Dispatchers.rss_feed.dispatch({
                actionType : "set-content",
                content : data
            })
        });
    }

    render(){
        return (<RSSFeed/>);
    }
};

ReactDOM.render(
    <Page/>,
    document.getElementById('content')
);

ReactDOM.render(
    <FiltersFeed/>,
    document.getElementById('filters_content')
);
