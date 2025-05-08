# Landing Page Documentation

## Overview
The landing page serves as the entry point for non-authenticated users, showcasing the platform's features and providing access to authentication.

## Components

### Navigation Bar (`LandingNav`)
- **Logo** - Links to home page
- **Main Navigation Links**
  - Tools
  - Pricing
  - Resources
  - About
  - Customers
- **Authentication Buttons**
  - "Get Started Now" - Opens registration modal
  - "Login" - Opens login modal

### Authentication Modals
- **Login Modal**
  - Email/Username field
  - Password field
  - Remember me checkbox
  - Forgot password link
  - Login button
  - Switch to registration option

- **Registration Modal**
  - Name fields
  - Email field
  - Password field
  - Terms acceptance checkbox
  - Registration button
  - Switch to login option

## Routing Logic
- If user is not authenticated:
  - Shows landing page content
  - Provides access to authentication
- If user is authenticated:
  - Automatically redirects to `/dashboard`

## Responsive Behavior
- **Desktop**
  - Full navigation menu visible
  - Side-by-side layout for content sections
  - Modals centered with overlay

- **Tablet**
  - Condensed navigation menu
  - Responsive grid layout
  - Full-width modals

- **Mobile**
  - Hamburger menu for navigation
  - Stacked layout
  - Full-screen modals

## State Management
- Uses `AuthContext` for authentication state
- Modal states managed locally:
  - `showLoginModal`
  - `showRegisterModal`

## Design Elements
- Clean, modern interface
- Prominent call-to-action buttons
- Professional color scheme
- Smooth transitions and animations
- Accessible form controls

## Error Handling
- Form validation feedback
- Authentication error messages
- Network error handling
- Loading states for async operations 