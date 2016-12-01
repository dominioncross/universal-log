/*global React*/
/*global ReactDOM*/
/*global Faye*/
/*global $*/
/*global _*/
var MessageList = React.createClass({
  getInitialState: function(){
    return({fayeListener: null, message: null, messages: [], loading: false, pastProps: null});
  },
  init: function(){
    this.loadMessages();
  },
  componentDidMount: function(){
    var faye = new Faye.Client(this.props.fayeServer);
    faye.subscribe(`/chat/${this.props.scopeId}/new`, this.receiveFaye);  
    console.log(`Listening on FAYE channel: '/chat/${this.props.scopeId}/new'`);
  },
  receiveFaye: function(e){
    if (e.channel==this.props.gs.channel){
      this.init();
    }
  },
  componentDidUpdate: function(){
    if (this.state.pastProps != JSON.stringify(this.props) && !this.state.loading){
      this.init();
    }
  },
  _changeMessage: function(e){
    this.setState({message: e.target.value});
  },
  render: function(){
    return(
      <div>
        {this.messageForm()}
        {this.messages()}
      </div>
    );
  },
  messages: function(){
    if (this.state.messages.length>0){
      var h = [];
      var gs=this.props.gs;
      _.each(this.state.messages, function(message){
        h.push(<li key={message.id} className="list-group-item"><Message message={message} insertMessage={this.insertMessage} gs={gs} /></li>);
      });
      return(<ul className="list-group" ref="messageList">{h}</ul>);
    }else{
      return(<div className="alert alert-info">No messages to list...</div>);
    }
  },
  loadMessages: function(){
    if (!this.state.loading){
      this.setState({loading: true});
      var _this=this;
      $.ajax({
        type: 'GET',
        url: '/chat/messages.json',
        data: {channel: this.props.gs.channel, keyword: this.props.gs.keyword},
        success: function(data){
          _this.setState({messages: data, loading: false, pastProps: JSON.stringify(_this.props)});
          /*_this.props.sgs('searching', false);*/
        }
      });
    }
  },
  messageForm: function(){
    return(<div>
      <form onSubmit={this._submitForm}>
        <div className="form-group"><textarea onChange={this._changeMessage} className="form-control" ref="textarea"/></div>
        <div className="form-group"><button className="btn btn-primary">Post</button></div>
      </form>
    </div>);
  },
  _submitForm: function(e){
    e.preventDefault();
    if (this.state.message && !this.state.loading){
      var textarea = ReactDOM.findDOMNode(this.refs.textarea);
      var _this=this;
      this.setState({loading: true});
      $.ajax({
        type: 'POST',
        url: '/chat/messages',
        data: {message: {message: this.state.message}, channel: this.props.gs.channel},
        success: function(data){
          textarea.value='';
          textarea.focus();
          _this.setState({messages: data, message: null, loading: false});
        }
      });
    }
  }
})