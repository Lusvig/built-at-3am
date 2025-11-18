# 🔞 DOOMSCROLL DETOX 🔞

**UGLY. NEON. UNAPOLOGETIC. UNESCAPABLE.**

A single-page hardcore doomscroll intervention site that will violently yeet you off the internet the moment your session hits 30 minutes. Made with maximum contempt for your attention span.

## Features

### Core Mechanics
- **30-Minute Session Limit**: Your time is up. Get yeeted to `about:blank` automatically.
- **Hardcore 24-Hour Tracking**: Visits are tracked via localStorage across your entire browser.
- **Rickroll Dimension**: Visit 3 times in 24 hours and the rickroll zone activates.
- **Fullscreen Rickroll Mode**: 
  - 10-minute base duration
  - **NO ESCAPE** - Close button disabled during rickroll
  - Volume stuck at 100%
  - Each refresh adds +1 minute to your sentence
  - Prevents scrolling and all normal interactions
- **Ugly Neon Aesthetic**: Flashing colors, glitching text, no mercy, no dignity.

### UI Elements
- Real-time session countdown with color-coded warnings
- Live visit tracking and "degeneracy level" display
- Refresh button to keep scrolling (but adds +1 min to rickroll timer if active)
- Nuclear RESET button to clear all 24h data
- Responsive design that works on mobile too

## How It Works

### LocalStorage Keys
```javascript
doomscroll_visits          // Array of timestamps of today's visits
doomscroll_session_start   // When current session started
doomscroll_rickroll_active // Whether rickroll is currently active
doomscroll_rickroll_end    // When rickroll zone expires
doomscroll_rickroll_refreshes // Number of refreshes during rickroll
```

### The Lifecycle

1. **Page Load**: 
   - Records visit timestamp
   - Starts 30-minute session countdown
   - Checks if 3+ visits exist in past 24h
   - Restores rickroll if it was interrupted

2. **During Session**:
   - Timer counts down in real-time
   - Color shifts: Green → Yellow (5 min left) → Red (1 min left)
   - UI updates visit count and last visit time

3. **After 30 Minutes**:
   - Session marked as "YEETED"
   - Redirect to `about:blank` after 2 seconds
   - localStorage persists visit data

4. **Rickroll Activation** (3+ visits in 24h):
   - Fullscreen overlay appears
   - Main container hidden
   - Close button disabled
   - Scroll prevention active
   - 10-minute timer starts
   - Each refresh adds +1 minute

5. **After Rickroll Duration**:
   - Close button becomes enabled
   - User can dismiss rickroll
   - All rickroll data cleared from localStorage

## Deployment

This is a single static HTML file with embedded CSS and JavaScript. Deploy to:
- GitHub Pages
- Netlify
- Vercel
- Any static file host

No build process needed. No tests running. No mercy.

## Browser Compatibility

- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Internet Explorer: ❌ NGMI

## The Vibe

Made at 4:20am with zero tests. Pure JavaScript, pure vibes, pure contempt for doomscrolling.

This is the vibe check the timeline needs.

**Ship it or ngmi.**
