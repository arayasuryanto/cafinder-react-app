# Firebase Setup Guide for Cafinder

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "Cafinder" 
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set up Web App

1. In your Firebase project dashboard, click the web icon (`</>`)
2. Register app with name "Cafinder Web"
3. Copy the config object - you'll need these values

## Step 3: Enable Authentication

1. Go to **Authentication** → **Sign-in method**
2. Enable **Google** provider
3. Add your domain: `cafinder.space`
4. Add authorized domains: `localhost` and `cafinder.space`

## Step 4: Set up Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Choose **Start in test mode** (for now)
3. Select a location (choose closest to Indonesia)

## Step 5: Configure Environment Variables

Add these to your `.env` file:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Keep existing Google OAuth (optional - Firebase can replace this)
REACT_APP_GOOGLE_CLIENT_ID=369604441493-86lrsomvk1go73dgcieflm5p7d47ljk5.apps.googleusercontent.com
```

## Step 6: Set up Firestore Security Rules

In **Firestore Database** → **Rules**, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reviews collection
    match /reviews/{reviewId} {
      // Anyone can read reviews
      allow read: if true;
      // Only authenticated users can create reviews
      allow create: if request.auth != null
        && request.auth.uid == resource.data.userId;
      // Users can update/delete their own reviews
      allow update, delete: if request.auth != null
        && request.auth.uid == resource.data.userId;
    }
    
    // Cafes collection (for storing ratings)
    match /cafes/{cafeId} {
      // Anyone can read cafe stats
      allow read: if true;
      // Only allow updates to rating fields
      allow write: if request.auth != null
        && request.resource.data.keys().hasAny(['averageRating', 'totalReviews', 'lastUpdated']);
    }
  }
}
```

## Step 7: Add to Netlify Environment Variables

1. Go to Netlify dashboard → Your site → **Site configuration** → **Environment variables**
2. Add all the Firebase variables from your `.env` file
3. Redeploy your site

## Step 8: Test the Setup

1. Start your local server: `npm start`
2. Go to a cafe page
3. Click "Tulis Review" 
4. Sign in with Google (via Firebase)
5. Write a review and submit
6. Check Firestore console to see the data

## Firestore Collections Structure

### Reviews Collection
```javascript
{
  cafeId: "cafe_id",
  userId: "user_uid", 
  userName: "User Name",
  userPhoto: "https://photo.url",
  rating: 5,
  comment: "Great coffee!",
  visitDate: "2023-12-01T00:00:00.000Z",
  helpful: 0,
  images: [],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Cafes Collection
```javascript
{
  averageRating: 4.5,
  totalReviews: 10,
  lastUpdated: timestamp
}
```

## Benefits of Firebase

✅ **Real-time reviews** - Updates instantly across all users  
✅ **User authentication** - Google sign-in built-in  
✅ **Scalable database** - Handles thousands of reviews  
✅ **Security rules** - Protect against spam/abuse  
✅ **Offline support** - Works without internet  
✅ **Analytics** - Track user engagement  

## Migration from Current System

The new Firebase system will work alongside your current favorites system. Users can:
- ❤️ Save cafes to favorites (localStorage)
- 📝 Write reviews (Firebase)
- 👤 Sign in once for both features

Ready to implement! 🚀