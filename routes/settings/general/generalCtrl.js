(function(angular) {
    angular.module('torque')
        .controller('GeneralCtrl', ['$scope', '$location', function($scope, $location) {
            $scope.magnetClick = function() {
                var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/#/magnet/%s";
                console.log(url);
                navigator.registerProtocolHandler('magnet', url, "Transmission Magnet Handler");
            }
        }])
})(window.angular);
