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
                .when('/handler/:uri', {
                    controller: 'HandlerCtrl',
                    templateUrl: 'routes/handler/index.tmpl.html',
                    parent: '/'
                })
                .when('/details/:id', {
                    templateUrl: 'routes/details/index.tmpl.html',
                    controller: 'DetailCtrl',
                    parent: '/'
                })
                .when('/settings', {
                    templateUrl: 'routes/settings/index.tmpl.html',
                    controller: 'SettingCtrl',
                    parent: '/'
                })
                .when('/settings/general', {
                    templateUrl: 'routes/settings/general/index.tmpl.html',
                    controller: 'GeneralCtrl',
                    parent: '/settings'
                })
                .when('/settings/downloading', {
                    templateUrl: 'routes/settings/downloading/index.tmpl.html',
                    parent: '/settings'
                })
                .when('/settings/network', {
                    templateUrl: 'routes/settings/network/index.tmpl.html',
                    parent: '/settings'
                })
                .when('/settings/privacy', {
                    templateUrl: 'routes/settings/privacy/index.tmpl.html',
                    parent: '/settings'
                })
                .when('/settings/seeding', {
                    templateUrl: 'routes/settings/seeding/index.tmpl.html',
                    parent: '/settings'
                })
                .when('/settings/speed', {
                    templateUrl: 'routes/settings/speed/index.tmpl.html',
                    parent: '/settings'
                });

            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('deep-orange');

            $mdIconProvider
                .iconSet('file', 'img/icons/file-icons.svg')
                .iconSet('action', 'img/icons/action-icons.svg')
                .iconSet('content', 'img/icons/content-icons.svg')
                .iconSet('navigation', 'img/icons/navigation-icons.svg')
                .icon('navigation:arrow_up', 'img/icons/arrow-up.svg')
                .icon('navigation:arrow_down', 'img/icons/arrow-down.svg')
                .iconSet('av', 'img/icons/av-icons.svg');
        }])
        .controller('AppController', ['$scope', '$location', 'TransmissionService', '$route', function($scope, $location, TService, $route) {
            $scope.goBack = function() {
                $location.url($route.current.$$route.parent);
            };

            $scope.areHome = function() {
                return $location.url() == '/';
            };

            $scope.goSettings = function() {
                $location.url('/settings');
            };

            $scope.getIcon = function(state) {
                switch (state) {
                    case 0:
                        return {label: 'Start Torrent', icon: 'av:play_arrow'};
                        break;
                    case 4:
                        return {label: 'Pause Torrent', icon: 'av:pause'};
                    case 6:
                        return {label: 'Pause Torrent', icon: 'av:pause'};
                    default:
                        return {label: 'Start Torrent', icon: 'av:play_arrow'};
                        break;
                }
            };

            $scope.toggleState = function(state, id) {
                switch (state) {
                    case 0:
                        TService.start(id).then(function() {
                            console.log('started');
                            $scope.$broadcast('updateView');
                        });
                        break;
                    case 4:
                        TService.stop(id).then(function() {
                            console.log('started');
                            $scope.$broadcast('updateView');
                        });
                        break;
                    case 6:
                        TService.stop(id).then(function() {
                            console.log('started');
                            $scope.$broadcast('updateView');
                        });
                        break;
                    default:
                        break;
                }
            };

            $scope.refresh = function() {
                $scope.$broadcast('updateView');
            };

            $scope.pageTitle = 'Torque';

            $scope.setTitle = function(title) {
                if (title) {
                    $scope.pageTitle = title;
                } else {
                    $scope.pageTitle = 'Torque';
                }
            };
        }])
        .filter('fromNow', function() {
            return function(seconds) {
                if (seconds == -1) return "";

                var now = new Date();
                var then = moment(new Date(now.getTime() + (1000 * seconds)));

                return then.toNow(true);
            };
        })
        .filter('statusFilter', function() {
            return function(status) {
                switch (status) {
                    case 0:
                        return 'Paused';
                        break;
                    case 4:
                        return 'Downloading';
                        break;
                    case 6:
                        return "Seeding";
                        break;
                    default:
                        break;
                }
            };
        })
        .constant('angularMomentConfig', {
            preprocess: 'unix'
        });
})();
