<script setup lang="ts">
import * as vdf from '@node-steam/vdf';
import { ref } from 'vue';

const originalText = ref('');
const vdfText = ref('');

const parse = () => {
  const parsed = vdf.parse(originalText.value);
  vdfText.value = JSON.stringify(parsed, null, 4);
};
</script>

<template>
  <div class="max-w-[90rem] mx-auto">
    <div class="flex justify-between py-4 items-center">
      <h1>Valve KeyValues Parser</h1>
      <button
        class="bg-blue-400 text-white py-1 px-5 rounded-md font-medium"
        type="button"
        @click="parse()"
      >
        Parse
      </button>
    </div>
    <div class="grid grid-cols-2 gap-6">
      <textarea
        class="border border-gray-200 rounded-md h-[85vh] outline-none focus:outline-blue-400"
        name="vdf-text"
        id="vdf-text"
        v-model="originalText"
      ></textarea>
      <!-- <textarea
        class="border border-gray-200 rounded-md h-[85vh] outline-none focus:outline-blue-400"
        name="readable-text"
        id="readable-text"
        v-model="vdfText"
      ></textarea> -->
			<pre tabindex="0" class="border border-gray-200 bg-white rounded-md h-[85vh] outline-none focus:outline-blue-400 p-4 overflow-auto">{{ vdfText }}</pre>
    </div>
  </div>
</template>
