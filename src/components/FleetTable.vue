<template>
  <div>
    <v-card>
      <v-card-title>
        Your cars
        <div class="flex-grow-1"></div>
        <v-btn text icon color="primary" @click="$emit('refreshData')">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="computedVehicles" @click:row="onCarSelected" hide-default-footer
        :loading="isLoading">
        <!-- customize certain columns -->
        <template v-slot:item.registration="props">
          <v-edit-dialog :return-value.sync="props.item.registration" @save="save(props.item)" @open="open">
            {{ props.item.registration }}
            <template v-slot:input>
              <v-text-field v-model="props.item.registration" :rules="[max10chars]" label="Edit" single-line counter>
              </v-text-field>
            </template>
          </v-edit-dialog>
        </template>

        <!-- define custom row for battery field with style -->
        <template v-slot:item.bat="{ item }">
          <v-chip :color="getColor(item.bat)" dark>{{ item.bat }}</v-chip>
        </template>

      </v-data-table>
    </v-card>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>

  export default {
    props: {
      isLoading: Boolean
    },
    data: () => ({
      drawer: null,
      snack: '',
      snackColor: '',
      snackText: '',
      max10chars: v => v.length <= 10 || 'Input too long!',
      search: '',
      headers: [{
          text: 'Registration number',
          align: 'left',
          sortable: false,
          value: 'registration',
        },
        {
          text: 'Mileage (km)',
          value: 'mileage'
        },
        {
          text: 'Fuel level',
          value: 'computedFuel'
        },
        {
          text: 'Battery Status',
          value: 'bat'
        },
      ]
    }),
    computed: {
      computedVehicles: function () {
        return this.$store.state.vehicles.map(car => {
          // compute the fuel levels
          if (!car.fuel.level) {
            car.computedFuel = car.fuel.liters + ' liters'
          } else {
            car.computedFuel = car.fuel.liters * 100 / car.fuel.level + '%'
          }

          return car
        })
      } 
    },
    methods: {
      onCarSelected(car) {
        this.$emit('carSelected', car)
      },
      getColor(status) {
        if (status === "GOOD") return 'green'
        else return 'orange'
      },
      save(vehicle) {
        this.updateRegistration(vehicle)
      },
      open() {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Press enter to save'
      },
      updateRegistration(vehicle) {
        const newRegistrationNumber = vehicle.registration
        const vm = this

        this.$http.put('/vehicles/' + vehicle._id, {
          newRegistrationNumber
        })
          .then(response => {
            // alert of successfull update with notification dialog
            vm.snack = true
            vm.snackColor = 'success'
            vm.snackText = 'Registration updated succcessfully'

            // reload the date to ensure latest version
            vm.$emit('refreshData')
          })
          .catch(error => {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = 'Failed to save. Please try again.'
          })
      }
    },
  }
  
</script>