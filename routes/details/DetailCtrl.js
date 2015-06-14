angular.module('torque')
    .controller('DetailCtrl', ['$scope','$routeParams', 'TransmissionService', '$interval', function($scope, $routeParams, TService, $interval) {
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
            "bandwidthPriority",
            "seedRatioMode",
            "seedRatioLimit",
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
                $scope.torrents = data;
            });
        }
        
        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $interval.cancel(interval);
        });
    }]);