/*global React*/
/*global ReactDOM*/
/*global $*/
var EditChannel = createReactClass({
  getInitialState: function(){
    return({name: '', notes: '', pastProps: null, loading: false});
  },
  init: function(){
    this.setState({name: this.props.gs.channel, notes: this.props.gs.channel_notes, pastProps: JSON.stringify(this.props)});
  },
  componentDidUpdate: function(){
    if (this.state.pastProps != JSON.stringify(this.props) && !this.state.loading){
      this.init();
    }
  },
  handleChange(event) {
    this.setState({notes: event.target.value});
  },
  render: function(){
    return(
      <div>
        <div className="form-group">
          <label>Notes</label>
          <textarea ref="notes" className="form-control" value={this.state.notes} onChange={this.handleChange}></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this._saveNotes}><i className={this.saveIcon()} /> Save</button>
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
  _saveNotes: function(){
    var _this=this;
    if (!this.state.loading){
      _this.setState({loading: true});
      $.ajax({
        type: 'PATCH',
        url: `/log/channels/${this.props.gs.channel}`,
        data: {notes: ReactDOM.findDOMNode(this.refs.notes).value},
        success: function(data){
          _this.setState({loading: false});
        }
      });
    }
  }
});