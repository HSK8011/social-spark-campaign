# Dashboard Documentation

## Overview
The Dashboard serves as the main control center for users after login, providing quick access to key metrics, recent activities, and important notifications.

## Layout Structure
- Wrapped in `AppShell` component
- Full-width content area
- Responsive grid layout

## Components

### Quick Stats Section
- **Card Grid Layout**
  - Total Posts
  - Engagement Rate
  - Audience Growth
  - Pending Approvals
  - Each card shows:
    - Icon
    - Metric value
    - Label
    - Trend indicator

### Recent Posts
- **Posts List**
  - Post preview with:
    - Account avatar
    - Account name
    - Timestamp
    - Content preview
    - Engagement metrics
  - "View More" link to full posts page
- **Sorting**
  - Most recent first
  - Limited to last 5 posts

### Account Overview
- **Connected Accounts**
  - Platform icons
  - Account names
  - Connection status
  - Quick actions
- **Add Account Button**
  - Links to `/connect/new`

### Upcoming Schedule
- **Timeline View**
  - Next 24 hours of scheduled posts
  - Time indicators
  - Post previews
- **Quick Actions**
  - Edit post
  - Delete post
  - Reschedule post

### Performance Metrics
- **Graph Components**
  - Engagement over time
  - Post performance
  - Audience growth
- **Time Range Selector**
  - Day
  - Week
  - Month
  - Custom range

## Data Integration
- Uses multiple context providers:
  - `PostsContext` for post data
  - `SocialAccountsContext` for account info
  - `UsersContext` for user permissions

## Responsive Design
- **Desktop** (> 1024px)
  - 4-column grid for stats
  - Side-by-side layouts
  - Full feature set

- **Tablet** (768px - 1024px)
  - 2-column grid
  - Stacked layouts
  - Condensed metrics

- **Mobile** (< 768px)
  - Single column
  - Scrollable sections
  - Essential metrics only

## Interactions
- **Refresh Data**
  - Manual refresh button
  - Auto-refresh every 5 minutes
- **Quick Actions**
  - Create new post
  - Connect account
  - View analytics
- **Navigation**
  - Quick links to all main sections
  - Context-aware breadcrumbs

## Error States
- Loading placeholders
- Error boundaries
- Retry mechanisms
- Offline indicators

## Performance Considerations
- Lazy loading of graphs
- Pagination for lists
- Optimized images
- Caching of frequently accessed data 