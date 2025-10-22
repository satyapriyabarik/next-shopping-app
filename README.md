A modern eCommerce Progressive Web App (PWA) built with Next.js, demonstrating server-side rendering, client-side rendering, and static pages. The app allows users to browse products, view details, add items to the cart, and checkout securely with authentication.

Live Demo: https://next-shopping-app-8ezc.vercel.app/

Git Repository: https://github.com/satyapriyabarik/next-shopping-app.git

Table of Contents

Features

Pages

Authentication

Tech Stack

Installation

Running the App

PWA Support

Performance

License

Features

Display Featured Products on the Home page (Client-side Rendering)

Products Page with Server-side Rendering (SSR)

About Page built as a Static Page (SSG)

Add products to cart and manage checkout

Product Details view

User Authentication for secure login

Progressive Web App (PWA) enabled

Skip to content link for accessibility

Web Vitals metrics displayed for performance monitoring

Pages
Page	Rendering Type	Description
Home	Client-side (CSR)	Shows featured products
Products	Server-side (SSR)	Lists all products
About	Static (SSG)	Provides info about the store
Cart	CSR	View and manage items in cart
Checkout	CSR	Complete purchase securely
Details	CSR	Detailed view of each product
Auth	CSR	Login & authentication
Authentication

Secure login mechanism implemented

cookie based authentication

Protects sensitive pages like checkout


Tech Stack

Frontend: React.js, Next.js 13 (App Router / Pages Router)

Styling: CSS Modules / Following Bootstrap CSS 

Data Fetching: SSR, CSR, SSG for respective pages

Deployment: Vercel

PWA: Service workers & offline support

Other: Web Vitals for monitoring page performance


Installation
# Clone the repository
git clone https://github.com/satyapriyabarik/next-shopping-app.git
cd next-shopping-app

# Install dependencies
npm install
# or
yarn install


Running the App
# Run in development mode
npm run dev
# or
yarn dev

# Build for production
npm run build
npm start
# or
yarn build
yarn start


Visit http://localhost:3000 to see the app in action.


PWA Support

Offline mode enabled

Add to Home Screen functionality

Fast loading with caching

Performance

Web Vitals metrics tracked (LCP, FCP, CLS, TTFB, INP)

Skip to content link improves accessibility

Optimized SSR and CSR pages for best performance