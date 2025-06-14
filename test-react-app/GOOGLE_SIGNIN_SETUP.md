# Google Sign-In Setup Guide for Cafinder

## Step-by-Step Configuration

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Select or Create Project
- Click on the project dropdown at the top
- Select your project or create a new one

### 3. Enable Required APIs
Go to **APIs & Services** → **Library** and enable:
- Google Identity Toolkit API
- Google+ API (if available)

### 4. Configure OAuth Consent Screen
Go to **APIs & Services** → **OAuth consent screen**:

1. Choose **External** user type
2. Fill in the required fields:
   - App name: Cafinder
   - User support email: arayassuryanto@gmail.com
   - App logo: (optional)
   - App domain: https://cafinder.space
   - Authorized domains: cafinder.space
   - Developer contact: arayassuryanto@gmail.com

3. Add Scopes:
   - .../auth/userinfo.email
   - .../auth/userinfo.profile
   - openid

4. Add test users if in testing mode

### 5. Create OAuth 2.0 Credentials
Go to **APIs & Services** → **Credentials**:

1. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
2. Choose **Web application**
3. Name: Cafinder Web Client
4. Add Authorized JavaScript origins:
   ```
   http://localhost:3000
   http://localhost:3001
   https://cafinder.space
   ```
5. Add Authorized redirect URIs:
   ```
   http://localhost:3000
   https://cafinder.space
   ```

### 6. Copy Your Client ID
You'll get something like:
```
YOUR_CLIENT_ID.apps.googleusercontent.com
```

### 7. Update .env File
```
REACT_APP_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
```

### 8. Test Configuration
1. Stop your React app (Ctrl+C)
2. Start it again: `npm start`
3. Open browser console (F12)
4. Try to sign in
5. Check for any console errors

## Common Issues & Solutions

### Error: invalid_client
- Double-check client ID is copied correctly
- Ensure no extra spaces in .env file
- Verify OAuth consent screen is configured

### Error: redirect_uri_mismatch
- Add exact URL to authorized JavaScript origins
- Include both http://localhost:3000 and your domain

### Error: popup_closed_by_user
- Check browser popup blocker settings
- Try in incognito mode

### Error: idpiframe_initialization_failed
- Clear browser cookies and cache
- Check if third-party cookies are enabled

## Alternative: Using Firebase Auth
If Google Sign-In continues to have issues, consider using Firebase Authentication which provides a simpler setup:

1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable Authentication → Sign-in method → Google
4. Get Firebase config
5. Use Firebase Auth SDK instead

## Testing with Demo Client ID
For immediate testing, you can temporarily use Google's demo client ID:
```
REACT_APP_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com
```

Remember to replace with your production client ID before deploying!