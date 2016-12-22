/*global React*/
/*global ReactDOM*/
/*global $*/
var LogBook = React.createClass({
  
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
      <section id="main-wrapper" className="theme-green">
        <Header gs={this.state.gs} sgs={this.setGlobalState} />
        <aside className="sidebar sidebar-left">
          <ChannelList gs={this.state.gs} sgs={this.setGlobalState}/>
          <h5 className="sidebar-header" onClick={this.subscriberSettings} style={{cursor: 'pointer'}}>Settings</h5>
        </aside>
        <section className="main-content-wrapper">
          <div className="pageheader">
            <div className="pull-right">
              
              {this.editChannelButton()}
            </div>
            <h1>
              {this.subscribeChannelButton()}
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
        <Modal ref='edit_subscriber_modal' modalTitle={`Subscriber Details`} modalContent={<EditSubscriber gs={this.state.gs} sgs={this.state.sgs} />} />
      </section>
    );
  },
  subscribeChannelButton: function(){
    if (this.state.gs.subscriber){
      if (this.state.gs.subscriber.subscribed_to_channels.indexOf(this.state.gs.channel)>-1){
        return(<i className="fa fa-fw fa-bell text-danger" onClick={this.subscribeToChannel} data-subscribe="0" style={{cursor: 'pointer'}} title="Do not notify me of updates" />);
      }else{
        return(<i className="fa fa-fw fa-bell-o" onClick={this.subscribeToChannel} data-subscribe="1" style={{cursor: 'pointer'}} title="Notify me of updates" />);
      }
    }
  },
  subscriberSettings: function(){
    var modal = ReactDOM.findDOMNode(this.refs.edit_subscriber_modal);
    if (modal){
      $(modal).modal('show', {backdrop: 'static'});
    }
  },
  subscribeToChannel: function(e){
    if (!this.state.gs.subscriber.phone_number){
      this.subscriberSettings();
    }else{
      var _this=this;
      var subscribe = $(e.target).attr('data-subscribe')
      $.ajax({
        type: 'PATCH',
        url: `/log/${this.state.gs.channel}/subscribe`,
        data: {subscribe: subscribe},
        success: function(data){
          _this.setGlobalState('subscriber', data)
        }
      });
    }
  },
  editChannelButton: function(){
    if (can(this.state.gs, 'edit_channels')){
      return(<i className="fa fa-fw fa-pencil small" onClick={this.displayEditChannel} style={{cursor: 'pointer'}} />);
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