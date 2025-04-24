# Documentation
## React Components
We structured our application using modular React components such as ChatList, CameraBox, and MainLayout. This approach helped us maintain clean, reusable, and readable code, while also improving scalability and collaboration.

## Next.js and App Structure
We utilized the Next.js App Router system. The layout and page separation in the app directory made it easy to manage both the overall structure and dynamic routing. We also used the 'use client' directive where client-side interaction was required, especially for components involving DOM APIs.

## Tailwind CSS Styling
We applied Tailwind CSS for styling due to its utility-first design approach. It allowed us to rapidly prototype and maintain consistent design patterns across the app, from layouts to hover effects and responsiveness.

## Camera Access with Web APIs
In the CameraBox component, we implemented the Web Media API using navigator.mediaDevices.getUserMedia() to access the webcam. We handled permission prompts, initialized the video stream, and added a photo capture feature using a canvas.

## Dynamic Rendering
The chat list is rendered dynamically using map(). We included logic to conditionally display messages such as "New Snap on mobile", time passed, emojis, and a "Reply" button only if it's relevant to that chat.

## Error Handling
We included fallback handling for images using onError, so that if an image failed to load, it would display a default avatar instead. We also provided user feedback when the camera API failed or permission was denied.

# Reflection
## What We Learned
We learned how to integrate React hooks (useState, useEffect, useRef) with media streams.

We practiced real-world application design using Next.js, including layout, routing, and interactivity.

We gained a better understanding of camera integration, error management, and conditional rendering in React.

We became more comfortable using Tailwind CSS for rapid and consistent UI design.

## Challenges We Faced
Camera Access & Permissions
One of the main challenges was when the camera didn't work during early testing. This was caused by browser security settings, like requiring HTTPS and explicit permission from the user.

How We Solved It:
We added detailed error messages in the CameraBox component to notify the user if permission was denied or the API wasn't supported.

Image Display Errors
Some images weren’t loading correctly due to naming issues or missing files.

How We Solved It:
We implemented a fallback using a default avatar with onError, ensuring broken images wouldn’t break the UI layout.