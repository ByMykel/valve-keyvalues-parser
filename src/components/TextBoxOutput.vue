<script setup lang="ts">
defineProps({
    output: { type: String, required: true },
    error: { type: String, required: true }
})
</script>

<template>
    <pre
        tabindex="0"
        class="output-pre"
        :class="{
            'output-error': error,
            'output-placeholder': !error && !output
        }"
        >{{ error || output || "Output will appear here..." }}</pre
    >
</template>

<style scoped>
.output-pre {
    padding: 16px;
    height: 100%;
    outline: none;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    line-height: 1.625;
    color: var(--color-text);
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.output-pre::selection {
    background-color: rgb(79 70 229 / 0.2);
}

.output-error {
    color: var(--color-error);
    font-weight: 500;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.output-placeholder {
    color: rgb(113 113 122 / 0.5);
}
</style>
