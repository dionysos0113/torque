angular.module('torque')
    .service('AuthService', [function() {
        var auth = this;
        auth.token = null;
        auth.basic = null;
    }])
    .factory('AuthInterceptor', ['AuthService', function AuthInterceptor(AuthService) {
        return {
            request: addToken
        };

        function addToken(config) {
            var token = AuthService.token;
            if (token) {
                config.headers = config.headers || {};
                config.headers['X-Transmission-Session-Id'] = token;
                //config.headers['Authorization'] = 'Basic YWJlOkYyMnJhcHRvcmFmIQ==';
            }
            return config;
        }
    }])
    .factory('ErrorInterceptor', ['$q', '$window', 'AuthService', function ErrorInterceptor($q, $window, AuthService) {
        return {
            responseError: function(rejection) {
                if (rejection.status) {
                    switch (rejection.status) {
                        case 409:
                        AuthService.token = rejection.headers('X-Transmission-Session-Id');
                    }
                }

                return $q.reject(rejection);
            }
        };
    }]);
