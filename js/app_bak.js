/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('highTech', [
  'ui.bootstrap', 'ui.router'

  ,'productAnimations'
  ,'productFilters'
]);

/**
 * Configure the Routes
 */
app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
  .state('home', {
    url: "/home",
    templateUrl:"partials/home.html"
  })
  .state('contact', {
    url: "/contact",
    templateUrl:"partials/contact.html"
  })
  .state('aboutus', {
    url: "/aboutus",
    templateUrl:"partials/aboutus.html",
    controller: function($scope, $stateParams){ /*alert( 'aboutus');*/ }
  })
  .state('products', {
    abstract: true,
    url: "/products",
    template: '<ui-view/>',
    controller: function($scope, $stateParams){ }
  })
  .state('products.dvr', {
    url: "/dvr",
    templateUrl:"partials/products.dvr.html",
    controller: function($scope, $stateParams){ /*alert( 'products.dvr');*/ }
  })
  .state('products.dvr.details', {
    url: "/:dvrId",
    templateUrl:"partials/dvrDetail.html",
    controller: 'dvrController',//function($scope, $stateParams){ alert( $stateParams.dvrId ); },
    resolve: {
      dvrdata:  function($http, $stateParams){
          return $http({method: 'get', url: 'products/' + $stateParams.dvrId + '.json', cache: false})
              .then(function(res){
                return res.data; });
      }
    }
  })
}).controller("dvrController",
    [ '$scope', 'dvrdata', function($scope, dvrdata){
        $scope.product = dvrdata;
        $scope.mainImageUrl = dvrdata.images[0];
        $scope.setImage = function(imageUrl) {
          $scope.mainImageUrl = imageUrl;
        }
}]);

app.controller('ProductListCtrl', function ($scope, $http) {
  $http({method: 'get', url: 'products/products.json', cache: false}).success(function(data) {
    $scope.products = data;
  });

  $scope.orderProp = 'age';
});


function pageSwitch($scope) {
    $scope.currentPage = 0;
    $scope.pageSize = 6;
    $scope.numberOfPages=function(){
        return $scope.products?Math.ceil($scope.products.length/$scope.pageSize):0;
    }
}

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('startFrom', function() {
    return function(input, start) {
        if(!input) return;
        start = +start; //parse to int
        return input.slice(start);
    }
});

