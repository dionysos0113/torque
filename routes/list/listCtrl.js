/* global moment */
angular.module('torque')
    .controller('ListCtrl', ['$scope', 'TransmissionService', '$interval', '$location', function($scope, TService, $interval, $location) {
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
    }]);