/*global React*/
/*global ReactDOM*/
var Header = createReactClass({
  getInitialState: function(){
    return({
    });
  },
  render: function(){
    return(
      <header id="header">
        <BrandLogo system_name={this.props.gs.config ? this.props.gs.config.system_name : null} />
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