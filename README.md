# Modern Personal Blog

A beautiful, minimalist personal blog built with React, Express, and TypeScript. Features a clean design, markdown support, and interactive commenting system.

## Features

### 🎨 Modern Design
- Clean, minimalist interface with responsive layout
- Custom color scheme with dark mode support
- Mobile-first design with smooth animations
- Typography optimized for readability

### 📝 Content Management
- **Markdown Editor**: Rich text editor with toolbar for formatting
- **Image Upload**: Support for featured images and inline images
- **Categories**: Organize posts by topic (Technology, Design, Productivity, etc.)
- **Draft System**: Save posts as drafts before publishing

### 💬 Interactive Features
- **Comments System**: Real-time commenting with email validation
- **Social Sharing**: Share posts on Twitter, Facebook, and LinkedIn
- **Responsive Navigation**: Mobile-friendly menu with smooth transitions

### 🔧 Technical Features
- **TypeScript**: Full type safety across frontend and backend
- **Server-Side Rendering**: Fast initial page loads
- **In-Memory Storage**: Quick development with sample data
- **RESTful API**: Clean API design for all operations

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5000`

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── lib/           # Utility functions
│   │   └── hooks/         # Custom React hooks
├── server/          # Express backend
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Data management
│   └── index.ts           # Server entry point
├── shared/          # Shared types and schemas
└── uploads/         # User-uploaded files
```

## API Endpoints

### Posts
- `GET /api/posts` - Get all published posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Comments
- `GET /api/posts/:id/comments` - Get comments for a post
- `POST /api/posts/:id/comments` - Add a comment to a post

### File Upload
- `POST /api/upload` - Upload an image file

## Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Wouter** - Lightweight routing library
- **TanStack Query** - Data fetching and caching
- **Radix UI** - Accessible component primitives

### Backend
- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type-safe server development
- **Drizzle ORM** - Type-safe database toolkit
- **Multer** - File upload middleware
- **Zod** - Runtime type validation

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESBuild** - Fast JavaScript bundler
- **Prettier** - Code formatting
- **ESLint** - Code linting

## Usage

### Creating a New Post

1. Click the "New Post" button on the homepage
2. Fill in the post title, category, and excerpt
3. Use the markdown editor to write your content
4. Upload a featured image (optional)
5. Click "Publish Post" to make it live

### Markdown Support

The editor supports standard markdown syntax:

- **Headers**: `# H1`, `## H2`, `### H3`
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Links**: `[text](url)`
- **Images**: `![alt text](image-url)`
- **Lists**: `- item 1`, `- item 2`
- **Code**: `` `inline code` `` or ``` code blocks ```
- **Quotes**: `> blockquote`

### Comments

Readers can leave comments on any post by:
1. Scrolling to the comments section
2. Filling in their name and email
3. Writing their comment
4. Clicking "Post Comment"

## Customization

### Styling
- Edit `client/src/index.css` to modify colors and typography
- Customize component styles in individual component files
- Add new Tailwind classes as needed

### Content
- Sample posts are defined in `server/storage.ts`
- Add your own posts through the web interface
- Modify categories in the post editor dropdown

### Features
- Add new API endpoints in `server/routes.ts`
- Create new pages in `client/src/pages/`
- Add components to `client/src/components/`

## Deployment

The application is ready for deployment on platforms like:
- **Replit** (recommended)
- **Vercel**
- **Netlify**
- **Heroku**

For production deployment:
1. Build the application: `npm run build`
2. Start the production server: `npm start`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:
- Check the documentation above
- Review the code comments
- Create an issue in the repository

---

Built with ❤️ using modern web technologies.