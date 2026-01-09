<script setup lang="ts">
import { ref } from "vue"

defineProps({
    input: { type: String, required: true }
})

const emit = defineEmits<{
    (e: "update:input", value: string): void
    (e: "debounced-conversion"): void
}>()

const textarea = ref<HTMLTextAreaElement | null>(null)

defineExpose({
    textarea
})

function textChanged(e: Event) {
    emit("update:input", (e.target as HTMLInputElement).value)
    emit("debounced-conversion")
}
</script>

<template>
    <textarea
        ref="textarea"
        :value="input"
        class="w-full h-full p-4 align-top outline-none resize-none bg-transparent text-bento-text font-mono text-sm leading-relaxed placeholder:text-bento-textMuted/50 caret-bento-accent selection:bg-bento-accent/20"
        placeholder="Paste your KeyValues or JSON data here..."
        @input="textChanged"
    ></textarea>
</template>
