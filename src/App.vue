<script setup lang="ts">
import { ref } from "vue"
import { useDebounceFn } from "@vueuse/core"

import { useValveDataFormat } from "./composables/useValveDataFormat"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup
} from "@/components/ui/resizable"

import TextBoxInput from "./components/TextBoxInput.vue"
import TextBoxOutput from "./components/TextBoxOutput.vue"
import OptionList from "./components/OptionList.vue"

import { PARSE_MODE, STRINGIFY_MODE } from "./constants"

const { input, output, error, selectedOption, convert, switchMode } =
    useValveDataFormat()

const textarea = ref<InstanceType<typeof TextBoxInput> | null>(null)

const debouncedConversion = useDebounceFn(() => {
    convert()

    setTimeout(() => {
        if (textarea.value?.textarea) {
            textarea.value.textarea.style.height = "auto"
            textarea.value.textarea.style.height =
                textarea.value.textarea.scrollHeight + "px"
        }
    }, 10)
}, 200)

function modeChanged() {
    switchMode()
    debouncedConversion()
}
</script>

<template>
    <div class="flex flex-col">
        <div class="sticky top-0 z-10 p-4 bg-white border-b border-gray-200">
            <div>
                <div class="flex items-center justify-between">
                    <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
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

                    <div>
                        <a
                            href="https://github.com/ByMykel/valve-keyvalues-parser"
                            target="_blank"
                        >
                            <svg
                                class="w-7 h-7 hover:text-blue-500"
                                width="24"
                                height="24"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M14.3333 19V17.137C14.3583 16.8275 14.3154 16.5163 14.2073 16.2242C14.0993 15.9321 13.9286 15.6657 13.7067 15.4428C15.8 15.2156 18 14.4431 18 10.8989C17.9998 9.99256 17.6418 9.12101 17 8.46461C17.3039 7.67171 17.2824 6.79528 16.94 6.01739C16.94 6.01739 16.1533 5.7902 14.3333 6.97811C12.8053 6.57488 11.1947 6.57488 9.66666 6.97811C7.84666 5.7902 7.05999 6.01739 7.05999 6.01739C6.71757 6.79528 6.69609 7.67171 6.99999 8.46461C6.35341 9.12588 5.99501 10.0053 5.99999 10.9183C5.99999 14.4366 8.19999 15.2091 10.2933 15.4622C10.074 15.6829 9.90483 15.9461 9.79686 16.2347C9.68889 16.5232 9.64453 16.8306 9.66666 17.137V19"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M9.66667 17.7018C7.66667 18.3335 6 17.7018 5 15.7544"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                <div
                    v-if="error"
                    class="p-2 mt-5 bg-red-100 rounded-md"
                >
                    <p class="font-semibold text-center text-red-500">
                        {{ error }}
                    </p>
                </div>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                    <div class="relative overflow-y-auto">
                        <TextBoxInput
                            ref="textarea"
                            :input="input"
                            @update:input="input = $event"
                            @debounced-conversion="debouncedConversion"
                        />
                    </div>
                </ResizablePanel>
                <ResizableHandle with-handle />
                <ResizablePanel>
                    <div class="relative h-full overflow-y-auto bg-gray-50">
                        <TextBoxOutput
                            :output="output"
                            :error="error"
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    </div>
</template>
