# Personality Test - Frontend Client

A modern Next.js React application that provides an interactive interface for personality analysis and prediction.

## Features

- **Interactive Question Interface**: Random personality-related questions with text input
- **Real-time Analysis**: Connect to backend API for instant personality predictions
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Modern UI Components**: Built with shadcn/ui and Tailwind CSS
- **TypeScript Support**: Full type safety throughout the application
- **Performance Optimized**: Next.js 15 with Turbopack for fast development

## Technology Stack

- **Next.js 15.5.4** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type safety and enhanced development experience
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Modern, accessible UI components
- **Lucide React** - Beautiful icon library
- **ESLint** - Code linting and formatting

## Project Structure

```
client/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   └── page.tsx         # Main personality test page
│   ├── components/          # Reusable React components
│   │   ├── ui/              # shadcn/ui components
│   │   └── personality-result.tsx
│   └── lib/                 # Utility functions and data
│       └── questions.ts     # Question bank data
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
└── README.md              
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality