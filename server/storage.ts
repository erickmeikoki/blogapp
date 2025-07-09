import { posts, comments, users, type Post, type InsertPost, type Comment, type InsertComment, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Posts
  getPosts(): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  
  // Comments
  getCommentsByPostId(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private comments: Map<number, Comment>;
  private currentUserId: number;
  private currentPostId: number;
  private currentCommentId: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.comments = new Map();
    this.currentUserId = 1;
    this.currentPostId = 1;
    this.currentCommentId = 1;
    
    // Add some sample posts
    this.initSampleData();
  }

  private initSampleData() {
    const samplePosts: Post[] = [
      {
        id: this.currentPostId++,
        title: "The Future of Web Development: Trends to Watch in 2024",
        content: `# The Future of Web Development: Trends to Watch in 2024

The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies. In this comprehensive guide, we'll explore the most significant developments that are shaping the future of how we build for the web.

## AI-Powered Development Tools

Artificial Intelligence is revolutionizing how developers write code. From GitHub Copilot to ChatGPT, AI assistants are becoming indispensable tools that help developers write better code faster. These tools can generate boilerplate code, suggest optimizations, and even help debug complex issues.

## The Rise of Edge Computing

Edge computing is moving processing closer to users, reducing latency and improving performance. Platforms like Vercel Edge Functions and Cloudflare Workers are making it easier than ever to deploy code at the edge, enabling new patterns for building fast, globally distributed applications.

\`\`\`javascript
// Example Edge Function
export default async function handler(request) {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
\`\`\`

## Web Assembly (WASM) Maturation

WebAssembly is finally reaching mainstream adoption, enabling developers to run high-performance applications in the browser. Languages like Rust, Go, and C++ can now be compiled to WASM, opening up new possibilities for web applications that were previously impossible.

> "The future of web development is not just about new frameworks or tools—it's about fundamentally rethinking how we approach building experiences for users across different devices and contexts."

## Conclusion

As we move through 2024, these trends will continue to shape how we build for the web. The key is to stay curious, experiment with new tools, and always keep the user experience at the center of our decisions.`,
        excerpt: "Exploring the latest trends and technologies that are shaping the future of web development, from AI-powered tools to advanced frameworks and beyond.",
        category: "Technology",
        featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
        isDraft: false,
        createdAt: new Date("2024-03-15"),
        updatedAt: new Date("2024-03-15"),
      },
      {
        id: this.currentPostId++,
        title: "Building Scalable React Applications",
        content: `# Building Scalable React Applications

As React applications grow in size and complexity, maintaining a clean and scalable architecture becomes crucial. This guide covers best practices for structuring React applications that can grow with your team and requirements.

## Component Architecture

The foundation of a scalable React application lies in its component architecture. Here are key principles to follow:

### Single Responsibility Principle
Each component should have a single, well-defined purpose. This makes components easier to test, maintain, and reuse.

### Composition over Inheritance
React favors composition over inheritance. Build complex UIs by composing smaller, focused components.

## State Management

As your application grows, managing state becomes more complex. Consider these approaches:

- **Local State**: Use useState for component-specific state
- **Context API**: For sharing state across multiple components
- **External Libraries**: Redux, Zustand, or Jotai for complex state management

## Performance Optimization

- Use React.memo for preventing unnecessary re-renders
- Implement code splitting with React.lazy
- Optimize bundle size with tree shaking

## Testing Strategy

A comprehensive testing strategy includes:
- Unit tests for individual components
- Integration tests for component interactions
- End-to-end tests for critical user flows

## Conclusion

Building scalable React applications requires thoughtful planning and adherence to best practices. Start with a solid foundation and iteratively improve your architecture as your application grows.`,
        excerpt: "Learn the best practices for structuring and scaling React applications as your team and codebase grow.",
        category: "Technology",
        featuredImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=250",
        isDraft: false,
        createdAt: new Date("2024-03-10"),
        updatedAt: new Date("2024-03-10"),
      },
      {
        id: this.currentPostId++,
        title: "The Art of Minimalist Design",
        content: `# The Art of Minimalist Design

Minimalist design is more than just a trend—it's a philosophy that emphasizes clarity, functionality, and intentional use of space. In this post, we'll explore how to apply minimalist principles to create beautiful, effective designs.

## Core Principles

### Less is More
Remove unnecessary elements and focus on what truly matters. Every element should serve a purpose.

### White Space
Embrace white space as a design element. It provides breathing room and helps focus attention on important content.

### Typography
Choose fonts carefully. Good typography can carry a minimalist design and improve readability.

## Color Palette

Minimalist designs often use:
- Neutral colors as the foundation
- One or two accent colors for emphasis
- High contrast for readability

## Visual Hierarchy

Create clear visual hierarchy through:
- Size and weight variations
- Strategic use of color
- Consistent spacing

## Conclusion

Minimalist design is about making intentional choices and removing the unnecessary. When done well, it creates designs that are both beautiful and highly functional.`,
        excerpt: "Exploring how less can be more in design, and why minimalism continues to dominate modern interfaces.",
        category: "Design",
        featuredImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=250",
        isDraft: false,
        createdAt: new Date("2024-03-08"),
        updatedAt: new Date("2024-03-08"),
      },
    ];

    samplePosts.forEach(post => {
      this.posts.set(post.id, post);
    });

    // Add sample comments
    const sampleComments: Comment[] = [
      {
        id: this.currentCommentId++,
        postId: 1,
        author: "Alex Morgan",
        email: "alex@example.com",
        content: "Great insights! I've been experimenting with some of these AI tools and they're definitely game-changers. The edge computing section was particularly interesting - do you have any specific recommendations for getting started?",
        createdAt: new Date("2024-03-15T10:00:00Z"),
      },
      {
        id: this.currentCommentId++,
        postId: 1,
        author: "Sarah Chen",
        email: "sarah@example.com",
        content: "WebAssembly is fascinating! We're considering using it for our next project. Would love to see a follow-up post with practical examples and performance comparisons.",
        createdAt: new Date("2024-03-15T08:00:00Z"),
      },
      {
        id: this.currentCommentId++,
        postId: 1,
        author: "Mike Rodriguez",
        email: "mike@example.com",
        content: "Excellent overview of the current trends. I'm particularly excited about the potential of AI-powered development tools. They're already saving me hours of work each week!",
        createdAt: new Date("2024-03-14T15:00:00Z"),
      },
    ];

    sampleComments.forEach(comment => {
      this.comments.set(comment.id, comment);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => !post.isDraft)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentPostId++;
    const now = new Date();
    const post: Post = { 
      ...insertPost,
      featuredImage: insertPost.featuredImage || null,
      isDraft: insertPost.isDraft || false,
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.posts.set(id, post);
    return post;
  }

  async updatePost(id: number, updateData: Partial<InsertPost>): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { 
      ...post, 
      ...updateData, 
      updatedAt: new Date() 
    };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    return this.posts.delete(id);
  }

  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentCommentId++;
    const comment: Comment = { 
      ...insertComment, 
      id, 
      createdAt: new Date() 
    };
    this.comments.set(id, comment);
    return comment;
  }
}

export const storage = new MemStorage();
