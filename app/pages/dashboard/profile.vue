<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { User, Mail, Shield, Bell, Loader2, Save } from '@lucide/vue'

definePageMeta({
  layout: 'dashboard'
})

const auth = useAuth()

const name = ref('')
const email = ref('')
const newPassword = ref('')

const loadingProfile = ref(false)
const loadingPassword = ref(false)
const profileMessage = ref('')
const profileError = ref('')
const passwordMessage = ref('')
const passwordError = ref('')

onMounted(() => {
  if (auth.user.value) {
    name.value = auth.user.value?.user_metadata?.name || auth.user.value?.name || ''
    email.value = auth.user.value?.email || ''
  }
})

const handleUpdateProfile = async () => {
  loadingProfile.value = true
  profileMessage.value = ''
  profileError.value = ''

  const result = await auth.updateProfile({ name: name.value, email: email.value })

  loadingProfile.value = false

  if (result.success) {
    profileMessage.value = 'Profil berhasil diperbarui.'
    setTimeout(() => { profileMessage.value = '' }, 3000)
  } else {
    profileError.value = result.message || 'Gagal memperbarui profil.'
  }
}

const handleUpdatePassword = async () => {
  if (!newPassword.value || newPassword.value.length < 6) {
    passwordError.value = 'Kata sandi baru minimal 6 karakter.'
    setTimeout(() => { passwordError.value = '' }, 3000)
    return
  }

  loadingPassword.value = true
  passwordMessage.value = ''
  passwordError.value = ''

  const result = await auth.updateProfile({ password: newPassword.value })

  loadingPassword.value = false

  if (result.success) {
    passwordMessage.value = 'Kata sandi berhasil diperbarui.'
    newPassword.value = ''
    setTimeout(() => { passwordMessage.value = '' }, 3000)
  } else {
    passwordError.value = result.message || 'Gagal memperbarui kata sandi.'
  }
}
</script>

<template>
  <div>
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Pengaturan Profil</h1>
      <p class="text-gray-400">Kelola preferensi dan informasi akun kamu.</p>
    </header>

    <div class="max-w-3xl grid gap-6">
      <div class="card p-6 border-dark-700">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <User class="w-5 h-5 text-gold-500" />
          Informasi Pribadi
        </h3>
        
        <form @submit.prevent="handleUpdateProfile" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Nama Lengkap</label>
              <input type="text" v-model="name" class="input-field bg-dark-900 border-dark-700" placeholder="Nama Lengkap" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Alamat Email</label>
              <div class="relative">
                <Mail class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" v-model="email" class="input-field bg-dark-900 border-dark-700 pl-9" placeholder="email@example.com" />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between mt-4">
            <div>
              <p v-if="profileMessage" class="text-sm text-green-500">{{ profileMessage }}</p>
              <p v-if="profileError" class="text-sm text-red-500">{{ profileError }}</p>
            </div>
            <button 
              type="submit" 
              class="btn-primary flex items-center gap-2 py-2 px-4 rounded-lg bg-gold-500 text-dark-900 font-bold hover:bg-gold-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              :disabled="loadingProfile"
            >
              <Loader2 v-if="loadingProfile" class="w-4 h-4 animate-spin" />
              <Save v-else class="w-4 h-4" />
              Simpan Profil
            </button>
          </div>
        </form>
      </div>

      <div class="card p-6 border-dark-700">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield class="w-5 h-5 text-gold-500" />
          Pengaturan Keamanan
        </h3>
           
        <form @submit.prevent="handleUpdatePassword" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Kata Sandi Baru</label>
            <input type="password" v-model="newPassword" class="input-field bg-dark-900 border-dark-700" placeholder="Minimal 6 karakter" />
            <p class="text-sm text-gray-400 mt-1">Perbarui kata sandi kamu secara berkala agar tetap aman.</p>
          </div>

          <div class="flex items-center justify-between mt-4">
            <div>
              <p v-if="passwordMessage" class="text-sm text-green-500">{{ passwordMessage }}</p>
              <p v-if="passwordError" class="text-sm text-red-500">{{ passwordError }}</p>
            </div>
            <button 
              type="submit" 
              class="btn-outline flex items-center gap-2 py-2 px-4 border border-gold-500 text-gold-500 rounded-lg font-bold hover:bg-gold-500 hover:text-dark-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              :disabled="loadingPassword"
            >
              <Loader2 v-if="loadingPassword" class="w-4 h-4 animate-spin" />
              Perbarui Sandi
            </button>
          </div>
        </form>
      </div>

      <!-- <div class="card p-6 border-dark-700 opacity-60">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Bell class="w-5 h-5 text-gold-500" />
          Notifikasi
        </h3>
        
        <div class="space-y-4">
          <label class="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked disabled class="mt-1 bg-dark-900 border-dark-700 rounded text-gold-500 focus:ring-gold-500 opacity-50" />
            <div>
              <p class="font-medium text-white">Peringatan Harga</p>
              <p class="text-sm text-gray-400">Dapatkan notifikasi ketika harga emas mencapai targetmu.</p>
            </div>
          </label>
          <label class="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked disabled class="mt-1 bg-dark-900 border-dark-700 rounded text-gold-500 focus:ring-gold-500 opacity-50" />
            <div>
              <p class="font-medium text-white">Perubahan Rekomendasi SPK</p>
              <p class="text-sm text-gray-400">Terima email saat rekomendasi AI berubah (misalnya dari Tahan ke Beli).</p>
            </div>
          </label>
        </div>
      </div> -->
    </div>
  </div>
</template>
