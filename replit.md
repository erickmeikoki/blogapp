# Replit.md

## Overview

This is a full-stack blog application built with React and Express, featuring a modern tech stack with TypeScript, Tailwind CSS, and Drizzle ORM. The application provides a clean, responsive interface for reading and managing blog posts with a comprehensive comment system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **File Handling**: Multer for image uploads with local storage
- **Development**: Hot reload via Vite integration in development mode

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Data Storage**: In-memory storage implementation for development/testing

## Key Components

### Data Models
- **Posts**: Main content entities with title, content, excerpt, category, featured images, and draft status
- **Comments**: User feedback system linked to posts with author information
- **Users**: Basic user management (schema defined but not fully implemented)

### Frontend Components
- **Navigation**: Responsive header with mobile menu support
- **Post Card**: Reusable component for displaying post previews
- **Post Editor**: Rich text editor with markdown support and image upload functionality
- **Comments Section**: Interactive commenting system with form validation
- **UI Library**: Comprehensive set of accessible components (buttons, forms, dialogs, etc.)

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **Route Handlers**: CRUD operations for posts and comments
- **File Upload**: Image handling with validation and storage
- **Error Handling**: Centralized error management with proper HTTP status codes

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express routes handle requests and interact with storage layer
3. **Data Persistence**: Drizzle ORM manages database operations (PostgreSQL)
4. **Response Handling**: JSON responses with proper error handling
5. **State Management**: Client-side caching and optimistic updates via React Query

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver for Neon
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight React router

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and development experience
- **ESBuild**: Fast JavaScript bundler for production
- **Drizzle Kit**: Database schema management and migrations

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Assets**: Static files served from build output directory

### Environment Configuration
- **Development**: Vite dev server with Express API integration
- **Production**: Single Express server serving both API and static files
- **Database**: PostgreSQL connection via environment variable `DATABASE_URL`

### File Structure
```
├── client/          # React frontend application
├── server/          # Express backend application
├── shared/          # Shared types and schemas
├── dist/           # Production build output
├── uploads/        # User-uploaded files storage
└── migrations/     # Database migration files
```

The application follows a monorepo structure with clear separation between frontend, backend, and shared code, making it easy to maintain and scale.