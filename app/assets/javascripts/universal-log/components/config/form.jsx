var ConfigForm = createReactClass({
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
          <label htmlFor="sms_url">SMS Broadcast URL (optional)</label>
          <input type="text" className="form-control" defaultValue={this.props.config.sms_url} id="sms_url" ref="sms_url" />
        </div>
        <div className="form-group">
          <label htmlFor="sms_source">SMS Broadcast Source (optional)</label>
          <input type="text" className="form-control" defaultValue={this.props.config.sms_source} id="sms_source" ref="sms_source" />
        </div>
        <div className="form-group">
          <label htmlFor="sms_username">SMS Broadcast Username (optional)</label>
          <input type="text" className="form-control" defaultValue={this.props.config.sms_username} id="sms_username" ref="sms_username" />
        </div>
        <div className="form-group">
          <label htmlFor="sms_password">SMS Broadcast Password (optional)</label>
          <input type="text" className="form-control" defaultValue={this.props.config.sms_password} id="sms_password" ref="sms_password" />
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
