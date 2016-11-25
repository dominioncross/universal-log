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
    if (!this.props.gs.channel){
      this.selectChannel('general');
    }
  },
  render: function(){
    return(
      <nav>
        <h5 className="sidebar-header">Channels</h5>
        {this.channels()}
      </nav>
    );
  },
  channels: function(){
    if (this.props.gs && this.props.gs.channels){
      var h = [];
      var _clickChannel = this._clickChannel;
      _.each(this.props.gs.channels, function(channel){
        h.push(<li key={channel.name}>
          <a
            onClick={_clickChannel} 
            data-id={channel.name}
            style={{cursor: 'pointer'}}>
            <i className="fa fa-hashtag" 
            data-id={channel.name}/>{channel.name}</a>
        </li>);
      });
      return(<ul className="nav nav-pills nav-stacked">{h}</ul>);
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