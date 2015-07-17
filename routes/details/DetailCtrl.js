angular.module('torque')
    .controller('DetailCtrl', ['$scope','$routeParams', 'TransmissionService', '$interval', '$mdDialog', '$location', 
        function($scope, $routeParams, TService, $interval, $mdDialog, $location) {
            var id = +$routeParams.id;      //the plus coerces it to a number

            var fields = [
                "id",
                "name",
                "status",
                "totalSize",
                "sizeWhenDone",
                "haveValid",
                "leftUntilDone",
                "haveUnchecked",
                "eta",
                "uploadedEver",
                "uploadRatio",
                "rateDownload",
                "rateUpload",
                "metadataPercentComplete",
                "percentDone",
                "addedDate",
                "trackerStats",
                "error",
                "errorString",
                "recheckProgress",
                "files",
                "downloadDir",
                "fileStats",
                "peersGettingFromUs",   //leechers
                "peersSendingToUs"  //seeders
            ];

            query();
            var interval = $interval(query, 2000);
            function query() {
                TService.query(id, fields).then(function(data) {
                    $scope.torrent = data[0];
                    $scope.setTitle($scope.torrent.name);
                });
            }

            $scope.remove = function(localData) {
                if (typeof localData == 'undefined') {
                    localData = false;
                }

                TService.remove(id, localData).then(function(data) {
                    $location.url('/');
                });
            };

            $scope.changeDir = function(ev) {
                var dialog = $mdDialog.show({
                    targetEvent:ev,
                    template:
                        '<md-dialog>' +
                        '   <md-dialog-content>' +
                        '       <md-input-container>' +
                        '           <label>Location</label>' +
                        '           <input type="text" ng-model="location" />' +
                        '       </md-input-container>' +
                        '       <div class="md-actions">' +
                        '           <md-button ng-click="closeDialog()" class="md-warn">' +
                        '               Cancel' +
                        '           </md-button>' +
                        '           <md-button ng-click="update()" class="md-primary">' +
                        '               Update' +
                        '           </md-button>' +
                        '       </div>' +
                        '   </md-dialog-content>' +
                        '</md-dialog>',
                    locals: { dir: $scope.torrent.downloadDir },
                    bindToController: true,
                    controller: ['$scope','$mdDialog', function DialogController($scope, $mdDialog) {
                        $scope.location = this.dir;
                        $scope.closeDialog = function() {
                          $mdDialog.cancel();
                        };
                        $scope.update = function() {
                          $mdDialog.hide($scope.location);
                        };
                    }]

                });

                dialog.then(function(dir) {
                    if (dir !== $scope.torrent.downloadDir) {
                        TService.move(id, dir).then(function() {
                            $mdDialog.show(
                                $mdDialog.alert()
                                .title('Success!')
                                .content('Torrent directory changed')
                                .ariaLabel('success')
                                .ok('OK')
                                .targetEvent(ev)
                            );
                        });
                    } else {
                        $mdDialog.show(
                            $mdDialog.alert()
                            .title('Failure!')
                            .content('New directory is the same as the old one')
                            .ariaLabel('failure')
                            .ok('OK')
                            .targetEvent(ev)
                        );
                    }
                });
            };

            $scope.$on('$destroy', function() {
              // Make sure that the interval is destroyed too
              $interval.cancel(interval);
            });

            $scope.$on('updateView', function() {
                query();
            });
    }]);
