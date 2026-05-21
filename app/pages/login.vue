<script setup lang="ts">
import { ref } from 'vue'
import { Coins, LogIn, Loader2 } from '@lucide/vue'

definePageMeta({
  layout: 'default'
})

const auth = useAuth()
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  await auth.login()
  loading.value = false
  navigateTo('/dashboard')
}
</script>

<template>
  <div class="min-h-[calc(100vh-140px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    
    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="flex justify-center">
        <div class="p-3 bg-gold-500/10 rounded-2xl border border-gold-500/20">
          <Coins class="w-12 h-12 text-gold-500" />
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
        Selamat Datang Kembali
      </h2>
      <p class="mt-2 text-center text-sm text-gray-400">
        Masuk untuk mengakses dasbor dan rekomendasi AI kamu.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="bg-dark-800 py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-dark-700">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300">
              Alamat Email
            </label>
            <div class="mt-1">
              <input 
                id="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                v-model="email"
                class="input-field" 
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-300">
              Kata Sandi
            </label>
            <div class="mt-1">
              <input 
                id="password" 
                name="password" 
                type="password" 
                autocomplete="current-password" 
                required 
                v-model="password"
                class="input-field" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-gold-500 focus:ring-gold-500 border-gray-700 rounded bg-dark-900" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-400">
                Ingat saya
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-gold-500 hover:text-gold-400">
                Lupa kata sandi?
              </a>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-dark-900 bg-gold-500 hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 focus:ring-gold-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              :disabled="loading"
            >
              <template v-if="loading">
                <Loader2 class="w-5 h-5 animate-spin mr-2" />
                Memproses...
              </template>
              <template v-else>
                <LogIn class="w-5 h-5 mr-2" />
                Masuk
              </template>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-dark-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-dark-800 text-gray-500">
                API Backend sedang dalam pengerjaan
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
