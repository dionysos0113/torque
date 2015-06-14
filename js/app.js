/// <reference path="../typings/angularjs/angular.d.ts"/>
/**
 * Created by abe on 6/13/15.
 */
(function () {
    angular.module('torque', ['ngMaterial', 'ngRoute', 'angularMoment', 'prettyBytes'])
        .config(['$routeProvider', '$mdThemingProvider', '$httpProvider', '$mdIconProvider', function($routeProvider, $mdThemingProvider, $httpProvider, $mdIconProvider) {
            $httpProvider.interceptors.push('ErrorInterceptor');
            $httpProvider.interceptors.push('AuthInterceptor');
            
            $routeProvider
                .when('/', {
                    templateUrl: 'routes/list/index.tmpl.html',
                    controller: 'ListCtrl'
                })
                .when('/details/:id', {
                    templateUrl: 'routes/details/index.tmpl.html',
                    controller: 'DetailCtrl'
                });
                
            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('red');
                
            $mdIconProvider
                .iconSet('file', 'img/icons/file-icons.svg')
                .iconSet('action', 'img/icons/action-icons.svg')
                .iconSet('content', 'img/icons/content-icons.svg')
                .iconSet('navigation', 'img/icons/navigation-icons.svg')
                .iconSet('av', 'img/icons/av-icons.svg');
        }])
        .controller('AppController', ['$scope', '$location', function($scope, $location) {
            $scope.goBack = function() {
                var paths = $location.url().split('/');
                paths.pop();
                //$location.url(paths.join('/'));
                $location.url('/');
            };
            
            $scope.areHome = function() {
                return $location.url() == '/';
            };
        }]);
})();