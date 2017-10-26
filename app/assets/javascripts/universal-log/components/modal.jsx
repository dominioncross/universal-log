/*global React*/
var Modal = createReactClass({
  
  render: function(){
    
    return(
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 className="modal-title">{this.props.modalTitle}</h4>
            </div>
            <div className="modal-body">
              {this.props.modalContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
});