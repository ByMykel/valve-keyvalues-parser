<script setup lang="ts">
import * as vdf from '@node-steam/vdf';
import * as vdfParser from 'vdf-parser';
import { ref } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

import { CheckIcon } from '@heroicons/vue/20/solid';
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const originalText = ref('');
const vdfText = ref('');

const parse = () => {
  switch (selectedPerson.value.name) {
    case '@node-steam/vdf':
      vdfText.value = vdf.parse(originalText.value);
      break;
    case 'vdf-parser':
      vdfText.value = vdfParser.parse(originalText.value);
      break;
  }

  console.log(selectedPerson.value.name)
  console.log(vdfText.value);
  
  vdfText.value = JSON.stringify(vdfText.value, null, 4);
};

const people = [
  {
    id: 1,
    name: '@node-steam/vdf',
    npm: 'https://www.npmjs.com/package/@node-steam/vdf',
    github: 'https://github.com/node-steam/vdf',
  },
  {
    id: 2,
    name: 'vdf-parser',
    npm: 'https://www.npmjs.com/package/vdf-parser',
    github: 'https://github.com/p0358/vdf-parser',
  },
];
const selectedPerson = ref(people[0]);
</script>

<template>
  <div class="max-w-[90rem] mx-auto">
    <div class="flex items-center justify-between py-4">
      <h1 class="text-xl font-medium">Valve KeyValues Parser</h1>
      <div class="flex gap-2">
        <div class="flex gap-4 p-0.5 bg-gray-200 rounded-md">
          <Listbox v-model="selectedPerson">
            <div class="relative w-[14rem]">
              <ListboxButton
                class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-200 rounded-md shadow-sm cursor-default focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
              >
                <span class="block truncate">{{ selectedPerson.name }}</span>
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
                    v-slot="{ active, selected }"
                    v-for="person in people"
                    :key="person.name"
                    :value="person"
                    as="template"
                  >
                    <li
                      :class="[
                        active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]"
                        >{{ person.name }}</span
                      >
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
                      >
                        <CheckIcon class="w-5 h-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
          <div class="flex items-center gap-1 px-1">
            <a
              :href="selectedPerson.npm"
              class="p-1 rounded-md hover:bg-gray-300"
              target="_blank"
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#000000"
              >
                <path
                  d="M1 8h22v7H11v2H7.5v-2H1V8zM7.5 8v7M13.5 8v7"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M18 11v4M5 11v4M11 11v1M20.5 11v4"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>
              </svg>
            </a>
            <a
              :href="selectedPerson.github"
              class="p-1 rounded-md hover:bg-gray-300"
              target="_blank"
            >
              <svg
                width="24px"
                height="24px"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#"
              >
                <path
                  d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M14.333 19v-1.863c.025-.31-.018-.62-.126-.913a2.18 2.18 0 00-.5-.781c2.093-.227 4.293-1 4.293-4.544 0-.906-.358-1.778-1-2.434a3.211 3.211 0 00-.06-2.448s-.787-.227-2.607.961a9.152 9.152 0 00-4.666 0c-1.82-1.188-2.607-.96-2.607-.96A3.211 3.211 0 007 8.464a3.482 3.482 0 00-1 2.453c0 3.519 2.2 4.291 4.293 4.544a2.18 2.18 0 00-.496.773 2.134 2.134 0 00-.13.902V19M9.667 17.702c-2 .631-3.667 0-4.667-1.948"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <button
          class="inline-block px-5 text-sm font-medium text-white bg-blue-400 rounded-md"
          type="button"
          @click="parse()"
        >
          Parse
        </button>
      </div>
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
      <pre
        tabindex="0"
        class="border border-gray-200 bg-white rounded-md h-[85vh] outline-none focus:outline-blue-400 p-4 overflow-auto"
        >{{ vdfText }}</pre
      >
    </div>
  </div>
</template>
