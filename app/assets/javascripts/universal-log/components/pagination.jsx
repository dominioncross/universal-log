/*global React*/
var Pagination = createReactClass({
  render: function(){
    var description = null;
    if ((this.props.displayDescription == undefined || this.props.displayDescription) && this.props.pagination){
      description = (<li className="small">Showing {this.firstNumber()} to {this.lastNumber()} of {this.props.pagination.total_count} results</li>);
    }
    if (this.props.pagination && this.paginationRequired()){
      return(
        <div>
          <nav aria-label='Pager'>
            <ul className='pager'>
              <li className={this.previousClass()}>
                <a onClick={this.loadPrevious} href='#'><i className="fa fa-chevron-left" /> {this.props.previousLabel || 'Previous'}</a>
              </li>
              {description}
              <li className={this.nextClass()}>
                <a onClick={this.loadNext} href='#'>{this.props.nextLabel || 'Next'} <i className="fa fa-chevron-right" /></a>
              </li>
            </ul>
          </nav>
        </div>
      );
    }else{
      return(null);
    }
  },
  paginationRequired: function(){
    return (this.props.pagination.total_count>this.props.pagination.per_page);
  },
  firstNumber: function(){
    var n;
    if (this.props.pagination.current_page==1){
      n = 1;
    }else{
      n = ((this.props.pagination.current_page-1) * this.props.pagination.per_page)+1;
    }
    return n;
  },
  lastNumber: function(){
    var n;
    n = (this.props.pagination.current_page * this.props.pagination.per_page);
    if(n>this.props.pagination.total_count){
      n = this.props.pagination.total_count;
    }
    return n;
  },
  previousDisabled: function(){
    return (this.firstNumber() == 1);
  },    
  previousClass: function(){
    if (this.props.currentPage<=1){
      return 'previous disabled';
    }else{
      return 'previous';
    }
  },      
  nextClass: function(){
    if (this.props.pagination.total_count>this.lastNumber()){
      return 'next';
    }else{
      return 'next disabled';
    }
  },      
  loadPrevious: function(){
    if (this.props.currentPage>1){
      return this.props.pageResults(this.props.currentPage - 1);
    }
  },      
  loadNext: function(){
    if (this.props.pagination.total_count>this.lastNumber()){
      return this.props.pageResults(this.props.currentPage + 1);
    }
  }      
});