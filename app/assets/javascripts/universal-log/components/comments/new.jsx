/*global React*/
/*global ReactDOM*/
/*global $*/
var NewComment = createReactClass({
  getInitialState: function(){
    return({
      loading: false,
      content: '',
      focused: false
    });
  },
  componentDidMount: function(){
  },
  valid: function(){
    return (this.state.content != '');
  },
  handleChange: function(e){
    this.setState({content: e.target.value});
  },
  submitNote: function(e){
    e.preventDefault();
    this.handleSubmit(false);
  },
  handleSubmit: function(sendAsEmail){
    var _this=this;
    if (!this.state.loading){
      this.setState({loading: true});
      $.ajax({
        method: 'POST',
        url: '/universal/comments',
        dataType: 'JSON',
        data:{
          subject_type: this.props.subject_type,
          subject_id: this.props.subject_id,
          content: this.state.content,
          kind: 'normal',
          hide_private_comments: this.props.hidePrivateComments
        },
        success: function(data){
          _this.setState({content: '', loading: false});
          _this.props.updateCommentList(data);
          ReactDOM.findDOMNode(_this.refs.content).value='';
          ReactDOM.findDOMNode(_this.refs.content).blur();
        }
      });
    }
  },
  render: function(){
    return(
      <div className="chat-widget">
        <div className="row wrapper animated fadeInRight">
          <div className="col-sm-2">
          </div>
          <div className="col-sm-10">
            <div className="post system_generated" style={this.focusStyle()}>
              <span className="arrow left"></span>
              <form onSubmit={this.submitNote}>
                <input 
                  className="form-control small text-info"
                  ref='content'
                  placeholder={this.props.newCommentPlaceholder}
                  onChange={this.handleChange}
                  onFocus={this.setFocus}
                  onBlur={this.setFocus}
                  style={{padding:0, borderWidth: 0, backgroundColor: 'inherit', height: 20}}
                  />
              </form>
            </div>
          </div>
        </div>
        </div>
    );
  },
  loadingIcon: function(send_icon){
    if (this.state.loading){
      return('fa fa-refresh fa-spin');
    }else{
      return(`fa fa-${send_icon}`);
    }
  },
  setFocus: function(){
    this.setState({focused: !this.state.focused});
  },
  focusStyle: function(){
    if (this.state.focused){
      return({backgroundColor: '#FFF'});
    }
  }
});