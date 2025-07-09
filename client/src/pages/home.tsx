import { useQuery } from "@tanstack/react-query";
import { type Post } from "@shared/schema";
import PostCard from "@/components/post-card";
import { Link } from "wouter";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PostEditor from "@/components/post-editor";

function Home() {
  const [showEditor, setShowEditor] = useState(false);
  
  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const featuredPost = posts?.[0];
  const recentPosts = posts?.slice(1) || [];

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-20"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Welcome to My Blog
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            Thoughts, stories, and insights on technology, design, and life. 
            Join me on this journey of discovery and learning.
          </p>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <Link href={`/post/${featuredPost.id}`}>
              <div className="surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
                {featuredPost.featuredImage && (
                  <img 
                    src={featuredPost.featuredImage} 
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-80 object-cover" 
                  />
                )}
                <div className="p-8 md:p-12">
                  <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Featured
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-secondary text-lg leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">JD</span>
                      </div>
                      <div>
                        <p className="font-medium text-primary">John Doe</p>
                        <p className="text-sm text-secondary">
                          {new Date(featuredPost.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-accent hover:text-blue-600 font-medium transition-colors duration-200 flex items-center">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Recent Posts Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-primary">Recent Posts</h3>
            <Button
              onClick={() => setShowEditor(true)}
              className="bg-accent hover:bg-blue-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary text-lg">No posts yet. Create your first post!</p>
            </div>
          )}
        </section>
      </main>

      {showEditor && (
        <PostEditor 
          onClose={() => setShowEditor(false)}
          onSuccess={() => {
            setShowEditor(false);
            window.location.reload();
          }}
        />
      )}
    </>
  );
}

export default Home;
