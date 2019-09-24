<template>
  <v-card>
    <v-card-title>
      Your cars
      <div class="flex-grow-1"></div>
      <!-- <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field> -->
       <v-btn text icon color="primary" @click="$emit('refreshData')">
          <v-icon>mdi-cached</v-icon>
        </v-btn>
    </v-card-title>

    <v-data-table :headers="headers" :items="$store.state.vehicles" @click:row="onCarSelected" hide-default-footer :loading="isLoading">
      <!-- customize certain columns -->
      <template v-slot:item.registration="props">
        <v-edit-dialog :return-value.sync="props.item.registration" @save="save" @cancel="cancel" @open="open"
          @close="close"> {{ props.item.registration }}
          <template v-slot:input>
            <v-text-field v-model="props.item.registration" :rules="[max25chars]" label="Edit" single-line counter>
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


</template>

<script>

  export default {
    props: {
      source: String,
      isLoading: Boolean
    },
    data: () => ({
      drawer: null,

      max25chars: v => v.length <= 25 || 'Input too long!',
      search: '',
      headers: [{
          text: 'Registration number',
          align: 'left',
          sortable: false,
          value: 'registration',
        },
        {
          text: 'Mileage (km)',
          value: 'mlieage'
        },
        {
          text: 'Fuel level',
          value: 'fuel.level'
        },
        {
          text: 'Battery Status',
          value: 'bat'
        },
      ]
    }),
    methods: {
      onCarSelected(car) {
        this.$emit('carSelected', car)
      },
      getColor(status) {
        if (status === "GOOD") return 'green'
        else return 'orange'
      },
      save() {
        this.snack = true
        this.snackColor = 'success'
        this.snackText = 'Data saved'
      },
      cancel() {
        this.snack = true
        this.snackColor = 'error'
        this.snackText = 'Canceled'
      },
      open() {
        this.snack = true
        this.snackColor = 'info'
        this.snackText = 'Dialog opened'
      },
      close() {
        console.log('Dialog closed')
      },
    },
  }
  
</script>