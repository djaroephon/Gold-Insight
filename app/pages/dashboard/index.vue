<script setup lang="ts">
import { TrendingUp, ArrowUpRight, DollarSign } from '@lucide/vue'

definePageMeta({
  layout: 'dashboard'
})

const auth = useAuth()
const { formatPrice } = useCurrency()
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Selamat datang kembali, {{ auth.user.value?.user_metadata?.name || auth.user.value?.name || 'Investor' }}</h1>
      <p class="text-gray-400">Berikut adalah ringkasan Pasar Emas harianmu.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card p-6 border-l-4 border-l-gold-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-gray-400 mb-1">Harga Saat Ini</p>
            <h3 class="text-2xl font-bold text-white break-words">{{ formatPrice(4500.70) }}</h3>
          </div>
          <div class="p-2 bg-gold-500/10 rounded-lg">
            <DollarSign class="w-5 h-5 text-gold-500" />
          </div>
        </div>
        <div class="mt-4 flex items-center text-sm">
          <TrendingUp class="w-4 h-4 text-green-400 mr-1" />
          <span class="text-green-400 font-medium">+1.2%</span>
          <span class="text-gray-500 ml-2">dari kemarin</span>
        </div>
      </div>
      
      <div class="card p-6 border-l-4 border-l-blue-500">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-gray-400 mb-1">Target 7 Hari</p>
            <h3 class="text-2xl font-bold text-white break-words">{{ formatPrice(4582.63) }}</h3>
          </div>
          <div class="p-2 bg-blue-500/10 rounded-lg">
            <ArrowUpRight class="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <div class="mt-4 flex items-center text-sm">
          <TrendingUp class="w-4 h-4 text-green-400 mr-1" />
          <span class="text-green-400 font-medium">+1.82%</span>
          <span class="text-gray-500 ml-2">proyeksi pertumbuhan</span>
        </div>
      </div>

      <div class="card p-6 border-l-4 border-l-green-500 bg-gradient-to-br from-dark-800 to-green-900/20">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-green-400/80 mb-1">Status Sistem AI</p>
            <h3 class="text-2xl font-bold text-white">Aktif</h3>
          </div>
          <div class="relative flex h-3 w-3 mt-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
        </div>
        <div class="mt-4">
          <NuxtLink to="/dashboard/spk" class="text-sm text-green-400 hover:text-green-300 font-medium underline-offset-4 hover:underline">
            Lihat Rekomendasi &rarr;
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <PredictionChart />
    </div>
  </div>
</template>
