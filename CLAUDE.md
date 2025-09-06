# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static wedding website for Emma & James, hosted on GitHub Pages. It's a single-page application with smooth scrolling navigation between sections: Hero, Information, Travel, RSVP, Gifts, and Contact.

## Architecture

- **Static HTML/CSS/JS**: No build process or frameworks required
- **Single page application**: All content in `index.html` with section-based navigation
- **Responsive design**: Mobile-first approach with CSS Grid and Flexbox
- **Styling**: Uses Google Fonts (Playfair Display, Inter) with a green color scheme (#6B8E5A primary)
- **JavaScript functionality**: Navbar scroll effects and smooth scrolling navigation

## File Structure

- `index.html` - Main page with all content sections
- `styles.css` - All styling with mobile responsive breakpoints
- `script.js` - Navigation interactivity (scroll effects, smooth scrolling)

## Development

Since this is a static site, simply open `index.html` in a browser to view changes. No build commands or dependencies required.

## Design System

- **Primary color**: #6B8E5A (sage green)
- **Secondary color**: #A8C49A (light green)
- **Typography**: Playfair Display for headings, Inter for body text
- **Layout**: CSS Grid for card layouts, Flexbox for navigation
- **Animations**: fadeInUp keyframes for hero content, hover transitions on cards