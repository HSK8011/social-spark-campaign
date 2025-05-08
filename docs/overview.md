# Social Media Management Platform Documentation

## Overview
This document provides a comprehensive guide to the social media management platform, detailing each page's functionality, components, and data structures.

## Navigation Structure

### Main Navigation
- **Dashboard** (`/dashboard`) - Main overview and analytics
- **Connect** (`/connect`) - Social media account connections
- **Publish** (`/publish/*`) - Content publishing and management
  - Queued Posts (`/publish/queued`)
  - Manage Queue Times (`/publish/schedule`)
  - Pending Approval (`/publish/pending-approval`)
  - Drafts (`/publish/drafts`)
  - Delivered (`/publish/delivered`)
- **Engage** (`/engage`) - Engagement management
- **Promote** (`/promote`) - Promotion tools (PRO)
- **Analyze** (`/analyze`) - Analytics and insights (PRO)

### User Menu
- Settings (`/settings`)
- Manage Users (`/users`)
- Profile
- Logout

## Common Components

### AppShell
The main layout wrapper that provides:
- Top navigation bar with:
  - Search functionality
  - Notifications
  - User profile menu
- Sidebar with main navigation
- Responsive design (collapses on mobile)

### Authentication
- Login/Register modals
- Protected route handling
- Session management

### Data Providers
The app uses several context providers:
- `AuthProvider` - Authentication state
- `SocialAccountsProvider` - Connected social accounts
- `PostsProvider` - Content management
- `UsersProvider` - User management

## Theme and Styling
- Uses Tailwind CSS for styling
- Consistent color scheme:
  - Primary: Blue
  - Secondary: Gray
  - Accent colors for different states
- Responsive design breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px 