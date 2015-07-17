/* global moment */
angular.module('torque')
    .controller('ListCtrl', ['$scope', 'TransmissionService', '$interval', '$location', '$mdDialog', '$mdToast', function($scope, TService, $interval, $location, $mdDialog, $mdToast) {
        $scope.setTitle('Torque');
        query();
        var interval = $interval(query, 2000);
        function query() {
            TService.query().then(function(data) {
                $scope.torrents = data;
            });
        }

        $scope.details = function(id) {
            $location.url('/details/'+id);
        };

        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $interval.cancel(interval);
        });

        $scope.$on('updateView', function() {
            query();
        });

        $scope.addTorrent = function(ev) {
                var dialog = $mdDialog.show({
                    targetEvent: ev,
                    templateUrl: 'routes/list/add.tmpl.html',
                    controller: 'AddCtrl'
                });

                dialog.then(function(data) {
                    if (data.result == 'success') {
                        if (data.arguments["torrent-added"]) {
                            $mdToast.show($mdToast.simple().content("Added " + data.arguments["torrent-added"].name));
                        } else if (data.arguments["torrent-duplicate"]) {
                            $mdToast.show($mdToast.simple().content("Duplicate torrent: " + data.arguments["torrent-duplicate"].name));
                        }
                    }
                });
            };
    }]);
