import { createWorker } from '../src'
import type { Actions } from './worker'

const worker = createWorker<Actions>(
  new URL('worker.ts', import.meta.url), {
    type: 'module'
  }
)

worker.sum(1, 2).then(result => {
  const div = document.createElement('div')
  div.id = 'worker-result'
  div.textContent = `${result}`
  document.body.append(div)
})
