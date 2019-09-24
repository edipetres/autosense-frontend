<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <fleet-table @carSelected="onCarSelected" :isLoading="isLoading" @refreshData="loadVehicles"></fleet-table>
        
        <v-alert dense type="info" text class="mt-2">
          Click on a car to see it on the map. <br>
          Click on the registration number for editing.
        </v-alert>
      </v-col>

      <v-col cols="12" md="6">
        <fleet-map :selectedCar="selectedCar"></fleet-map>
      </v-col>
    </v-row>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>

  </v-container>
</template>

<script>
import FleetTable from '../components/FleetTable';
import FleetMap from '../components/FleetMap';

export default {
  components: {
    FleetTable,
    FleetMap
  },
  data() {
    return {
      isLoading: false,
      selectedCar: null,
      snack: false,
      snackColor: '',
      snackText: '',
    }
  },
  created() {
    this.loadVehicles()
  },
  methods: {
    onCarSelected(car) {
      this.selectedCar = car
    },
    loadVehicles() {
      const self = this
      this.isLoading = true

      this.$http.get('/vehicles')
        .then(response => {
          self.$store.commit('setVehicles', response.data.payload)
        })
        .catch(error => {
          console.log('error', error)
        })
        .finally(() => {
          self.isLoading = false
        })
    }
  }
};
</script>
