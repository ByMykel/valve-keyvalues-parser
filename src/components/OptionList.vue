<script setup lang="ts">
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption
} from "@headlessui/vue"

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid"
import { useValveDataFormat } from "../composables/useValveDataFormat"

import { Option } from "../types"

defineProps({
    selectedOption: { type: Object, required: true }
})

const emit = defineEmits<{
    (e: "update:selected-option", option: Option): void
    (e: "debounced-conversion"): void
}>()

const { options } = useValveDataFormat()

function updateOption(option: Option) {
    emit("update:selected-option", option)
    emit("debounced-conversion")
}
</script>

<template>
    <Listbox
        class="z-50"
        :model-value="selectedOption"
        @update:model-value="updateOption"
    >
        <div class="relative w-[10rem] md:w-[14rem]">
            <ListboxButton
                class="relative w-full h-10 py-2 pl-4 pr-10 text-left transition-all duration-200 border rounded-xl cursor-pointer bg-bento-bg border-bento-border text-bento-text hover:border-bento-borderHover focus:outline-none focus:border-bento-accent focus:ring-2 focus:ring-bento-accent/20 text-sm"
            >
                <span class="block truncate">{{ selectedOption.name }}</span>
                <span
                    class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                >
                    <ChevronUpDownIcon
                        class="w-4 h-4 text-bento-textMuted"
                        aria-hidden="true"
                    />
                </span>
            </ListboxButton>

            <transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
            >
                <ListboxOptions
                    class="absolute w-full py-2 mt-2 overflow-auto border rounded-2xl bg-bento-card max-h-60 border-bento-border focus:outline-none text-sm"
                >
                    <ListboxOption
                        v-for="option in options"
                        v-slot="{ active, selected }"
                        :key="option.name"
                        :value="option"
                        as="template"
                    >
                        <li
                            :class="[
                                active
                                    ? 'bg-bento-bg text-bento-text'
                                    : 'text-bento-textMuted',
                                selected ? 'text-bento-text' : '',
                                'relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors duration-150 mx-1 rounded-xl'
                            ]"
                        >
                            <span
                                :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate'
                                ]"
                                >{{ option.name }}</span
                            >
                            <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-bento-accent"
                            >
                                <CheckIcon
                                    class="w-4 h-4"
                                    aria-hidden="true"
                                />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>
