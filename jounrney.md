1. Basic react set up
2. Created the pages
3. Configuring routes
4. Craeetd login adn sigup page

---


> # Color Scheme

| Element               | Color Class                                     | Notes                                           |
| --------------------- | ----------------------------------------------- | ----------------------------------------------- |
| **Page Background**   | `bg-surface`                                    | Keep it light and neutral for a minimal base.   |
| **Cards**             | `bg-surface` + shadow                           | White or very light with elevation.             |
| **Primary Buttons**   | `bg-primary text-white`                         | Lavender for brand recognition.                 |
| **Secondary Buttons** | `bg-surface border border-primary text-primary` | Outlined style for less emphasis.               |
| **Text (main)**       | `text-text-primary`                             | High contrast, readable.                        |
| **Text (secondary)**  | `text-text-secondary`                           | Subtle hints, for descriptions or placeholders. |
| **Accents**           | `bg-accent-green` / `bg-accent-pink`            | For emotional highlights (mood, success).       |
| **Dashboard graphs**  | Lavender tones as accents                       | Maintain theme consistency.                     |



## 🧭 Phase 1: Project Skeleton Setup

### 1. **Define Your Layout (Global Structure)**

> All major projects need a consistent layout, or the recruiter will bounce faster than your code compiles.

* [ ] Create a `Layout.jsx` file:

  * Navbar (top)
  * Sidebar (optional)
  * `Outlet` for routing content
* Use `Shadcn` components like `NavigationMenu`, `Sheet`, `Card`, `Button`.

🔁 Wrap all routes inside this layout except login/register pages.

---

## 🧱 Phase 2: Pages Setup

You’ve made routes already, now break it into pages with skeletons:

* [ ] **Home.jsx** – dashboard preview
* [ ] **Login.jsx / Register.jsx** – basic auth UI
* [ ] **Profile.jsx** – user info
* [ ] **Main Feature Pages** – based on your project's core purpose
  (You haven't told me the exact project theme yet — give me that and I’ll customize this list.)

Each page: start with a `<Card>` + Tailwind layout + heading + placeholder content.

---

## 🎨 Phase 3: UI Polish + Component Design

> You don't need to go Picasso-mode, but the UI should not scream *“HTML assignment by a sleepy fresher”*

* Use `Shadcn` components smartly:

  * `Card` for displaying info blocks
  * `Tabs` for filtering views
  * `Dialog` for modals/popups
  * `Toast` for notifications
  * `DropdownMenu` for user actions (logout, profile, etc.)

Style all components with Tailwind – make it clean, responsive, and minimal.
Don’t waste time over-designing. Function > Flair.

---

## 🧩 Phase 4: Integrate Backend (Spring Boot)

Once the UI skeleton is done:

* [ ] Set up Axios/fetch in a `services` folder.
* [ ] Make dummy API calls to test connectivity.
* [ ] Create basic login/register → backend integration
* [ ] Protect private routes using simple auth logic

---

## 💾 Phase 5: State Management

Start with local state (useState + context), then move to:

* `useContext` for user auth / theme
* (Optional) Zustand or Redux if needed later

---

## 📚 Phase 6: Documentation + Resume Focus

When everything is functional:

* Add README with:

  * Tech stack
  * Features
  * How to run locally
* Add screenshots/GIFs to README
* Push code to GitHub (clean commits)
* Link it in your resume under **Major Projects**

---

## 👀 Quick Checklist:

| Task                                        | Done? |
| ------------------------------------------- | ----- |
| Project structure created                   | ✅     |
| Routing using react-router-dom              | ✅     |
| Tailwind + Shadcn configured                | ✅     |
| Layout component                            | ⏳     |
| Page skeletons (Home, Login, Feature pages) | ⏳     |
| Shadcn components integration               | ⏳     |
| API integration with Spring Boot            | ⏳     |
| Auth + Protected routes                     | ⏳     |
| Final polish + testing                      | ⏳     |
| GitHub + Resume update                      | ⏳     |

---
