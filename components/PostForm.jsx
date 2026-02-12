'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';

export default function PostForm({ user }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.title.length < 5) {
      setError('Title must be at least 5 characters long');
      setLoading(false);
      return;
    }

    if (formData.content.length < 20) {
      setError('Content must be at least 20 characters long');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      if (data.success) {
        toast.success('Post created successfully!');
        router.push('/community');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (err) {
      console.error('Create post error:', err);
      setError(err.message || 'Failed to create post. Please try again.');
      toast.error(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Post Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="What's on your mind?"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={loading}
          minLength={5}
        />
        <p className="text-xs text-muted-foreground">
          Minimum 5 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Share your thoughts, ideas, or questions..."
          value={formData.content}
          onChange={handleChange}
          required
          disabled={loading}
          minLength={20}
          rows={8}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Minimum 20 characters
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Create Post
            </>
          )}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push('/community')}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}