var newlineRegex = /(\r\n|\n\r|\r|\n)/g;

nl2br = function(str) {
  if (typeof str != 'string') {
    throw new TypeError('nl2br requires string');
  }
  return str.split(newlineRegex).map(function(line) {
    if (line.match(newlineRegex)) {
      return React.createElement('br', {key: "br_"+String(Math.random())});
    } else {
      return line;
    }
  });
};
function scrollTo(e){
  $("html, body").animate({scrollTop: $(e).offset().top}, 'fast');
}
function findObjectByKeyValue(object, key, value){
  var result = null;
  $.each(object, function(index, item){
    if(item[key].toString() == value.toString()){
       result = item;
       return false;
    }
  });
  return result;
}
function can(state, func){
  return (state.user && state.user.functions && state.user.functions.indexOf(func)>-1);
}
function cannot(state, func){
  return (state.user && (state.user.functions==undefined || state.user.functions.indexOf(func)==-1));
}