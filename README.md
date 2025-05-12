# 🛍 Product Variant Manager

A fully responsive product + variant management app, inspired by Shopify’s interface.

Built with:

- ✅ React + TypeScript + Vite
- ✅ React Query for local state caching
- ✅ Shadcn UI for elegant component styling
- ✅ Zod + React Hook Form for schema-based form validation
- ✅ LocalStorage for persistence (no backend required)
- ✅ Optional: Seed real products from the Fake Store API

---

## ✨ Features

- Add products with names (e.g., "Sneakers", "T-shirt")
- Add/edit/delete product variants (Size, Color, Price)
- Search/filter across products and variants
- Fully responsive (mobile → desktop)
- Seed mock data from [Fake Store API](https://fakestoreapi.com/)
- Real-time persistence in localStorage
- Toast notifications on all user actions

---

## 🧠 Tech Stack

- **React + Vite** – fast SPA setup
- **TypeScript** – strict typing for better safety
- **React Query** – local state management
- **Zod** – form validation schema
- **React Hook Form** – performance-optimized form control
- **Shadcn UI** – Tailwind-based UI components
- **LocalStorage** – client-side data persistence

---

## 📦 Getting Started

### 🛠️ Installation

```bash
git clone https://github.com/your-username/product-variant-manager.git
cd product-variant-manager
npm install
npm run dev
```

## 🌐 Live Demo

---

## 🖼️ Screenshots

---

## 🔗 API Integration

This app optionally pulls products from:

- [https://fakestoreapi.com/products](https://fakestoreapi.com/products)

Each product is seeded with mock variant data (Size M, Red, price).

---

## 🧪 Bonus Features (Optional Extensions)

- Dropdowns for variant sizes and colors
- Variant edit mode with inline form
- Variant form validation
- Real-time search over all data
- Toast notifications via `sonner`

---

## 🧾 Folder Structure

```
src/
├── components/           # UI components
├── features/products/    # Types, utils, hooks for product logic
├── lib/                  # Storage + API utils
├── styles/               # Global Tailwind styles
└── App.tsx, main.tsx     # Entrypoint
```

---

## ✅ License

MIT License © \[Your Name]

---

## 📣 Feedback

Have feedback or suggestions? Create an issue or PR.
