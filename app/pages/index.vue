<script setup lang="ts">
import { ArrowRight, BarChart3, Calculator, BrainCircuit, Globe } from '@lucide/vue'
import vina from '../assets/images/members/vina.jpeg'
import nabil from '../assets/images/members/nabil.jpeg'
import vita from '../assets/images/members/vita.jpeg'
import anggi from '../assets/images/members/anggi.jpeg'
import djohan from '../assets/images/members/johan.jpeg'
import sabia from '../assets/images/members/sabia.jpeg'

definePageMeta({
  layout: 'default'
})

// Data Tim 
const teamMembers = [
  { id: 1, name: 'Vina Widiasari', role: 'Data Scientist', univ: 'Universitas Jenderal Soedirman', image: vina, website: 'https://github.com/vinawidiasari', instagram: 'https://www.instagram.com/vnn.aaa/', linkedin: 'www.linkedin.com/in/vina-widiasari' },
  { id: 2, name: 'Djaroephon Djohan Syuhada', role: 'Fullstack Developer', univ: 'Universitas Ubudiyah Indonesia', image: djohan, website: 'https://zettia.my.id/', instagram: 'https://www.instagram.com/djaroephon.1746/', linkedin: 'www.linkedin.com/in/djaroephon-djohan-syuhada' },
  { id: 3, name: 'Nurvita Win Pratiwi', role: 'AI Engineer', univ: 'Universitas Jenderal Soedirman', image: vita, website: '#', instagram: 'https://www.instagram.com/nurvitawpr?igsh=MWNoZTY3OHluamtkZg==', linkedin: 'https://www.linkedin.com/in/nurvita-win-pratiwi-579b082b3 ' },
  { id: 4, name: 'Sabia Putri Aulia', role: 'Data Scientist', univ: 'Universitas Jenderal Soedirman', image: sabia, website: 'https://github.com/sabibu12', instagram: 'https://www.instagram.com/_ptrs95?igsh=cDZvcTlveDdhenQ3', linkedin: 'https://www.linkedin.com/in/sabia-putri-aulia-b8615a3ab?' },
  { id: 5, name: 'Nabil Aditia Putra', role: 'Fullstack Developer', univ: 'Universitas Serambi Mekkah', image: nabil, website: 'https://nvitech.meukarya.my.id/', instagram:'https://www.instagram.com/nabildtya', linkedin: 'https://www.linkedin.com/in/nabiladitiaputra/' },
  { id: 6, name: 'Anggi Nur Pratama', role: 'AI Engineer', univ: 'Universitas Jenderal Soedirman', image: anggi, website: 'https://github.com/hellohopes', instagram: 'https://www.instagram.com/anggipratmaa', linkedin: 'https://www.linkedin.com/in/anggi-nur-pratama/' }
]
</script>

