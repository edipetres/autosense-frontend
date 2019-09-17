<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  props: ['location'],
  mounted() {
    this.initMap()
  },
  data() {
    return {
      marker: ''
    }
  },
  watch: {
    location: function (newVal) {
      // clear the previous marker from the map
      if (this.marker)
        this.marker.setMap(null)

      // assign a new marker
      this.marker = new google.maps.Marker({
        position: {
          lat: this.location.latittude,
          lng: this.location.longitude
        },
        icon: '/img/car-icon.png',
        map: this.map
      });

      this.map.setCenter(this.marker.getPosition())
    }
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 47.3929301,
          lng: 8.5486769
        },
        zoom: 10
      })
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