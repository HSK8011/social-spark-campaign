# Analytics Page Documentation

## Overview
The Analytics page provides comprehensive insights into social media performance across all connected accounts, with detailed metrics and engagement data.

## Page Structure
- Wrapped in `AppShell` component
- Full-width analytics card
- Tabbed interface for different views

## Header Controls
### Account Selector
- Avatar display
- Account name
- Dropdown for switching accounts
- Current selection indicator

### Time Range Selector
- Default: "30 Days"
- Dropdown for different time ranges
- Custom date range option
- Quick select options

## Tab Navigation
### General Tab
- **Metrics Grid**
  - Posts Count
  - Total Likes
  - Total Views
  - Comments Count
  - Shares Count
  - Each metric shows:
    - Icon
    - Numeric value
    - Label
    - Responsive sizing

- **Most Engaged Posts Section**
  - Top 3 posts by engagement
  - For each post:
    - Account info with avatar
    - Post timestamp
    - Engagement grid
    - Post content
    - Engagement metrics:
      - Likes
      - Comments
      - Shares
      - Views

### Posts Tab
- **All Posts List**
  - Chronological order
  - For each post:
    - Account details
    - Post timestamp
    - Media preview (if available)
    - Post content
    - Engagement metrics

## Data Integration
- Uses `PostsContext` for post data
- Uses `SocialAccountsContext` for account info
- Real-time data updates
- Engagement calculations

## Responsive Design
### Desktop (> 1024px)
- 5-column metrics grid
- Side-by-side layouts
- Full post previews

### Tablet (768px - 1024px)
- 3-column metrics grid
- Balanced layouts
- Optimized spacing

### Mobile (< 768px)
- 2-column metrics grid
- Stacked layouts
- Condensed information
- Scrollable content

## Interactive Features
- **Account Switching**
  - Instant metric updates
  - Data preservation
  - Loading states

- **Time Range Selection**
  - Dynamic data loading
  - Date range validation
  - Custom range picker

- **Post Interactions**
  - Click to expand
  - Share options
  - Quick actions

## Performance Features
- Lazy loading of posts
- Optimized image loading
- Data caching
- Smooth transitions

## Error Handling
- Data loading states
- Error messages
- Fallback content
- Retry options

## Metrics Calculation
- Engagement rate formula
- Growth calculations
- Trend analysis
- Performance comparisons

## Export Options
- CSV download
- PDF reports
- Custom date ranges
- Metric selection 