#!/bin/bash

# --- JaxxAI Project Generator Script ---
# This script creates a complete Next.js + TypeScript + Tailwind CSS project folder.

# Define the project folder name
PROJECT_NAME="jaxxai-v1-frontend"

# --- Safety Check ---
if [ -d "$PROJECT_NAME" ]; then
  echo "❌ Error: Directory '$PROJECT_NAME' already exists. Please remove it or choose a new name."
  exit 1
fi

echo "🚀 Creating the JaxXAI project structure in './${PROJECT_NAME}'..."

# --- Create Directory Structure ---
mkdir -p "${PROJECT_NAME}/src/pages"
mkdir -p "${PROJECT_NAME}/src/components"
mkdir -p "${PROJECT_NAME}/src/styles"

# --- Create package.json ---
cat <<EOF > "${PROJECT_NAME}/package.json"
{
  "name": "jaxxai-v1-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.2.3"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.3",
    "autoprefixer": "^10.4.19"
  }
}
EOF

# --- Create tsconfig.json ---
cat <<EOF > "${PROJECT_NAME}/tsconfig.json"
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./src/*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# --- Create next.config.mjs ---
cat <<EOF > "${PROJECT_NAME}/next.config.mjs"
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
EOF

# --- Create postcss.config.js ---
cat <<EOF > "${PROJECT_NAME}/postcss.config.js"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# --- Create tailwind.config.ts ---
cat <<EOF > "${PROJECT_NAME}/tailwind.config.ts"
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#201F24',
        secondaryBg: '#312F3B',
        textPrimary: '#D0CDE1',
        textSecondary: '#8A8599',
        positive: '#9FFF33',
        buyZone: '#FF00FF',
        interactive: '#00BFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
EOF

# --- Create src/styles/globals.css ---
cat <<EOF > "${PROJECT_NAME}/src/styles/globals.css"
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-primaryBg text-textPrimary font-sans;
}
EOF

# --- Create src/components/Layout.tsx ---
cat <<EOF > "${PROJECT_NAME}/src/components/Layout.tsx"
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-secondaryBg p-4 border-b border-interactive/20">
        <h1 className="text-2xl font-bold text-interactive">JaxXAI</h1>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {children}
      </main>
      <footer className="bg-secondaryBg p-4 text-center text-textSecondary text-sm">
        © $(date +%Y) JaxXAI. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Layout;
EOF

# --- Create src/pages/_app.tsx ---
cat <<EOF > "${PROJECT_NAME}/src/pages/_app.tsx"
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
EOF

# --- Create src/pages/index.tsx ---
cat <<EOF > "${PROJECT_NAME}/src/pages/index.tsx"
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>JaxXAI - Welcome</title>
      </Head>
      <div className="text-center">
        <h1 className="text-5xl font-bold text-textPrimary mb-4">
          Welcome to <span className="text-interactive">JaxXAI</span>
        </h1>
        <p className="text-xl text-textSecondary">
          The project has been successfully initialized.
        </p>
        <div className="mt-8 p-6 bg-secondaryBg rounded-lg border border-buyZone/30">
            <p className="text-positive">This is a test of the color palette.</p>
        </div>
      </div>
    </>
  );
}
EOF

echo "✅ Project '${PROJECT_NAME}' created successfully."
echo "➡️ Next steps:"
echo "1. cd ${PROJECT_NAME}"
echo "2. npm install"
echo "3. npm run dev"

node -v
