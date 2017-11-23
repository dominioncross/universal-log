/*global React*/
/*global ReactDOM, createReactClass*/
/*global $*/
var UniversalLogChannel = createReactClass({
  
  getInitialState: function(){
    return({
      gs: {}, //global state
      sgs: this.setGlobalState
    });
  },
  componentDidMount: function(){
    if (this.props.channel){
      this.setGlobalState('channel', this.props.channel);
    }
    var _this = this;
    $.ajax({
      method: 'GET',
      url: `/log/init.json`,
      success: (function(data){
        document.title = data.config.system_name;
        _this.setGlobalState('config', data.config);
        _this.setGlobalState('user', data.universal_user);
        _this.setGlobalState('users', data.users);
        _this.setGlobalState('subscriber', data.subscriber);
      })
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
        <MessageList gs={this.state.gs} 
          sgs={this.setGlobalState}
          fayeServer={this.props.faye_server}
          new_placeholder={this.props.new_placeholder}
          scopeId={this.props.scope_id} />
      </div>
    );
  },
});