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
    // this.route('about', { path: 'aboutus'} );
  this.route('credits');
});

// Controller for 'index' template
   // Ember automatically defines controllers. Only need to define if need properties.
App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'img/logo.png',
  time: function(){
    return (new Date()).toDateString()
  }.property()
});

App.AboutController = Ember.Controller.extend({
  contactName: 'Avi',
  avatar: 'img/avatar.png',
  open: function() {
    var day = (new Date()).getDay()
    if (day === 0) {
      return 'Closed'
      }
    else {
      return 'Open'
    }
  }.property()
})
