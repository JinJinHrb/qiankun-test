import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface BearState {
	bears?: number
	increase: (by: number) => void
	initBears: () => void
}

export const useBaseStore = create<BearState>()(
	devtools(set => ({
		// bears: 0,
		initBears: () => set({ bears: 5 }),
		increase: by => set(state => ({ bears: state.bears! + by }), false, 'increase'),
	})),
)
