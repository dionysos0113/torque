(function(angular) {
    angular.module('torque')
        .controller('GeneralCtrl', ['$scope', '$location', '$mdToast', function($scope, $location, $mdToast) {
            $scope.magnetClick = function() {
                if (typeof window.navigator.registerProtocolHandler == 'function') {
                    var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/#/handler/%s";
                    console.log(url);
                    navigator.registerProtocolHandler('magnet', url, "Torque Magnet Handler");
                } else {
                    $mdToast.show($mdToast.simple().content("Protocol Handlers are not supported in this browser"));
                }
            };
            $scope.torrentClick = function() {
                if (typeof window.navigator.registerContentHandler == 'function') {
                    var url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/#/handler/%s";
                    console.log(url);
                    navigator.registerContentHandler('application/x-bittorrent', url, "Torque .torrent Handler");
                } else {
                    $mdToast.show($mdToast.simple().content("Content Handlers are not supported in this browser"));
                }
            };
        }])
})(window.angular);
