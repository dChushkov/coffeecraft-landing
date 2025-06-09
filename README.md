# CoffeeCraft Landing Page

A modern, responsive, and accessible static landing page for a premium coffee brand. Built with HTML5, Tailwind CSS (via CDN), and vanilla JavaScript. Optimized for speed, SEO, and deployment on GitHub Pages.

## Features

- 🎨 Alternating section backgrounds for beautiful visual flow
- 📱 Fully responsive and mobile-friendly
- ⚡ Fast loading (lazy images, lazy YouTube embed)
- ♿ Accessibility-ready (semantic HTML, keyboard navigation, focus styles)
- 🔍 SEO-friendly (semantic tags, alt text, meta description)
- 🧑‍💻 No build tools, no frameworks, just HTML + CSS + JS
- 🖼️ Optimized images (WebP, SVG)
- 🧪 Easy to test locally or deploy anywhere

## Live Demo

> After deployment, your site will be available at:
> `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/`

## Project Structure

```
/coffeecraft-landing
|-- index.html          # Main HTML file
|-- /css
|   |-- styles.css      # Custom styles and Tailwind extensions
|-- /js
|   |-- main.js         # JavaScript functionality
|-- /assets
|   |-- /img           # WebP images (products, users, hero, etc.)
|   |-- /icons         # SVG icons (social, benefits)
|-- favicon.ico        # Site favicon
|-- README.md
```

## Key Sections
- **Hero**: Main message and CTA
- **Benefits**: 4 key coffee benefits with icons
- **Products**: 3 featured coffees with images and demo order popup
- **Video**: Lazy-loaded YouTube embed (loads only on click)
- **Testimonials**: Real user feedback with images
- **How We Brew**: Process image and description
- **CTA**: Final call to action
- **Footer**: Brand, links, contact, social, copyright

## Technologies Used
- HTML5 (semantic, accessible)
- Tailwind CSS (CDN, utility classes, custom palette)
- Vanilla JavaScript (ES6+)
- WebP images, SVG icons

## How to Run Locally

1. **Clone the repo:**
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```
2. **Open:**
   - Open `index.html` in your browser or use VS Code Live Server extension.

## How to Deploy on GitHub Pages
1. Push all files to your GitHub repo (branch: `main`).
2. Go to **Settings > Pages** in your repo.
3. Set source to `main` branch, `/ (root)` folder.
4. Save and wait a few minutes.
5. Your site will be live at:
   - `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/`

## Customization
- Change images in `/assets/img` and `/assets/icons`.
- Change video by editing the YouTube ID in `index.html` and `js/main.js`.
- Edit colors by adjusting Tailwind classes or custom CSS.

## License
MIT License – free to use, modify, and share.

---

**Made with ☕ and Tailwind CSS.** 