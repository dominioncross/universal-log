/*global React*/
var BrandLogo = React.createClass({
  render: function(){
    return(
      <div className="brand">
        <a href="/log" className="logo">
          <i className="fa fa-sticky-note-o" style={{marginRight: '5px'}}/>
          <span>{this.props.system_name == null ? 'Logbook' : this.props.system_name}</span>
        </a>
      </div>
    );
  }
});