/*global React*/
/*global $*/
/*global _*/
var ChannelList = React.createClass({
  getInitialState: function(){
    return({
    });
  },
  componentDidMount: function(){
    this.loadChannels();
    this.selectChannel('public')
  },
  render: function(){
    return(<div>{this.channels()}</div>);
  },
  channels: function(){
    if (this.props.gs && this.props.gs.channels){
      var h = [];
      var _clickChannel = this._clickChannel;
      _.each(this.props.gs.channels, function(channel){
        h.push(<li key={channel.name}>
          <span className="label label-info" 
            onClick={_clickChannel} 
            data-id={channel.name}
            style={{cursor: 'pointer'}}>{channel.name}</span>
        </li>);
      });
      return(<ul className="list-unstyled">{h}</ul>);
    }else{
      return(null);
    }
  },
  loadChannels: function(){
    var _this=this;
    $.ajax({
      type: 'GET',
      url: '/chat/channels.json',
      success: function(data){
        _this.props.sgs('channels', data);
      }
    });
  },
  _clickChannel: function(e){
    this.selectChannel($(e.target).attr('data-id'));
  },
  selectChannel: function(channel){
    this.props.sgs('channel', channel);
  }
})