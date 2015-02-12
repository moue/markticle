angular.module('markticle').controller('MainController', function($scope, StorageService) {
  $scope.marks = [
		{
		  title: 'Smashing magazine',
		  url: 'http://www.smashingmagazine.com/'
		},
		{
		  title: 'Markticle',
		  url: 'https://markticle.com'
		}
	];
});
