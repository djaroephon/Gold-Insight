<script setup lang="ts">
import { LayoutDashboard, BrainCircuit, Calculator, Settings, LogOut, Coins, X } from '@lucide/vue'

defineProps<{
  isOpen?: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

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
  <aside 
    class="fixed inset-y-0 left-0 w-64 bg-dark-800 border-r border-dark-700 h-screen flex flex-col transition-transform duration-300 ease-in-out z-50
      md:sticky md:top-0 md:translate-x-0 md:flex shrink-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="h-16 flex items-center justify-between px-6 border-b border-dark-700">
      <NuxtLink to="/" class="flex items-center group gap-2" @click="$emit('close')">
        <img src="@/assets/images/logo.png" alt="Gold Insight Logo" class="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,215,0,0.2)] transition-transform duration-300 group-hover:scale-105" />
        <span class="font-bold text-base bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent relative z-10">
          Gold Insight
        </span>
      </NuxtLink>

      <!-- Close Button for Mobile Drawer -->
      <button @click="$emit('close')" class="md:hidden text-gray-400 hover:text-white p-1 rounded-md border border-dark-700 bg-dark-900/30 cursor-pointer" aria-label="Tutup Menu">
        <X class="w-4 h-4" />
      </button>
    </div>

    <nav class="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
      <NuxtLink 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path"
        @click="$emit('close')"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200"
        :class="route.path === item.path ? 'bg-gold-500/10 text-gold-400' : 'text-gray-400 hover:bg-dark-700 hover:text-gray-200'"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="font-medium text-sm">{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <div class="p-4 border-t border-dark-700">
      <button 
        @click="handleLogout(); $emit('close')"
        class="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200 cursor-pointer"
      >
        <LogOut class="w-5 h-5" />
        <span class="font-medium text-sm">Keluar</span>
      </button>
    </div>
  </aside>
</template>
