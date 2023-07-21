import { ref } from 'vue'

import * as vdf from '@node-steam/vdf'
import * as vdfParser from 'vdf-parser'

interface Option {
  name: string
  npm: string
  github: string
}

const options: Option[] = [
  {
    name: '@node-steam/vdf',
    npm: 'https://www.npmjs.com/package/@node-steam/vdf',
    github: 'https://github.com/node-steam/vdf',
  },
  {
    name: 'vdf-parser',
    npm: 'https://www.npmjs.com/package/vdf-parser',
    github: 'https://github.com/p0358/vdf-parser',
  },
]

export function useValveDataFormat() {
  const input = ref('')
  const output = ref('')

  const selectedOption = ref(options[0])

  function parse() {
    switch (selectedOption.value.name) {
      case '@node-steam/vdf':
        output.value = vdf.parse(input.value)
        break
      case 'vdf-parser':
        output.value = vdfParser.parse(input.value)
        break
      default:
        throw new Error(
          `Unexpected option ${selectedOption.value.name} when parsing`,
        )
    }

    output.value = JSON.stringify(output.value, null, 4)
  }

  return {
    input,
    output,
    parse,
    options,
    selectedOption,
  }
}
