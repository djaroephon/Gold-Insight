<script setup lang="ts">
import { ref, computed } from 'vue'
import { Coins, UserPlus, Loader2, Eye, EyeOff } from '@lucide/vue'

definePageMeta({
  layout: 'default'
})

const auth = useAuth()
const name = ref('')
const email = ref('')
const password = ref('')
const address = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const passwordStrength = computed(() => {
  const pw = password.value
  if (!pw) return { score: 0, label: '', color: 'bg-dark-700' }
  
  let score = 0
  if (pw.length >= 8) score += 1
  if (/[A-Z]/.test(pw)) score += 1
  if (/[0-9]/.test(pw)) score += 1
  if (/[^A-Za-z0-9]/.test(pw)) score += 1

  if (score <= 1) return { score, label: 'Lemah', color: 'bg-red-500', textColor: 'text-red-500' }
  if (score <= 2) return { score, label: 'Sedang', color: 'bg-yellow-500', textColor: 'text-yellow-500' }
  return { score, label: 'Kuat', color: 'bg-green-500', textColor: 'text-green-500' }
})

const handleRegister = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  const result = await auth.register({
    name: name.value,
    email: email.value,
    password: password.value,
    address: address.value
  })
  
  loading.value = false
  
  if (result.success) {
    successMessage.value = 'Registrasi berhasil! Mengalihkan ke halaman login...'
    setTimeout(() => {
      navigateTo('/login')
    }, 2000)
  } else {
    errorMessage.value = result.message || 'Registrasi gagal, periksa kembali data Anda.'
  }
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
        Daftar Akun Baru
      </h2>
      <p class="mt-2 text-center text-sm text-gray-400">
        Bergabunglah untuk mendapatkan insight emas terbaik.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      <div class="bg-dark-800 py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-dark-700">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300">
              Nama Lengkap
            </label>
            <div class="mt-1">
              <input 
                id="name" 
                name="name" 
                type="text" 
                required 
                v-model="name"
                class="input-field" 
                placeholder="Nama Anda"
              />
            </div>
          </div>

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
            <div class="mt-1 relative">
              <input 
                id="password" 
                name="password" 
                :type="showPassword ? 'text' : 'password'" 
                autocomplete="new-password" 
                required 
                v-model="password"
                class="input-field pr-10" 
                placeholder="••••••••"
              />
              <button 
                type="button" 
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gold-500"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="!showPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
            
            <div v-if="password" class="mt-2 flex items-center gap-2">
              <div class="flex-1 h-1.5 flex gap-1 rounded-full overflow-hidden">
                <div class="h-full flex-1 transition-colors duration-300" :class="passwordStrength.score >= 1 ? passwordStrength.color : 'bg-dark-700'"></div>
                <div class="h-full flex-1 transition-colors duration-300" :class="passwordStrength.score >= 2 ? passwordStrength.color : 'bg-dark-700'"></div>
                <div class="h-full flex-1 transition-colors duration-300" :class="passwordStrength.score >= 3 ? passwordStrength.color : 'bg-dark-700'"></div>
              </div>
              <span class="text-xs font-medium w-12 text-right" :class="passwordStrength.textColor">{{ passwordStrength.label }}</span>
            </div>
          </div>

          <div>
            <label for="address" class="block text-sm font-medium text-gray-300">
              Alamat
            </label>
            <div class="mt-1">
              <textarea 
                id="address" 
                name="address" 
                required 
                v-model="address"
                class="input-field min-h-[80px] resize-y" 
                placeholder="Alamat lengkap"
              ></textarea>
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
                <UserPlus class="w-5 h-5 mr-2" />
                Daftar
              </template>
            </button>
          </div>
          
          <div v-if="errorMessage" class="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
            {{ errorMessage }}
          </div>
          
          <div v-if="successMessage" class="p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm text-center">
            {{ successMessage }}
          </div>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-400">
            Sudah punya akun?
            <NuxtLink to="/login" class="font-medium text-gold-500 hover:text-gold-400">
              Masuk
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
