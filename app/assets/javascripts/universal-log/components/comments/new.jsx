/*global React*/
/*global ReactDOM*/
/*global $*/
var NewComment = React.createClass({
  getInitialState: function(){
    return({
      loading: false,
      content: '',
      allowEmail: false
    });
  },
  componentDidMount: function(){
    this.setState({allowEmail: this.props.allowEmail});
  },
  valid: function(){
    return (this.state.content != '');
  },
  handleChange: function(e){
    this.setState({content: e.target.value});
  },
  submitEmail: function(e){
    e.preventDefault();
    if (confirm('Are you sure you want to EMAIL this reply to the customer?')){
      this.handleSubmit(true); 
    }
  },
  submitNote: function(e){
    e.preventDefault();
    if (this.state.allowEmail){
      if (confirm('This note will NOT be emailed to the customer')){
        this.handleSubmit(false);
      }
    }else{
      this.handleSubmit(false);
    }  
  },
  handleSubmit: function(sendAsEmail){
    var _this=this;
    if (!this.state.loading){
      this.setState({loading: true});
      var emailKind = (sendAsEmail ? 'email' : 'normal');
      $.ajax({
        method: 'POST',
        url: '/universal/comments',
        dataType: 'JSON',
        data:{
          subject_type: this.props.subject_type,
          subject_id: this.props.subject_id,
          content: this.state.content,
          kind: emailKind,
          hide_private_comments: this.props.hidePrivateComments
        },
        success: function(data){
          _this.setState({content: '', focused: false, loading: false});
          _this.props.updateCommentList(data);
          ReactDOM.findDOMNode(_this.refs.content).value='';
          showSuccess("Comments saved");
        }
      });
    }
  },
  render: function(){
    return(
      <div>
        <div className="form-group" style={{marginBottom: '5px'}}>
          <textarea 
            className="form-control small" 
            ref='content' 
            placeholder={this.props.newCommentPlaceholder} 
            onChange={this.handleChange} 
            style={this.textareaStyle()} />
        </div>
        <ul className="list-inline">
          {this.sendAsEmailButton()}
          {this.saveAsNoteButton()}
        </ul>
      </div>
    );
  },
  sendAsEmailButton: function(){
    if (this.valid() && this.state.allowEmail){
      return(
        <li>
          <button className={this.buttonClass('email')} onClick={this.submitEmail}>
            <i className={this.loadingIcon('send')} /> Send email
          </button>
        </li>
      );
    }else{
      return(null);
    }    
  },
  saveAsNoteButton: function(){
    if (this.valid()){
      return(
        <li>
          <button className={this.buttonClass('note')} onClick={this.submitNote}>
            Post <i className={this.loadingIcon('chevron-right')} />
          </button>
        </li>
      );
    }else{
      return(null);
    }
  },
  loadingIcon: function(send_icon){
    if (this.state.loading){
      return('fa fa-refresh fa-spin');
    }else{
      return(`fa fa-${send_icon}`);
    }
  },
  buttonClass: function(type){
    if (type=='email'){
      return("btn btn-primary");
    }else if (type=='note'){
      return("btn btn-default btn-sm");
    }      
  },
  textareaStyle: function(){
    if (this.state.content){
      return({minHeight: '60px'});
    }else{
      return({height: '34px', backgroundColor: '#fafafa'});
    }
  },
});