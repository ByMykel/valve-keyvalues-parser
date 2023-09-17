<script setup lang="ts">
defineProps({
  output: { type: String, required: true },
  error: { type: String, required: true },
})
</script>

<template>
  <pre
    tabindex="0"
    class="p-4 overflow-auto outline-none"
    :class="{
      'text-red-500 font-bold text-lg text-center': error,
    }"
    >{{ error || output }}</pre
  >
</template>
