angular.module('myApp', ['ngRoute'])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html', 
      controller: 'MainCtrl'
    })
    .when('/settings', {
      templateUrl: 'templates/settings.html',
      controller: 'SettingsCtrl'
    })
    .otherwise({redirectTo: '/'});
})
.provider('Weather', function() {
    var apiKey = "";
    this.setAPIKey = function(key) {
        if(key) {
            this.apiKey = key;
        }
    };
    this.getUrl = function(type, ext) {
        return "http://api.wunderground.com/api/" + 
        this.apiKey + "/" + type + "/q/" +
        ext + '.json';
    };
    this.$get = function($q, $http) {
        var self = this;

        return {
            // service object
            getWeatherForecast: function(city) {
                var d = $q.defer();
                $http({
                    method: 'GET',
                    url: self.getUrl("forecast", city),
                    cache: true,                    
                }).success(function(data) {
                    // The wunderground API returns the 
                    // object that nests the forecasts inside
                    // the forecast.simpleforecast key
                    d.resolve(data.forecast.simpleforecast);
                    console.log(self.getUrl("forecast", city));
                    console.log(data.forecast.simpleforecast)
                }).error(function(err) {
                    d.reject(err);
                });

                return d.promise;
            }   
        }
        
    };
})
.factory('UserService', function() {
    var defaults  = {
        location : 'autoip'
    };
    var service = {
        user: {},
        save: function() {
            sessionStorage.presently = angular.toJson(service.user);
        },
        restore: function() {
            // pull from sessionStorage
            service.user = angular.fromJson(sessionStorage.presently) || defaults

            return service.user;
        }
    };
    return service;
})
.config(function(WeatherProvider) {
    WeatherProvider.setAPIKey('e25f96c99908ace8');

})
.controller('SettingsCtrl', function($scope, UserService) {
    $scope.user = UserService.user;
    $scope.save = function() {
        UserService.save();
    }
})
.directive('autoFill', function($timeout)) {
    return {
        restrict: 'EA',
        scope: {
            autoFill: '&',
            ngModil: '='
        },
        compile: function(tEle, tAttrs) {
            //our compile function
            return function(scope, ele, attrs, ctrl)
        }
    }
}
.controller('MainCtrl', function($scope, $timeout, Weather) {
    // Build the date object
    $scope.date = {};

    $scope.weather = {}
    Weather.getWeatherForecast($scope.user.location).then(function(data) {
        $scope.weather.forecast=data;
    console.log($scope.weather)
    });

    // Update function
    var updateTime = function() {
    $scope.date.raw = new Date();
    $timeout(updateTime, 1000);
    }

    // Kick off the update function
    updateTime();
});