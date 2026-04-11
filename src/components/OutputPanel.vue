<script setup lang="ts">
import { ref } from "vue"
import TextBoxOutput from "./TextBoxOutput.vue"
import IconCopy from "./icons/IconCopy.vue"
import IconCheck from "./icons/IconCheck.vue"
import IconDownload from "./icons/IconDownload.vue"

const props = defineProps<{
    output: string
    error: string
}>()

const copied = ref(false)

async function copyOutput() {
    if (!props.output) return
    try {
        await navigator.clipboard.writeText(props.output)
        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch (err) {
        console.error("Failed to copy:", err)
    }
}

function downloadOutput() {
    if (!props.output) return
    const blob = new Blob([props.output], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "output.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}
</script>

<template>
    <div class="card">
        <div class="card-header">
            <span class="card-title">Output</span>
            <div class="card-actions">
                <button
                    @click="copyOutput"
                    :disabled="!output || !!error"
                    class="icon-btn"
                    :title="copied ? 'Copied!' : 'Copy to clipboard'"
                >
                    <IconCheck
                        v-if="copied"
                        class="icon-sm success"
                    />
                    <IconCopy
                        v-else
                        class="icon-sm"
                    />
                </button>
                <button
                    @click="downloadOutput"
                    :disabled="!output || !!error"
                    class="icon-btn"
                    title="Download as file"
                >
                    <IconDownload class="icon-sm" />
                </button>
            </div>
        </div>
        <div class="card-body">
            <TextBoxOutput
                :output="output"
                :error="error"
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

.card-actions {
    display: flex;
    align-items: center;
    gap: 4px;
}

.icon-sm {
    width: 16px;
    height: 16px;
}

.icon-btn {
    padding: 6px;
    border-radius: 8px;
    color: var(--color-text-muted);
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.15s;
}

.icon-btn:hover {
    color: var(--color-text);
    background-color: var(--color-bg);
}

.icon-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}

.success {
    color: var(--color-success);
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
