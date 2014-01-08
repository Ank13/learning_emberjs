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
    // this.resource('product', { path: '/:title' } );  // path is products/:title (products is assumed)
    this.resource('product', { path: '/:product_id' } );  // need to use unique identifier
  });
});


// Routes (created by Ember if not defined)
App.ProductsRoute = Ember.Route.extend({
  // model (can return object or array)
  model: function() {
    // return App.PRODUCTS;
    return this.store.findAll('product');
  }
});

// No longer need this, because by default, Ember will find the product by the id
// App.ProductRoute = Ember.Route.extend({
//   model: function(params){
//     // findBy is an Ember helper method
//     // return App.PRODUCTS.findBy('title', params.title);
//     return this.store.find('product', params.product_id)
//   }
// })

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

// MODEL
App.Product =  DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('number'),
  description: DS.attr('string'),
  isOnSale: DS.attr('boolean'),
  image: DS.attr('string'),
  // ASSOCIATIONS
  reviews: DS.hasMany('review', {async: true})
    // async true allows lazy loading (will be smart enough to lead reviews related to products)
});

App.Review = DS.Model.extend({
  text: DS.attr('string'),
  reviewedAt: DS.attr('date'),
  product: DS.belongsTo('product')
});

// EMBER DATA ADAPTERS
// default adapter, to communicate with HTTP server using JSON:
// App.ApplicationAdapter = DS.RESTAdapter.extend();
// to load records from memory:
App.ApplicationAdapter = DS.FixtureAdapter.extend();
//  for REST from server
// App.ApplicationAdapter = DS.RESTAdapter.extend();  // will hit server for JSON


// Data .... could be pulled form API
// App.PRODUCTS = [
// Need to use the FIXTURES constant within the Model, AND give each record a unique ID
App.Product.FIXTURES = [
  {
    id: 1,
    title: 'Flint',
    price: 99,
    description: 'Flint is ...',
    isOnSale: true,
    image: 'img/flint.png',
    reviews: [100, 101]
  },
  {
    id: 2,
    title: 'Kindling',
    price: 249,
    description: 'Easily ...',
    isOnSale: false,
    image: 'img/kindling.png',
    reviews: []
  }
];

App.Review.FIXTURES = [
  {
    id: 100,
    product: 1,
    text: 'Started a fire'
  },
  {
    id: 101,
    product: 1,
    text: 'Not the brightest flame'
  }
];

