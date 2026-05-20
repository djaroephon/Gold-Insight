<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <footer class="bg-dark-900 border-t border-dark-700 py-6 text-center text-gray-500 text-sm">
      <div class="container mx-auto px-4">
        &copy; 2026 Gold Insight. All rights reserved.
      </div>
    </footer>
  </div>
</template>
