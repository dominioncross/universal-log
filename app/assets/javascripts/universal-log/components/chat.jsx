/*global React*/
var Chat = React.createClass({
  
  getInitialState: function(){
    return({
      gs: {} //global state
    });
  },
  componentDidMount: function(){
    if (this.props.channel){
      this.setGlobalState('channel', this.props.channel);
    }
  },
  setGlobalState: function(key, value){
    var globalState = this.state.gs;
    globalState[key] = value;
    this.setState({gs: globalState});
  },
  render: function(){
    return(
      <section id="main-wrapper" className="theme-blue-full">
        <Header gs={this.state.gs} sgs={this.setGlobalState} />
        <aside className="sidebar sidebar-left">
          <ChannelList gs={this.state.gs} sgs={this.setGlobalState}/>
        </aside>
        <section className="main-content-wrapper">
          <div className="pageheader">
            <h1>#{this.state.gs.channel}</h1>
          </div>
          <section id="main-content">
            <MessageList gs={this.state.gs} sgs={this.setGlobalState} fayeServer={this.props.faye_server} scopeId={this.props.scope_id} />
            <hr />
            {/*<small>{JSON.stringify(this.state.gs)}</small>*/}
          </section>
        </section>
      </section>
    );
  },
});