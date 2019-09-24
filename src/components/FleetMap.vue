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
      fleetMarkers: []
    }
  },
  watch: {
    // on car selected from list
    selectedCar: function (car) {
      const self = this

      const selectedCarLatLng = {
        lat: car.location.latitude,
        lng: car.location.longitude
      }

      // find the vehicle's marker that was clicked on
      let filteredMarkers = this.fleetMarkers.filter(marker => marker._id.toString() === car._id.toString())
      const foundMarker = filteredMarkers.length > 0 ? filteredMarkers[0] : null

      // change the clicked marker's icon
      if (foundMarker) {
        this.resetAllMarkersIcons()
        foundMarker.setIcon('/img/marker_green.png')
      }

      // center map to marker
      this.map.setCenter(selectedCarLatLng)
    },

    // show all vehicles on the map
    '$store.state.vehicles': function (vehicles) {
      this.initializeVehicleMarkers(vehicles)
    }
  },
  methods: {
    initMap () {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 47.3929301,
          lng: 8.5486769
        },
        zoom: 12
      })
    },
    clearFleetMarkers() {
      this.fleetMarkers.forEach(marker => {
        marker.setMap(null)
      })
    },
    initializeVehicleMarkers(vehicles) {
      this.clearFleetMarkers()

      vehicles.forEach(vehicle => {
        let vehicleMarker = new google.maps.Marker({
          position: {
            lat: vehicle.location.latitude,
            lng: vehicle.location.longitude
          },
          map: this.map
        })

        vehicleMarker._id = vehicle._id

        this.fleetMarkers.push(vehicleMarker)
      })
    },
    resetAllMarkersIcons() {
      this.fleetMarkers.forEach(marker => marker.setIcon())
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