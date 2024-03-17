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
        <div class="relative w-[14rem]">
            <ListboxButton
                class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-200 rounded-md shadow-sm cursor-default focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
            >
                <span class="block truncate">{{ selectedOption.name }}</span>
                <span
                    class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                    <ChevronUpDownIcon
                        class="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                    />
                </span>
            </ListboxButton>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <ListboxOptions
                    class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
                                    ? 'bg-blue-100 text-blue-900'
                                    : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-10 pr-4'
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
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
                            >
                                <CheckIcon
                                    class="w-5 h-5"
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
