// Single variable holds whole ember app
var App = Ember.Application.create({
  // log out message to browser for every new page
  LOG_TRANSITIONS: true
});

// Router
App.Router.map(function(){
  // when browser visits path /about, use route 'about' and load about template into outlet
  this.route('about');
    // optionally, can specify another path if not named 'about'
    // this.route('about', { path 'aboutus'} );

});
