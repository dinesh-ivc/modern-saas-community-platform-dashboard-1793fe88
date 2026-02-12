/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [all, my]
 *       - in: query
 *         name: stats
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized
 */

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { verifyToken } from '@/lib/jwt';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter');
    const stats = searchParams.get('stats');
    const authHeader = request.headers.get('authorization');
    
    const supabase = createAdminClient();

    let userId = null;
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const payload = await verifyToken(token);
        userId = payload?.userId;
      } catch (err) {
        console.error('Token verification failed:', err);
      }
    }

    // If stats requested, return community statistics
    if (stats === 'true') {
      const { count: totalPosts } = await supabase
        .from('community_posts')
        .select('*', { count: 'exact', head: true });

      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      let userPosts = 0;
      if (userId) {
        const { count } = await supabase
          .from('community_posts')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);
        userPosts = count || 0;
      }

      return NextResponse.json({
        success: true,
        stats: {
          totalPosts: totalPosts || 0,
          totalUsers: totalUsers || 0,
          userPosts
        }
      });
    }

    // Build query for posts
    let query = supabase
      .from('community_posts')
      .select(`
        id,
        user_id,
        title,
        content,
        created_at,
        updated_at,
        users!inner (
          name
        )
      `)
      .order('created_at', { ascending: false });

    // Filter by user if requested
    if (filter === 'my' && userId) {
      query = query.eq('user_id', userId);
    }

    const { data: posts, error } = await query;

    if (error) {
      console.error('Database query error:', error);
      throw new Error('Failed to fetch posts');
    }

    // Transform posts to include user name
    const transformedPosts = (posts || []).map(post => ({
      id: post.id,
      user_id: post.user_id,
      title: post.title,
      content: post.content,
      created_at: post.created_at,
      updated_at: post.updated_at,
      user_name: post.users?.name || 'Anonymous'
    }));

    return NextResponse.json({
      success: true,
      posts: transformedPosts
    });
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const payload = await verifyToken(token);

    if (!payload?.userId) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content } = body;

    // Validate inputs
    if (!title || title.length < 5) {
      return NextResponse.json(
        { success: false, error: 'Title must be at least 5 characters long' },
        { status: 400 }
      );
    }

    if (!content || content.length < 20) {
      return NextResponse.json(
        { success: false, error: 'Content must be at least 20 characters long' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Create post
    const { data: newPost, error: insertError } = await supabase
      .from('community_posts')
      .insert([
        {
          user_id: payload.userId,
          title,
          content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error('Failed to create post');
    }

    return NextResponse.json(
      {
        success: true,
        post: newPost,
        message: 'Post created successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/posts error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}