<script setup lang="ts">
defineProps({
    output: { type: String, required: true },
    error: { type: String, required: true }
})
</script>

<template>
    <pre
        tabindex="0"
        class="p-4 h-full outline-none font-mono text-sm leading-relaxed text-bento-text selection:bg-bento-accent/20"
        :class="{
            'text-bento-error font-medium text-center flex items-center justify-center':
                error,
            'text-bento-textMuted/50': !error && !output
        }"
        >{{ error || output || "Output will appear here..." }}</pre
    >
</template>
