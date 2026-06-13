# Etayaworks Building Company — Website

**Live on GitHub Pages:** `https://<your-username>.github.io/<repo-name>/`

---

## 🚀 How to Deploy to GitHub Pages

### Step 1 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click **New repository** (the green button).
3. Name it e.g. `etayaworks-website` (or any name you like).
4. Leave it **Public** (required for free GitHub Pages).
5. Click **Create repository**.

### Step 2 — Upload the Files
1. On your new empty repo page, click **uploading an existing file**.
2. Drag and drop **all files and folders** from this zip:
   - `index.html`
   - `css/style.css`
   - `js/main.js`
   - `_config.yml`
   - `README.md`
3. Scroll down and click **Commit changes**.

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages** (left sidebar).
2. Under **Source**, select **Deploy from a branch**.
3. Choose branch: **main** (or **master**) → folder: **/ (root)**.
4. Click **Save**.
5. Wait ~60 seconds, then your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

---

## 📧 Contact Form Setup (Formspree)

The contact form is wired to **Formspree** and will send emails to `etayaeugene33@gmail.com`.

**One-time activation required:**
1. Go to [formspree.io](https://formspree.io) and sign up for a free account using `etayaeugene33@gmail.com`.
2. Create a new form — Formspree will confirm your email.
3. Copy your **Form ID** (looks like `xpwzjqvb`) from the Formspree dashboard.
4. Open `index.html`, find this line:
   ```
   action="https://formspree.io/f/etayaeugene33@gmail.com"
   ```
   Replace it with:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
5. Commit the change. Done — form submissions will now arrive in your inbox.

> **Free Formspree plan:** 50 submissions/month. Upgrade if you need more.

---

## 📁 File Structure

```
etayaworks-github/
├── index.html          # Main website (all sections)
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Interactivity + Formspree form handler
├── _config.yml         # GitHub Pages config
└── README.md           # This file
```

---

## ✏️ Common Edits

| What to change | Where |
|---|---|
| Phone number | `index.html` — search `0758 913 245` |
| Email address | `index.html` — search `etayaeugene33@gmail.com` |
| Business address | `index.html` — search `Nairobi, Kenya` |
| Team member names/photos | `index.html` — Team section |
| Project photos | `index.html` — Projects section (Unsplash URLs) |
| Services | `index.html` — Services section |
| Google Map location | `index.html` — Map section (iframe src) |

---

© 2024 Etayaworks Building Company · NCA Registered · Nairobi, Kenya
