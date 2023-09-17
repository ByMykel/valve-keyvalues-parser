<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  input: { type: String, required: true },
})

const emit = defineEmits<{
  (e: 'update:input', value: string): void
  (e: 'debounced-conversion'): void
}>()

const textarea = ref<HTMLTextAreaElement | null>(null)

defineExpose({
  textarea,
})

function textChanged(e: Event) {
  emit('update:input', (e.target as HTMLInputElement).value)
  emit('debounced-conversion')
}
</script>

<template>
  <textarea
    ref="textarea"
    :value="input"
    class="w-full min-h-[25rem] p-4 overflow-y-hidden align-top outline-none resize-none"
    @input="textChanged"
  ></textarea>
</template>
