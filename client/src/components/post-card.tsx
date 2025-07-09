import { type Post } from "@shared/schema";
import { Link } from "wouter";

interface PostCardProps {
  post: Post;
}

const categoryColors = {
  Technology: "bg-green-100 text-green-700",
  Design: "bg-purple-100 text-purple-700",
  Productivity: "bg-blue-100 text-blue-700",
  Tutorial: "bg-orange-100 text-orange-700",
  Career: "bg-red-100 text-red-700",
  Learning: "bg-yellow-100 text-yellow-700",
};

function PostCard({ post }: PostCardProps) {
  const categoryClass = categoryColors[post.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-700";

  return (
    <Link href={`/post/${post.id}`}>
      <article className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        {post.featuredImage && (
          <img 
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-48 object-cover" 
          />
        )}
        <div className="p-6">
          <span className={`inline-block px-2 py-1 rounded text-sm font-medium mb-3 ${categoryClass}`}>
            {post.category}
          </span>
          <h4 className="text-xl font-semibold text-primary mb-3 leading-tight">
            {post.title}
          </h4>
          <p className="text-secondary mb-4 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-secondary">5 min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
