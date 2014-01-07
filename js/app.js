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
  //  Resource route
    // this.resource('products')
  // Dynamic route - goes to specific product
    // this.resource('product', {path: '/products/:title' }  )

  // Nested Route
  this.resource('products', function() {
    this.resource('product', { path: '/:title' } );  // path is products/:title (products is assumed)
  });
});


// Routes (created by Ember if not defined)
App.ProductsRoute = Ember.Route.extend({
  // Model (can return object or array)
  model: function() {
    return App.PRODUCTS;
  }
});

App.ProductRoute = Ember.Route.extend({
  model: function(params){
    // console.log(params); // :title. Access params with params.
    // findBy is an Ember helper method
    return App.PRODUCTS.findBy('title', params.title);
  }
})

// Controllers  (created by Ember if not defined)
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


// Data .... could be pulled form API
App.PRODUCTS = [
  {
    title: 'Flint',
    price: 99,
    description: 'Flint is ...',
    isOnSale: true,
    image: 'img/flint.png'
  },
  {
    title: 'Kindling',
    price: 249,
    description: 'Easily ...',
    isOnSale: false,
    image: 'img/kindling.png'
  }
];


