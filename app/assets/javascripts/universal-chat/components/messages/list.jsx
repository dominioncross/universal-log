/*global React*/
/*global ReactDOM*/
/*global $*/
/*global _*/
var MessageList = React.createClass({
  getInitialState: function(){
    return({message: null, messages: [], loading: false, pastProps: null});
  },
  init: function(){
    this.loadMessages();
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
        <ul className="list-group" ref="messageList">
          {this.messages()}
        </ul>
      </div>
    );
  },
  messages: function(){
    if (this.state.messages){
      var h = [];
      _.each(this.state.messages, function(message){
        h.push(<li key={message.id} className="list-group-item"><Message message={message} insertMessage={this.insertMessage} /></li>);
      });
      return(h);
    }else{
      return(null);
    }
  },
  loadMessages: function(){
    if (!this.state.loading){
      this.setState({loading: true});
      var _this=this;
      $.ajax({
        type: 'GET',
        url: '/chat/messages.json',
        data: {channel: this.props.gs.channel},
        success: function(data){
          _this.setState({messages: data, loading: false, pastProps: JSON.stringify(_this.props)});
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
    console.log(this.state.message);
    var textarea = ReactDOM.findDOMNode(this.refs.textarea);
    var _this=this;
    $.ajax({
      type: 'POST',
      url: '/chat/messages',
      data: {message: {message: this.state.message}, channel: this.props.gs.channel},
      success: function(data){
        textarea.value='';
        textarea.focus();
        _this.setState({messages: data});
      }
    });
  }
})