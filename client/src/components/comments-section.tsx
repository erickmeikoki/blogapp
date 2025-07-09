import { type Comment } from "@shared/schema";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CommentsSectionProps {
  postId: number;
  comments: Comment[];
  isLoading: boolean;
}

function CommentsSection({ postId, comments, isLoading }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState({
    author: "",
    email: "",
    content: "",
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: async (commentData: typeof newComment) => {
      const response = await apiRequest("POST", `/api/posts/${postId}/comments`, commentData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts", postId, "comments"] });
      setNewComment({ author: "", email: "", content: "" });
      toast({
        title: "Success",
        description: "Your comment has been posted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author.trim() || !newComment.email.trim() || !newComment.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    createCommentMutation.mutate(newComment);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomColor = () => {
    const colors = ['bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-blue-500', 'bg-red-500', 'bg-yellow-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <section className="mt-16 pt-12 border-t border-gray-200">
      <h3 className="text-2xl font-bold text-primary mb-8">
        Comments ({comments.length})
      </h3>
      
      {/* Comment Form */}
      <div className="surface rounded-xl p-6 mb-8">
        <h4 className="font-semibold text-primary mb-4">Leave a Comment</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Your name"
              value={newComment.author}
              onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
              className="border-gray-200 focus:ring-accent focus:border-transparent"
            />
            <Input
              type="email"
              placeholder="Your email"
              value={newComment.email}
              onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
              className="border-gray-200 focus:ring-accent focus:border-transparent"
            />
          </div>
          <Textarea
            rows={4}
            placeholder="Write your comment..."
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            className="border-gray-200 focus:ring-accent focus:border-transparent resize-none"
          />
          <Button
            type="submit"
            disabled={createCommentMutation.isPending}
            className="bg-accent hover:bg-blue-600 text-white"
          >
            {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </div>

      {/* Comments List */}
      {isLoading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b border-gray-100 pb-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 ${getRandomColor()} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-medium text-sm">
                    {getInitials(comment.author)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="font-semibold text-primary">{comment.author}</h5>
                    <span className="text-sm text-secondary">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-secondary leading-relaxed">{comment.content}</p>
                  <button className="text-accent hover:text-blue-600 text-sm font-medium mt-3 transition-colors duration-200">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-secondary">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </section>
  );
}

export default CommentsSection;
