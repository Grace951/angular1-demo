var app = angular.module('highTech', [
  'ui.bootstrap', 'ui.router'
  ,"angular-table"

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
    template: '<div ui-view=""></div>',
    controller: function($scope, $stateParams){ }
  })
  .state('products.dvr', {
    url: "/:dvr?dvrId&t",
    views: {
      '': { templateUrl: 'partials/products.dvr.html' },
      'sideBar@products.dvr': {
          templateUrl: 'partials/DvrSideBar.html',
          controller: function($scope){ }
      },
      'content@products.dvr': {
          //templateUrl: 'partials/dvrDetail.html',
          templateUrl: function ($stateParams){
             //alert('templateUrl:'+$stateParams.dvrId);
             var templateName = $stateParams.dvrId == 0
                ? "partials/DvrContent.html"
                : "partials/dvrDetail.html"
                ;
            return templateName;
          },
          controller: 'dvrController',
          resolve: {
            dvrdata:  function($http, $stateParams){
              //alert($stateParams.t);
              //alert($stateParams.dvrId);
             // alert('resolve:'+$stateParams.dvrId);
              if (!$stateParams.dvrId || $stateParams.dvrId==0)
                return 0;
              return $http({method: 'get', url: 'products/' + $stateParams.dvrId + '.json', cache: false})
                    .then(function(res){
                      return res.data; });
            }
          }
      },
    }
  })
  .state("products.dvr.spec", { url: "/spec", templateUrl: "partials/spec.html" })
  .state("products.dvr.download", { url: "/download", templateUrl: "partials/download.html" });

}).controller("dvrController",
    [ '$scope', '$state', '$stateParams', 'dvrdata', 'shareSearch', function($scope, $state, $stateParams, dvrdata, shareSearch){
     //  alert('dvrController');
       if (dvrdata){
        //alert('dvrController'+dvrdata.name);
        $scope.product = dvrdata;
        $scope.mainImageUrl = dvrdata.images[0];
        $scope.setImage = function(imageUrl) {
          $scope.mainImageUrl = imageUrl;
       }
      }
    //alert($stateParams.t);
    //alert($stateParams.dvrId);
    $scope.share = shareSearch.sharedObject;
    $scope.share.query = $stateParams.t;
}]);

app.directive('appView', function() {
    return {
      scope: {
        view: '=appView'
      },
      replace: true,
      template:  '<ul class="app-view">' +
                   '<li ng-repeat="v in views" ng-class="v.icon" ng-click="switchView(v)"></li>' +
                 '</ul>',
      link: function(scope, el, attr) {
        scope.views = [{
          name: 'list',
          template: 'partials/DvrContent_list.html',
          icon: 'btn btn-default navbar-btn glyphicon glyphicon-th-list'
        }, {
          name: 'grid',
          template: 'partials/DvrContent_grid.html',
          icon: 'btn btn-default navbar-btn glyphicon glyphicon-th'
        }];
      },
      controller: ['$scope', function($scope){
        $scope.view = 'partials/DvrContent_list.html';
        $scope.switchView = function(view) {
          $scope.view = view.template;
        }
      }]
    }
  });

app.controller("downloadCtrl", function($scope, $filter) {
  $scope.data = $scope.product.docs;
  $scope.config = {
    itemsPerPage: 5,
    fillLastPage: true
  }
})

app.controller("listCtrl", ["$scope",  "$filter", function($scope, $filter) {
  $scope.list = $scope.share.products;
  $scope.filteredList = $scope.list;
  $scope.config = {
    itemsPerPage: 7,
    fillLastPage: true
  }
  $scope.share.child.updateFilteredList = function() {
    $scope.filteredList = $filter("filter")($scope.share.products, $scope.share.query);
    if ($scope.filteredList.length==0){
      $scope.config.itemsPerPage = 1;
    }else if ($scope.config.itemsPerPage >= $scope.filteredList.length){
      $scope.config.itemsPerPage = $scope.filteredList.length;
    }else{
      $scope.config.itemsPerPage = 7;
    }
    //alert($scope.filteredList.length)
  };
  $scope.share.child.updateFilteredList();
}]);

app.controller('ProductListCtrlSide', function ($scope, $http, shareSearch ) {
  $scope.share = shareSearch.sharedObject;
  $http({method: 'get', url: 'products/products.json', cache: false}).success(function(data) {
    $scope.share.products = data;
    $scope.share.update();
  });

  $scope.share.search=function($name, $onlyReset){
    $scope.share.currentPage=0;
    if ($onlyReset)
      return;

    $scope.share.update();
  }
  $scope.share.update=function(){
    if ($scope.share.products && $scope.share.child.updateFilteredList)
      $scope.share.child.updateFilteredList();
  }
});


app.controller('ProductListCtrl', function ($scope, $http, shareSearch, filterFilter ) {
  $scope.share = shareSearch.sharedObject;
  $scope.share.currentPage = 0;
  $scope.share.child = {};
  $scope.numberOfPages=function(){
    var $p = filterFilter($scope.share.products, $scope.share.query);
    return $p?Math.ceil($p.length/$scope.share.pageSize):0;
  }
});

app.controller("tabController", function($rootScope, $scope, $state) {

    $scope.go = function(route){
      $state.go(route);
    };

    $scope.active = function(route){
      return $state.is(route);
    };

    $scope.tabs = [
      { heading: "Specification", route:"products.dvr.spec", active:false },
      { heading: "Download", route:"products.dvr.download", active:false },
    ];

    $scope.$on("$stateChangeSuccess", function() {
      $scope.tabs.forEach(function(tab) {
        tab.active = $scope.active(tab.route);
      });
    });
  });

app.factory("shareSearch", function(){
  return {
    sharedObject: { query: '', sort:'' , products:'', pageSize :6, currentPage:0}
  };
});

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('startFrom', function() {
    return function(input, start) {
        if(!input) return;
        start = +start; //parse to int
        return input.slice(start);
    }
});

