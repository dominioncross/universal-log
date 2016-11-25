/*global React*/
/*global Faye*/
var Chat = React.createClass({
  
  getInitialState: function(){
    return({
      gs: {} //global state
    });
  },
  setGlobalState: function(key, value){
    var globalState = this.state.gs;
    globalState[key] = value;
    this.setState({gs: globalState});
  },
  render: function(){
    return(
      <section id="main-wrapper" className="theme-blue-full">
        <header id="header">
          <div className="brand">
            <a href="/chat" className="logo">
              <i className="fa fa-comments" /> <span>Universal</span> Chat
            </a>
          </div>
        </header>
        <aside className="sidebar sidebar-left">
          <ChannelList gs={this.state.gs} sgs={this.setGlobalState}/>
        </aside>
        <section className="main-content-wrapper">
          <div className="pageheader">
            <h1>#{this.state.gs.channel}</h1>
          </div>
          <section id="main-content">
            <MessageList gs={this.state.gs} sgs={this.setGlobalState} fayeServer={this.props.faye_server} scopeId={this.props.scope_id} />
          </section>
        </section>
        <hr />
        {/*<small>{JSON.stringify(this.state.gs)}</small>*/}
      </section>
    );
  },
});