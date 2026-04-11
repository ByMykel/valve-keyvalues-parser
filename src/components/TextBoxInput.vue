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
        class="editor-textarea"
        placeholder="Paste your KeyValues or JSON data here..."
        @input="textChanged"
    ></textarea>
</template>

<style scoped>
.editor-textarea {
    width: 100%;
    height: 100%;
    padding: 16px;
    vertical-align: top;
    outline: none;
    resize: none;
    background: transparent;
    color: var(--color-text);
    font-family: var(--font-mono);
    font-size: 0.875rem;
    line-height: 1.625;
    border: none;
    caret-color: var(--color-accent);
}

.editor-textarea::placeholder {
    color: rgb(113 113 122 / 0.5);
}

.editor-textarea::selection {
    background-color: rgb(79 70 229 / 0.2);
}
</style>
