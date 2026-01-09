<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useDebounceFn } from "@vueuse/core"

import { useValveDataFormat } from "./composables/useValveDataFormat"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import TextBoxInput from "./components/TextBoxInput.vue"
import TextBoxOutput from "./components/TextBoxOutput.vue"
import OptionList from "./components/OptionList.vue"

import { PARSE_MODE, STRINGIFY_MODE } from "./constants"

const { input, output, error, selectedOption, convert, switchMode } =
    useValveDataFormat()

const textarea = ref<InstanceType<typeof TextBoxInput> | null>(null)
const copied = ref(false)
const isDark = ref(true)

onMounted(() => {
    const saved = localStorage.getItem("theme")
    if (saved) {
        isDark.value = saved === "dark"
    } else {
        isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    applyTheme()
})

watch(isDark, () => {
    applyTheme()
    localStorage.setItem("theme", isDark.value ? "dark" : "light")
})

function applyTheme() {
    document.documentElement.classList.toggle("dark", isDark.value)
}

function toggleTheme() {
    isDark.value = !isDark.value
}

const debouncedConversion = useDebounceFn(() => {
    convert()
}, 200)

function modeChanged() {
    switchMode()
    debouncedConversion()
}

async function copyOutput() {
    if (!output.value) return
    try {
        await navigator.clipboard.writeText(output.value)
        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch (err) {
        console.error("Failed to copy:", err)
    }
}

function downloadOutput() {
    if (!output.value) return
    const blob = new Blob([output.value], { type: "text/plain" })
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
    <!-- Mobile: scrollable page / Desktop: fixed viewport -->
    <div
        class="min-h-screen lg:h-screen flex flex-col p-3 md:p-4 bg-bento-bg lg:overflow-hidden"
    >
        <!-- Header Bar (compact on mobile) -->
        <div class="bento-card p-3 md:p-4 mb-3 md:mb-4 shrink-0">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <!-- Logo & Title -->
                <div class="flex items-center gap-3">
                    <div
                        class="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-bento-accent to-purple-600 flex items-center justify-center shrink-0"
                    >
                        <svg
                            class="w-4 h-4 md:w-5 md:h-5 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                    <div class="hidden sm:block">
                        <h1
                            class="text-base md:text-lg font-bold text-bento-text"
                        >
                            KeyValues Parser
                        </h1>
                        <p class="text-xs text-bento-textMuted">
                            Valve VDF Format Tool
                        </p>
                    </div>
                </div>

                <!-- Controls -->
                <div class="flex flex-wrap items-center gap-2 md:gap-4">
                    <OptionList
                        :selected-option="selectedOption"
                        @update:selected-option="selectedOption = $event"
                        @debounced-conversion="debouncedConversion"
                    />
                    <Tabs
                        :default-value="PARSE_MODE"
                        @update:modelValue="modeChanged"
                    >
                        <TabsList>
                            <TabsTrigger :value="PARSE_MODE">{{
                                PARSE_MODE
                            }}</TabsTrigger>
                            <TabsTrigger :value="STRINGIFY_MODE">{{
                                STRINGIFY_MODE
                            }}</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <!-- Status, Theme Toggle & GitHub -->
                <div class="flex items-center gap-2 md:gap-3">
                    <div class="flex items-center gap-2">
                        <div
                            class="w-2 h-2 rounded-full"
                            :class="
                                error ? 'bg-bento-error' : 'bg-bento-success'
                            "
                        ></div>
                        <span
                            class="text-xs md:text-sm text-bento-textMuted hidden sm:inline"
                        >
                            {{ error ? "Error" : "Ready" }}
                        </span>
                    </div>
                    <button
                        @click="toggleTheme"
                        class="p-1.5 rounded-lg text-bento-textMuted hover:text-bento-text hover:bg-bento-bg transition-all"
                        :title="
                            isDark
                                ? 'Switch to light mode'
                                : 'Switch to dark mode'
                        "
                    >
                        <!-- Sun icon (shown in dark mode) -->
                        <svg
                            v-if="isDark"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="5"
                            ></circle>
                            <line
                                x1="12"
                                y1="1"
                                x2="12"
                                y2="3"
                            ></line>
                            <line
                                x1="12"
                                y1="21"
                                x2="12"
                                y2="23"
                            ></line>
                            <line
                                x1="4.22"
                                y1="4.22"
                                x2="5.64"
                                y2="5.64"
                            ></line>
                            <line
                                x1="18.36"
                                y1="18.36"
                                x2="19.78"
                                y2="19.78"
                            ></line>
                            <line
                                x1="1"
                                y1="12"
                                x2="3"
                                y2="12"
                            ></line>
                            <line
                                x1="21"
                                y1="12"
                                x2="23"
                                y2="12"
                            ></line>
                            <line
                                x1="4.22"
                                y1="19.78"
                                x2="5.64"
                                y2="18.36"
                            ></line>
                            <line
                                x1="18.36"
                                y1="5.64"
                                x2="19.78"
                                y2="4.22"
                            ></line>
                        </svg>
                        <!-- Moon icon (shown in light mode) -->
                        <svg
                            v-else
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                            ></path>
                        </svg>
                    </button>
                    <a
                        href="https://github.com/ByMykel/valve-keyvalues-parser"
                        target="_blank"
                        class="p-1.5 rounded-lg text-bento-textMuted hover:text-bento-text hover:bg-bento-bg transition-all"
                        title="View on GitHub"
                    >
                        <svg
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <!-- Editor Panels -->
        <div
            class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 min-h-0"
        >
            <!-- Input Card -->
            <div
                class="bento-card p-0 overflow-hidden flex flex-col min-h-[280px] md:min-h-[350px] lg:min-h-0"
            >
                <div
                    class="h-11 md:h-12 px-3 md:px-4 border-b border-bento-border flex items-center justify-between shrink-0"
                >
                    <div class="flex items-center gap-2 md:gap-3">
                        <div class="flex gap-1.5">
                            <div
                                class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-bento-error/60"
                            ></div>
                            <div
                                class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-bento-warning/60"
                            ></div>
                            <div
                                class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-bento-success/60"
                            ></div>
                        </div>
                        <span class="text-sm font-medium text-bento-text"
                            >Input</span
                        >
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span
                            class="text-xs text-bento-textMuted font-mono mr-1"
                            >{{ selectedOption.name }}</span
                        >
                        <a
                            :href="selectedOption.npm"
                            target="_blank"
                            class="p-1.5 rounded-lg text-bento-textMuted hover:text-bento-text transition-colors"
                            title="View on npm"
                        >
                            <svg
                                class="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"
                                />
                            </svg>
                        </a>
                        <a
                            :href="selectedOption.github"
                            target="_blank"
                            class="p-1.5 rounded-lg text-bento-textMuted hover:text-bento-text transition-colors"
                            title="View on GitHub"
                        >
                            <svg
                                class="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="flex-1 overflow-auto min-h-0">
                    <TextBoxInput
                        ref="textarea"
                        :input="input"
                        @update:input="input = $event"
                        @debounced-conversion="debouncedConversion"
                    />
                </div>
            </div>

            <!-- Output Card -->
            <div
                class="bento-card p-0 overflow-hidden flex flex-col min-h-[280px] md:min-h-[350px] lg:min-h-0"
            >
                <div
                    class="h-11 md:h-12 px-3 md:px-4 border-b border-bento-border flex items-center justify-between shrink-0"
                >
                    <div class="flex items-center gap-2 md:gap-3">
                        <div class="flex gap-1.5">
                            <div
                                class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-bento-error/60"
                            ></div>
                            <div
                                class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-bento-warning/60"
                            ></div>
                            <div
                                class="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-bento-success/60"
                            ></div>
                        </div>
                        <span class="text-sm font-medium text-bento-text"
                            >Output</span
                        >
                    </div>
                    <div class="flex items-center gap-1">
                        <button
                            @click="copyOutput"
                            :disabled="!output || !!error"
                            class="p-1.5 rounded-lg text-bento-textMuted hover:text-bento-text hover:bg-bento-bg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            :title="copied ? 'Copied!' : 'Copy to clipboard'"
                        >
                            <svg
                                v-if="!copied"
                                class="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                    ry="2"
                                ></rect>
                                <path
                                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                ></path>
                            </svg>
                            <svg
                                v-else
                                class="w-4 h-4 text-bento-success"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </button>
                        <button
                            @click="downloadOutput"
                            :disabled="!output || !!error"
                            class="p-1.5 rounded-lg text-bento-textMuted hover:text-bento-text hover:bg-bento-bg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            title="Download as file"
                        >
                            <svg
                                class="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                                ></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line
                                    x1="12"
                                    y1="15"
                                    x2="12"
                                    y2="3"
                                ></line>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex-1 overflow-auto min-h-0">
                    <TextBoxOutput
                        :output="output"
                        :error="error"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bento-card {
    @apply bg-bento-card rounded-2xl md:rounded-3xl border border-bento-border shadow-bento;
}
</style>
