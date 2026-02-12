import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, MessageSquare, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>Join thousands of active community members</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Build Connections,
            <br />
            <span className="text-blue-400">Share Ideas</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300">
            A modern community platform where members engage, collaborate, and grow together.
            Share your expertise, learn from others, and be part of something bigger.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Sign In
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <Users className="h-8 w-8 text-blue-400" />
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-slate-400">Active Members</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MessageSquare className="h-8 w-8 text-blue-400" />
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-slate-400">Discussions</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-slate-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}