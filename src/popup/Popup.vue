<script setup>
import { storageDemo } from '~/logic/storage'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <main class="w-[200px] px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>华通云开发工具</div>
    <SharedSubtitle />

    <button class="btn mt-2" @click="openOptionsPage">
      打开配置
    </button>
    <div class="mt-2">
      <span class="opacity-50">请输入密钥:</span>
    </div>
    <input v-model="storageDemo" class="border border-gray-400 rounded px-2 py-1 mt-2">
  </main>
</template>
