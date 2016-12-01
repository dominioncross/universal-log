/*global React*/
/*global ReactDOM*/
/*global $*/
var Config = React.createClass({
  
  getInitialState: function(){
    return(
      {config: null, signedIn: false, loading: false}
    );
  },
  componentDidMount: function(){
    this.init();
  },
  init: function(){
    var _this=this;
    $.ajax({
      method: 'GET',
      url: `/log/config.json`,
      success: function(data){
        _this.setState({config: data});
      }
    });
  },
  render: function(){
    return(
      <div>
        <header><BrandLogo system_name={this.state.config ? this.state.config.system_name : null} /></header>
        <div className="panel panel-primary" id="locked-screen">
          <div className="panel-heading">
            <h3 className="panel-title">Config</h3>
          </div>
          <div className="panel-body">
            {this.configForm()}
          </div>
        </div>
      </div>
    );
  },
  configForm: function(){
    if (this.state.signedIn){
      return(<ConfigForm config={this.state.config} updateChanges={this.updateChanges} loading={this.state.loading} />);
    }else{
      return(<ConfigLogin config={this.state.config} submitNewPassword={this.submitNewPassword} signIn={this.signIn} loading={this.state.loading} />);
    }
  },
  loading: function(){
    this.setState({loading: true});
  },
  finished: function(){
    this.setState({loading: false});
  },
  submitNewPassword: function(password){
    var _this=this;
    this.loading();
    $.ajax({
      method: 'POST',
      url: '/log/config/set_password',
      dataType: 'JSON',
      data:{
        password: password
      },
      success: function(data){
        _this.setState({config: data});
        showSuccess('Password saved: ' + password);
        _this.finished();
      }
    });
  },
  signIn: function(password){
    this.loading();
    $.ajax({
      method: 'POST',
      url: '/log/config/signin',
      dataType: 'JSON',
      data:{
        password: password
      },
      success: (function(_this){
        return function(data){
          _this.setState({signedIn: data.signedIn});
          if (data.signedIn){
            showSuccess('Password accepted');  
          }else{
            showErrorMessage('Incorrect password');  
          }
          _this.finished();
        }
      })(this)
    });
  },
  updateChanges: function(refs){
    this.loading();
    $.ajax({
      method: 'PATCH',
      url: '/log/config',
      dataType: 'JSON',
      data:{
        config: {
          system_name: ReactDOM.findDOMNode(refs.system_name).value,
          url: ReactDOM.findDOMNode(refs.url).value
        }
      },
      success: (function(_this){
        return function(data){
          showSuccess('Config updated');
          _this.setState({config: data});
          _this.finished();
        }
      })(this)
    });
  }
});