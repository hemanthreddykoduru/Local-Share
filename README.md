# GPS Clipboard

A GPS-based local community clipboard that enables anonymous text sharing between users in close physical proximity (~200 meters).

## Features

- 🌍 **GPS-Only Location** - No manual room codes, purely location-based
- 🔒 **Privacy First** - Never stores exact GPS coordinates, only privacy-safe geo-cells
- ⚡ **Real-Time** - Instant updates using Firebase Firestore
- 🎭 **Anonymous** - Auto-generated friendly aliases
- ⏰ **Auto-Expiring** - Messages disappear after 1 hour
- 📱 **Mobile-First** - Responsive design, PWA-ready
- 🛡️ **Secure** - XSS protection, content sanitization, rate limiting

## How It Works

1. **Request GPS** - App requests location permission on load
2. **Geo-Cell Grouping** - GPS coordinates converted to ~200m grid cells
3. **Share Text** - Post messages visible to anyone in the same geo-cell
4. **Real-Time Feed** - See nearby messages instantly
5. **Auto-Expire** - Messages disappear after 1 hour

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Firebase Firestore, Firebase Security Rules
- **Hosting**: Firebase Hosting (HTTPS)
- **Real-Time**: Firestore onSnapshot listeners

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Firebase account
- Firebase CLI installed: `npm install -g firebase-tools`

### 1. Clone and Install

```bash
cd /path/to/CLIPBOARD
npm install
```

### 2. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database (Start in production mode)
4. Enable Firebase Hosting

### 3. Get Firebase Config

1. In Firebase Console, go to **Project Settings** > **General**
2. Scroll to **Your apps** section
3. Click **Web app** (</>) icon
4. Copy the config values

### 4. Configure Environment Variables

Edit `.env.local` and add your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 5. Deploy Firestore Rules and Indexes

```bash
firebase login
firebase init
# Select Firestore and Hosting
# Use existing project
# Accept defaults

firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Note**: GPS requires HTTPS in production. Use `ngrok` or similar for local HTTPS testing.

### 7. Build for Production

```bash
npm run build
```

### 8. Deploy to Firebase Hosting

```bash
# Export static site
npm run build
npx next export

# Deploy to Firebase
firebase deploy --only hosting
```

Your app will be live at `https://your-project.web.app`

## Firebase Security Rules

The app uses strict Firestore Security Rules:

- ✅ **Read**: Anyone can read active, non-expired snippets
- ✅ **Create**: Anyone can create snippets with validation
- ❌ **Update/Delete**: Blocked from client (future: Cloud Functions)

Rules enforce:
- Text length (1-1000 characters)
- Valid geo-cell format
- Expiration within 2 hours max
- Required fields validation

## Geo-Cell Privacy Algorithm

```typescript
function coordinatesToGeoCell(lat: number, lon: number): string {
  const CELL_SIZE = 0.002; // ~200 meters
  const latCell = Math.floor(lat / CELL_SIZE);
  const lonCell = Math.floor(lon / CELL_SIZE);
  return `${latCell}_${lonCell}`;
}
```

**Privacy guarantees**:
- No raw GPS coordinates stored
- No exact distance calculation possible
- Users only know they're "nearby" (~200m)
- Reversing geo-cell gives ~40,000 m² area minimum

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── LocationPermission.tsx
│   ├── ClipboardInput.tsx
│   ├── ClipboardFeed.tsx
│   ├── SnippetCard.tsx
│   └── CopyButton.tsx
├── hooks/
│   ├── useLocation.ts      # GPS state management
│   ├── useClipboard.ts     # Data fetching
│   └── useRealtime.ts      # Firestore listeners
├── lib/
│   ├── firebase.ts         # Firebase init
│   ├── geocell.ts          # Geo-cell algorithm
│   ├── location.ts         # GPS handling
│   ├── sanitize.ts         # XSS protection
│   ├── profanity.ts        # Content filtering
│   └── aliases.ts          # Name generation
├── firebase/
│   ├── firestore.rules     # Security rules
│   └── firestore.indexes.json
└── public/
    └── manifest.json       # PWA manifest
```

## Security Features

1. **XSS Protection** - DOMPurify sanitization
2. **Input Validation** - Client + server-side
3. **Rate Limiting** - Firebase Security Rules
4. **Content Filtering** - Basic profanity filter
5. **HTTPS Only** - Enforced via Firebase Hosting
6. **No Auth Required** - Anonymous by design

## Future Enhancements

### Phase 2
- [ ] Report/flag inappropriate content
- [ ] Cloud Functions for auto-moderation
- [ ] User karma/reputation system
- [ ] Emoji reactions
- [ ] Dark mode

### Phase 3
- [ ] Push notifications for nearby activity
- [ ] Message categories/tags
- [ ] Time-based filtering
- [ ] Export/archive personal posts
- [ ] Multi-language support

## Troubleshooting

### GPS Not Working
- Ensure HTTPS (required for geolocation API)
- Check browser location permissions
- Try in incognito/private mode

### No Messages Appear
- Check Firebase console for data
- Verify Firestore rules deployed
- Check browser console for errors
- Ensure geo-cell format is correct

### Build Errors
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next`
- Check Node.js version (18+ required)

## License

MIT License - Feel free to use for any purpose

## Support

For issues or questions:
1. Check Firebase Console logs
2. Inspect browser console  
3. Verify environment variables
4. Review Firestore Security Rules

---

**Built with ❤️ using Firebase, Next.js, and GPS technology**
