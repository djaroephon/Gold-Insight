<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Loader2 } from '@lucide/vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Prediction {
  date: string;
  value: number;
}

const predictions = ref<Prediction[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const { currency, formatPrice, convertPrice } = useCurrency()

const weightUnit = ref<'oz' | 'gram'>('oz')
const selectedDays = ref<number>(7)

const fetchPredictions = async () => {
  try {
    loading.value = true
    const response = await axios.get('https://render-capstone-project.onrender.com/predict-gold')
    if (response.data.status === 'success') {
      predictions.value = response.data.predictions_usd
      selectedDays.value = response.data.predictions_usd.length
    } else {
      error.value = 'Gagal memuat data prediksi.'
    }
  } catch (e: any) {
    error.value = e.message || 'Terjadi kesalahan saat mengambil data.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPredictions()
})

const adjustForWeight = (pricePerOz: number) => {
  return weightUnit.value === 'gram' ? pricePerOz / 31.1035 : pricePerOz
}

const visiblePredictions = computed(() => {
  return predictions.value.slice(0, selectedDays.value)
})

const chartData = computed(() => {
  return {
    labels: visiblePredictions.value.map(p => p.date),
    datasets: [
      {
        label: `Prediksi Harga Emas (${currency.value}/${weightUnit.value === 'oz' ? 'oz' : 'g'})`,
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        borderColor: '#FFD700',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#FFD700',
        pointHoverBackgroundColor: '#FFD700',
        pointHoverBorderColor: '#fff',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        data: visiblePredictions.value.map(p => {
          const converted = convertPrice(p.value)
          return adjustForWeight(converted)
        })
      }
    ]
  }
})

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#9ca3af'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value: any) {
            if (currency.value === 'IDR') {
               return 'Rp ' + (value / 1000000).toFixed(1) + ' Jt'
            }
            return '$' + Number(value).toFixed(weightUnit.value === 'gram' ? 2 : 0);
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(18, 18, 18, 0.9)',
        titleColor: '#FFD700',
        bodyColor: '#fff',
        borderColor: 'rgba(212, 175, 55, 0.3)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
             const rawValue = visiblePredictions.value[context.dataIndex].value
             const adjustedRaw = adjustForWeight(rawValue)
             return 'Harga: ' + formatPrice(adjustedRaw) + (weightUnit.value === 'gram' ? ' / g' : ' / oz');
          }
        }
      }
    }
  }
})
</script>

<template>
  <div class="card p-6 min-h-[400px] flex flex-col relative border-dark-700">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <h3 class="text-xl font-bold text-white flex items-center gap-2 shrink-0">
        <div class="w-2 h-6 bg-gold-500 rounded-full"></div>
        Grafik Prediksi Harga Emas
      </h3>
      
      <div class="flex flex-wrap items-center gap-3">
        <!-- Slider Hari Prediksi -->
        <div v-if="predictions.length > 0" class="flex items-center gap-3 bg-dark-800 rounded-lg px-3 py-1.5 border border-dark-700">
          <label class="text-xs text-gray-400 font-medium whitespace-nowrap">Tampilkan:</label>
          <input type="range" v-model="selectedDays" min="1" :max="predictions.length" class="w-20 accent-gold-500" />
          <span class="text-xs text-gold-500 font-bold w-12">{{ selectedDays }} Hari</span>
        </div>

        <!-- Toggle Satuan Berat -->
        <div class="flex bg-dark-800 rounded-lg p-1 border border-dark-700">
          <button 
            @click="weightUnit = 'oz'"
            class="px-4 py-1.5 text-xs font-medium rounded-md transition-colors"
            :class="weightUnit === 'oz' ? 'bg-gold-500 text-dark-900 shadow' : 'text-gray-400 hover:text-white'"
          >
            Troy Oz
          </button>
          <button 
            @click="weightUnit = 'gram'"
            class="px-4 py-1.5 text-xs font-medium rounded-md transition-colors"
            :class="weightUnit === 'gram' ? 'bg-gold-500 text-dark-900 shadow' : 'text-gray-400 hover:text-white'"
          >
            Gram
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="loading" class="absolute inset-0 flex flex-col items-center justify-center bg-dark-800/50 backdrop-blur-sm z-10 rounded-xl">
      <Loader2 class="w-8 h-8 text-gold-500 animate-spin mb-2" />
      <p class="text-gray-400 text-sm">Memuat Prediksi AI...</p>
    </div>
    
    <div v-else-if="error" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <p class="text-red-400 mb-2">{{ error }}</p>
        <button @click="fetchPredictions" class="btn-outline text-sm py-1 px-3">Coba Lagi</button>
      </div>
    </div>
    
    <div v-else class="flex-1 w-full h-[300px]">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
