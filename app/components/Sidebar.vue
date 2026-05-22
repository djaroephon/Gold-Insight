<script setup lang="ts">
import { LayoutDashboard, BrainCircuit, Calculator, Settings, LogOut, Coins } from '@lucide/vue'

const route = useRoute()
const auth = useAuth()

const navItems = [
  { name: 'Ringkasan', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Rekomendasi SPK', path: '/dashboard/spk', icon: BrainCircuit },
  { name: 'Kalkulator Emas', path: '/dashboard/calc', icon: Calculator },
  { name: 'Pengaturan Profil', path: '/dashboard/profile', icon: Settings },
]

const handleLogout = () => {
  auth.logout()
  navigateTo('/')
}
</script>

<template>
  <aside class="w-64 bg-dark-800 border-r border-dark-700 h-screen sticky top-0 flex flex-col">
    <div class="h-16 flex items-center px-6 border-b border-dark-700">
      <NuxtLink to="/" class="flex items-center group">
        <img src="@/assets/images/logo.png" alt="Gold Insight Logo" class="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.2)] transition-transform duration-300 group-hover:scale-105 -mr-4 sm:-mr-8" />
        <span class="font-bold text-lg bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent relative z-10">
          Gold Insight
        </span>
      </NuxtLink>
    </div>

    <nav class="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
      <NuxtLink 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200"
        :class="route.path === item.path ? 'bg-gold-500/10 text-gold-400' : 'text-gray-400 hover:bg-dark-700 hover:text-gray-200'"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="font-medium text-sm">{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <div class="p-4 border-t border-dark-700">
      <button 
        @click="handleLogout"
        class="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200"
      >
        <LogOut class="w-5 h-5" />
        <span class="font-medium text-sm">Keluar</span>
      </button>
    </div>
  </aside>
</template>
