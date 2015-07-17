(function(angular) {
    angular.module('torque')
        .controller('HandlerCtrl', ['$routeParams', '$scope', 'TransmissionService', '$mdToast', '$location',
        function($routeParams, $scope, TService, $mdToast, $location) {
            $scope.uri = $routeParams.uri;

            TService.add($scope.uri, true).then(function(data) {
                if (data.result == 'success') {
                    if (data.arguments["torrent-added"]) {
                        $mdToast.show($mdToast.simple().content("Added " + data.arguments["torrent-added"].name));
                    } else if (data.arguments["torrent-duplicate"]) {
                        $mdToast.show($mdToast.simple().content("Duplicate torrent: " + data.arguments["torrent-duplicate"].name));
                    }
                }
                $location.url('/');
            });
        }]);
})(window.angular);
