/*global React*/
/*global ReactDOM*/
var Header = React.createClass({
  getInitialState: function(){
    return({
    });
  },
  render: function(){
    return(
      <header id="header">
        <div className="brand">
          <a href="/log" className="logo">
            <i className="fa fa-comments" /> {(this.props.gs==null || this.props.gs.config==null || this.props.gs.config.system_name == null) ? 'Logbook' : this.props.gs.config.system_name}
          </a>
        </div>
        <ul className="nav navbar-nav navbar-left">
          <li className="toggle-navigation toggle-left">
              <button className="sidebar-toggle" id="toggle-left">
                  <i className="fa fa-bars"></i>
              </button>
          </li>
          <li className="hidden-xs hidden-sm">
            <form onSubmit={this._doSearch}>
              <input type="text" className="search" placeholder="Search project..." ref="keyword"/>
              <button type="submit" className="btn btn-sm btn-search">
                  <i className={this.loadingIcon()}></i>
              </button>
            </form>
          </li>
        </ul>
      </header>
    );
  },
  loadingIcon: function(){
    if (this.props.gs && this.props.gs.searching){
      return('fa fa-refresh fa-spin');
    }else{
      return('fa fa-search');
    }
  },
  _doSearch: function(e){
    e.preventDefault();
    var keyword = ReactDOM.findDOMNode(this.refs.keyword);
    if (keyword){
      if (!this.props.gs.searching && keyword.value.length>2){
        /*this.props.sgs('searching', true);*/
        this.props.sgs('keyword', keyword.value);
      }
    }
  }
});