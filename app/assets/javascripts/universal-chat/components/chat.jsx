/*global React*/
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
      <div>
        <div className="row">
          <div className="col-sm-4">
            <ChannelList gs={this.state.gs} sgs={this.setGlobalState}/>
          </div>
          <div className="col-sm-8">
            <h2>{this.state.gs.channel}</h2>
            <MessageList gs={this.state.gs} sgs={this.setGlobalState}/>
          </div>
        </div>
        <hr />
        {/*<small>{JSON.stringify(this.state.gs)}</small>*/}
      </div>
    );
  },
});