<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { CheckCircle2, TrendingUp, TrendingDown, Minus, Loader2, AlertCircle } from '@lucide/vue'

const loading = ref(true)
const error = ref<string | null>(null)
const data = ref<any>(null)
const { formatPrice, convertPrice } = useCurrency()

const fetchSpkData = async () => {
  try {
    loading.value = true
    const response = await axios.get('https://render-capstone-project.onrender.com/predict-gold')
    if (response.data.status === 'success') {
      data.value = response.data
    } else {
      error.value = 'Gagal memuat data SPK.'
    }
  } catch (e: any) {
    error.value = e.message || 'Terjadi kesalahan saat mengambil data.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSpkData()
})

const recommendation = computed(() => {
  if (!data.value || !data.value.predictions_usd || data.value.predictions_usd.length === 0) return null
  
  const currentPriceRaw = data.value.input_data[data.value.input_data.length - 1].Close
  const nextDayPredRaw = data.value.predictions_usd[0].value
  const day7PredRaw = data.value.predictions_usd[6].value
  
  const shortTermChange = ((nextDayPredRaw - currentPriceRaw) / currentPriceRaw) * 100
  const longTermChange = ((day7PredRaw - currentPriceRaw) / currentPriceRaw) * 100
  
  let action = 'TAHAN'
  let color = 'text-gold-500'
  let bg = 'bg-gold-500/10'
  let border = 'border-gold-500/30'
  let icon = Minus
  let reason = 'Pasar menunjukkan sinyal campuran atau perubahan kecil. Sebaiknya pertahankan posisi asetmu saat ini.'

  if (shortTermChange > 0.5 && longTermChange > 1.0) {
    action = 'BELI'
    color = 'text-green-400'
    bg = 'bg-green-500/10'
    border = 'border-green-500/30'
    icon = TrendingUp
    reason = 'Momentum naik yang kuat terdeteksi dalam proyeksi jangka pendek dan 7 hari ke depan. Titik masuk yang sangat menguntungkan.'
  } else if (shortTermChange < -0.5 && longTermChange < -1.0) {
    action = 'JUAL'
    color = 'text-red-400'
    bg = 'bg-red-500/10'
    border = 'border-red-500/30'
    icon = TrendingDown
    reason = 'Tren penurunan diprediksi di berbagai jangka waktu. Pertimbangkan untuk mengambil untung sekarang atau memotong kerugian (cut loss).'
  } else if (shortTermChange > 0 && longTermChange < 0) {
    action = 'TAHAN'
    reason = 'Keuntungan jangka pendek diharapkan, tetapi tren jangka panjang cenderung menurun (bearish). Lanjutkan dengan hati-hati.'
  }

  return {
    action,
    color,
    bg,
    border,
    icon,
    reason,
    currentPriceRaw,
    nextDayPredRaw,
    day7PredRaw,
    shortTermChange,
    longTermChange
  }
})
</script>

<template>
  <div class="card p-6 min-h-[300px] flex flex-col border-dark-700">
    <div class="flex items-center gap-3 mb-6">
      <div class="p-2 bg-dark-700 rounded-lg">
        <CheckCircle2 class="w-5 h-5 text-gold-400" />
      </div>
      <h3 class="text-xl font-bold text-white">Rekomendasi AI (SPK)</h3>
    </div>

    <div v-if="loading" class="flex-1 flex flex-col items-center justify-center">
      <Loader2 class="w-8 h-8 text-gold-500 animate-spin mb-2" />
      <p class="text-gray-400 text-sm">Menganalisis data pasar...</p>
    </div>
    
    <div v-else-if="error" class="flex-1 flex flex-col items-center justify-center text-center">
      <AlertCircle class="w-8 h-8 text-red-400 mb-2" />
      <p class="text-red-400 mb-2">{{ error }}</p>
      <button @click="fetchSpkData" class="btn-outline text-sm py-1 px-3">Coba Lagi Analisis</button>
    </div>

    <div v-else-if="recommendation" class="flex-1 flex flex-col lg:flex-row gap-6 items-start">
      <div 
        class="w-full lg:w-1/3 rounded-xl border p-6 flex flex-col items-center justify-center text-center h-full transition-colors duration-300"
        :class="[recommendation.bg, recommendation.border]"
      >
        <p class="text-sm text-gray-400 uppercase tracking-widest mb-2">Sistem Menyarankan</p>
        <div class="flex items-center gap-3 mb-4">
          <component :is="recommendation.icon" class="w-10 h-10" :class="recommendation.color" />
          <h2 class="text-5xl font-black tracking-tight" :class="recommendation.color">
            {{ recommendation.action }}
          </h2>
        </div>
        <p class="text-sm text-gray-300 leading-relaxed">{{ recommendation.reason }}</p>
      </div>

      <div class="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-dark-800 border border-dark-700 rounded-lg p-4">
          <p class="text-sm text-gray-400 mb-1">Harga Saat Ini (Penutupan Terakhir)</p>
          <p class="text-2xl font-bold text-white break-words">{{ formatPrice(recommendation.currentPriceRaw) }}</p>
        </div>
        
        <div class="bg-dark-800 border border-dark-700 rounded-lg p-4">
          <p class="text-sm text-gray-400 mb-1">Prediksi Hari Berikutnya</p>
          <div class="flex items-end gap-2">
            <p class="text-2xl font-bold text-white break-words">{{ formatPrice(recommendation.nextDayPredRaw) }}</p>
            <span class="text-sm mb-1 font-medium shrink-0" :class="recommendation.shortTermChange >= 0 ? 'text-green-400' : 'text-red-400'">
              {{ recommendation.shortTermChange > 0 ? '+' : '' }}{{ recommendation.shortTermChange.toFixed(2) }}%
            </span>
          </div>
        </div>

        <div class="bg-dark-800 border border-dark-700 rounded-lg p-4 md:col-span-2">
          <p class="text-sm text-gray-400 mb-1">Proyeksi 7 Hari</p>
          <div class="flex items-end gap-2">
            <p class="text-2xl font-bold text-white break-words">{{ formatPrice(recommendation.day7PredRaw) }}</p>
            <span class="text-sm mb-1 font-medium shrink-0" :class="recommendation.longTermChange >= 0 ? 'text-green-400' : 'text-red-400'">
              {{ recommendation.longTermChange > 0 ? '+' : '' }}{{ recommendation.longTermChange.toFixed(2) }}%
            </span>
          </div>
          
          <div class="mt-4 pt-4 border-t border-dark-700">
            <h4 class="text-sm font-medium text-white mb-2">Bagaimana ini bekerja:</h4>
            <p class="text-xs text-gray-400 leading-relaxed">
              Rekomendasi ini dihasilkan dengan menganalisis harga penutupan historis terhadap model prediksi AI Time-Series kami. Sistem menghitung delta antara harga saat ini dan prediksi jangka pendek/panjang untuk memberikan sinyal Beli/Tahan/Jual yang distandarisasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
