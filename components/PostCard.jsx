'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, Heart, Bookmark, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/validation';

export default function PostCard({ post, user }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = async () => {
    setLiked(!liked);
  };

  const handleBookmark = async () => {
    setBookmarked(!bookmarked);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {getInitials(post.user_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{post.user_name || 'Anonymous'}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(post.created_at)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-3">{post.content}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2"
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="text-xs">{liked ? 1 : 0}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">0</span>
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleBookmark}
        >
          <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
        </Button>
      </CardFooter>
    </Card>
  );
}