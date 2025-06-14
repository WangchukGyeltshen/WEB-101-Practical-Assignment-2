# Snapchat Clone

This is a Snapchat-inspired web application built with [Next.js](https://nextjs.org), React, Firebase, and Tailwind CSS. The project demonstrates modern frontend development practices, including modular component design, real-time chat, camera integration, and dynamic video feeds.

## Features

- **Authentication:** Sign up and log in with email, phone, or username.
- **Real-Time Chat:** Chat with friends using a Firebase-backed chat system.
- **Camera Integration:** Capture photos with filters using the webcam.
- **Stories & Spotlight:** Watch and upload short videos, similar to Snapchat Stories and Spotlight.
- **Lenses:** Browse and preview popular Snapchat-style lenses.
- **Snapchat+:** Explore premium features in a dedicated section.
- **Add Friends:** Search for users and manage friend requests.
- **Responsive UI:** Built with Tailwind CSS for a modern, mobile-friendly experience.

## Project Structure

```
snapchat-clone/
  public/                # Static assets (images, videos, icons)
  src/
    app/                 # Next.js app directory (routing, pages, layout)
    components/          # Reusable React components (UI, features)
    firebaseConfig.js    # Firebase initialization
  package.json           # Project dependencies and scripts
  tailwind.config.js     # Tailwind CSS configuration
  postcss.config.mjs     # PostCSS configuration
  jsconfig.json          # Path aliases for imports
  ...
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Firebase

Update `src/firebaseConfig.js` with your Firebase project credentials.

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### 4. Backend API

This project expects a backend API running at `http://localhost:3001` for authentication, stories, spotlight, and friends features. Make sure your backend server is running and accessible.

## Routing Structure

- `/` - Home/Login
- `/chat/[name]` - Chat with a user
- `/stories` - Stories feed and login
- `/spotlight` - Spotlight video feed
- `/lenses` - Lenses gallery and login
- `/snapchatplus` - Snapchat+ premium features

## Reusable Components

- `Navbar` - Top navigation bar with search and navigation items
- `ChatList` - Sidebar chat list
- `CameraBox` - Camera interface with filters
- `SnapInfo` - Lens/story card
- `SearchBar` - Search input for users and content
- `Signup` - Signup form component

## Styling

- [Tailwind CSS](https://tailwindcss.com/) is used for all styling.
- Custom styles can be added in `src/app/globals.css`.

## Deployment

You can deploy this app easily on [Vercel](https://vercel.com/) or any platform that supports Next.js.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes.
4. Push to your branch and open a Pull Request.

## License

This project is for educational purposes.

---

**Note:** This project is not affiliated with or endorsed by Snap Inc. It is a learning exercise inspired by Snapchat's