/*global React*/
/*global Autolinker */
var Message = React.createClass({
  render: function(){
    return(
      <div>
        <div className="no-margin">
          <div className="pull-right small text-muted">{this.props.message.created}</div>
          <span className="text-info small">{this.props.message.author}</span>
          <br />
          <div dangerouslySetInnerHTML={{__html: Autolinker.link(this.props.message.message.replace(/(?:\r\n|\r|\n)/g, '<br />'))}} />
        </div>
      </div>
    );
  }
});