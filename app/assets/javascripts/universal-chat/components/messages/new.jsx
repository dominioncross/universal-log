/*global React*/
/*global ReactDOM*/
/*global $*/
/*global _*/
var NewMessage = React.createClass({
  render: function(){
    return(
      <div>
        <form onSubmit={this.props._submitForm}>
          <div className="form-group"><textarea onChange={this.props._changeMessage} className="form-control" ref="textarea"/></div>
          <div className="form-group"><button className="btn btn-primary">Post</button></div>
        </form>
      </div>
    );
  }
})