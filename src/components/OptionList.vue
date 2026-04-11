<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useValveDataFormat } from "../composables/useValveDataFormat"
import { Option } from "../types"
import { PARSE_MODE, STRINGIFY_MODE } from "../constants"
import IconChevronUpDown from "./icons/IconChevronUpDown.vue"
import IconCheck from "./icons/IconCheck.vue"

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
        class="dropdown"
    >
        <button
            @click="open = !open"
            class="dropdown-trigger"
        >
            <span class="dropdown-label">
                <span class="dropdown-mode">{{
                    mode === PARSE_MODE ? "Parse" : "Stringify"
                }}</span>
                {{ selectedOption.name }}
            </span>
            <span class="dropdown-chevron">
                <IconChevronUpDown class="icon-sm" />
            </span>
        </button>

        <transition
            enter-active-class="dropdown-enter-active"
            enter-from-class="dropdown-enter-from"
            enter-to-class="dropdown-enter-to"
            leave-active-class="dropdown-leave-active"
            leave-from-class="dropdown-leave-from"
            leave-to-class="dropdown-leave-to"
        >
            <ul
                v-if="open"
                class="dropdown-menu"
            >
                <li class="dropdown-section-title">Parse</li>
                <li
                    v-for="option in options"
                    :key="'parse-' + option.name"
                    @click="select(option, PARSE_MODE)"
                    class="dropdown-item"
                    :class="{ selected: isSelected(option, PARSE_MODE) }"
                >
                    <span
                        class="dropdown-item-text"
                        :class="{
                            'font-medium': isSelected(option, PARSE_MODE)
                        }"
                    >
                        {{ option.name }}
                    </span>
                    <span
                        v-if="isSelected(option, PARSE_MODE)"
                        class="dropdown-check"
                    >
                        <IconCheck class="icon-sm" />
                    </span>
                </li>

                <li class="dropdown-divider"></li>

                <li class="dropdown-section-title">Stringify</li>
                <li
                    v-for="option in stringifyOptions"
                    :key="'stringify-' + option.name"
                    @click="select(option, STRINGIFY_MODE)"
                    class="dropdown-item"
                    :class="{ selected: isSelected(option, STRINGIFY_MODE) }"
                >
                    <span
                        class="dropdown-item-text"
                        :class="{
                            'font-medium': isSelected(option, STRINGIFY_MODE)
                        }"
                    >
                        {{ option.name }}
                    </span>
                    <span
                        v-if="isSelected(option, STRINGIFY_MODE)"
                        class="dropdown-check"
                    >
                        <IconCheck class="icon-sm" />
                    </span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<style scoped>
.dropdown {
    position: relative;
    z-index: 50;
}

.dropdown-trigger {
    position: relative;
    height: 40px;
    padding: 8px 40px 8px 16px;
    text-align: left;
    transition: all 0.2s;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    cursor: pointer;
    background-color: var(--color-bg);
    color: var(--color-text);
    font-size: 0.875rem;
    white-space: nowrap;
    font-family: inherit;
}

.dropdown-trigger:hover {
    border-color: var(--color-border-hover);
}

.dropdown-trigger:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgb(79 70 229 / 0.2);
}

.dropdown-mode {
    color: var(--color-text-muted);
}

.dropdown-chevron {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding-right: 12px;
    pointer-events: none;
    color: var(--color-text-muted);
}

.icon-sm {
    width: 16px;
    height: 16px;
}

.dropdown-menu {
    position: absolute;
    bottom: 100%;
    margin-bottom: 4px;
    min-width: 100%;
    width: max-content;
    padding: 4px 0;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background-color: var(--color-card);
    font-size: 0.875rem;
    list-style: none;
}

.dropdown-section-title {
    padding: 4px 12px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    user-select: none;
    text-align: center;
}

.dropdown-item {
    position: relative;
    cursor: pointer;
    user-select: none;
    padding: 6px 12px 6px 32px;
    transition: all 0.15s;
    margin: 0 4px;
    border-radius: 8px;
    color: var(--color-text-muted);
}

.dropdown-item:hover {
    background-color: var(--color-bg);
    color: var(--color-text);
}

.dropdown-item.selected {
    color: var(--color-text);
}

.dropdown-item-text {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.font-medium {
    font-weight: 500;
}

.dropdown-check {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    padding-left: 8px;
    color: var(--color-accent);
}

.dropdown-divider {
    margin: 8px 0;
    border-top: 1px solid var(--color-border);
}

.dropdown-enter-active {
    transition: all 0.15s ease-out;
}

.dropdown-leave-active {
    transition: all 0.1s ease-in;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(4px);
}

.dropdown-enter-to,
.dropdown-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
