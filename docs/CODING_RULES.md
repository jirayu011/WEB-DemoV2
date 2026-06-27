# GHCC Digital Hub - Coding Rules

Version: 2.0

---

# Objective

This document defines the engineering rules that every AI coding assistant (Codex, ChatGPT, GitHub Copilot, Claude, etc.) must follow when modifying this project.

The primary objective is to improve the UI and user experience without breaking existing functionality.

Every modification must prioritize stability, maintainability, consistency, and visual quality.

---

# Project Goal

Transform the existing system into a world-class Enterprise Digital Hub.

The website should feel like

Apple

*

Microsoft Fluent

*

Stripe

*

Linear

*

VisionOS

The code should remain clean, modular, reusable, and easy to maintain.

---

# General Rules

Always

✓ Read DESIGN_SYSTEM.md before making changes.

✓ Read COMPONENTS.md before creating new UI.

✓ Analyze the existing code before editing.

✓ Reuse existing components whenever possible.

✓ Keep the code clean.

✓ Keep the code readable.

✓ Follow existing architecture.

Never

❌ Rewrite the whole page unnecessarily.

❌ Change business logic.

❌ Break JavaScript.

❌ Delete working code.

❌ Create duplicate components.

---

# HTML Rules

Keep the existing HTML structure whenever possible.

Do not

* rename IDs
* remove IDs
* remove data attributes
* change element hierarchy unnecessarily

Avoid excessive nesting.

Use semantic HTML.

Preferred

header

main

section

article

footer

button

nav

form

label

---

# CSS Rules

Prefer

CSS Variables

Reusable Classes

Component Styling

Consistent Naming

Never

Inline CSS

!important

Duplicated styles

Deep selector chains

Create reusable utilities whenever possible.

---

# JavaScript Rules

Do NOT

Rename

Functions

Variables

IDs

Classes used by JS

Do NOT

Remove Event Listeners

Modify API calls

Modify Backend Logic

Change JSON structure

Unless explicitly requested.

---

# File Structure

Keep folders organized.

Recommended

css/

components/

pages/

js/

config/

data/

assets/

docs/

Never place unrelated files together.

---

# Component Rules

Every new UI element must follow COMPONENTS.md.

Buttons

Cards

Tables

Forms

Navigation

Footer

Modal

Dropdown

must all remain visually consistent.

---

# UI Rules

The website must always feel

Premium

Luxury

Modern

Friendly

Professional

Every page should share the same design language.

---

# Performance Rules

Avoid

Large CSS libraries

Duplicate JavaScript

Heavy animations

Large images

Prefer

CSS transitions

SVG icons

Optimized assets

Lazy loading when appropriate.

---

# Animation Rules

Use only

Fade

Slide

Scale

Lift

Duration

200~300ms

Never

Bounce

Flash

Shake

Spin endlessly

Excessive motion

Animations should support usability, not distract users.

---

# Accessibility Rules

Always

Visible focus state

Keyboard navigation

ARIA where appropriate

Minimum touch target

44px

Readable contrast

Avoid relying only on color.

---

# Responsive Rules

Desktop First

Then

Tablet

Then

Mobile

Do not hide important features on mobile.

Adjust layout only when necessary.

---

# Design Consistency

Every page should feel like it belongs to the same product.

Spacing

Typography

Radius

Shadows

Animations

Colors

must remain consistent.

---

# Reusable Components

Before creating anything new

Search for an existing component.

If one exists

Reuse it.

If not

Create a reusable version.

Never duplicate the same UI multiple times.

---

# Code Style

Write clean code.

Use meaningful variable names.

Use descriptive class names.

Keep indentation consistent.

Remove dead code.

Avoid commented-out legacy code.

---

# Before Editing

Always

Analyze

↓

Plan

↓

Implement

↓

Review

↓

Optimize

Do not immediately start editing files.

---

# After Editing

Always review

Visual consistency

Spacing

Responsive behavior

Accessibility

Performance

Animation

Broken layout

Broken JavaScript

---

# Quality Checklist

Before completing work verify

✓ No console errors

✓ No broken links

✓ Responsive layout works

✓ JavaScript still functions

✓ Existing features unchanged

✓ UI improved

✓ Code remains maintainable

---

# Things You Must Never Change

Unless explicitly requested

Backend

API

Authentication

Permissions

Routing

Database logic

Business rules

Existing workflow

---

# If UI Can Be Improved

Allowed

Typography

Spacing

Cards

Buttons

Icons

Colors

Gradients

Glass effects

Hover effects

Animations

Shadows

Layout spacing

Responsive spacing

Not Allowed

Changing user workflow

Changing functionality

Removing existing features

---

# AI Workflow

Step 1

Read DESIGN_SYSTEM.md

Step 2

Read COMPONENTS.md

Step 3

Analyze current implementation

Step 4

Explain improvement plan

Step 5

Implement changes

Step 6

Review visual consistency

Step 7

Optimize code

---

# Final Design Goal

Every screen should feel

Elegant

Minimal

Premium

Comfortable

Modern

Trustworthy

Approachable

Professional

The user should immediately feel

"This looks like software built by a world-class organization."

Never settle for "good enough."

Always strive for polished, production-quality UI while preserving every existing feature and interaction.
