/*global React*/
/*global ReactDOM*/
/*global $*/
var EditSubscriber = React.createClass({
  getInitialState: function(){
    return({phone_number: '', pastProps: null, loading: false});
  },
  init: function(){
    if (this.props.gs && this.props.gs.subscriber){
      this.setState({phone_number: String(this.props.gs.subscriber.phone_number), pastProps: JSON.stringify(this.props)});
    }
  },
  componentDidUpdate: function(){
    if (this.state.pastProps != JSON.stringify(this.props) && !this.state.loading){
      this.init();
    }
  },
  handleChange(event) {
    this.setState({phone_number: event.target.value});
  },
  render: function(){
    return(
      <div>
        <div className="form-group">
          <label>Phone Number</label>
          <input ref="phone_number" className="form-control" value={this.state.phone_number} onChange={this.handleChange} />
          <div className="small">SMS notifications will be sent here.</div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this._saveSubscriber}><i className={this.saveIcon()} /> Save</button>
        </div>
      </div>
    );
  },
  saveIcon: function(){
    if (this.state.loading){
      return "fa fa-fw fa-refresh fa-spin"
    }else{
      return "fa fa-fw fa-check"
    }
  },
  _saveSubscriber: function(){
    var _this=this;
    if (!this.state.loading){
      _this.setState({loading: true});
      $.ajax({
        type: 'PATCH',
        url: `/log/subscribers/1`,
        data: {phone_number: ReactDOM.findDOMNode(this.refs.phone_number).value},
        success: function(data){
          _this.props.sgs('subscriber', data)
          _this.setState({loading: false});
        }
      });
    }
  }
});