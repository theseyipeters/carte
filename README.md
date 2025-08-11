# CARTE

> _Your map to great books — discover your next great read, one page at a time._

---

## Overview

**CARTE** (translated as "Books" in Romanian) is a modern book discovery app built with **Vite + React + TypeScript**.
It connects to the **Google Books API** to let users search for books, explore details, and keep discovering through an intuitive interface.

Whether you're after a classic novel, a trending bestseller, or a niche genre, CARTE helps you find it — _one page at a time_.

---

## Architecture/Design Decisions

- I decided to make use of **Redux Toolkit** for state management as it supports the use of async thunks to handle asynchronous requests, loading states, and error management. This helps keep our components clean and separates requests from it.

- I also made use of **Tailwind CSS** to speed up styling, and handle responsive capabilities in a traceable and generic fashion and especially because this is a time-sensitive project.

- To show more book details, I decided to go for a Dialog as **Google Books API** already returns all the data we need per book in the `fetchBooks` request. Hence creating a new page and fetching a book by id wouldn't be neccessary, this way, users can stay in one page and see everything they need to see about a book within one page, especially considering it's a search interface, and they're looking for something. We don't want to break their flow.

---

## Features

- 🔍 **Search** for books by title (powered by Google Books API)
- 📄 **Detailed book cards** with title, author, cover image, and more
- 📚 **Suggested** section highlighting suggested picks
- ⏳ **Pagination** for long search results
- 📱 **Responsive UI** — works beautifully on desktop and mobile
- ⚡ Built for **speed** and **developer experience** with Vite & TypeScript

---

## Tech Stack

- **Frontend Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Icons:** [Iconify](https://iconify.design/)
- **API:** [Google Books API](https://developers.google.com/books)
- **Fonts:** [Google Fonts](https://fonts.google.com/)

---

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/theseyipeters/carte.git
cd carte
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open in your browser:

```
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Project Structure

```
src/
 ├─ components/        # Reusable UI components
 ├─ pages/             # Page-level components (Homepage, etc.)
 ├─ redux/             # Redux slices & store setup
 ├─ hooks/             # Custom React hooks
 ├─ svgs/              # SVG assets
 ├─ utils/             # Utility functions
 └─ App.tsx            # Root application component
```

---

## Resources Used

- **[Google Books API](https://developers.google.com/books)** — for book search and metadata
- **[Google Fonts](https://fonts.google.com/)** — typography
- **[Iconify](https://iconify.design/)** — icons

---

**CARTE** — _Your map to great books_
