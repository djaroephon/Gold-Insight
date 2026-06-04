<script setup lang="ts">
import { ref } from 'vue'
import { Coins, LogIn, LogOut, LayoutDashboard, Globe, Menu, X, User } from '@lucide/vue'

const auth = useAuth()
const { currency, toggleCurrency } = useCurrency()

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleLogout = () => {
  auth.logout()
  navigateTo('/')
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full backdrop-blur-md bg-dark-900/80 border-b border-dark-700 shadow-sm">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center group py-2 gap-2.5">
        <img src="@/assets/images/logo.png" alt="Gold Insight Logo" class="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.2)] transition-transform duration-300 group-hover:scale-105" />
        <span class="text-lg sm:text-xl font-bold bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent relative z-10">
          Gold Insight
        </span>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink to="/" class="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors">Beranda</NuxtLink>
        <a href="#prediction" class="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors">Prediksi</a>
        <a href="#calculator" class="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors">Kalkulator</a>
        <a href="#team" class="text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors">Tim Kami</a>
      </nav>

      <div class="hidden md:flex items-center gap-4">
        <button @click="toggleCurrency" class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dark-700 text-sm font-medium text-gray-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors cursor-pointer">
          <Globe class="w-4 h-4" />
          {{ currency }}
        </button>

        <template v-if="!auth.isAuthenticated.value">
          <NuxtLink to="/login" class="btn-primary flex items-center gap-2 py-1.5 text-sm">
            <LogIn class="w-4 h-4" />
            <span>Masuk</span>
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/dashboard" class="btn-outline flex items-center gap-2 py-1.5 text-sm">
            <LayoutDashboard class="w-4 h-4" />
            <span>Dasbor</span>
          </NuxtLink>
          <NuxtLink to="/profile" class="btn-outline flex items-center gap-2 py-1.5 text-sm">
            <User class="w-4 h-4" />
            <span>Profil</span>
          </NuxtLink>
          <button @click="handleLogout" class="text-gray-400 hover:text-red-400 transition-colors p-2 cursor-pointer" title="Keluar">
            <LogOut class="w-5 h-5" />
          </button>
        </template>
      </div>

      <!-- Hamburger Menu Button for Mobile -->
      <div class="flex items-center md:hidden">
        <button @click="toggleMobileMenu" class="text-gray-400 hover:text-white p-2 rounded-lg focus:outline-none transition-colors border border-dark-700 bg-dark-800/40 cursor-pointer" :aria-label="isMobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'">
          <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
          <X v-else class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Overlay with custom transitions -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-show="isMobileMenuOpen" class="md:hidden border-t border-dark-700 bg-dark-900/95 backdrop-blur-lg px-6 py-6 shadow-xl space-y-5">
        <nav class="flex flex-col gap-3">
          <NuxtLink to="/" @click="isMobileMenuOpen = false" class="text-base font-medium text-gray-300 hover:text-gold-400 transition-colors py-2 border-b border-dark-800/50">Beranda</NuxtLink>
          <a href="#prediction" @click="isMobileMenuOpen = false" class="text-base font-medium text-gray-300 hover:text-gold-400 transition-colors py-2 border-b border-dark-800/50">Prediksi</a>
          <a href="#calculator" @click="isMobileMenuOpen = false" class="text-base font-medium text-gray-300 hover:text-gold-400 transition-colors py-2 border-b border-dark-800/50">Kalkulator</a>
          <a href="#team" @click="isMobileMenuOpen = false" class="text-base font-medium text-gray-300 hover:text-gold-400 transition-colors py-2 border-b border-dark-800/50">Tim Kami</a>
        </nav>

        <div class="pt-2 flex flex-col gap-3">
          <button @click="toggleCurrency" class="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-dark-700 text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors cursor-pointer bg-dark-800/20">
            <Globe class="w-4 h-4 text-gold-500" />
            <span>Mata Uang: {{ currency }}</span>
          </button>

          <template v-if="!auth.isAuthenticated.value">
            <NuxtLink to="/login" @click="isMobileMenuOpen = false" class="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm">
              <LogIn class="w-4 h-4" />
              <span>Masuk Ke Akun</span>
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/dashboard" @click="isMobileMenuOpen = false" class="btn-outline w-full flex items-center justify-center gap-2 py-2.5 text-sm">
              <LayoutDashboard class="w-4 h-4" />
              <span>Kembali Ke Dasbor</span>
            </NuxtLink>
            <NuxtLink to="/profile" @click="isMobileMenuOpen = false" class="btn-outline w-full flex items-center justify-center gap-2 py-2.5 text-sm">
              <User class="w-4 h-4" />
              <span>Profil Saya</span>
            </NuxtLink>
            <button @click="handleLogout(); isMobileMenuOpen = false" class="w-full btn-outline border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center justify-center gap-2 py-2.5 text-sm cursor-pointer">
              <LogOut class="w-4 h-4" />
              <span>Keluar Akun</span>
            </button>
          </template>
        </div>
      </div>
    </transition>
  </header>
</template>
