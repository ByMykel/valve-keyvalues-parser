<script setup lang="ts">
import { useValveDataFormat } from "./composables/useValveDataFormat"

import InputPanel from "./components/InputPanel.vue"
import OutputPanel from "./components/OutputPanel.vue"
import OptionList from "./components/OptionList.vue"

const { mode, input, output, error, selectedOption, convert } =
    useValveDataFormat()

let debounceTimer: ReturnType<typeof setTimeout>
function debouncedConversion() {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => convert(), 200)
}
</script>

<template>
    <div class="layout">
        <div class="panels">
            <InputPanel
                :input="input"
                :selected-option="selectedOption"
                @update:input="input = $event"
                @debounced-conversion="debouncedConversion"
            />
            <OutputPanel
                :output="output"
                :error="error"
            />
        </div>

        <div class="floating-bar">
            <OptionList
                :selected-option="selectedOption"
                :mode="mode"
                @update:selected-option="selectedOption = $event"
                @update:mode="mode = $event"
                @debounced-conversion="debouncedConversion"
            />
        </div>
    </div>
</template>

<style scoped>
.layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg);
}

.panels {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr;
    min-height: 0;
}

.floating-bar {
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 16px;
    background-color: var(--color-card);
    border: 1px solid var(--color-border);
    box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 20px 50px -12px rgba(0, 0, 0, 0.5);
}

@media (min-width: 1024px) {
    .layout {
        height: 100vh;
        overflow: hidden;
    }

    .panels {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
