<script setup lang="ts">
import logo from '~/assets/logo.svg'
import { storageDemo } from '~/logic/storage'
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <img :src="logo" class="icon-btn mx-2 text-2xl" alt="extension icon">
    <div>配置</div>
    <SharedSubtitle />
请输入密钥：
    <input v-model="storageDemo" class="border border-gray-400 rounded px-2 py-1 mt-2">

  </main>
</template>
