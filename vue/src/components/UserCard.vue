<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
})

defineEmits(['toggle-favorite'])
</script>

<template>
  <article class="card">
    <h2>{{ user.name }}</h2>
    <p><strong>Correo:</strong> {{ user.email }}</p>
    <p><strong>Ciudad:</strong> {{ user.address.city }}</p>

    <button @click="$emit('toggle-favorite', user.id)">
      {{ isFavorite ? 'Quitar favorito' : 'Favorito' }}
    </button>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid #cccccc;
  margin-bottom: 12px;
  padding: 12px;
}

h2 {
  margin-top: 0;
  font-size: 18px;
}

p {
  margin: 6px 0;
}

button {
  margin-top: 8px;
}
</style>
