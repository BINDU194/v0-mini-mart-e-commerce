"use client"

import { useState, useMemo } from "react"

const products = [
  { id: 1, name: "Fresh Avocados", price: 4.99, category: "Food", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop" },
  { id: 2, name: "Organic Bananas", price: 2.49, category: "Food", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop" },
  { id: 3, name: "Greek Yogurt", price: 5.99, category: "Food", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop" },
  { id: 4, name: "Almond Milk", price: 3.99, category: "Food", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop" },
  { id: 5, name: "Dish Soap", price: 4.49, category: "Home", image: "https://images.unsplash.com/photo-1585441695325-21557f22e411?w=300&h=300&fit=crop" },
  { id: 6, name: "Paper Towels", price: 8.99, category: "Home", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=300&fit=crop" },
  { id: 7, name: "Hand Cream", price: 7.99, category: "Care", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300&h=300&fit=crop" },
  { id: 8, name: "Shampoo", price: 6.49, category: "Care", image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&h=300&fit=crop" },
  { id: 9, name: "Fresh Strawberries", price: 5.49, category: "Food", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop" },
  { id: 10, name: "Laundry Detergent", price: 12.99, category: "Home", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop" },
]

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function MiniMart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", "Food", "Home", "Care"]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === "All" || product.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])

  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }, [cart])

  const addToCart = (product: (typeof products)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    })
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4ade80]">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-[#166534]">Mini Mart</span>
            </div>

            <div className="hidden flex-1 max-w-md mx-8 sm:block">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-gray-200 bg-[#f8faf8] py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#4ade80] focus:ring-2 focus:ring-[#4ade80]/20"
                />
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#f0fdf4] text-[#166534] transition-all hover:bg-[#dcfce7] hover:scale-105"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#4ade80] text-xs font-semibold text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="pb-3 sm:hidden">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-gray-200 bg-[#f8faf8] py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#4ade80] focus:ring-2 focus:ring-[#4ade80]/20"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#166534] mb-4">
            Fresh Groceries, Delivered Fast
          </h1>
          <p className="text-base sm:text-lg text-[#15803d] max-w-2xl mx-auto">
            Shop from our curated selection of fresh produce, household essentials, and personal care items. Quality you can trust.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-[#4ade80] text-white shadow-md shadow-[#4ade80]/30"
                  : "bg-white text-[#166534] hover:bg-[#f0fdf4] border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden rounded-xl bg-[#f8faf8] mb-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  crossOrigin="anonymous"
                />
              </div>
              <h3 className="font-medium text-[#166534] text-sm sm:text-base mb-1 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-[#15803d]">${product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4ade80] text-white transition-all hover:bg-[#22c55e] hover:scale-110 active:scale-95"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500">No products found. Try a different search or category.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#166534] text-white mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="font-bold">Mini Mart</span>
            </div>
            <p className="text-sm text-white/70">© 2026 Mini Mart. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
        
        {/* Cart Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-lg font-bold text-[#166534]">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg className="h-16 w-16 text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-500 mb-1">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Add some items to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-xl bg-[#f8faf8] p-3">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-[#166534] text-sm">{item.name}</h3>
                          <p className="text-sm font-semibold text-[#15803d]">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#166534] shadow-sm transition-all hover:bg-[#f0fdf4]"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center font-medium text-[#166534]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#166534] shadow-sm transition-all hover:bg-[#f0fdf4]"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="font-bold text-[#166534]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="text-2xl font-bold text-[#166534]">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full rounded-full bg-[#4ade80] py-3 font-semibold text-white transition-all hover:bg-[#22c55e] hover:shadow-lg hover:shadow-[#4ade80]/30 active:scale-[0.98]">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
