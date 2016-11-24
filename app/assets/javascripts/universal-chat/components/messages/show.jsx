/*global React*/
var Message = React.createClass({
  render: function(){
    return(
      <div>
        <div className="no-margin">
          <div className="pull-right small text-muted">{this.props.message.created}</div>
          <span className="text-info small">{this.props.message.author}</span>
          <br />
          {this.props.message.message}
        </div>
      </div>
    );
  }
});