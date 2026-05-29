<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { CheckCircle2, TrendingUp, TrendingDown, Minus, Loader2, AlertCircle } from '@lucide/vue'

const loading = ref(true)
const error = ref<string | null>(null)
const dailyData = ref<any>(null)
const weeklyData = ref<any>(null)
const { formatPrice, convertPrice } = useCurrency()

const fetchSpkData = async () => {
  try {
    loading.value = true
    error.value = null
    const [dailyRes, weeklyRes] = await Promise.all([
      axios.get('https://render-capstone-project.onrender.com/predict-gold-daily'),
      axios.get('https://render-capstone-project.onrender.com/predict-gold-weekly')
    ])
    if (dailyRes.data.status === 'success' && weeklyRes.data.status === 'success') {
      dailyData.value = dailyRes.data
      weeklyData.value = weeklyRes.data
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
  if (!dailyData.value || !weeklyData.value) return null
  if (!dailyData.value.predictions?.length || !dailyData.value.input?.length) return null
  if (!weeklyData.value.predictions?.length) return null

  const currentPriceRaw = dailyData.value.input[dailyData.value.input.length - 1].value
  const nextDayPredRaw = dailyData.value.predictions[0].value
  const weeklyFuturePredRaw = weeklyData.value.predictions[weeklyData.value.predictions.length - 1].value

  const shortTermChange = ((nextDayPredRaw - currentPriceRaw) / currentPriceRaw) * 100
  const longTermChange = ((weeklyFuturePredRaw - currentPriceRaw) / currentPriceRaw) * 100

  // Gunakan rekomendasi dari API jika tersedia
  const spkDecision = dailyData.value.spk?.decision || null
  const rawSpkExplanation = dailyData.value.spk?.ai_explanation || null
  
  // Deteksi jika penjelasan dari API adalah pesan error quota/limit
  const isErrorExplanation = (text: string | null): boolean => {
    if (!text) return true
    const lower = text.toLowerCase()
    return lower.includes('429') || 
           lower.includes('quota') || 
           lower.includes('exceeded') || 
           lower.includes('generative ai') || 
           lower.includes('error') || 
           lower.includes('rate limit')
  }
  
  const spkExplanation = isErrorExplanation(rawSpkExplanation) ? null : rawSpkExplanation

  let action = 'TAHAN'
  let color = 'text-gold-500'
  let bg = 'bg-gold-500/10'
  let border = 'border-gold-500/30'
  let icon = Minus
  let reason = spkExplanation || 'Pasar menunjukkan sinyal campuran atau perubahan kecil. Sebaiknya pertahankan posisi asetmu saat ini.'

  const decision = spkDecision || (
    shortTermChange > 0.5 && longTermChange > 1.0 ? 'BUY' :
    shortTermChange < -0.5 && longTermChange < -1.0 ? 'SELL' : 'HOLD'
  )

  if (decision === 'BUY') {
    action = 'BELI'
    color = 'text-green-400'
    bg = 'bg-green-500/10'
    border = 'border-green-500/30'
    icon = TrendingUp
    if (!spkExplanation) reason = 'Momentum naik yang kuat terdeteksi dalam proyeksi jangka pendek dan mingguan. Titik masuk yang sangat menguntungkan.'
  } else if (decision === 'SELL') {
    action = 'JUAL'
    color = 'text-red-400'
    bg = 'bg-red-500/10'
    border = 'border-red-500/30'
    icon = TrendingDown
    if (!spkExplanation) reason = 'Tren penurunan diprediksi di berbagai jangka waktu. Pertimbangkan untuk mengambil untung sekarang atau memotong kerugian (cut loss).'
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
    weeklyFuturePredRaw,
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
        class="w-full lg:w-1/3 rounded-xl border p-6 flex flex-col items-center justify-center text-center lg:self-stretch transition-colors duration-300"
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
          <p class="text-sm text-gray-400 mb-1">Proyeksi Mingguan (4 Minggu)</p>
          <div class="flex items-end gap-2">
            <p class="text-2xl font-bold text-white break-words">{{ formatPrice(recommendation.weeklyFuturePredRaw) }}</p>
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
