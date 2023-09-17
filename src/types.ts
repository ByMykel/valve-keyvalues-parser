export interface Option {
  name: string
  npm: string
  github: string
  parse: (value: string) => object
  stringify: ((value: object) => string) | null
}
