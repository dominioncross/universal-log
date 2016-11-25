/*global React*/
/*global Autolinker */
var Message = React.createClass({
  render: function(){
    return(
      <div>
        <div className="no-margin">
          <div className="pull-right small text-muted">{this.props.message.created}</div>
          <span className="text-info small">{this.props.message.author}</span>
          {this.channel()}
          <div dangerouslySetInnerHTML={{__html: Autolinker.link(this.props.message.message.replace(/(?:\r\n|\r|\n)/g, '<br />'))}} />
        </div>
      </div>
    );
  },
  channel: function(){
    if (this.props.gs && this.props.gs.channel && this.props.gs.keyword){
      return(
        <div className="text-warning" style={{marginRight: '10px'}}>
          <i className="fa fa-hashtag" />{this.props.gs.channel}
        </div>
        );
    }else{
      return(null);
    }
  }
});