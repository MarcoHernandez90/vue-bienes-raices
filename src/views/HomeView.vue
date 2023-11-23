<script setup>
import Propiedad from '../components/Propiedad.vue'
import usePropiedades from '../composables/usePropiedades'
import { priceProperty } from '../helpers'

const { alberca, propiedadesFiltradas } = usePropiedades()
</script>

<template>
  <main>
    <h1 class="text-center text-h3 font-weight-bold my-5">
      Nuestras Propiedades
    </h1>

    <v-card flat class="py-10">
      <v-card-title class="text-h5">
        Búsqueda
        <v-checkbox label="Alberca" v-model="alberca"></v-checkbox>
      </v-card-title>
      <v-row>
        <Propiedad
          v-for="propiedad in propiedadesFiltradas"
          :key="propiedad.id"
          :propiedad="propiedad"
          :price="priceProperty"
        />
      </v-row>
    </v-card>
  </main>
</template>
