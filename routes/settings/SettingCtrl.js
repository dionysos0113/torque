(function(){
    angular.module('torque')
        .controller('SettingCtrl', ['$scope', '$location', function($scope, $location) {
            $scope.setTitle('Settings');
            $scope.openSettings = function(section) {
                $location.url('/settings/'+section);
            };
        }]);
    
})();