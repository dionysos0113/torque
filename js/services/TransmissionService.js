angular.module('torque')
    .factory("TransmissionService", ["$http", "$q", function($http, $q) {
        return {
            start: startTorrent,
            stop: stopTorrent,
            query: getTorrent,
            mutate: mutateTorrent,
            add: addTorrent,
            remove: removeTorrent,
            move: moveTorrent
        };
        
        function startTorrent(ids) {
            var obj = {};
            if (ids) {
                obj.ids = ids;
            }
            var postObj = {
                "method": "torrent-start",
                "arguments": obj
            };
            
            return post(postObj);
        }
        
        function stopTorrent(ids) {
            var obj = {};
            if (ids) {
                obj.ids = ids;
            }
            var postObj = {
                "method": "torrent-stop",
                "arguments": obj
            };
            
            return post(postObj);
        }
        
        function moveTorrent(ids, location, copy) {
            var obj = {};
            obj.ids = ids;
            obj.location = location;
            obj.move = true;
            if (copy) {
                obj.move = copy;
            }
            
            var postObj = {
                "method": "torrent-set-location",
                "arguments": obj
            };
            
            return post(postObj);
        }
        
        function removeTorrent(ids, localData) {
            var obj = {};
            if (ids) {
                obj.ids = ids;
            }
            obj["delete-local-data"] = localData || false;
            
            var postObj = {
                "method": "torrent-remove",
                "arguments": obj
            };
            
            return post(postObj);
        }
        
        function addTorrent(data, url) {
            var obj = {};
            if (url) {
                obj["filename"] = data;
            } else {
                obj["metainfo"] = data;
            }
            
            var postObj = {
                "method": "torrent-add",
                "arguments": obj
            };
            
            return post(postObj);
        }
        
        function mutateTorrent(ids, obj) {
            if (ids) {
                obj.ids = ids;
            }
            
            var postObj = {
                "method": "torrent-set",
                "arguments": obj
            };
            return post(postObj);
        }
        
        function getTorrent(ids, fields) {
            var postObj = {
                "method": "torrent-get",
                    "arguments": {
                        "fields": [
                            "id",
                            "name",
                            "status",
                            "totalSize",
                            "sizeWhenDone",
                            "haveValid",
                            "haveUnchecked",
                            "eta",
                            "leftUntilDone",
                            "uploadedEver",
                            "uploadRatio",
                            "rateDownload",
                            "rateUpload",
                            "percentDone",
                            "metadataPercentComplete",
                            "addedDate",
                            "trackerStats",
                            "error",
                            "errorString",
                            "recheckProgress",
                            "bandwidthPriority",
                            "seedRatioMode",
                            "seedRatioLimit"
                        ],
                    }
                };
                
                if (typeof fields !== 'undefined') postObj.arguments.fields = fields;
                
                if (ids) {
                    postObj.arguments.ids = ids;
                }
                
                var deferred = $q.defer();
                
                post(postObj).then(function(data) {
                    if (data.result == "success") {
                        deferred.resolve(data.arguments.torrents);
                    } else {
                        deferred.reject(data);
                    }
                    
                }).catch(function(err) {
                    deferred.reject(err);
                });
                
            return deferred.promise;
        }
        
        
        function post(obj, promise) {
            var deferred = promise || $q.defer();
            $http.post('/transmission/rpc', obj).then(function(data) {
                deferred.resolve(data.data);
            }).catch(function(err) {
                if (err.status = 409) 
                    return post(obj, deferred);
                else 
                    deferred.reject(err);
            });
            
            return deferred.promise;
        }
    }]);