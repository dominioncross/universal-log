/*global React*/
/*global Autolinker*/
/*global $*/
/*global can*/
var Message = React.createClass({
  getInitialState: function(){
    return({message: null, flags: []});
  },
  componentDidMount: function(){
    this.setState({message: this.props.message, flags: this.props.message.flags});
  },
  render: function(){
    if (this.state.message){
      return(
        <li className="list-group-item">
          <div className="no-margin">
            <div className="pull-right small text-muted">
              {this.state.message.created}
              {this.deleteMessage()}
            </div>
            {this.pinMessage()}
            <span className="text-info small">{this.state.message.author}</span>
            {this.channel()}
            {this.subject()}
            <div dangerouslySetInnerHTML={{__html: Autolinker.link(this.state.message.message.replace(/(?:\r\n|\r|\n)/g, '<br />'))}} />
          </div>
        </li>
      );
    }else{
      return(null);
    }
  },
  channel: function(){
    if (this.props.gs && this.props.gs.channel && this.props.gs.keyword){
      return(
        <div className="text-warning" style={{marginRight: '10px'}}>
          <i className="fa fa-hashtag" />{this.state.message.channel}
        </div>
        );
    }else{
      return(null);
    }
  },
  subject: function(){
    if (this.state.message.subject_name){
      return(<div className="small">{this.state.message.subject_name}: </div>);
    }else{
      return null;
    }
  },
  pinned: function(){
    return(this.state.flags.indexOf('pinned')>-1);
  },
  pinIcon: function(){
    if (this.pinned()){
      return("fa fa-thumb-tack text-warning");
    }else{
      return("fa fa-thumb-tack");
    }
  },
  pinMessage: function(){
    if (can(this.props.gs, 'pin_messages')){
      return(<span style={{marginRight: '10px'}}><i className={this.pinIcon()} onClick={this._pinMessage} style={{cursor: 'pointer'}}/></span>);
    }else if (this.pinned()){
      return(<span style={{marginRight: '10px'}}><i className={this.pinIcon()} /></span>);
    }else{
      return null;
    }
  },
  _pinMessage: function(){
    if (can(this.props.gs, 'pin_messages')){
      var _this=this;
      $.ajax({
        type: 'PATCH',
        url: `/log/messages/${this.state.message.id}/flag`,
        data: {flag: 'pinned'},
        success: function(data){
          console.log(data);
          _this.setState({flags: data.flags});
        }
      }); 
    }
  },
  deleteMessage: function(){
    if (can(this.props.gs, 'delete_messages')){
      return(<span style={{marginLeft: '10px'}}><i className="fa fa-trash" onClick={this._deleteMessage} style={{cursor: 'pointer'}}/></span>);
    }else{
      return null;
    }
  },
  _deleteMessage: function(){
    var _this=this;
    if (confirm('Are you sure you want to delete this message?')){
      $.ajax({
        type: 'DELETE',
        url: `/log/messages/${this.state.message.id}`,
        success: function(data){
          console.log(data);
          _this.setState({message: null});
        }
      })
    }else{
      return null;
    }
  }
});