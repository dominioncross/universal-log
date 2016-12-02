/*global React*/
/*global ReactDOM*/
/*global $*/
var LogBook = React.createClass({
  
  getInitialState: function(){
    return({
      gs: {} //global state
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
      <section id="main-wrapper" className="theme-green">
        <Header gs={this.state.gs} sgs={this.setGlobalState} />
        <aside className="sidebar sidebar-left">
          <ChannelList gs={this.state.gs} sgs={this.setGlobalState}/>
        </aside>
        <section className="main-content-wrapper">
          <div className="pageheader">
            {this.editChannelButton()}
            <h1>
              #{this.state.gs.channel}
            </h1>
            {this.channelNotes()}
          </div>
          <section id="main-content">
            <MessageList gs={this.state.gs} sgs={this.setGlobalState} fayeServer={this.props.faye_server} scopeId={this.props.scope_id} />
            <hr />
            {/*<small>{JSON.stringify(this.state.gs)}</small>*/}
          </section>
        </section>
        <Modal ref='edit_channel_modal' modalTitle={`Edit #${this.state.gs.channel}`} modalContent={<EditChannel gs={this.state.gs} />} />
      </section>
    );
  },
  editChannelButton: function(){
    if (can(this.state.gs, 'edit_channels')){
      return(<div className="pull-right"><i className="fa fa-fw fa-pencil small" onClick={this.displayEditChannel} style={{cursor: 'pointer'}} /></div>);
    }
  },
  displayEditChannel: function(){
    var modal = ReactDOM.findDOMNode(this.refs.edit_channel_modal);
    if (modal){
      $(modal).modal('show', {backdrop: 'static'});
    }
  },
  channelNotes: function(){
    if (this.state.gs.channel_notes){
      return(<div className="small text-info">{this.state.gs.channel_notes}</div>);
    }else{
      return(null);
    }
  }
});