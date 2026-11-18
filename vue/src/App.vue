<script setup>
import { computed, onMounted, ref } from 'vue'
import UserCard from './components/UserCard.vue'

const users = ref([])
const loading = ref(true)
const error = ref('')
const favoriteIds = ref([])
const search = ref('')

const filteredUsers = computed(() => {
  return users.value.filter((user) =>
    user.name.toLowerCase().includes(search.value.toLowerCase()),
  )
})

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

function toggleFavorite(userId) {
  if (favoriteIds.value.includes(userId)) {
    favoriteIds.value = favoriteIds.value.filter((id) => id !== userId)
  } else {
    favoriteIds.value.push(userId)
  }
}
</script>

<template>
  <main>
    <h1>Gestión de usuarios</h1>
    <p>Favoritos: {{ favoriteIds.length }}</p>

    <label for="search">Buscar por nombre</label>
    <input id="search" v-model="search" type="text" />

    <p v-if="loading">Cargando...</p>
    <p v-else-if="error">{{ error }}</p>

    <section v-else class="user-list">
      <UserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :user="user"
        :is-favorite="favoriteIds.includes(user.id)"
        @toggle-favorite="toggleFavorite"
      />
    </section>
  </main>
</template>

<style scoped>
main {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

input {
  display: block;
  margin: 6px 0 16px;
  padding: 6px;
}

.user-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

@media (max-width: 800px) {
  .user-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .user-list {
    grid-template-columns: 1fr;
  }
}

</style>
