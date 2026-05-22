<script setup lang="ts">
import { Coins, LogIn, LogOut, LayoutDashboard, Globe } from '@lucide/vue'

const auth = useAuth()
const { currency, toggleCurrency } = useCurrency()

const handleLogout = () => {
  auth.logout()
  navigateTo('/')
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full backdrop-blur-md bg-dark-900/80 border-b border-dark-700 shadow-sm">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center group py-2">
        <img src="@/assets/images/logo.png" alt="Gold Insight Logo" class="h-12 sm:h-20 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.2)] transition-transform duration-300 group-hover:scale-105 -mr-4 sm:-mr-5" />
        <span class="text-xl font-bold bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent hidden sm:block relative z-10">
          Gold Insight
        </span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink to="/" class="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors">Beranda</NuxtLink>
        <a href="#prediction" class="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors">Prediksi</a>
        <a href="#calculator" class="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors">Kalkulator</a>
        <a href="#team" class="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors">Tim Kami</a>
      </nav>

      <div class="flex items-center gap-4">
        <button @click="toggleCurrency" class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dark-700 text-sm font-medium text-gray-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors">
          <Globe class="w-4 h-4" />
          {{ currency }}
        </button>

        <template v-if="!auth.isAuthenticated.value">
          <NuxtLink to="/login" class="btn-primary flex items-center gap-2">
            <LogIn class="w-4 h-4" />
            <span>Masuk</span>
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/dashboard" class="btn-outline flex items-center gap-2 py-1.5 text-sm">
            <LayoutDashboard class="w-4 h-4" />
            <span>Dasbor</span>
          </NuxtLink>
          <button @click="handleLogout" class="text-gray-400 hover:text-red-400 transition-colors p-2" title="Keluar">
            <LogOut class="w-5 h-5" />
          </button>
        </template>
      </div>
    </div>
  </header>
</template>
