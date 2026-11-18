<script setup>
import { onMounted, ref } from 'vue'

const users = ref([])
const loading = ref(true)
const error = ref('')

async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')

    if (!response.ok) {
      throw new Error('No se pudieron obtener los usuarios.')
    }

    users.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(getUsers)
</script>

<template>
  <main>
    <h1>Gestión de usuarios</h1>

    <p v-if="loading">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>

    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }} - {{ user.address.city }}
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

li {
  margin-bottom: 8px;
}
</style>
