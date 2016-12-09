/*global React*/
/*global ReactDOM*/
/*global Faye*/
/*global $*/
/*global _*/
var MessageList = React.createClass({
  getInitialState: function(){
    return({
      fayeListener: null,
      message: null,
      messageLines: 0,
      messages: [],
      loading: false,
      pastProps: null,
      pageNum: null
    });
  },
  init: function(){
    this.setState({pageNum: null});
    this.loadMessages();
  },
  componentDidMount: function(){
    var faye = new Faye.Client(this.props.fayeServer);
    faye.subscribe(`/log/${this.props.scopeId}/new`, this.receiveFaye);
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
    this.setState({message: e.target.value, messageLines: e.target.value.split(/\r\n|\r|\n/).length});
  },
  render: function(){
    return(
      <div>
        {this.messageForm()}
        {this.messages()}
        <Pagination
          pagination={this.state.pagination}
          currentPage={this.state.pageNum}
          pageResults={this.pageResults}
          displayDescription={true}
          />
      </div>
    );
  },
  messages: function(){
    if (this.state.messages.length>0){
      var h = [];
      var gs=this.props.gs;
      _.each(this.state.messages, function(message){
        h.push(<Message message={message} insertMessage={this.insertMessage} gs={gs} key={message.id} />);
      });
      return(<ul className="list-group" ref="messageList">{h}</ul>);
    }else{
      return(<div className="alert alert-info">No messages to list...</div>);
    }
  },
  loadMessages: function(page){
    if (!this.state.loading){
      if (page==undefined){page=1;}
      this.setState({loading: true});
      var _this=this;
      $.ajax({
        type: 'GET',
        url: `/log/messages.json?page=${page}`,
        data: {channel: this.props.gs.channel, keyword: this.props.gs.keyword},
        success: function(data){
          _this.setState({
            messages: data.messages,
            pagination: data.pagination,
            loading: false,
            pastProps: JSON.stringify(_this.props),
            pageNum: page
          });
          /*_this.props.sgs('searching', false);*/
        }
      });
    }
  },
  pageResults: function(page){
    this.loadMessages(page);
    this.setState({pageNum: page});
  },
  messageForm: function(){
    return(<div>
      <form onSubmit={this._submitForm}>
        <div className="form-group"><textarea onChange={this._changeMessage} className="form-control" ref="textarea" placeholder="New message..." style={{height: `${this.textAreaHeight()}px`}} /></div>
        {this.submitButton()}
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
        url: '/log/messages',
        data: {message: {message: this.state.message}, channel: this.props.gs.channel},
        success: function(data){
          textarea.value='';
          textarea.focus();
          _this.setState({
            messages: data.messages,
            pagination: data.pagination,
            loading: false,
            message: null,
            pastProps: JSON.stringify(_this.props),
            pageNum: 1
          });
        }
      });
    }
  },
  textAreaHeight: function(){
    if (this.state.message){
      var newHeight = 40 + (this.state.messageLines-1)*20;
      if (newHeight>240){
        newHeight=240;
      }
      return newHeight
    }else{
      return 40;
    }
  },
  postIcon: function(){
    if (this.state.loading){
      return("fa fa-fw fa-refresh fa-spin");
    }else{
      return("fa fa-fw fa-send");
    }
  },
  submitButton: function(){
    if (this.state.message){
      return(<div className="form-group"><button className="btn btn-primary"><i className={this.postIcon()} /> Post</button></div>);
    }else{
      return(null);
    }
  }
})