<template>
  <div>
    <section class="relative min-h-[90vh] flex items-center overflow-hidden">
      <div class="absolute inset-0 bg-dark-900 -z-20"></div>
      <div class="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-dark-900 to-transparent -z-10 animate-pulse" style="animation-duration: 8s;"></div>
      <div class="absolute -bottom-1/2 -left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-700/5 via-dark-900 to-transparent -z-10 rounded-full blur-[120px]"></div>
      <div class="container mx-auto px-4 py-20 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div class="max-w-2xl text-left">
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              Navigasi Masa Depan <br />
              <span class="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 bg-clip-text text-transparent filter drop-shadow-lg">Investasi Emas</span>
            </h1>
            
            <p class="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-light">
              Manfaatkan kekuatan model AI Time-Series tingkat lanjut untuk memproyeksikan harga emas, mengoptimalkan portofolio, dan membuat keputusan investasi berbasis data yang cerdas.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
              <NuxtLink to="/login" class="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center text-lg px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all transform hover:-translate-y-1">
                Mulai Sekarang
                <ArrowRight class="w-5 h-5" />
              </NuxtLink>
              <a href="#prediction" class="btn-outline flex items-center gap-2 w-full sm:w-auto justify-center text-lg px-8 py-4 rounded-xl transition-all transform hover:-translate-y-1 bg-dark-900/50 backdrop-blur-sm">
                Lihat Grafik
                <BarChart3 class="w-5 h-5" />
              </a>
            </div>
          </div>

          <div class="relative hidden lg:block">
            <div class="absolute inset-0 bg-gold-500 rounded-full blur-[120px] opacity-20 animate-pulse" style="animation-duration: 4s;"></div>
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-dark-700/50 ">
              <div class="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10"></div>
              <img src="@/assets/images/gold_alt.png" alt="Gold Investment Dashboard" class="w-full h-[500px] object-cover scale-105" />
            </div>  
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 border-t border-dark-700/50 bg-dark-800/20 relative">
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Fitur Unggulan</h2>
          <p class="text-gray-400 max-w-2xl mx-auto">Tiga pilar utama Gold Insight untuk membantu kamu meraih keuntungan maksimal.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div class="card p-8 border border-dark-700 bg-gradient-to-b from-dark-800 to-dark-900 hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-2 group">
            <div class="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-dark-900 transition-colors">
              <BarChart3 class="w-7 h-7 text-gold-500 group-hover:text-dark-900 transition-colors" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Prediksi Time-Series</h3>
            <p class="text-gray-400 leading-relaxed">
              Model AI canggih yang menganalisis data historis untuk memprakirakan harga emas hingga 7 hari ke depan dengan tingkat akurasi tinggi.
            </p>
          </div>
          
          <div class="card p-8 border border-dark-700 bg-gradient-to-b from-dark-800 to-dark-900 hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-2 group">
            <div class="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-dark-900 transition-colors">
              <BrainCircuit class="w-7 h-7 text-gold-500 group-hover:text-dark-900 transition-colors" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Sistem Rekomendasi (SPK)</h3>
            <p class="text-gray-400 leading-relaxed">
              Rekomendasi Beli, Tahan, atau Jual otomatis berdasarkan perhitungan algoritmik kompleks dari momentum jangka pendek dan panjang.
            </p>
          </div>
          
          <div class="card p-8 border border-dark-700 bg-gradient-to-b from-dark-800 to-dark-900 hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-2 group">
            <div class="w-14 h-14 bg-gold-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-dark-900 transition-colors">
              <Calculator class="w-7 h-7 text-gold-500 group-hover:text-dark-900 transition-colors" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">Kalkulator Investasi</h3>
            <p class="text-gray-400 leading-relaxed">
              Alat simulasi interaktif untuk menghitung estimasi margin keuntungan kamu berdasarkan modal awal dan harga target prediksi AI.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="prediction" class="py-24">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Prediksi Pasar Langsung</h2>
            <p class="text-gray-400 max-w-2xl mx-auto">Lihat proyeksi model AI kami untuk beberapa hari ke depan berdasarkan penutupan pasar terbaru.</p>
          </div>
          <div class="rounded-2xl p-1 bg-gradient-to-b from-gold-500/20 to-transparent">
            <div class="bg-dark-900 rounded-xl rounded-t-[14px]">
              <PredictionChart />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="calculator" class="py-24 bg-dark-800/30 border-t border-dark-700/50">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Simulasikan Investasimu</h2>
            <p class="text-gray-400 max-w-2xl mx-auto">Gunakan kalkulator kami untuk memperkirakan potensi pengembalian (ROI) berdasarkan harga target yang diprediksi AI.</p>
          </div>
          <div class="rounded-2xl p-1 bg-gradient-to-b from-dark-700 to-transparent">
            <div class="bg-dark-900 rounded-xl rounded-t-[14px]">
              <GoldCalculator />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="team" class="py-24 border-t border-dark-700/50 bg-gradient-to-b from-dark-900 to-dark-800">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <div class="inline-flex items-center justify-center p-3 bg-gold-500/10 rounded-full mb-4">
            <BrainCircuit class="w-6 h-6 text-gold-500" />
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Tim Pengembang Gold Insight</h2>
          <p class="text-gray-400 max-w-2xl mx-auto">Proyek ini merupakan hasil kolaborasi inovatif dari peserta Coding Camp yang berdedikasi.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div v-for="member in teamMembers" :key="member.id" class="card bg-dark-800/40 backdrop-blur-sm border-dark-700 p-8 flex flex-col items-center text-center hover:border-gold-500/50 transition-all duration-300 transform hover:-translate-y-2 group shadow-xl">
            <div class="relative w-32 h-32 mb-6">
              <div class="absolute inset-0 bg-gold-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img :src="member.image" :alt="member.name" class="relative w-full h-full object-cover rounded-full border-4 border-dark-800 group-hover:border-gold-500 shadow-2xl transition-colors duration-300" />
            </div>
            
            <h3 class="text-xl font-bold text-white mb-1 group-hover:text-gold-400 transition-colors">{{ member.name }}</h3>
            <p class="text-sm font-semibold text-gold-500 mb-3 px-3 py-1 bg-gold-500/10 rounded-full">{{ member.role }}</p>
            <p class="text-sm text-gray-400 mb-6 flex-1">{{ member.univ }}</p>
            
            <div class="flex gap-4 mt-auto pt-4 border-t border-dark-700/50 w-full justify-center">
              <a :href="member.website" target="_blank" class="p-2 rounded-full bg-dark-700 text-gray-400 hover:text-white hover:bg-gold-500 transition-colors shadow-sm"><Globe class="w-4 h-4" /></a>
              <a :href="member.instagram" target="_blank" class="p-2 rounded-full bg-dark-700 text-gray-400 hover:text-white hover:bg-gold-500 transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a :href="member.linkedin" target="_blank" class="p-2 rounded-full bg-dark-700 text-gray-400 hover:text-white hover:bg-gold-500 transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
