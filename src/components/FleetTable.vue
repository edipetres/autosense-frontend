<template>
  <v-card>
    <v-card-title>
      Your cars
      <div class="flex-grow-1"></div>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>

    <v-data-table :headers="headers" :items="fleet" @click:row="onCarSelected" hide-default-footer>
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
      ],
      fleet: [{
          "location": {
            "latittude": 47.3799174,
            "longitude": 8.5367373
          },
          "registration": "ZH-123 456",
          "mlieage": 4356.5,
          "fuel": {
            "level": 80,
            "litters": 38
          },
          "bat": "GOOD"
        },
        {
          "location": {
            "latittude": 47.3753548,
            "longitude": 8.545299
          },
          "registration": "ZH-453 456",
          "mlieage": 97306.5,
          "fuel": {
            "level": 100,
            "litters": 45
          },
          "bat": "GOOD"
        },
        {
          "location": {
            "latittude": 47.360204,
            "longitude": 8.5334757
          },
          "registration": "ZH-166 98",
          "mlieage": 12256.5,
          "fuel": {
            "level": null,
            "litters": 33.5
          },
          "bat": "GOOD"
        },
        {
          "location": {
            "latittude": 47.3929301,
            "longitude": 8.5486769
          },
          "registration": "ZH-13 46",
          "mlieage": 45566.5,
          "fuel": {
            "level": 10,
            "litters": 8
          },
          "bat": "GOOD"
        }
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