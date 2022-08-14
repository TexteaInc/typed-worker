import { AsyncCall } from 'async-call-rpc'
import { WorkerChannel } from 'async-call-rpc/utils/web/worker'

export const createWorker = <Actions extends Record<string, Function>> (
  scriptURL: string | URL, options?: WorkerOptions
) => {
  return AsyncCall<Actions>({}, {
    log: 'all',
    channel: new WorkerChannel(new Worker(scriptURL, options))
  })
}

export const handleActions = <Actions extends Record<string, Function>> (
  actions: Actions
) => {
  return AsyncCall<{}>(actions, {
    channel: new WorkerChannel()
  })
}
