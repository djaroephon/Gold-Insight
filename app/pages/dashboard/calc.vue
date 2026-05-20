<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Kalkulator Investasi Emas</h1>
      <p class="text-gray-400">Simulasikan potensi keuntunganmu berdasarkan harga saat ini dan target prediksi AI.</p>
    </header>

    <div class="max-w-4xl">
      <GoldCalculator />
    </div>
  </div>
</template>
