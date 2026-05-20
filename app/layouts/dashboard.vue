<script setup lang="ts">
import { Globe } from '@lucide/vue'

const auth = useAuth()
const { currency, toggleCurrency } = useCurrency()

onMounted(() => {
  if (!auth.isAuthenticated.value) {
    navigateTo('/login')
  }
})
</script>

<template>
  <div class="flex min-h-screen bg-dark-900 text-white">
    <Sidebar />
    <main class="flex-1 overflow-y-auto">
      <div class="sticky top-0 z-40 bg-dark-900/80 backdrop-blur-md border-b border-dark-700 h-16 flex items-center justify-end px-8">
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-400">Mata Uang:</span>
          <button @click="toggleCurrency" class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dark-700 bg-dark-800 text-sm font-medium text-gray-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors">
            <Globe class="w-4 h-4" />
            {{ currency }}
          </button>
        </div>
      </div>
      <div class="p-8">
        <slot />
      </div>
    </main>
  </div>
</template>
