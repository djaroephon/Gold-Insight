<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Sistem Pendukung Keputusan (SPK)</h1>
      <p class="text-gray-400">Dapatkan rekomendasi Beli, Tahan, atau Jual berbasis data yang didukung oleh prediksi AI kami.</p>
    </header>

    <div class="mb-8 max-w-5xl">
      <SpkRecommendation />
    </div>
    
    <div class="max-w-5xl">
      <div class="card p-6 bg-dark-800/50 border-dark-700/50">
        <h3 class="text-lg font-bold text-white mb-4">Memahami Rekomendasi</h3>
        <ul class="space-y-4 text-gray-400 text-sm">
          <li class="flex gap-3">
            <span class="font-bold text-green-400 w-16">BELI</span>
            <p>AI memprediksi momentum kenaikan yang kuat baik dalam proyeksi jangka pendek (hari berikutnya) maupun jangka panjang (mingguan / 4 minggu). Ini menunjukkan titik masuk yang menguntungkan untuk memaksimalkan potensi keuntungan.</p>
          </li>
          <li class="flex gap-3">
            <span class="font-bold text-gold-500 w-16">TAHAN</span>
            <p>Pasar menunjukkan sinyal campuran. Mungkin ada keuntungan jangka pendek tetapi tren jangka panjang menurun, atau perubahannya terlalu kecil untuk menutup biaya transaksi. Sebaiknya pertahankan posisi kamu saat ini.</p>
          </li>
          <li class="flex gap-3">
            <span class="font-bold text-red-400 w-16">JUAL</span>
            <p>Tren penurunan diprediksi di berbagai kerangka waktu. Untuk meminimalkan kerugian atau mengamankan keuntungan yang ada, sistem menyarankan untuk menjual aset kamu.</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
