var app = angular.module('highTech', [
  'ui.bootstrap', 'ui.router'
  ,"angular-table"

  ,'ngAnimate'
  ,'productAnimations'
  ,'alarmAnimations'
  ,'productFilters'
  ,'ngSanitize'
]);

function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

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
    url: "/dvr?dvrId&t",
    views: {
      '': { templateUrl: 'partials/products.all.html',
        controller: function($scope){ $scope.p = "DVR";}
      },
      'sideBar@products.dvr': {
          templateUrl: 'partials/DvrSideBar.html'
      },
      'content@products.dvr': {
          templateUrl: function ($stateParams){
             var templateName = $stateParams.dvrId == 0
                ? "partials/AllContent.html"
                : "partials/AllDetail.html"
                ;
            return templateName;
          },
          controller: 'allController',
          resolve: {
            data:  function($http, $stateParams){
              if (!$stateParams.dvrId || $stateParams.dvrId==0)
                return 0;
              return $http({method: 'get', url: 'products/details/' + $stateParams.dvrId + '.json', cache: false})
                    .then(function(res){
                      return res.data; });
            }
          }
      },
    }
  })
  .state("products.dvr.spec", { url: "/spec", templateUrl: "partials/spec.html" })
  .state("products.dvr.download", { url: "/download", templateUrl: "partials/download.html" })
  .state('products.kit', {
    url: "/kit?kitId&t",
    views: {
      '': { templateUrl: 'partials/products.all.html',
             controller: function($scope){ $scope.p = "KIT";}
      },
      'sideBar@products.kit': {
          templateUrl: 'partials/KitSideBar.html'
      },
      'content@products.kit': {
          templateUrl: function ($stateParams){

            var templateName = $stateParams.kitId == 0
                ? "partials/AllContent.html"
                : "partials/AllDetail.html"
                ;
            //alert(templateName);
            return templateName;
          },
          controller: 'allController',
          resolve: {
            data:  function($http, $stateParams){
              if (!$stateParams.kitId || $stateParams.kitId==0)
                return 0;
              return $http({method: 'get', url: 'products/details/' + $stateParams.kitId + '.json', cache: false})
                    .then(function(res){
                      return res.data; });
            }
          }
      },
    }
  })
  .state("products.kit.spec", { url: "/spec", templateUrl: "partials/spec.html" })
  .state("products.kit.download", { url: "/download", templateUrl: "partials/download.html" })
  .state('products.nvr', {
    url: "/nvr?nvrId&t",
    views: {
      '': { templateUrl: 'partials/products.all.html',
             controller: function($scope){ $scope.p = "NVR";}
      },
      'sideBar@products.nvr': {
          templateUrl: 'partials/NvrSideBar.html'
      },
      'content@products.nvr': {
          templateUrl: function ($stateParams){

            var templateName = $stateParams.nvrId == 0
                ? "partials/AllContent.html"
                : "partials/AllDetail.html"
                ;
            //alert(templateName);
            return templateName;
          },
          controller: 'allController',
          resolve: {
            data:  function($http, $stateParams){
              if (!$stateParams.nvrId || $stateParams.nvrId==0)
                return 0;
              return $http({method: 'get', url: 'products/details/' + $stateParams.nvrId + '.json', cache: false})
                    .then(function(res){
                      return res.data; });
            }
          }
      },
    }
  })
  .state("products.nvr.spec", { url: "/spec", templateUrl: "partials/spec.html" })
  .state("products.nvr.download", { url: "/download", templateUrl: "partials/download.html" })
  .state('products.cctv', {
    url: "/cctv?cctvId&t",
    views: {
      '': { templateUrl: 'partials/products.all.html',
        controller: function($scope){ $scope.p = "CCTV";}
      },
      'sideBar@products.cctv': {
          templateUrl: 'partials/CctvSideBar.html'
      },
      'content@products.cctv': {
          templateUrl: function ($stateParams){
             var templateName = $stateParams.cctvId == 0
                ? "partials/AllContent.html"
                : "partials/AllDetail.html"
                ;
            return templateName;
          },
          controller: 'allController',
          resolve: {
            data:  function($http, $stateParams){
              if (!$stateParams.cctvId || $stateParams.cctvId==0)
                return 0;
              return $http({method: 'get', url: 'products/details/' + $stateParams.cctvId + '.json', cache: false})
                    .then(function(res){
                      return res.data; });
            }
          }
      },
    }
  })
  .state("products.cctv.spec", { url: "/spec", templateUrl: "partials/spec.html" })
  .state("products.cctv.download", { url: "/download", templateUrl: "partials/download.html" })
  .state('products.alarm', {
    url: "/alarm?alarmId&t",
    views: {
      '': { templateUrl: 'partials/products.all.html',
             controller: function($scope){ $scope.p = "ALARM";}
      },
      'sideBar@products.alarm': {
          templateUrl: 'partials/AlarmSideBar.html'
      },
      'content@products.alarm': {
          templateUrl: function ($stateParams){

            var templateName = $stateParams.alarmId == 0
                ? "partials/AllContent.html"
                : "partials/AlarmDetail.html"
                ;
            //alert(templateName);
            return templateName;
          },
          controller: 'allController',
          resolve: {
            data:  function($http, $stateParams){
              if (!$stateParams.alarmId || $stateParams.alarmId==0)
                return 0;
              return $http({method: 'get', url: 'products/details/' + $stateParams.alarmId + '.json', cache: false})
                    .then(function(res){
                      return res.data; });
            }
          }
      },
    }
  })
  .state("products.alarm.stdpkg", { url: "/stdpkg", templateUrl: "partials/alarm_content.html" })
  .state("products.alarm.optiacc", { url: "/optiacc", templateUrl: "partials/alarm_acc.html" })
  .state("products.alarm.spec", { url: "/spec", templateUrl: "partials/spec.html" })
  .state("products.alarm.download", { url: "/download", templateUrl: "partials/download.html" })
  .state('products.intercom', {
    url: "/intercom?intercomId&t",
    views: {
      '': { templateUrl: 'partials/products.all.html',
             controller: function($scope){ $scope.p = "INTERCOM";}
      },
      'sideBar@products.intercom': {
          templateUrl: 'partials/IntercomSideBar.html'
      },
      'content@products.intercom': {
          templateUrl: function ($stateParams){

            var templateName = $stateParams.intercomId == 0
                ? "partials/AllContent.html"
                : "partials/AllDetail.html"
                ;
            //alert(templateName);
            return templateName;
          },
          controller: 'allController',
          resolve: {
            data:  function($http, $stateParams){
              if (!$stateParams.intercomId || $stateParams.intercomId==0)
                return 0;
              return $http({method: 'get', url: 'products/details/' + $stateParams.intercomId + '.json', cache: false})
                    .then(function(res){
                      return res.data; });
            }
          }
      },
    }
  })
  .state("products.intercom.spec", { url: "/spec", templateUrl: "partials/spec.html" })
  .state("products.intercom.download", { url: "/download", templateUrl: "partials/download.html" });
});

