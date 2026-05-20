<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Calculator, ArrowRight, TrendingUp } from '@lucide/vue'

const { currency, formatPrice, convertPrice } = useCurrency()

const rawInvestmentAmount = ref(1000)
const rawCurrentPrice = ref(4500.70)
const rawTargetPrice = ref(4599.61)
const weightUnit = ref('oz')

const investmentAmount = computed({
  get: () => convertPrice(rawInvestmentAmount.value).toFixed(currency.value === 'IDR' ? 0 : 2),
  set: (val) => {
    const num = parseFloat(val as string)
    if (!isNaN(num)) {
       rawInvestmentAmount.value = currency.value === 'IDR' ? num / useCurrency().exchangeRate.value : num
    }
  }
})

const currentPrice = computed({
  get: () => convertPrice(rawCurrentPrice.value).toFixed(currency.value === 'IDR' ? 0 : 2),
  set: (val) => {
    const num = parseFloat(val as string)
    if (!isNaN(num)) {
       rawCurrentPrice.value = currency.value === 'IDR' ? num / useCurrency().exchangeRate.value : num
    }
  }
})

const targetPrice = computed({
  get: () => convertPrice(rawTargetPrice.value).toFixed(currency.value === 'IDR' ? 0 : 2),
  set: (val) => {
    const num = parseFloat(val as string)
    if (!isNaN(num)) {
       rawTargetPrice.value = currency.value === 'IDR' ? num / useCurrency().exchangeRate.value : num
    }
  }
})


const estimatedWeight = computed(() => {
  if (!rawInvestmentAmount.value || !rawCurrentPrice.value) return 0
  let weightOz = rawInvestmentAmount.value / rawCurrentPrice.value
  if (weightUnit.value === 'gram') {
    return weightOz * 31.1035 // 1 troy oz = 31.1035 grams
  }
  return weightOz
})

const estimatedValue = computed(() => {
  if (!rawInvestmentAmount.value || !rawCurrentPrice.value || !rawTargetPrice.value) return 0
  const weightOz = rawInvestmentAmount.value / rawCurrentPrice.value
  return weightOz * rawTargetPrice.value
})

const profitMargin = computed(() => {
  if (!rawInvestmentAmount.value || estimatedValue.value === 0) return 0
  return estimatedValue.value - rawInvestmentAmount.value
})

const profitPercentage = computed(() => {
  if (!rawInvestmentAmount.value || estimatedValue.value === 0) return 0
  return (profitMargin.value / rawInvestmentAmount.value) * 100
})
</script>

<template>
  <div class="card p-6 relative overflow-hidden group border-dark-700">
    <div class="absolute -right-20 -top-20 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl group-hover:bg-gold-500/10 transition-colors duration-500 pointer-events-none"></div>

    <div class="flex items-center gap-3 mb-6 relative z-10">
      <div class="p-2 bg-dark-700 rounded-lg">
        <Calculator class="w-5 h-5 text-gold-400" />
      </div>
      <h3 class="text-xl font-bold text-white">Kalkulator Investasi</h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Modal Investasi ({{ currency }})</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{{ currency === 'IDR' ? 'Rp' : '$' }}</span>
            <input 
              type="number" 
              v-model="investmentAmount"
              class="input-field pl-9"
              min="0"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Harga Saat Ini</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{{ currency === 'IDR' ? 'Rp' : '$' }}</span>
              <input 
                type="number" 
                v-model="currentPrice"
                class="input-field pl-9"
                min="0"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Harga Target</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{{ currency === 'IDR' ? 'Rp' : '$' }}</span>
              <input 
                type="number" 
                v-model="targetPrice"
                class="input-field pl-9"
                min="0"
              />
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Satuan Berat</label>
          <div class="flex bg-dark-700 rounded-lg p-1">
            <button 
              @click="weightUnit = 'oz'"
              class="flex-1 py-1.5 text-sm font-medium rounded-md transition-colors"
              :class="weightUnit === 'oz' ? 'bg-gold-500 text-dark-900 shadow' : 'text-gray-400 hover:text-white'"
            >
              Troy Oz
            </button>
            <button 
              @click="weightUnit = 'gram'"
              class="flex-1 py-1.5 text-sm font-medium rounded-md transition-colors"
              :class="weightUnit === 'gram' ? 'bg-gold-500 text-dark-900 shadow' : 'text-gray-400 hover:text-white'"
            >
              Gram
            </button>
          </div>
        </div>
      </div>

      <div class="bg-dark-900/50 rounded-xl p-6 border border-dark-700 flex flex-col justify-center">
        <div class="mb-4">
          <p class="text-sm text-gray-400 mb-1">Estimasi Berat Emas</p>
          <p class="text-2xl font-bold text-white">
            {{ estimatedWeight.toFixed(4) }} <span class="text-lg text-gold-500 font-normal">{{ weightUnit }}</span>
          </p>
        </div>

        <div class="w-full h-px bg-gradient-to-r from-transparent via-dark-700 to-transparent my-4"></div>

        <div class="mb-4">
          <p class="text-sm text-gray-400 mb-1">Proyeksi Nilai Aset</p>
          <p class="text-3xl font-bold text-white break-words">
            {{ formatPrice(estimatedValue) }}
          </p>
        </div>

        <div class="flex items-center gap-4 mt-2">
          <div class="flex-1">
            <p class="text-xs text-gray-500 mb-1">Untung/Rugi</p>
            <p class="font-semibold flex items-center gap-1 break-words" :class="profitMargin >= 0 ? 'text-green-400' : 'text-red-400'">
              <TrendingUp v-if="profitMargin >= 0" class="w-4 h-4 shrink-0" />
              <ArrowRight v-else class="w-4 h-4 rotate-45 shrink-0" />
              {{ formatPrice(Math.abs(profitMargin)) }}
            </p>
          </div>
          <div class="flex-1 border-l border-dark-700 pl-4">
            <p class="text-xs text-gray-500 mb-1">Pengembalian (ROI)</p>
            <p class="font-semibold" :class="profitPercentage >= 0 ? 'text-green-400' : 'text-red-400'">
              {{ profitPercentage >= 0 ? '+' : '' }}{{ profitPercentage.toFixed(2) }}%
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
