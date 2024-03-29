<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  props: ['selectedCar'],
  mounted() {
    const vm = this
    // set interval to watch when google maps api is done loading
    this.interval = setInterval(() => {
      if (window.mapDoneLoading) {
        vm.initMap()
        vm.initializeVehicleMarkers(vm.$store.state.vehicles)
        clearInterval(vm.interval)
      }
    }, 200)
  },
  data() {
    return {
      selectionMarker: null,
      fleetMarkers: [],
      infowindows: []
    }
  },
  watch: {
    // when a new car is clicked on in the list
    selectedCar: function (car) {
      const selectedCarLatLng = {
        lat: car.location.latitude,
        lng: car.location.longitude
      }

      // find the vehicle's marker that was clicked on
      const filteredMarkers = this.fleetMarkers.filter(marker => marker._id.toString() === car._id.toString())
      const foundMarker = filteredMarkers.length > 0 ? filteredMarkers[0] : null

      // change the clicked marker's icon
      if (foundMarker) {
        this.resetAllMarkersIcons()
        foundMarker.setIcon('/img/marker_green.png')
      }

      // center marker on map
      this.map.panTo(selectedCarLatLng)
      this.closeAllInfoWindows()
    },

    // show all vehicles on the map
    '$store.state.vehicles': function (vehicles) {
      this.initializeVehicleMarkers(vehicles)
    }
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 47.3929301,
          lng: 8.5486769
        },
        zoom: 12
      })
    },

    clearFleetMarkers() {
      for (let marker of this.fleetMarkers) {
        marker.setMap(null)
      }
      this.fleetMarkers = []
    },

    initializeVehicleMarkers(vehicles) {
      // remove all previous markers
      this.clearFleetMarkers()

      for (let vehicle of vehicles) {
        const vm = this

        // create new marker object
        let vehicleMarker = new google.maps.Marker({
          position: {
            lat: vehicle.location.latitude,
            lng: vehicle.location.longitude
          },
          map: this.map
        })

        // add id to marker so we can reference it
        vehicleMarker._id = vehicle._id

        // create info window with vehicle info
        let infowindow = new google.maps.InfoWindow({
          content: `<div id="content"><p>${vehicle.registration}</p></div>`
        });

        // attach a click listener for each marker
        vehicleMarker.addListener('click', function () {
          vm.closeAllInfoWindows()
          infowindow.open(map, vehicleMarker);
        });

        // collect new markers and infowindows in designated arrays
        this.fleetMarkers.push(vehicleMarker)
        this.infowindows.push(infowindow)
      }
      // after placing all markers center map around them
      this.centerMapAroundMarkers()
    },

    centerMapAroundMarkers() {
      let bounds = new google.maps.LatLngBounds();
      for (let marker of this.fleetMarkers) {
        bounds.extend(marker.getPosition());
      }
      this.map.fitBounds(bounds)
    },

    resetAllMarkersIcons() {
      this.fleetMarkers.forEach(marker => marker.setIcon())
    },

    closeAllInfoWindows() {
      this.infowindows.forEach(infowindow => infowindow.close())
    }
  }
}
</script>

<style lang="scss" scoped>

#map {
  width: 100%;
  height: 400px;
}

</style>