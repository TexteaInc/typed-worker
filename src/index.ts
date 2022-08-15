import {
  AsyncCall,
  AsyncCallOptions,
  CallbackBasedChannel
} from 'async-call-rpc'
import { WorkerChannel } from 'async-call-rpc/utils/web/worker'

const IFRAME_ID_ATTR = 'data-typed-worker'

export class MainSide implements CallbackBasedChannel {
  private channel = new MessageChannel()
  private ready: boolean = false
  private callback = new Set<Function>()

  constructor (
    public readonly iframe: HTMLIFrameElement
  ) {}

  setup (
    callback: (payload: unknown) => Promise<unknown>,
    isValidJSONRPCPayload: (data: unknown) => boolean | Promise<boolean>
  ) {
    const iframe = this.iframe
    const f = () => {
      iframe.contentWindow!.postMessage(
        IFRAME_ID_ATTR,
        '*',
        [this.channel.port2]
      )
      this.ready = true
      this.callback.forEach(cb => {
        cb()
        this.callback.delete(cb)
      })
    }
    iframe.addEventListener('load', f)
    return () => iframe.removeEventListener('load', f)
  }

  on (listener: (data: unknown) => void) {
    this.channel.port1.onmessage = (event: MessageEvent) => {
      listener(event.data)
    }
  }

  send (data: unknown) {
    if (this.ready) {
      this.channel.port1.postMessage(data)
    } else {
      this.callback.add(() => this.send(data))
    }
  }
}

export class IframeSide implements CallbackBasedChannel {
  private port: MessagePort | null = null
  private data = new Set<unknown>()

  setup (
    callback: (payload: unknown) => Promise<unknown | undefined>): (() => void) | void {
    const f = (event: MessageEvent) => {
      if (event.data === IFRAME_ID_ATTR && event.ports[0]) {
        this.port = event.ports[0]
        this.data.forEach(d => {
          this.port!.postMessage(d)
          this.data.delete(d)
        })
        this.port.onmessage = (event) => {
          callback(event.data).then(x => x && this.port!.postMessage(x))
        }
      }
    }
    window.addEventListener('message', f)
    return () => window.removeEventListener('message', f)
  }

  send (data: unknown) {
    if (this.port) {
      this.port.postMessage(data)
    } else {
      this.data.add(data)
    }
  }
}

export function createWorker<Actions extends object> (
  create: () => Worker | HTMLIFrameElement,
  options?: Omit<AsyncCallOptions, 'channel'>,
  thisSideImplementation: object = {}
) {
  const worker = create()
  if (worker instanceof HTMLIFrameElement) {
    return AsyncCall<Actions>(thisSideImplementation, {
      ...options,
      channel: new MainSide(worker)
    })
  } else {
    return AsyncCall<Actions>(thisSideImplementation, {
      ...options,
      channel: new WorkerChannel(worker)
    })
  }
}

export const handleActions = <MainSideImplementation extends object, Actions extends object = object> (
  actions: Actions,
  options: Omit<AsyncCallOptions, 'channel'> = {}
) => {
  const inWorker =
    typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope
  if (inWorker) {
    return AsyncCall<MainSideImplementation>(actions, {
      ...options,
      channel: new WorkerChannel()
    })
  } else {
    return AsyncCall<MainSideImplementation>(actions, {
      ...options,
      channel: new IframeSide()
    })
  }
}
