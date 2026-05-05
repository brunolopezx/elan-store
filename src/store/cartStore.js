import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product, size) => {
    const { items } = get()
    const existing = items.find(i => i.id === product.id && i.size === size)

    if (existing) {
      set({
        items: items.map(i =>
          i.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      })
    } else {
      set({ items: [...items, { ...product, size, quantity: 1 }] })
    }
  },

  removeItem: (id, size) => {
    set({ items: get().items.filter(i => !(i.id === id && i.size === size)) })
  },

  updateQuantity: (id, size, quantity) => {
    if (quantity < 1) return
    set({
      items: get().items.map(i =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      )
    })
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  },

  getCount: () => {
    return get().items.reduce((acc, i) => acc + i.quantity, 0)
  }
}))

export default useCartStore