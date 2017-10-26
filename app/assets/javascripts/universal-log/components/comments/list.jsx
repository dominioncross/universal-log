/*global React*/
/*global $*/
var Comments = createReactClass({
  getInitialState: function(){
    return({
      subject_id: null,
      comments: [],
      content: '',
      focused: false,
      loading: false,
      pastProps: null
    });
  },
  init: function(){
    this.loadComments();
  },
  componentDidMount: function(){
    this.init();
  },
  componentDidUpdate: function(){
    if (this.state.pastProps != JSON.stringify(this.props) && !this.state.loading){
      this.init();
    }
  },
  updateCommentList: function(comments){
    this.setState({comments: comments});
  },
  render: function(){
    if (this.props.newCommentPosition == 'bottom'){
      return(
        <div>
          {this.renderCommentList()}
          {this.renderCommentForm()}
        </div>
      );
    }else{
      return(
        <div>
          {this.renderCommentForm()}
          {this.renderCommentList()}
        </div>
      );
    }
  },
  renderCommentForm: function(){
    if (this.openComments()){
      return(<NewComment 
               updateCommentList={this.updateCommentList} 
               subject_type={this.props.subject_type} 
               subject_id={this.props.subject_id} 
               newCommentPlaceholder={this.props.newCommentPlaceholder} 
               allowEmail={this.props.allowEmail} 
               hidePrivateComments={this.props.hidePrivateComments}
               />);
    }else{
      return(null);
    }
  },
  renderCommentList: function(){
    var comments = [];
    var fullWidth = this.props.fullWidth;
    this.state.comments.forEach(function(comment){
      comments.push(<Comment key={comment.id} comment={comment} fullWidth={fullWidth} />);
    });
    if (this.state.comments){
      return(
        <div className="chat-widget">
          {comments}
        </div>
      );
    }else{
      return(null);
    }
  },
  loadComments: function(){
    var _this=this;
    if (!this.state.loading){
      this.setState({loading: true});
      $.ajax({
        method: 'GET',
        url: `/universal/comments`,
        dataType: 'JSON',
        data:{
          subject_type: this.props.subject_type,
          subject_id: this.props.subject_id,
          content: this.state.content,
          hide_private_comments: this.props.hidePrivateComments
        },
        success: function(data){
          _this.setState({
            comments: data,
            subject_id: _this.props.subject_id,
            loading: false,
            pastProps: JSON.stringify(_this.props),
          });
        }
      });
    }
  },
  openComments: function(){
    return (this.props.openComments==undefined || this.props.openComments==true);
  }
});