angular.module('myApp', [])

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
                    cache: true
                }).success(function(data) {
                    // The wunderground API returns the 
                    // object that nests the forecasts inside
                    // the forecast.simpleforecast key
                    d.resolve(data.forecast.simpleforecast);
                }).error(function(err) {
                    d.reject(err);
                });
                return d.promise;
            }   
        }
        
    };
})
.config(function(WeatherProvider) {
    WeatherProvider.setAPIKey('e25f96c99908ace8');

})
.controller('MainCtrl', function($scope, $timeout, Weather) {
    // Build the date object
    $scope.date = {};

    $scope.weather = {}
    Weather.getWeatherForecast("CA/San_Francisco").then(function(data) {
        $scope.weather.forecast=data;
    });

    // Update function
    var updateTime = function() {
    $scope.date.raw = new Date();
    $timeout(updateTime, 1000);
    }

    // Kick off the update function
    updateTime();
});