<template>
  <v-container fluid>
    <v-row>

      <v-col cols="12" md="6">
        <fleet-table @carSelected="onCarSelected"></fleet-table>
        
        <v-alert dense type="info" text class="mt-2">
          Click on a car to see it on the map. Click on the registration number for editing.
        </v-alert>
      </v-col>

      <v-col cols="12" md="6">
        <fleet-map :location="selectedCarLocation"></fleet-map>
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
      selectedCarLocation: {
        latitude: 47.3929301,
        longitude: 8.5486769
      },
      snack: false,
      snackColor: '',
      snackText: '',
    }
  },
  methods: {
    onCarSelected: function (car) {
      this.selectedCarLocation = car.location
    }
  }
};
</script>
