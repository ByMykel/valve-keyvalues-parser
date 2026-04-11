<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useValveDataFormat } from "../composables/useValveDataFormat"
import { Option } from "../types"
import { PARSE_MODE, STRINGIFY_MODE } from "../constants"

const props = defineProps<{
    selectedOption: Option
    mode: string
}>()

const emit = defineEmits<{
    (e: "update:selected-option", option: Option): void
    (e: "update:mode", mode: string): void
    (e: "debounced-conversion"): void
}>()

const { options } = useValveDataFormat()
const open = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const stringifyOptions = options.filter((o) => o.stringify !== null)

function select(option: Option, mode: string) {
    emit("update:selected-option", option)
    emit("update:mode", mode)
    emit("debounced-conversion")
    open.value = false
}

function isSelected(option: Option, mode: string) {
    return props.selectedOption.name === option.name && props.mode === mode
}

function onClickOutside(e: MouseEvent) {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
        open.value = false
    }
}

onMounted(() => document.addEventListener("click", onClickOutside))
onUnmounted(() => document.removeEventListener("click", onClickOutside))
</script>

<template>
    <div
        ref="dropdownRef"
        class="relative z-50"
    >
        <button
            @click="open = !open"
            class="relative w-auto h-10 py-2 pl-4 pr-10 text-left transition-all duration-200 border rounded-xl cursor-pointer bg-bento-bg border-bento-border text-bento-text hover:border-bento-borderHover focus:outline-none focus:border-bento-accent focus:ring-2 focus:ring-bento-accent/20 text-sm whitespace-nowrap"
        >
            <span class="block">
                <span class="text-bento-textMuted">{{
                    mode === PARSE_MODE ? "Parse" : "Stringify"
                }}</span>
                {{ selectedOption.name }}
            </span>
            <span
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            >
                <svg
                    class="w-4 h-4 text-bento-textMuted"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                        clip-rule="evenodd"
                    />
                </svg>
            </span>
        </button>

        <transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
        >
            <ul
                v-if="open"
                class="absolute bottom-full mb-1 min-w-full w-max py-1 border rounded-xl bg-bento-card border-bento-border focus:outline-none text-sm"
            >
                <!-- Parse section -->
                <li
                    class="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-bento-textMuted select-none text-center"
                >
                    Parse
                </li>
                <li
                    v-for="option in options"
                    :key="'parse-' + option.name"
                    @click="select(option, PARSE_MODE)"
                    :class="[
                        isSelected(option, PARSE_MODE)
                            ? 'text-bento-text'
                            : 'text-bento-textMuted',
                        'relative cursor-pointer select-none py-1.5 pl-8 pr-3 transition-colors duration-150 mx-1 rounded-lg hover:bg-bento-bg hover:text-bento-text'
                    ]"
                >
                    <span
                        :class="[
                            isSelected(option, PARSE_MODE)
                                ? 'font-medium'
                                : 'font-normal',
                            'block truncate'
                        ]"
                    >
                        {{ option.name }}
                    </span>
                    <span
                        v-if="isSelected(option, PARSE_MODE)"
                        class="absolute inset-y-0 left-0 flex items-center pl-2 text-bento-accent"
                    >
                        <svg
                            class="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </li>

                <!-- Divider -->
                <li class="my-2 border-t border-bento-border"></li>

                <!-- Stringify section -->
                <li
                    class="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-bento-textMuted select-none text-center"
                >
                    Stringify
                </li>
                <li
                    v-for="option in stringifyOptions"
                    :key="'stringify-' + option.name"
                    @click="select(option, STRINGIFY_MODE)"
                    :class="[
                        isSelected(option, STRINGIFY_MODE)
                            ? 'text-bento-text'
                            : 'text-bento-textMuted',
                        'relative cursor-pointer select-none py-1.5 pl-8 pr-3 transition-colors duration-150 mx-1 rounded-lg hover:bg-bento-bg hover:text-bento-text'
                    ]"
                >
                    <span
                        :class="[
                            isSelected(option, STRINGIFY_MODE)
                                ? 'font-medium'
                                : 'font-normal',
                            'block truncate'
                        ]"
                    >
                        {{ option.name }}
                    </span>
                    <span
                        v-if="isSelected(option, STRINGIFY_MODE)"
                        class="absolute inset-y-0 left-0 flex items-center pl-2 text-bento-accent"
                    >
                        <svg
                            class="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </li>
            </ul>
        </transition>
    </div>
</template>
