import { createWorker } from '../src'
import type { Actions } from './worker'

const mainSide = {
  hello: () => 'hello, from other side!'
}

export type MainSide = typeof mainSide

const worker = createWorker<Actions>(
  () => new Worker(new URL('worker.ts', import.meta.url), {
    type: 'module'
  }),
  {},
  mainSide
)

worker.sum(1, 2).then(result => {
  const div = document.createElement('div')
  div.id = 'worker-result'
  div.textContent = `${result}`
  document.body.append(div)
})

const iframeWorker = createWorker<Actions>(
  () => document.querySelector('iframe')!,
  {},
  mainSide
)

iframeWorker.sum(3, 4).then(result => {
  const div = document.createElement('div')
  div.id = 'iframe-result'
  div.textContent = `${result}`
  document.body.append(div)
})
