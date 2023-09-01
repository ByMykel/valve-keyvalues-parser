import { ref } from 'vue'

import { parse as parse1 } from '@node-steam/vdf'
import { parse as parse2 } from 'vdf-parser'
// @ts-ignore
import { parse as parse3 } from 'kvparser'

interface Option {
  name: string
  npm: string
  github: string
  parse: Function
}

const options: Option[] = [
  {
    name: '@node-steam/vdf',
    npm: 'https://www.npmjs.com/package/@node-steam/vdf',
    github: 'https://github.com/node-steam/vdf',
    parse: parse1,
  },
  {
    name: 'vdf-parser',
    npm: 'https://www.npmjs.com/package/vdf-parser',
    github: 'https://github.com/p0358/vdf-parser',
    parse: parse2,
  },
  {
    name: 'kvparser',
    npm: 'https://www.npmjs.com/package/kvparser',
    github: 'https://github.com/DoctorMcKay/node-kvparser',
    parse: parse3,
  },
]

export function useValveDataFormat() {
  const input = ref<string>('')
  const output = ref<string>('')
  const error = ref<string>('')

  const selectedOption = ref(options[0])

  function parse() {
    const option = options.find((o) => o.name === selectedOption.value.name)

    if (!option) {
      throw new Error(
        `Unexpected option ${selectedOption.value.name} when parsing`,
      )
    }

    try {
      output.value = option.parse(input.value)
      output.value = JSON.stringify(output.value, null, 4)
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : 'Unknown error while parsing'
    }
  }

  return {
    input,
    output,
    error,
    parse,
    options,
    selectedOption,
  }
}
