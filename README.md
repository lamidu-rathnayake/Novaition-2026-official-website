# 🚀 Novaition 2026 – Official Website

Welcome to the **Novaition 2026** official website repository.

This project is built and maintained by **SLTC IEEE IAS Student Branch** members to create a modern, high‑performance event website for **Novaition 2026** — an AI‑focused university event open to students from SLTC and other universities.

This README is **not optional reading**. It defines how we work, how we design, and how we collaborate. Following these rules keeps the project fast, clean, and stress‑free.

---

## 🌐 About the Event

**Novaition 2026** is a future‑focused technology event centered on:

* Artificial Intelligence (AI)
* Generative AI (Gen‑AI)
* Practical AI tools for productivity
* Using AI to build income streams
* Optimizing workflows with modern tech

The event brings together **industry leaders, researchers, and practitioners** to share real‑world knowledge with students.

📍 Organized by: **SLTC IEEE IAS Student Branch**
🎓 Audience: SLTC students & students from other universities
🎤 Sessions: Talks, workshops, and hands‑on learning

---

## 🧠 Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS v4 (CSS‑first config)**
* **GSAP** (for animations & transitions)
* **Google Fonts (BBH Bogle & BBH Bartle)**
* **GitHub (feature‑branch workflow)**

---

## 🎨 Design System (Strict Rules)

### Color Palette (ONLY these colors)

| Purpose               | Color      | Hex       |
| --------------------- | ---------- | --------- |
| Primary Accent        | Lime       | `#BFED07` |
| Text (Primary)        | White      | `#FFFFFF` |
| Background (Light)    | Black      | `#000000` |
| Muted / Dark Sections | Near Black | `#0F0F0F` |

❗ **Do NOT introduce new colors without approval**

Use Tailwind tokens only:

* `bg-background`
* `bg-primary`
* `text-foreground`
* `bg-muted`

---

### Typography Rules

**Primary Font:** BBH Bogle
**Display / Accent Font:** BBH Bartle (only if explicitly required)

#### Text Scale (3 sizes only)

| Usage                | HTML Tag | Tailwind Size          |
| -------------------- | -------- | ---------------------- |
| Section Names / Hero | `h1`     | `text-4xl md:text-6xl` |
| Section Titles       | `h2`     | `text-2xl md:text-3xl` |
| Body Text            | `p`      | `text-base`            |

Rules:

* Use semantic tags (`h1`, `h2`, `p`)
* ❌ No arbitrary text sizes
* ❌ No inline font styles

---

## 📐 Spacing System (Industry‑Standard)

We follow a **4 / 8 / 16 / 24 / 32 / 64** spacing scale.

### Section Padding

| Device  | Vertical Padding |
| ------- | ---------------- |
| Mobile  | `py-16`          |
| Tablet  | `md:py-20`       |
| Desktop | `md:py-28`       |

### Horizontal Padding

All sections must use:

```html
<section class="page-container">
```

Do not manually add left/right padding.

---

## 📱 Responsiveness Rules

* Mobile‑first design
* Breakpoints:

  * Default → Mobile
  * `md:` → Tablet
  * `lg:` → Desktop

❌ No custom breakpoints without discussion

---

## ✨ Animations (GSAP Rules)

* GSAP is used for **motion only**
* Tailwind handles layout & visuals

Rules:

* ❌ No animation logic inside `page.tsx`
* ✅ GSAP logic goes inside `animations/`
* ✅ Use class names to mark animated elements

---

## 🧩 Component Rules

* One component = one responsibility
* Reusable UI goes in `components/ui`
* Page‑specific sections go in `components/sections`
* No business logic inside layout files

---

## 🌳 Git & Collaboration Workflow

### Branch Rules (MANDATORY)

* ❌ No direct commits to `main`
* ❌ No large features on `develop`

### Correct Workflow

1. Create a new branch for **each new section**

   ```
   feature/hero-section
   feature/speakers-section
   feature/registration-form
   ```

2. Complete the section

3. Push the branch

4. Open a Pull Request (PR)

5. **Inform the project leader before merging**

6. Merge only after review

❗ Any unapproved merge may be reverted.

---

## 🧪 Code Quality Rules

* No unused files
* No commented‑out code
* No inline styles
* No random spacing values
* ESLint errors must be fixed before PR

---

## 🏁 Final Notes

This project is a **team effort**. Speed comes from clarity, not shortcuts.

If you are unsure:

* Ask before coding
* Follow the design system
* Respect the workflow

Let’s build something **clean, modern, and worthy of Novaition 2026**.

---

**Novaition 2026**
Built by SLTC IEEE IAS Student Branch
