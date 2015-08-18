#angular-find-nearest

Finds marker closes to your position.

## Usage
### Install
`npm install angular-find-nearest`

### Dependencies
Make sure to have Google Maps and AngularJS available on your site:
```
<script async defersrc="https://maps.googleapis.com/maps/api/js?key=API_KEY&callback=initMap"></script>
```
```
<script type="text/javascript" src="angular.js"></script>
```

### Example
Controller: 
```
(function () {
    'use strict';

    angular
        .module('myController', [
          'ngFindNearest'
        ])
        .controller('MyController', myController);

    function myController(myController) {
        var vm = this;
        vm.map = {
          canvas: {},
          options: {
            center: new google.maps.LatLng(<lat>, <lng>),
            zoom: 6,
          }
        };
        vm.stores = {};
        vm.position = {};

        vm.init = function(){
          init();
        };

        function init(){
          setPosition();
        }

        function setPosition(){
          if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(function(position) {
              vm.position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            }, function(error){
              // if position is non-retreivable or blocked by user
            });
          }
          else{
            // geolocation not available
          }
        }
        
        vm.highlightStore = function(store){
          vm.map.canvas.setCenter(store.marker.getPosition());
          vm.map.canvas.setZoom(11);
        }
})();
```




```
<button class="map-find-nearest" bm-find-nearest position="myController.position" callback="myController.highlightStore(marker)" markers="myController.stores" marker-key="marker">Find nearest</button>
```

### Parameters
* position: google.maps.LatLng
* markers: Array of markers to calculate distance between [google.maps.LatLng, google.maps.LatLng]
* marker-key: In case of more complex object to calculate distance between use this key. Say you have an array of store objects with a marker variable like som store.marker, the marker key will be marker-key="marker". If no parameter for marker-key is specified, it will be ignored and loop the markers array.
* callback: Function to run in your controller

Returns: The closest marker to the given position or complex object in cases where marker-key is used.
