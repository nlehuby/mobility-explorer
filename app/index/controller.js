import Ember from 'ember';
import mapBboxController from 'mobility-playground/mixins/map-bbox-controller';

export default Ember.Controller.extend(mapBboxController, {
	queryParams: ['bbox','pin','map_center'],
	bbox: null,
  leafletBbox: null,
  leafletBounds: [[43.053900124340984, -89.46407318115234],[43.10875337930414, -89.32708740234375]],
	place: null,
  pin: null,
  pinLocation: Ember.computed('pin', function(){
    if (typeof(this.get('pin'))==="string"){
      var pinArray = this.get('pin').split(',');
      return pinArray;
    } else {
      return this.get('pin');
    }
  }),
      attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors | <a href="http://www.mapzen.com">Mapzen</a> | <a href="http://www.transit.land">Transitland</a> | Imagery © <a href="https://carto.com/">CARTO</a>',
  currentlyLoading: Ember.inject.service(),
	icon: L.icon({
		iconUrl: 'assets/images/marker1.png',		
		iconSize: (20, 20),
    iconAnchor: [10, 24],
	}),
  markerUrl: 'assets/images/marker1.png',
  map_center: [43.072963279523,-89.39234018325806],
  center: Ember.computed('pin', function(){
    if (this.get('pin')){
      return this.get('pinLocation');
    } else {
      return this.get('map_center');
    }
  }),
  zoom: 14,
	actions: {
		updatebbox(e) {
			var newbox = e.target.getBounds();
			this.set('bbox', newbox.toBBoxString());
		},
  	searchRepo(term) {
      if (Ember.isBlank(term)) { return []; }
      const url = `https://search.mapzen.com/v1/autocomplete?api_key=search-ab7NChg&text=${term}`;      
      return Ember.$.ajax({ url }).then(json => json.features);
    },
  	setPlace: function(selected){
      this.set('pin', null);
      var lng = selected.geometry.coordinates[0];
      var lat = selected.geometry.coordinates[1];
      var coordinates = [];
      coordinates.push(lat);
      coordinates.push(lng);
      if (selected.geometry){
        if (selected.properties.accuracy === "point"){
          this.set('pin', coordinates);
        }
      }
      this.set('center', coordinates)
  		this.set('place', selected);
      
      var coordinateArray = [];
      var bboxString = this.get('bbox').toString();
      var tempArray = [];
      var boundsArray = [];

      coordinateArray = bboxString.split(',');

      for (var i = 0; i < coordinateArray.length; i++){
        tempArray.push(parseFloat(coordinateArray[i]));
      }
    
      var arrayOne = [];
      var arrayTwo = [];
      arrayOne.push(tempArray[1]);
      arrayOne.push(tempArray[0]);
      arrayTwo.push(tempArray[3]);
      arrayTwo.push(tempArray[2]);
      boundsArray.push(arrayOne);
      boundsArray.push(arrayTwo);
      this.set('leafletBounds', boundsArray);
  	},
  	clearPlace: function(){
  		this.set('place', null);
  	},
    removePin: function(){
      this.set('pin', null);
    },
    dropPin: function(e){
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      var coordinates = [];
      coordinates.push(lat);
      coordinates.push(lng);
      this.set('pin', coordinates);
    },
    setIsochroneMode: function(mode){
      if (this.get('isochrone_mode') === mode){
        this.set('isochrone_mode', null);
      } else {
        this.set('isochrone_mode', mode);
      }
    }
  }
});