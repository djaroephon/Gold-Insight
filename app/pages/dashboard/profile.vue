<script setup lang="ts">
import { User, Mail, Shield, Bell } from '@lucide/vue'

definePageMeta({
  layout: 'dashboard'
})

const auth = useAuth()
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
        
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Nama Lengkap</label>
              <input type="text" class="input-field bg-dark-900 border-dark-700" :value="auth.user.value?.name" disabled />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Alamat Email</label>
              <div class="relative">
                <Mail class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" class="input-field bg-dark-900 border-dark-700 pl-9" :value="auth.user.value?.email" disabled />
              </div>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">
            * Informasi profil saat ini dikelola melalui penyedia otentikasi eksternal.
          </p>
        </div>
      </div>

      <div class="card p-6 border-dark-700 opacity-60">
        <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield class="w-5 h-5 text-gold-500" />
          Pengaturan Keamanan
        </h3>
        
        <div class="flex items-center justify-between py-3 border-b border-dark-700">
          <div>
            <p class="font-medium text-white">Otentikasi Dua Faktor (2FA)</p>
            <p class="text-sm text-gray-400">Tambahkan lapisan keamanan ekstra ke akun kamu.</p>
          </div>
          <button class="btn-outline text-sm py-1.5 px-3 opacity-50 cursor-not-allowed">Aktifkan</button>
        </div>
        
        <div class="flex items-center justify-between py-3">
          <div>
            <p class="font-medium text-white">Ubah Kata Sandi</p>
            <p class="text-sm text-gray-400">Perbarui kata sandi kamu secara berkala agar tetap aman.</p>
          </div>
          <button class="btn-outline text-sm py-1.5 px-3 opacity-50 cursor-not-allowed">Perbarui</button>
        </div>
      </div>

      <div class="card p-6 border-dark-700 opacity-60">
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
      </div>
    </div>
  </div>
</template>
