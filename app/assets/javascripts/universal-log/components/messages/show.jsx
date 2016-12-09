/*global React*/
/*global Autolinker*/
/*global $*/
/*global can*/
var Message = React.createClass({
  getInitialState: function(){
    return({message: null});
  },
  componentDidMount: function(){
    this.setState({message: this.props.message});
  },
  render: function(){
    if (this.state.message){
      return(
        <li className="list-group-item">
          <div className="no-margin">
            <div className="pull-right text-muted">
              <small>{this.state.message.created}</small>
              {this.pinMessage()}
              {this.deleteMessage()}
            </div>
            <span className="text-info">{this.state.message.author}</span>
            {this.channel()}
            {this.subject()}
            <div style={{marginBottom: '10px'}} dangerouslySetInnerHTML={{__html: Autolinker.link(this.state.message.message.replace(/(?:\r\n|\r|\n)/g, '<br />'))}} />
            <Comments 
              subject_type='UniversalLog::Message'
              subject_id={this.props.message.id}
              newCommentPosition='bottom'
              openComments={true}
              newCommentPlaceholder='Comment...'
              fullWidth={false}
              />
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
    return(this.state.message.pinned);
  },
  pinIcon: function(){
    if (this.pinned()){
      return("fa fa-thumb-tack text-danger");
    }else{
      return("fa fa-thumb-tack");
    }
  },
  pinMessage: function(){
    if (can(this.props.gs, 'pin_messages')){
      return(<span style={{marginLeft: '10px'}}><i className={this.pinIcon()} onClick={this._pinMessage} style={{cursor: 'pointer'}}/></span>);
    }else if (this.pinned()){
      return(<span style={{marginLeft: '10px'}}><i className={this.pinIcon()} /></span>);
    }else{
      return null;
    }
  },
  _pinMessage: function(){
    if (can(this.props.gs, 'pin_messages')){
      var _this=this;
      $.ajax({
        type: 'PATCH',
        url: `/log/messages/${this.state.message.id}/pin`,
        success: function(data){
          _this.setState({message: data});
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