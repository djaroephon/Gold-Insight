<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Globe, Menu } from '@lucide/vue'

const auth = useAuth()
const { currency, toggleCurrency } = useCurrency()

const isSidebarOpen = ref(false)

onMounted(() => {
  if (!auth.token.value) {
    navigateTo('/login')
  }
})
</script>

<template>
  <div class="flex min-h-screen bg-dark-900 text-white overflow-x-hidden">
    <!-- Backdrop for Mobile Sidebar -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
    ></div>

    <!-- Sidebar component with reactive open/close -->
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Main Content Area -->
    <main class="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
      <div class="sticky top-0 z-30 bg-dark-900/80 backdrop-blur-md border-b border-dark-700 h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 shrink-0">
        <!-- Hamburger Menu to Toggle Sidebar on Mobile -->
        <button @click="isSidebarOpen = true" class="md:hidden text-gray-400 hover:text-white p-2 rounded-lg border border-dark-700 bg-dark-800/40 focus:outline-none transition-colors cursor-pointer" aria-label="Buka Menu Dasbor">
          <Menu class="w-5 h-5" />
        </button>

        <div class="flex items-center gap-3 sm:gap-4 ml-auto">
          <span class="text-xs sm:text-sm text-gray-400">Mata Uang:</span>
          <button @click="toggleCurrency" class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dark-700 bg-dark-800 text-sm font-medium text-gray-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors cursor-pointer">
            <Globe class="w-4 h-4" />
            {{ currency }}
          </button>
        </div>
      </div>
      
      <!-- Slot for Dashboard Pages -->
      <div class="p-4 sm:p-6 md:p-8 flex-1">
        <slot />
      </div>
    </main>
  </div>
</template>
