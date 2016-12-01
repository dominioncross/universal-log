var ConfigForm = React.createClass({
  getInitialState: function(){
    return({});
  },
  submitForm: function(e){
    e.preventDefault();
    this.props.updateChanges(this.refs);
  },
  changeInboundDomain: function(e){
    this.setState({inbound_domain: e.target.value});
  },
  render: function(){
    return(
      <form onSubmit={this.submitForm}>
        <div className="form-group">
          <label htmlFor="system_name">System Name</label>
          <input type="text" className="form-control" defaultValue={this.props.config.system_name} id="system_name" ref="system_name" />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input type="text" className="form-control" defaultValue={this.props.config.url} id="url" ref="url" />
        </div>
        <div className="form-group">
          <label htmlFor="google_api_key">Google API Key (optional)</label>
          <input type="text" className="form-control" defaultValue={this.props.config.google_api_key} id="google_api_key" ref="google_api_key" />
        </div>
        <div className="form-group">
          <label htmlFor="token">Token</label>
          <input type="text" className="form-control" defaultValue={this.props.config.token} id="token" disabled="disabled"/>
        </div>
        <div className="form-group">
          {this.submitButton('Save Changes')}
        </div>
      </form>
    )
  },
  submitButton: function(label){
    if (this.props.loading){
      label = 'Loading...'
    }
    return(
      <button className="btn btn-primary btn-block">{label}</button>
    )
  }
})
