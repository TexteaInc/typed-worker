# @textea/worker

## Install

```bash
yarn add @textea/worker
```

## Usage

Create a `worker.ts`:

```ts
import { handleActions } from "typed-worker"

export const actions = {
  async sum (payload: { a: number; b: number }) {
    await someHeavyOperation()
    return payload.a + payload.b
  },
}

export type Actions = typeof actions

handleActions(actions)
```

In your `app.ts` where you want to use the worker:

```ts
import { createWorker } from "typed-worker"
// only import type space
import type { Actions } from "./worker"

const worker = createWorker<Actions>(
  // Require a bundler like Vite, webpack etc
  () =>
    new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    }),
)

const result = await worker.sum(1, 2)

expect(result).toBe(3)
```

## License

MIT &copy;
