
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MessageSquare, Heart, Share2, Send, Users, Lock, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Example data - in a real implementation, this would come from your database
const EXAMPLE_POSTS = [
  {
    id: '1',
    author: {
      id: 'user1',
      name: 'Alex Morgan',
      avatar: '/placeholder.svg'
    },
    content: "Just hit 10 days nicotine-free! The energy boost is real. Anyone else notice improved sleep quality after quitting?",
    timestamp: '2025-04-10T15:30:00Z',
    likes: 12,
    comments: 5,
    isPrivate: false,
    milestone: '10 days nicotine-free'
  },
  {
    id: '2',
    author: {
      id: 'user2',
      name: 'Sam Taylor',
      avatar: '/placeholder.svg'
    },
    content: "Struggled today but used the breathing exercises in the Craving Tools section. They really work! What's your go-to technique when cravings hit hard?",
    timestamp: '2025-04-09T12:15:00Z',
    likes: 8,
    comments: 7,
    isPrivate: false
  },
  {
    id: '3',
    author: {
      id: 'user3',
      name: 'Jordan Lee',
      avatar: '/placeholder.svg'
    },
    content: "Down to 2 cigarettes a day from a pack! Taking it step by step with the gradual reduction method. The tracker is keeping me accountable.",
    timestamp: '2025-04-08T09:45:00Z',
    likes: 15,
    comments: 3,
    isPrivate: false,
    milestone: 'Reduced by 90%'
  }
];

const PostCard: React.FC<{ post: any }> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? 'Like removed' : 'Post liked');
  };
  
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    toast.success('Comment posted');
    setCommentText('');
  };
  
  const formattedDate = new Date(post.timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{formattedDate} · {post.isPrivate ? <Lock className="inline h-3 w-3" /> : <Globe className="inline h-3 w-3" />}</p>
            </div>
          </div>
          {post.milestone && (
            <Badge variant="outline" className="bg-fresh-50 text-fresh-700 border-fresh-200">
              {post.milestone}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm">{post.content}</p>
      </CardContent>
      <CardFooter className="pt-0 flex-col items-start">
        <div className="flex items-center justify-between w-full py-2">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="h-auto p-0" onClick={handleLike}>
              <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-red-500 text-red-500' : ''}`} /> 
              <span className="text-xs">{liked ? post.likes + 1 : post.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-auto p-0" onClick={() => setShowComments(!showComments)}>
              <MessageSquare className="h-4 w-4 mr-1" /> 
              <span className="text-xs">{post.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-auto p-0">
              <Share2 className="h-4 w-4 mr-1" /> 
              <span className="text-xs">Share</span>
            </Button>
          </div>
        </div>
        
        {showComments && (
          <div className="w-full pt-2">
            <Separator className="my-2" />
            <form onSubmit={handleComment} className="flex items-center gap-2 mt-2">
              <Input 
                placeholder="Add a comment..." 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="text-xs"
              />
              <Button type="submit" size="sm" className="px-2">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

const NewPostForm: React.FC = () => {
  const [postText, setPostText] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  
  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;
    
    toast.success('Post shared with the community!');
    setPostText('');
  };
  
  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmitPost}>
        <CardContent className="pt-6">
          <Textarea 
            placeholder="Share your journey, achievements or ask for support..." 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="resize-none mb-4"
            rows={3}
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="privacy-toggle" 
                checked={isPrivate}
                onChange={() => setIsPrivate(!isPrivate)} 
                className="rounded border-gray-300"
              />
              <label htmlFor="privacy-toggle" className="text-xs flex items-center">
                <Lock className="h-3 w-3 mr-1" /> Private (only visible to you)
              </label>
            </div>
            <Button type="submit" disabled={!postText.trim()}>
              Share
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

const CommunityFeed: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Community</h1>
        <p className="text-muted-foreground">Connect with others on their fresh journey</p>
      </div>
      
      <Tabs defaultValue="feed" className="mb-6">
        <TabsList>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          {user ? (
            <>
              <NewPostForm />
              
              <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center">
                <Users className="h-4 w-4 mr-2" /> COMMUNITY POSTS
              </h2>
              
              {EXAMPLE_POSTS.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p>Please log in to interact with the community</p>
                <Button className="mt-4">Log In</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="groups">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <h3 className="text-xl font-medium mb-2">Interest-based Groups</h3>
              <p className="text-muted-foreground mb-6">Coming soon! Join groups based on your specific interests and goals.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="py-2 px-4">Cold Turkey</Badge>
                <Badge variant="outline" className="py-2 px-4">Gradual Reduction</Badge>
                <Badge variant="outline" className="py-2 px-4">NRT Users</Badge>
                <Badge variant="outline" className="py-2 px-4">Ex-Smokers</Badge>
                <Badge variant="outline" className="py-2 px-4">Vape-Free</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="discover">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <h3 className="text-xl font-medium">Discover New Connections</h3>
              <p className="text-muted-foreground">This feature is coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-posts">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <h3 className="text-xl font-medium">Your Posts</h3>
              <p className="text-muted-foreground">When you share posts, they'll appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityFeed;
