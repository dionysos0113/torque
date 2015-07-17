(function() {
    angular.module('torque')
        .controller('AddCtrl', ['$scope','$mdDialog', 'FileReader', 'TransmissionService', function ($scope, $mdDialog, FileReader, TService) {
            $scope.torrent = {};
            $scope.torrent.files = [];
            $scope.pgress = [];

            $scope.fileUpload = function(){
                document.getElementById('fileInput').click();
            };

            $scope.fileChange = function(){
                $scope.$apply(function(){
                    for (var i = 0; i < document.getElementById('fileInput').files.length; i++){
                        $scope.torrent.files.push(document.getElementById('fileInput').files[i]);
                    }
                });

                (function uploadFile (filenum) {
                    var file = $scope.torrent.files[filenum];
                    if (file.size < 100000000) {
                        if (!$scope.torrent.files[filenum].data) {
                            FileReader.readAsDataUrl(file, $scope).then(function (result) {
                                $scope.torrent.files[filenum].data = result;
                                $scope.torrent.files[filenum] = copyFile($scope.torrent.files[filenum]);
                                if (filenum + 1 < $scope.torrent.files.length) {
                                    uploadFile(filenum + 1);
                                }
                            }).catch(function (err) {
                                console.log(err);
                            }).finally(null, function (progress) {

                                if (!$scope.pgress[filenum]) {
                                    $scope.pgress.push(0);
                                }
                                $scope.pgress[filenum] = Math.round(progress);
                            });
                        } else {
                            if (filenum + 1 < $scope.torrent.files.length) {
                                uploadFile(filenum + 1);
                            }
                        }
                    } else {
                        $scope.removeFile(filenum);
                        alert(file.name + ' is Too Large');
                    }
                })(0);

            };

            function copyFile(file) {
                var type = file.type;
                var name = file.name;
                var size = file.size;
                var lastModified = file.lastModified;
                var data = file.data;

                return {type: type, name: name, size: size, lastModified: lastModified, data: data};
            }

            $scope.removeFile = function(index) {
                $scope.torrent.files.splice(index, 1);
                $scope.pgress.splice(index, 1);
            };

            $scope.cancel = function(reason) {
              $mdDialog.cancel(reason);
            };
            $scope.submit = function() {
                var torrent;
                var url;
                if ($scope.torrent.url && $scope.torrent.url.length) {
                    torrent = $scope.torrent.url;
                    url = true;
                } else if ($scope.torrent.files.length) {
                    torrent = extractData($scope.torrent.files[0].data);
                    url = false;
                } else {
                    $scope.cancel('no data');
                }

                var promise = TService.add(torrent, url);

                $mdDialog.hide(promise);
            };

            function extractData(data) {
                return data.split(',')[1];
            }

        }]);
})();
