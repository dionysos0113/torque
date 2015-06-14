/* global moment */
angular.module('torque')
    .controller('ListCtrl', ['$scope', 'TransmissionService', '$interval', '$location', function($scope, TService, $interval, $location) {
        query();
        var interval = $interval(query, 2000);
        function query() {
            TService.query().then(function(data) {
                $scope.torrents = data;
            });
        }
        
        $scope.getIcon = function(state) {
            switch (state) {
                case 0:
                    return {label: 'Start Torrent', icon: 'av:play_arrow'};
                    break;
                case 4:
                    return {label: 'Pause Torrent', icon: 'av:pause'};
                default:
                    return {label: 'Start Torrent', icon: 'av:play_arrow'};
                    break;
            }
        };
        
        $scope.details = function(id) {
            $location.url('/details/'+id);
        };
        
        $scope.toggleState = function(state, id) {
            if (state == 0) TService.start(id).then(function() {
                console.log('started');
                query();
            });
            if (state == 4) TService.stop(id).then(function() {
                console.log('stopped');
                query();
            });
        };
        
        $scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $interval.cancel(interval);
        });
    }])
    .filter('fromNow', function() {
        return function(seconds) {
            if (seconds == -1) return "";
            
            var now = new Date();
            var then = moment(new Date(now.getTime() + (1000 * seconds)));
            
            return then.toNow(true);
        };
    });