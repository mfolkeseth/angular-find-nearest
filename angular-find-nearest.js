/*
* License: https://github.com/mfolkeseth/angular-find-nearest/blob/master/LICENSE
*/﻿

(function() {
    'use strict';

    angular
        .module('ngFindNearest', [])
        .directive('ngFindNearest', findNearest);

    function findNearest () {
        var directive = {
            link: link,
            scope: {
              position: '=',
              markers: '=',
              markerKey: '@',
              controllerCallback: '&callback'
            }
        };

        return directive;

        function link(scope, element, attrs) {
          element.click(function(){
            var nearest = findNearest(scope);
            scope.controllerCallback({marker: nearest})
          });
        };

        function findNearest(scope){
          var nearestMarker = null;
          var nearestDistance = null;
          angular.forEach(scope.markers, function(item){
            var marker = '';
            if(scope.markerKey !== undefined){
              marker = item[scope.markerKey];
            }
            var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(scope.position, marker.getPosition());
            if(nearestMarker == null || nearestDistance == null){
              nearestMarker = item;
              nearestDistance = distanceBetween;
            }
            else if(distanceBetween < nearestDistance) {
              nearestMarker = item;
              nearestDistance = distanceBetween;
            }
          });
          return nearestMarker;
        };
    }

})();
