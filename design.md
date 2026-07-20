---
name: Tubezip Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#45464c'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#575e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141b2b'
  on-primary-container: '#7d8497'
  inverse-primary: '#c0c6db'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#261906'
  on-tertiary-container: '#968065'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f7'
  primary-fixed-dim: '#c0c6db'
  on-primary-fixed: '#141b2b'
  on-primary-fixed-variant: '#404758'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#f9debf'
  tertiary-fixed-dim: '#dcc2a4'
  on-tertiary-fixed: '#261906'
  on-tertiary-fixed-variant: '#55442d'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  mono:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system is built for a premium AI-powered learning environment where focus and clarity are paramount. The aesthetic is a fusion of **Corporate Modernism** and **Utility-Driven Minimalism**, heavily influenced by the precision of developer-centric tools. 

The personality is intellectual and high-velocity. It utilizes extreme whitespace to reduce cognitive load, allowing the AI-generated insights to remain the focal point. The visual language avoids decorative flourishes like gradients or glassmorphism in favor of structural integrity, crisp borders, and a rigorous adherence to a functional grid. The emotional response should be one of quiet confidence and effortless productivity.

## Colors
This design system employs a restricted, high-contrast palette to establish a professional and authoritative tone. 

- **Primary (#111827):** Used for core branding, primary actions, and deep structural elements.
- **Accent (#2563EB):** Reserved for interactive cues, progress indicators, and AI-specific highlights. Use sparingly to maintain the minimalist intent.
- **Backgrounds:** The main canvas is pure White (#FFFFFF), with Secondary BG (#F8FAFC) used for sidebars, grouped content, or inset areas to create subtle hierarchy without shadows.
- **Borders (#E5E7EB):** The primary method of separation. All dividers and component outlines use this value to maintain a "flat" but structured appearance.

## Typography
The system uses a dual-sans approach. **Geist** provides a technical, precise feel for headings and UI labels, while **Inter** is used for body copy to ensure maximum readability during long learning sessions.

Tighten letter-spacing on larger display type to achieve the "Linear" look. For technical data or AI-generated code snippets, use JetBrains Mono. Ensure that all heading levels (H1-H3) use a semi-bold or bold weight to provide a strong visual anchor against the surrounding whitespace.

## Layout & Spacing
The design system follows a strict **8pt Grid System**. All dimensions, padding, and margins must be multiples of 8 (with 4px used only for micro-adjustments in tight UI clusters).

- **Grid:** Use a 12-column fluid grid for desktop with a maximum container width of 1280px. 
- **Structure:** Lean heavily on vertical stacking and consistent side padding to create a "document-like" feel.
- **Adaptive Rules:** On mobile, margins reduce to 16px. Sidebars should transform into bottom sheets or full-screen overlays to maintain focus. Use large 48px or 64px gaps to separate major sections of the learning interface.

## Elevation & Depth
In alignment with the "Flat Modern" style, this design system avoids heavy drop shadows and traditional depth. 

- **Tonal Layering:** Hierarchy is achieved primarily through background color changes (White vs. #F8FAFC) and 1px borders (#E5E7EB).
- **Soft Shadows:** Only used for floating elements like dropdown menus, popovers, or active modals. These shadows must be highly diffused (e.g., `0 10px 15px -3px rgba(0,0,0,0.05)`), appearing more like an ambient glow than a physical shadow.
- **Focus States:** Use a 2px offset ring in the Accent color (#2563EB) to indicate keyboard navigation or active input fields.

## Shapes
The shape language is "Rounded" to soften the professional tone and make the platform feel modern and approachable. 

- **Standard Elements:** Buttons, inputs, and small cards use a 0.5rem (8px) radius.
- **Large Containers:** Content cards, video players, and main layout wrappers use `rounded-xl` (1.5rem / 24px) to create a distinct frame for learning materials.
- **Interactive States:** Maintain consistent corner radii across all states (hover, active, disabled) to ensure visual stability.

## Components
- **Buttons:** Primary buttons are solid Deep Navy (#111827) with White text. Secondary buttons are White with a 1px border (#E5E7EB). All buttons feature a subtle transition on hover (background color shift).
- **Inputs:** Text fields use the #F8FAFC background with a 1px #E5E7EB border. On focus, the border transitions to the Accent color (#2563EB).
- **Cards:** Cards should be flat with a 1px border. Do not use shadows for static cards; reserve shadows only for cards that the user can drag or interact with in a 3D space.
- **Chips:** Used for category tags (e.g., "AI Summary," "Transcript"). Use a light gray background (#F1F5F9) with #475569 text and a `rounded-full` (pill) shape.
- **AI Specifics:** Any AI-generated content (like summaries) should be housed in a container with a subtle 1px border in the Accent color or a very faint tint background to distinguish "system-generated" vs. "user-generated" content.
- **Lists:** Clean, border-bottom separated rows with ample vertical padding (16px). Use Geist Mono for metadata like timestamps or file sizes.