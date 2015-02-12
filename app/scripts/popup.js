myApp.service('pageInfoService', function() {
	this.getInfo = function (callback) {
		var model = {};
		// find the active tab, which is usually the tab that you're browsing, unless you're debugging
	  	chrome.tabs.query({'active':true},
	  	function (tabs) {
		  	if (tabs.length>0) {
		  		model.title=tabs[0].title;
		  		model.url=tabs[0].url;
		  		// send a message to the active tab
		  		chrome.tabs.sendMessage(tabs[0].id, {'action':'PageInfo'}, function (response){
		  			model.pageInfos=response;
		  			callback(model);
		  		});
		  	}
	  });
	};
});

myApp.controller('PageController', function ($scope, pageInfoService) {
  $scope.message = "Hello from AngularJS";
  pageInfoService.getInfo(function (info) {
  	$scope.title = info.title;
  	$scope.url = info.url;
  	$scope.pageInfos = info.pageInfos;
  	$scope.$apply();
  });
});