app.controller("allController",
    [ '$scope', '$state', '$stateParams', 'data', 'shareSearch', function($scope, $state, $stateParams, data, shareSearch){
       if (data){
        //alert('allController   data:'+$scope.product.name);
        $scope.product = data;
        $scope.mainImageUrl = data.images[0];
        $scope.setImage = function(imageUrl) {
          $scope.mainImageUrl = imageUrl;
       }
      }
    $scope.share = shareSearch.sharedObject;
    $scope.share.query = $stateParams.t?$stateParams.t:'';
}]);

app.controller("frontDoorController",
    [ '$scope', '$stateParams', function($scope, $stateParams){
      $scope.fronts = ["images/front1.png"
                      , "images/front2.png"
                      , "images/front3.png"];
      $scope.mainImageUrl = $scope.fronts[0];
      $scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    }
}]);

app.directive('appView',  function(shareSearch )  {
    return {
      restrict: "AE",
      scope: {
        v: '=',
        t: '@type',
        m: '='
      },
      replace: true,
      template:  '<ul class="app-view">' +
                   '<li ng-repeat="v in views" ng-class="v.icon" ng-click="switchView(v)"'+
                   'ng-style="hiddenView"><div class="bubble">{{v.name}}</li>' +
                 '</ul>',
      link: function(scope, el, attr) {
        scope.views = [{
          name: 'list view',
          template: 'partials/'+scope.t+'Content_list.html',
          //icon: 'btn btn-default navbar-btn glyphicon glyphicon-th-list',
          icon: 'fa fa-th-list btn-list',
          mode: 'list'
        }, {
          name: 'grid view',
          template: 'partials/AllContent_grid.html',
          //icon: 'btn btn-default navbar-btn glyphicon glyphicon-th',
          icon: 'fa fa-th btn-list',
          mode: 'grid'
        }];
      },
      controller: ['$scope', function($scope){
        $scope.v = 'partials/'+$scope.t+'Content_list.html';
        //alert($scope.t);
        //alert($scope.v);
        if ($scope.t=='ALARM'){
          $scope.share = shareSearch.sharedObject;
          $scope.hiddenView = {'visibility': 'hidden'};
          $scope.v = 'partials/AllContent_grid.html';
          $scope.share.orderProp = 'brand';
          //use brand to avoid sort since all are bosch
        }else{
          $scope.hiddenView = {'visibility': 'visible'};
        }
        $scope.switchView = function(view) {
          $scope.v = view.template;
          $scope.m = view.mode;
///////////////////
          if (view.mode=='grid'){
            //$(".show_product").preloader();
          }
        }
      }]
    }
  });

