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

[https://ola-bima-melon-ui-submission.netlify.app/](https://your-live-link.netlify.app)

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
| <img width="1362" alt="image" src="https://github.com/user-attachments/assets/fa9e86d5-8a84-4d93-8e92-da61c15ad11f" />
 <img width="1362" alt="image" src="https://github.com/user-attachments/assets/af3229e9-f712-4c2a-97b8-2d57a9db26d5" />

 | <img width="1362" alt="image" src="https://github.com/user-attachments/assets/d32dee7b-cb7c-41b1-a39d-a84498186bb0" />
 <img width="1362" alt="image" src="https://github.com/user-attachments/assets/2fadf419-754e-4b4c-8319-c138bb30f64b" /> 
 <img width="1362" alt="image" src="https://github.com/user-attachments/assets/5db23b3a-b550-4f37-a899-b686da7fd553" />
<img width="1362" alt="image" src="https://github.com/user-attachments/assets/f5d764fa-0ede-4388-8c22-67fec39e0f07" />

 |

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
