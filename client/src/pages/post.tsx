import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Post, type Comment } from "@shared/schema";
import { Link } from "wouter";
import { ChevronRight, Twitter, Facebook, Linkedin } from "lucide-react";
import { renderMarkdown } from "@/lib/markdown";
import CommentsSection from "@/components/comments-section";

function Post() {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id!);

  const { data: post, isLoading: isLoadingPost } = useQuery<Post>({
    queryKey: ["/api/posts", postId],
  });

  const { data: comments, isLoading: isLoadingComments } = useQuery<Comment[]>({
    queryKey: ["/api/posts", postId, "comments"],
  });

  const shareOnTwitter = () => {
    if (post) {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
      window.open(url, '_blank');
    }
  };

  const shareOnFacebook = () => {
    if (post) {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      window.open(url, '_blank');
    }
  };

  const shareOnLinkedIn = () => {
    if (post) {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
      window.open(url, '_blank');
    }
  };

  if (isLoadingPost) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Post Not Found</h1>
          <p className="text-secondary mb-8">The post you're looking for doesn't exist.</p>
          <Link href="/" className="text-accent hover:underline">
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <article>
        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center space-x-2 text-sm text-secondary mb-4">
            <Link href="/" className="hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>{post.category}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-lg">JD</span>
              </div>
              <div>
                <p className="font-semibold text-primary">John Doe</p>
                <p className="text-sm text-secondary">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • 8 min read
                </p>
              </div>
            </div>
            
            {/* Social Sharing */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-secondary mr-2">Share:</span>
              <button 
                onClick={shareOnTwitter}
                className="w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button 
                onClick={shareOnFacebook}
                className="w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                <Facebook className="h-4 w-4" />
              </button>
              <button 
                onClick={shareOnLinkedIn}
                className="w-10 h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center"
              >
                <Linkedin className="h-4 w-4" />
              </button>
            </div>
          </div>

          {post.featuredImage && (
            <img 
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-sm" 
            />
          )}
        </header>

        {/* Post Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* Comments Section */}
        <CommentsSection 
          postId={post.id} 
          comments={comments || []}
          isLoading={isLoadingComments}
        />
      </article>
    </main>
  );
}

export default Post;
