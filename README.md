# 🛍 Product Variant Manager

A fully responsive product + variant management app, inspired by Shopify’s interface.

Built with:

- ✅ React + TypeScript + Vite
- ✅ React Query for local state caching
- ✅ Shadcn UI for elegant component styling
- ✅ Zod + React Hook Form for schema-based form validation
- ✅ LocalStorage for persistence (no backend required)
- ✅ Optional: Seed real products from the Fake Store or DummyJSON API

---

## ✨ Features

- Landing Page with CTA entry to store
- Add products (e.g., "Sneakers", "T-shirt")
- Add/edit/delete product variants (Size, Color, Price)
- Dropdowns for variant sizes and colors
- Inline edit mode for variants
- Search/filter across products and variants
- Seed mock data from [DummyJSON API](https://dummyjson.com/products)
- Real-time persistence in localStorage
- Toast notifications on all user actions
- Fully responsive from mobile to desktop

---

## 🧠 Tech Stack

- **React + Vite** – fast SPA setup
- **TypeScript** – strict typing
- **React Query** – state caching & fetching
- **Zod** – form schema validation
- **React Hook Form** – performant form control
- **Shadcn UI** – Tailwind + Radix-based components
- **LocalStorage** – frontend persistence
- **Vitest + Testing Library** – unit-tested forms

---

## 📦 Getting Started

### 🛠️ Installation

```bash
git clone https://github.com/your-username/product-variant-manager.git
cd product-variant-manager
npm install
npm run dev
```

---

## 🌐 Live Demo

[https://your-live-link.netlify.app](https://your-live-link.netlify.app)

---

## 🧪 Testing

```bash
npm run test        # Run all tests
npm run test:watch  # Watch mode
npm run test:ui     # Optional: Visual test runner
```

Tests are written using `Vitest` and `@testing-library/react`. See `src/components/ProductForm.test.tsx`.

---

## 🖼️ Screenshots

| Landing Page                       | Product Manager                  |
| ---------------------------------- | -------------------------------- |
| ![](public/screenshot-landing.png) | ![](public/screenshot-store.png) |

---

## 🔗 API Integration

Optionally seeds products using:

- [https://dummyjson.com/products](https://dummyjson.com/products)

Each seeded product is initialized with a size (M), color (Red), and price from API.

---

## 🧾 Folder Structure

```
src/
├── components/           # ProductForm, ProductCard, Manager
├── features/products/    # Types, utils, logic
├── lib/                  # Storage & API helpers
├── pages/                # LandingPage
├── styles/               # Global CSS
├── App.tsx               # Router layout
└── main.tsx              # App entry
```

---

## ✅ License

MIT License © \[Your Name]

---
