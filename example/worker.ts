import { handleActions } from '../src'
import type { MainSide } from './main'

export const actions = {
  sum (a: number, b: number) {
    return a + b
  }
}

export type Actions = typeof actions

const mainSide = handleActions<MainSide>(actions)

mainSide.hello().then(result => {
  if (typeof window !== 'undefined' && !(self instanceof Worker)) {
    const div = document.createElement('div')
    div.id = 'main-side-result'
    div.textContent = `${result}`
    document.body.append(div)
  }
})
