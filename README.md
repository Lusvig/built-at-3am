# 🔞 DOOMSCROLL DETOX 🔞

**UGLY. NEON. UNAPOLOGETIC. UNESCAPABLE.**

A single-page hardcore doomscroll intervention site that will violently yeet you off the internet the moment your session hits 30 minutes. Made with maximum contempt for your attention span. **EVERYTHING IN ONE HTML FILE - COPY PASTE READY**.

## 🎯 Features

### Core Mechanics
- **30-Minute Session Timer**: Massive aggressive countdown starting at exactly 30:00
- **Instant Rickroll Punishment**: When timer hits 00:00, fullscreen locks the browser and blasts Never Gonna Give You Up at full volume
- **3-Visit Detector**: LocalStorage tracks visits in last 24h - hit 3+ and skip straight to 10-minute rickroll
- **Refresh Stacking**: Every refresh/reload during rickroll adds +1 minute to your punishment (infinitely stackable)
- **NO ESCAPE**: Fullscreen API locks you in, Escape key disabled, close button disabled until time expires
- **Peak 2007 MySpace Vibes**: Neon cyan/pink/magenta, Comic Sans, blinking text, marquee tags, seizure-inducing gradient
- **Mobile Ready**: Forces fullscreen on mobile, responsive design works on all screen sizes
- **Zero Dependencies**: Uses YouTube nocookie embed - no npm install, no build tools, pure HTML/CSS/JS

### Visual Elements
- ⏰ Pulsing "BUILT AT 3AM" badge
- 🚨 Animated marquee warnings
- 💫 Glitching title animations
- ⚠️ Blinking critical warnings
- 🚧 Rotating "UNDER CONSTRUCTION" GIF vibes
- 📊 Live stats on visits and degeneracy level
- 🌈 Seizure-inducing animated gradient background

## 🚀 Deployment

**Ready to ship in 30 seconds:**

1. Copy `index.html` to a GitHub repo called `built-at-3am`
2. Enable GitHub Pages
3. Done. It's live.

No build process. No tests. No mercy.

## 📋 LocalStorage Keys Used

```
doomscroll_24h_visits          → Array of visit timestamps from last 24h
doomscroll_rickroll_end_time   → When rickroll punishment expires
doomscroll_rickroll_refreshes  → Number of refreshes during rickroll (for +1 min stacking)
```

## 🎮 How It Works

### First Load (No visits)
- Records visit timestamp
- Starts 30-minute countdown
- Displays live timer with color warnings (green → yellow → red)
- Stats show visits: 1/3 to rickroll

### Load #2 & #3 (Within 24h)
- Records new visits
- Timer continues
- Stats show visits climbing

### Load #4+ OR Timer Expires
- If visits ≥ 3, INSTANT RICKROLL
- If timer hits 00:00, RICKROLL ACTIVATED
- Fullscreen YouTube embed of Never Gonna Give You Up
- 10-minute countdown on screen
- Close button disabled
- Refresh button adds +1 minute each time
- Can only close after timer expires

### Nuke Button (Emergency)
- Deletes ALL 24h data from localStorage
- Resets visit counter
- Clears rickroll state
- One-time use (requires confirmation)

## 🎨 Browser Support

- ✅ Chrome/Chromium (100%)
- ✅ Firefox (100%)
- ✅ Safari (100%)
- ✅ Mobile Safari (iOS, with fullscreen limitations)
- ✅ Chrome Mobile
- ❌ Internet Explorer (NGMI)

## 🔊 Audio/Video

- Uses YouTube nocookie embed: `youtube-nocookie.com`
- Autoplay enabled in iframe
- Fullscreen allowed
- Video loops indefinitely
- No external audio file needed

## 📱 Mobile Behavior

- Forces fullscreen on page load
- Attempts landscape orientation
- Escapes fullscreen attempts are prevented
- Touch-friendly large buttons
- Stats stack vertically on small screens

## ⚙️ Technical Details

- **Language**: Pure Vanilla JavaScript (ES6 class)
- **No Build Tools**: Drop in any HTTP server, GitHub Pages, Netlify, etc
- **LocalStorage**: Client-side only, persists across refreshes
- **Fullscreen API**: Cross-browser support (webkit, moz, ms prefixes)
- **CSS Animations**: Hardware-accelerated, smooth on all devices
- **Single File**: 22KB uncompressed, ~8KB gzipped

## 🚨 The Vibe

Made at 3AM. No sleep. No tests. Pure JavaScript vibes. Pure contempt for doomscrolling.

This is the vibe check the timeline needs.

**Ship it or ngmi.**

---

*"Go touch grass. Your phone is not your personality."*
