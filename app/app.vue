<script setup lang="ts">
import { onMounted } from 'vue'

const { fetchExchangeRate } = useCurrency()

onMounted(() => {
  fetchExchangeRate()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-dark-900 text-white font-sans selection:bg-gold-500 selection:text-dark-900">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
