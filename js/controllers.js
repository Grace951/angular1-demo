'use strict';

/* Controllers */

var ProductControllers = angular.module('ProductControllers', []);

ProductControllers.controller('ProductListCtrl', ['$scope', 'Product',
  function($scope, Product) {
    $scope.Products = Product.query();
    $scope.orderProp = 'age';
  }]);

ProductControllers.controller('ProductDetailCtrl', ['$scope', '$routeParams', 'Product',
  function($scope, $routeParams, Product) {
    $scope.Product = Product.get({ProductId: $routeParams.ProductId}, function(Product) {
      $scope.mainImageUrl = Product.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");
});

app.controller('ProductListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('Products/Products.json').success(function(data) {
      $scope.Products = data;
    });

    $scope.orderProp = 'age';
}]);
