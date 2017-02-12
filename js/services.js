'use strict';

/* Services */

var productServices = angular.module('productServices', ['ngResource']);

productServices.factory('Product', ['$resource',
  function($resource){
    return $resource('products/:pId.json', {}, {
      query: {method:'GET', params:{ProductId:'products'}, isArray:true}
    });
  }]);
