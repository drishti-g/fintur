# Fintur — Design Document

> **AI-Powered Investment Decisions for Indian Markets**
> *Decision, not Information.*

---

## 📋 Overview

Fintur is a premium fintech landing page for an AI-powered retail investment decision platform targeting the Indian stock market (NSE/BSE). The platform's core philosophy is **"decision-first"** — instead of drowning users in charts and dashboards, Fintur delivers clear **Buy, Hold, or Sell verdicts** with confidence scores, risk flags, and plain-English explanations.

---

## 🎨 Design Philosophy

### Core Principles
- **Decision-first hierarchy** — Verdicts and confidence scores lead; data follows
- **Dual-depth design** — Beginners get ELI15 (Explain Like I'm 15); advanced users get full metrics
- **Cinematic premium feel** — Dark, ambient, minimal luxury with purposeful animations
- **Trust through clarity** — No jargon walls, no information overload

### Aesthetic Direction
- **Dark mode (default)**: Deep blacks with emerald/teal accents — evokes sophistication and trust
- **Light mode**: Warm ivory/off-white with deeper emerald tones — clean, editorial, chic
- Glassmorphism on cards with subtle backdrop blurs
- Ambient particle system for depth and engagement
- Micro-interactions on every interactive element

---

## 🎰 Color Palette

### Dark Mode
| Token              | Value       | Usage                          |
|--------------------|-------------|--------------------------------|
| `--bg-primary`     | `#0a0f0d`   | Page background                |
| `--bg-secondary`   | `#0d1412`   | Alternate section backgrounds  |
| `--bg-card`        | `#111a17`   | Card backgrounds               |
| `--bg-card-hover`  | `#162220`   | Card hover states              |
| `--emerald`        | `#34d399`   | Primary accent (brand)         |
| `--emerald-dim`    | `#059669`   | Secondary accent               |
| `--teal`           | `#2dd4bf`   | WOW feature accent             |
| `--text-primary`   | `#ecfdf5`   | Main text                      |
| `--text-secondary` | `#94a3b8`   | Body text / descriptions       |
| `--text-dim`       | `#475569`   | Labels / hints                 |
| `--red`            | `#f87171`   | Risk flags / red flags         |
| `--amber`          | `#fbbf24`   | Warnings / medium risk         |

### Light Mode
| Token              | Value       | Usage                          |
|--------------------|-------------|--------------------------------|
| `--bg-primary`     | `#f8f7f4`   | Warm ivory background          |
| `--bg-secondary`   | `#f0efeb`   | Alternate section backgrounds  |
| `--bg-card`        | `#ffffff`   | Card backgrounds               |
| `--emerald`        | `#059669`   | Deeper emerald for contrast    |
| `--teal`           | `#0d9488`   | Deeper teal for readability    |
| `--text-primary`   | `#1a1a1a`   | Near-black text                |
| `--text-secondary` | `#52525b`   | Body text                      |
| `--text-dim`       | `#a1a1aa`   | Labels / hints                 |

---

## 🔤 Typography

| Role         | Font Family      | Weight    | Usage                              |
|--------------|------------------|-----------|-------------------------------------|
| Headlines    | Space Grotesk    | 700       | Section titles, hero h1, verdicts   |
| Body         | Inter            | 400–700   | Paragraphs, descriptions, buttons   |
| Monospace    | JetBrains Mono   | 400–600   | Labels, badges, metrics, code-like  |

All fonts loaded via Google Fonts with `display=swap` for performance.

---

## 🏗 Page Structure

```
┌─────────────────────────────────────────┐
│  NAVBAR (fixed, glassmorphic)           │
│  Logo · Nav Links · Theme Toggle · CTA  │
├─────────────────────────────────────────┤
│  HERO SECTION                           │
│  Badge · H1 (typewriter) · Subtitle     │
│  Search Bar (locked) · CTA Button       │
│  Floating Stats Cards (right side)      │
├─────────────────────────────────────────┤
│  TRUST STRIP                            │
│  1200+ Stocks · 60s Analysis · 5 Risk   │
│  Dimensions · 100% Plain-English        │
├─────────────────────────────────────────┤
│  PROBLEM → SOLUTION STATEMENT           │
│  "Charts and dashboards" → "decision"   │
├─────────────────────────────────────────┤
│  FEATURES GRID (2×2)                    │
│  Stock Analysis (Primary) · ELI15 (Wow) │
│  Portfolio Doctor · Financial Advisor    │
├─────────────────────────────────────────┤
│  DECISION CARD DEMO                     │
│  Left: description + highlights         │
│  Right: mock Zomato decision card       │
├─────────────────────────────────────────┤
│  DOCUMENT INTELLIGENCE                  │
│  Left: description                      │
│  Right: Rajesh Exports case study       │
├─────────────────────────────────────────┤
│  COMPARISON TABLE                       │
│  Fintur vs ChatGPT, Groww, Varsity, etc │
├─────────────────────────────────────────┤
│  ADVISOR PREVIEW                        │
│  Left: mock chat interface              │
│  Right: feature description             │
├─────────────────────────────────────────┤
│  CTA SECTION                            │
│  Google Sign-in + disclaimer            │
├─────────────────────────────────────────┤
│  FOOTER                                 │
│  Brand · Product links · Company · Legal│
└─────────────────────────────────────────┘
```

---

## ✨ Interactions & Animations

| Element              | Interaction                                              |
|----------------------|----------------------------------------------------------|
| **Ambient Canvas**   | 80 floating particles with connections, mouse-reactive   |
| **Cursor Glow**      | 500px radial gradient follows mouse with easing          |
| **Typewriter**       | Hero h1 cycles: Digital → Smart → Intelligent → Decisive |
| **Scroll Reveal**    | Elements fade up on intersection (threshold: 0.1)        |
| **Trust Counters**   | Animated count-up on scroll into view                    |
| **Magnetic Buttons** | Buttons subtly follow cursor on hover                    |
| **Card Tilt**        | Feature & float cards tilt with perspective on hover     |
| **Parallax**         | Hero glows shift at different speeds on scroll           |
| **Theme Toggle**     | Sun/moon icon swap with rotation animation               |
| **Theme Transition** | Smooth 400ms cross-fade on all colors and backgrounds    |

---

## 🌓 Theme System

- Default: **Dark mode** (`data-theme="dark"` on `<html>`)
- Toggle: Sun/moon button in navbar (beside CTA)
- Persistence: `localStorage('fintur-theme')`
- FOUC prevention: Inline `<script>` in `<head>` reads saved theme before paint
- Implementation: CSS custom properties on `:root` (dark) and `[data-theme="light"]` (light)
- Particle system adapts colors and opacity per theme

---

## 📱 Responsive Breakpoints

| Breakpoint   | Behavior                                                    |
|--------------|-------------------------------------------------------------|
| `> 1024px`   | Full desktop layout — 2-column grids, floating cards        |
| `≤ 1024px`   | Nav collapses to hamburger, grids stack to single column    |
| `≤ 640px`    | Compact spacing, smaller fonts, stacked floating cards      |

---

## 📁 File Structure

```
fintur/
├── index.html      # Single-page markup (semantic HTML5)
├── styles.css      # Complete stylesheet (dark + light themes)
├── script.js       # Particles, animations, theme toggle, interactions
└── design.md       # This document
```

---

## 🔑 Key Features Showcased

1. **Stock Analysis** *(Core)* — AI reads annual reports, financials, technicals → visual decision card
2. **ELI15** *(Wow)* — One-button rewrite of analysis in plain language
3. **Portfolio Doctor** *(Side)* — Upload holdings → health score + rebalance suggestions
4. **Financial Advisor** *(Side)* — Conversational AI → personalized investment plan

---

## 🧰 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Structure  | Semantic HTML5                      |
| Styling    | Vanilla CSS with custom properties  |
| Logic      | Vanilla JavaScript (ES6+)          |
| Fonts      | Google Fonts (Inter, Space Grotesk, JetBrains Mono) |
| Hosting    | Static (any CDN / GitHub Pages)     |
| No frameworks, no build step — pure static site.    |

---

## 📜 SEO & Accessibility

- Descriptive `<title>` and `<meta description>`
- Semantic heading hierarchy (`h1` → `h2` → `h3`)
- `aria-label` on interactive elements (theme toggle, mobile menu)
- `preconnect` hints for Google Fonts
- All interactive elements keyboard-accessible
- `alt`-ready image structure

---

*Last updated: March 2026*
