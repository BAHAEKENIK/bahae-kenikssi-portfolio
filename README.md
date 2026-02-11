# Bahae Kenikssi Portfolio

Personal portfolio website built with React and Vite. It showcases projects, experience, skills, certificates, and a contact form.

Live site
- `https://bahae-kenikssi-portfolio.vercel.app/`

## Overview
This project is a single-page portfolio with smooth animations, responsive layout, and a contact form powered by EmailJS. Content is driven by JSON data files and translations.

## Features
- Hero section with profile image and call-to-action buttons
- About, Experience, Projects, Skills, Certificates, and Contact sections
- Contact form with EmailJS integration
- Responsive layout for desktop and mobile
- Animated UI using Framer Motion
- i18n support with English and French translation files

## Tech Stack
- React 18
- Vite
- styled-components
- Framer Motion
- i18next and react-i18next
- EmailJS

## Project Structure
```
src/
  components/
  config/
    emailjs.js
  data/
    certificates.json
    experience.json
    projects.json
    skills.json
  hooks/
  locales/
    en/translation.json
    fr/translation.json
  sections/
    About/
    Certificates/
    Contact/
    Experience/
    Footer/
    Hero/
    Projects/
    Skills/
  styles/
  App.jsx
  i18n.js
  main.jsx
public/
  assets/images/
  cv/
```

## Getting Started
Prerequisites
- Node.js 18 or newer

Install
- `npm install`

Run locally
- `npm run dev`

Build
- `npm run build`

Preview production build
- `npm run preview`

## Configuration
EmailJS setup
- Update `src/config/emailjs.js` with your EmailJS credentials.
- The contact form uses the following template variables:
- `{{from_name}}`
- `{{from_email}}`
- `{{message}}`
- `{{to_name}}`
- `{{reply_to}}`

If you do not want to use EmailJS, remove the contact form logic in `src/hooks/useContactForm.js` and update `src/sections/Contact/Contact.jsx` accordingly.

## Content Management
Edit data files
- `src/data/experience.json`
- `src/data/projects.json`
- `src/data/skills.json`
- `src/data/certificates.json`

Edit translations
- `src/locales/en/translation.json`
- `src/locales/fr/translation.json`

Update assets
- Profile image and section images live under `public/assets/images/`
- CV files live under `public/cv/`

## Deployment
This project is Vite-based and deploys cleanly to static hosts like Vercel.

Vercel steps
- Import the repository in Vercel
- Build command: `npm run build`
- Output directory: `dist`

## Scripts
- `npm run dev` starts the local dev server
- `npm run build` builds for production
- `npm run preview` previews the production build
- `npm run lint` runs ESLint
