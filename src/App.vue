<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

import { ArrowsRightLeftIcon } from '@heroicons/vue/20/solid'
import { useValveDataFormat } from './composables/useValveDataFormat'

import TextBoxInput from './components/TextBoxInput.vue'
import TextBoxOutput from './components/TextBoxOutput.vue'
import OptionList from './components/OptionList.vue'

import { PARSE_MODE, STRINGIFY_MODE } from './constants'

const { mode, input, output, error, selectedOption, convert, switchMode } =
  useValveDataFormat()

const textarea = ref<InstanceType<typeof TextBoxInput> | null>(null)

const debouncedConversion = useDebounceFn(() => {
  convert()

  setTimeout(() => {
    if (textarea.value?.textarea) {
      textarea.value.textarea.style.height = 'auto'
      textarea.value.textarea.style.height =
        textarea.value.textarea.scrollHeight + 'px'
    }
  }, 10)
}, 200)

function modeChanged() {
  switchMode()
  debouncedConversion()
}
</script>

<template>
  <div class="max-w-[105rem] mx-auto px-4">
    <div class="flex items-center gap-6 py-4">
      <OptionList
        :selected-option="selectedOption"
        @update:selected-option="selectedOption = $event"
        @debounced-conversion="debouncedConversion"
      />
      <div class="flex items-center justify-center gap-4 px-4 py-1">
        <p
          :class="{
            'font-semibold': mode === PARSE_MODE,
          }"
        >
          {{ PARSE_MODE }}
        </p>
        <button
          class="p-2 text-gray-500 rounded-full hover:bg-blue-100 hover:text-blue-500 focus:bg-blue-100 focus:text-blue-500"
          @click="modeChanged"
        >
          <ArrowsRightLeftIcon class="w-5 h-5" aria-hidden="true" />
        </button>
        <p
          :class="{
            'font-semibold': mode === STRINGIFY_MODE,
          }"
        >
          {{ STRINGIFY_MODE }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6 min-h-[25rem] mb-20 h-auto">
      <div class="relative border border-gray-200">
        <!-- <div
          class="sticky top-0 flex items-center justify-center gap-4 px-4 py-1 bg-gray-100"
        >
          text here
        </div> -->
        <TextBoxInput
          ref="textarea"
          :input="input"
          @update:input="input = $event"
          @debounced-conversion="debouncedConversion"
        />
      </div>
      <div class="relative bg-gray-100 border border-gray-200">
        <!-- <div
          class="sticky top-0 flex items-center justify-center gap-4 px-4 py-1 bg-gray-100"
        >
          text here
        </div> -->
        <TextBoxOutput :output="output" :error="error" />
      </div>
    </div>
  </div>
</template>
