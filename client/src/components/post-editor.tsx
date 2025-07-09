import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, Bold, Italic, Link2, Image, Code, List, Eye } from "lucide-react";

interface PostEditorProps {
  onClose: () => void;
  onSuccess: () => void;
}

function PostEditor({ onClose, onSuccess }: PostEditorProps) {
  const [post, setPost] = useState({
    title: "",
    category: "Technology",
    excerpt: "",
    content: "",
    featuredImage: "",
    isDraft: false,
  });
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');
      return response.json();
    },
    onSuccess: (data) => {
      setPost({ ...post, featuredImage: data.url });
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: typeof post) => {
      const response = await apiRequest("POST", "/api/posts", postData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImageMutation.mutate(file);
    }
  };

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = post.content.substring(start, end);
    const replacement = before + selectedText + after;
    
    const newContent = post.content.substring(0, start) + replacement + post.content.substring(end);
    setPost({ ...post, content: newContent });
    
    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!post.title.trim() || !post.content.trim() || !post.excerpt.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    createPostMutation.mutate(post);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Editor Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-primary">Create New Post</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Editor Content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 120px)" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Post Title */}
              <div>
                <Label htmlFor="title">Post Title *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter your post title..."
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  className="text-lg"
                />
              </div>

              {/* Post Category and Featured Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={post.category} onValueChange={(value) => setPost({ ...post, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Productivity">Productivity</SelectItem>
                      <SelectItem value="Tutorial">Tutorial</SelectItem>
                      <SelectItem value="Career">Career</SelectItem>
                      <SelectItem value="Learning">Learning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Featured Image</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full justify-start"
                    disabled={uploadImageMutation.isPending}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadImageMutation.isPending ? "Uploading..." : "Choose Image"}
                  </Button>
                  {post.featuredImage && (
                    <div className="mt-2">
                      <img src={post.featuredImage} alt="Featured" className="h-20 w-20 object-cover rounded" />
                    </div>
                  )}
                </div>
              </div>

              {/* Post Excerpt */}
              <div>
                <Label htmlFor="excerpt">Post Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  rows={3}
                  placeholder="Brief description of your post..."
                  value={post.excerpt}
                  onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                />
              </div>

              {/* Markdown Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Content *</Label>
                  <div className="flex items-center space-x-2 text-sm text-secondary">
                    <span>Markdown supported</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {showPreview ? "Edit" : "Preview"}
                    </Button>
                  </div>
                </div>
                
                {/* Editor Toolbar */}
                <div className="flex items-center space-x-2 p-3 border border-gray-200 border-b-0 rounded-t-lg surface">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => insertMarkdown("**", "**")}
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => insertMarkdown("*", "*")}
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => insertMarkdown("## ")}
                    title="Heading"
                  >
                    H
                  </Button>
                  <div className="w-px h-6 bg-gray-300"></div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => insertMarkdown("- ")}
                    title="List"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => insertMarkdown("[", "](url)")}
                    title="Link"
                  >
                    <Link2 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => insertMarkdown("![alt](", ")")}
                    title="Image"
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => insertMarkdown("`", "`")}
                    title="Code"
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                </div>

                {/* Editor Textarea */}
                <Textarea
                  ref={textareaRef}
                  rows={15}
                  placeholder="Write your post content using Markdown syntax..."
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  className="border-t-0 rounded-t-none font-mono text-sm"
                />
              </div>

              {/* Editor Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="draft"
                    checked={post.isDraft}
                    onCheckedChange={(checked) => setPost({ ...post, isDraft: !!checked })}
                  />
                  <Label htmlFor="draft" className="text-sm text-secondary">
                    Save as draft
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createPostMutation.isPending}
                    className="bg-accent hover:bg-blue-600 text-white"
                  >
                    {createPostMutation.isPending ? "Publishing..." : "Publish Post"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostEditor;
