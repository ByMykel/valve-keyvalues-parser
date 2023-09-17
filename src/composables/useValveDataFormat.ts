import { ref } from 'vue'

import { parse as parse1, stringify as stringify1 } from '@node-steam/vdf'
import { parse as parse2, stringify as stringify2 } from 'vdf-parser'
// @ts-ignore
import { parse as parse3 } from 'kvparser'

import { PARSE_MODE, STRINGIFY_MODE } from '../constants'
import { Option } from '../types'

const options: Option[] = [
  {
    name: '@node-steam/vdf',
    npm: 'https://www.npmjs.com/package/@node-steam/vdf',
    github: 'https://github.com/node-steam/vdf',
    parse: parse1,
    stringify: stringify1,
  },
  {
    name: 'vdf-parser',
    npm: 'https://www.npmjs.com/package/vdf-parser',
    github: 'https://github.com/p0358/vdf-parser',
    parse: parse2,
    stringify: stringify2,
  },
  {
    name: 'kvparser',
    npm: 'https://www.npmjs.com/package/kvparser',
    github: 'https://github.com/DoctorMcKay/node-kvparser',
    parse: parse3,
    stringify: null,
  },
]

export function useValveDataFormat() {
  const mode = ref<string>(PARSE_MODE)
  const input = ref<string>('')
  const output = ref<string>('')
  const error = ref<string>('')

  const selectedOption = ref(options[0])

  function convert() {
    mode.value === PARSE_MODE ? parse() : stringify()
  }

  function parse() {
    const option = options.find((o) => o.name === selectedOption.value.name)

    if (!option) {
      throw new Error(
        `Unexpected option ${selectedOption.value.name} when parsing`,
      )
    }

    try {
      const parsed = option.parse(input.value)
      output.value = JSON.stringify(parsed, null, 4)

      error.value = ''
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : 'Unknown error while parsing'
    }
  }

  function stringify() {
    const option = options.find((o) => o.name === selectedOption.value.name)

    if (!option) {
      throw new Error(
        `Unexpected option ${selectedOption.value.name} when stringifing`,
      )
    }

    // Some libraries don't have stringify feature
    if (option.stringify === null) {
      error.value = `${option.name} does not have stringify implemented.`
      return
    }

    try {
      output.value = option.stringify(JSON.parse(input.value))

      error.value = ''
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : 'Unknown error while stringifing'
    }
  }

  function switchMode() {
    mode.value = mode.value === PARSE_MODE ? STRINGIFY_MODE : PARSE_MODE
  }

  return {
    mode,
    input,
    output,
    error,
    options,
    selectedOption,
    convert,
    switchMode,
  }
}