app.controller("headerCtrl", ['$scope', '$state', function($scope, $state) {
  $scope.$state = $state;
}]);

app.controller("downloadCtrl", function($scope, $filter) {
  $scope.data = $scope.product.docs;
  $scope.config = {
    itemsPerPage: 5,
    fillLastPage: true
  }
})

app.controller("alarmTblCtrl", function($scope, $filter) {
  $scope.data = $scope.product.member;
  $scope.config = {
    itemsPerPage: $scope.product.member.length,
    fillLastPage: true
  }
})

app.controller("alarmAccTblCtrl", function($scope, $filter) {
  $scope.data = $scope.product.optional;
  $scope.config = {
    itemsPerPage: $scope.product.optional.length,
    fillLastPage: true
  }
});

app.controller("listCtrl", ["$scope",  "$filter", function($scope, $filter) {
  $scope.list = $scope.share.products;
  $scope.filteredList = $scope.list;
  $scope.config = {
    itemsPerPage: 6,
    fillLastPage: true
  }


  $scope.share.child.updateFilteredList = function() {
    $scope.filteredList = $filter('filter')($scope.share.products, $scope.share.query/*, true*//* ture to strict compare*/);

    if ($scope.filteredList.length==0){
      $scope.config.itemsPerPage = 1;
    }else if ($scope.config.itemsPerPage >= $scope.filteredList.length){
      $scope.config.itemsPerPage = $scope.filteredList.length;
    }else{
      $scope.config.itemsPerPage = 6;
    }
    //alert($scope.filteredList.length)
  };
  $scope.share.child.updateFilteredList();
}]);

app.controller('ProductListCtrlSide', function ($scope, $http, shareSearch ) {
  $scope.share = shareSearch.sharedObject;
  //alert($scope.p+'.json');
  $http({method: 'get', url: 'products/'+$scope.p+'.json', cache: false}).success(function(data) {
    $scope.share.products = data;
    $scope.share.update();
  });
  $scope.share.mode='list';
  $scope.share.search=function($name, $onlyReset){
    $scope.share.currentPage=0;
    if ($onlyReset)
      return;

    $scope.share.update();
  }
  $scope.share.update=function(){
    if ($scope.share.products && $scope.share.child && $scope.share.child.updateFilteredList)
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
      { heading: "Specification", route:"products."+angular.lowercase($scope.p)+".spec", active:true },
      { heading: "Download", route:"products."+angular.lowercase($scope.p)+".download", active:false },
    ];

    $scope.$on("$stateChangeSuccess", function() {
      $scope.tabs.forEach(function(tab) {
        tab.active = $scope.active(tab.route);
      });
    });
});

