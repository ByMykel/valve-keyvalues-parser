<script setup lang="ts">
import { ref } from "vue"
import TextBoxInput from "./TextBoxInput.vue"
import IconNpm from "./icons/IconNpm.vue"
import IconGitHub from "./icons/IconGitHub.vue"
import { Option } from "../types"

defineProps<{
    input: string
    selectedOption: Option
}>()

const emit = defineEmits<{
    (e: "update:input", value: string): void
    (e: "debounced-conversion"): void
}>()

const textarea = ref<InstanceType<typeof TextBoxInput> | null>(null)

defineExpose({ textarea })
</script>

<template>
    <div class="card">
        <div class="card-header">
            <span class="card-title">Input</span>
            <div class="card-meta">
                <span class="meta-name">{{ selectedOption.name }}</span>
                <a
                    :href="selectedOption.npm"
                    target="_blank"
                    class="icon-link"
                    title="View on npm"
                >
                    <IconNpm class="icon-sm" />
                </a>
                <a
                    :href="selectedOption.github"
                    target="_blank"
                    class="icon-link"
                    title="View on GitHub"
                >
                    <IconGitHub class="icon-sm" />
                </a>
            </div>
        </div>
        <div class="card-body">
            <TextBoxInput
                ref="textarea"
                :input="input"
                @update:input="emit('update:input', $event)"
                @debounced-conversion="emit('debounced-conversion')"
            />
        </div>
    </div>
</template>

<style scoped>
.card {
    background-color: var(--color-card);
    border: 1px solid var(--color-border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 280px;
}

.card-header {
    height: 44px;
    padding: 0 12px;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
}

.card-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
}

.card-meta {
    display: flex;
    align-items: center;
    gap: 6px;
}

.meta-name {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    font-family: var(--font-mono);
    margin-right: 4px;
}

.icon-sm {
    width: 16px;
    height: 16px;
}

.icon-link {
    padding: 6px;
    border-radius: 8px;
    color: var(--color-text-muted);
    transition: color 0.15s;
}

.icon-link:hover {
    color: var(--color-text);
}

.card-body {
    flex: 1;
    overflow: auto;
    min-height: 0;
}

@media (min-width: 768px) {
    .card-header {
        height: 48px;
        padding: 0 16px;
    }

    .card {
        min-height: 350px;
    }
}

@media (min-width: 1024px) {
    .card {
        min-height: 0;
    }
}
</style>
