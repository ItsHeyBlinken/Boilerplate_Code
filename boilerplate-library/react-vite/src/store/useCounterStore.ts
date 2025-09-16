import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementByAmount: (amount: number) => void
}

export const useCounterStore = create<CounterState>()(
  devtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 }), false, 'increment'),
      decrement: () => set((state) => ({ count: state.count - 1 }), false, 'decrement'),
      reset: () => set({ count: 0 }, false, 'reset'),
      incrementByAmount: (amount) =>
        set((state) => ({ count: state.count + amount }), false, 'incrementByAmount'),
    }),
    {
      name: 'counter-store',
    }
  )
)