app.controller("alarmTabController", function($rootScope, $scope, $state) {

    $scope.go = function(route){
      $state.go(route);
    };

    $scope.active = function(route){
      return $state.is(route);
    };

    $scope.tabs = [
      { heading: "Standard Package", route:"products."+angular.lowercase($scope.p)+".stdpkg", active:true },
      { heading: "Optional Accessories", route:"products."+angular.lowercase($scope.p)+".optiacc", active:false },
      { heading: "Specification", route:"products."+angular.lowercase($scope.p)+".spec", active:false },
      { heading: "Download", route:"products."+angular.lowercase($scope.p)+".download", active:false }
    ];

    $scope.$on("$stateChangeSuccess", function() {
      $scope.tabs.forEach(function(tab) {
        tab.active = $scope.active(tab.route);
      });
    });
});

app.factory("shareSearch", function(){
  return {
    sharedObject: { query: '', sort:'' , products:'', pageSize :9, currentPage:0}
  };
});


app.controller('SampleCtrl', function($scope, $timeout) {
    $scope.ready = 'true';
    $scope.article = '1';
    $scope.time = '400';
    if (typeof getVisibleOpts != 'undefined') {
        $scope.visible = getVisibleOpts();
    }

    if (typeof setIniValues != 'undefined') {
        setIniValues($scope);
    }

    $timeout(function() {

    }, 100);

    function doSomething() {
        switch ($scope.article) {
            case "1":
                $scope.article = "2";
                break;
            case "2":
                $scope.article = "3";
                break;
            case "3":
                $scope.article = "1";
                break;
            default:
                $scope.article = "1";
        }
        $timeout(doSomething, 3500 + getRandomInt(3500) + TryParseInt($scope.time, 3500));
    }
    $timeout(doSomething, 3500 + getRandomInt(3500) + TryParseInt($scope.time, 3500));

});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str != null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}




app.directive('iframeSetDimensionsOnload', [function(){
return {
    restrict: 'A',
    link: function(scope, element, attrs){
        element.on('load', function(){
            /* Set the dimensions here,
               I think that you were trying to do something like this: */
               var iFrameHeight = element[0].contentWindow.document.body.scrollHeight + 'px';
               var iFrameWidth = '100%';
               element.css('width', iFrameWidth);
               element.css('height', iFrameHeight);
        })
    }
}}])


var email_app = angular.module('emailForm', [
  'ui.bootstrap'
]);


email_app.controller('EmailController', ['$scope', function($scope) {
  $scope.master = {};

  $scope.update = function(user) {
    $scope.master = angular.copy(user);
    //$submit();
  };

  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
//    $scope.user.name = 'John Doe';
//    $scope.user.email = 'john.doe@gmail.com';
  };

    $scope.isUnchanged = function(user) {
      return angular.equals(user, $scope.master);
    };

  $scope.reset();
}]);

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
app.filter('startFrom', function() {
    return function(input, start) {
        if(!input) return;
        start = +start; //parse to int
        return input.slice(start);
    }
});

app.filter('newlines', function () {
    return function(text) {
        return text.replace(/\n/g, '<br/>');
    }
})
.filter('noHTML', function () {
    return function(text) {
        return text
                .replace(/&/g, '&amp;')
                .replace(/>/g, '&gt;')
                .replace(/</g, '&lt;');
    }
});


function imgLoaded(img){
    var $img = $(img);
    $img.parent().addClass('loaded');
};


app.directive('imgPreload', ['$rootScope', function($rootScope) {
    return {
      restrict: 'AE',
      scope: {
        ngSrc: '@'
      },

      link: function(scope, element, attrs) {
        element.on('load', function() {
          element.parent().removeClass('img_wrapper');
          element.removeClass('t-fade').addClass('in');
        }).on('error', function() {
          //
        });

        scope.$watch('ngSrc', function(newVal) {
          element.removeClass('in');
          element.parent().addClass('img_wrapper');
        });
      }
/*
      link: function(scope, element) {
        imagesLoaded(element, function() {
          element.parent().removeClass('img_wrapper');
          element.addClass('in');
        });
        scope.$watch('ngSrc', function() {
          element.removeClass('in');
          element.parent().addClass('img_wrapper');
        });
      }
*/
    };
}]);

