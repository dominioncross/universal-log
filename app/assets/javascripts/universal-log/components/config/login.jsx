var ConfigLogin = React.createClass({
  getInitialState: function(){
    return({password: null})
  },
  render: function(){
    return(
      <div>
        {this.setPassword()}
        {this.enterPassword()}
      </div>
    )
  },
  passwordField: function(){
    return(<input type="password" className="form-control" ref="password" onChange={this.changePassword} />)
  },
  changePassword: function(e){
    this.setState({password: e.target.value});
  },
  setPassword: function(){
    if (this.props.config && this.props.config.hashed_password==undefined){
      return(
        <form onSubmit={this.submitNewPassword}>
          <p>As this is your first login, please enter a password to allow you to access this config later.</p>
          <div className="form-group">
            {this.passwordField()}
            <div className="small">Minimum 6 characters</div>
          </div>
          <div className="form-group">
            {this.submitButton('Save Password', this.submitNewPassword)}
          </div>
        </form>
      )
    }
  },
  enterPassword: function(){
    if (this.props.config && this.props.config.hashed_password){
      return(
        <form onSubmit={this.signIn}>
          <p>Please enter your password to continue</p>
          <div className="form-group">
            <input type="password" className="form-control" ref="password" onChange={this.changePassword} />
          </div>
          <div className="form-group">
            {this.submitButton('Sign in', this.signIn)}
          </div>
        </form>
      )
    }
  },
  submitButton: function(label, method){
    if (this.props.loading){
      label = 'Loading...'
    }
    if (this.state.password && this.state.password.length>=6){
      return(<button className="btn btn-primary btn-block" onClick={method}>{label}</button>)
    }else{
      return(<button className="btn btn-primary btn-block" disabled="disabled">{label}</button>)
    }
  },
  submitNewPassword: function(e){
    e.preventDefault();
    this.setState({loading: true});
    this.props.submitNewPassword(this.state.password);
  },
  signIn: function(e){
    e.preventDefault();
    this.setState({loading: true});
    this.props.signIn(this.state.password);
  }
})
