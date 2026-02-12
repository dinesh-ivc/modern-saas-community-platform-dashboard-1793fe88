import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Heart, Share2, Award, Shield, Zap } from 'lucide-react';

export default function CommunityPreview() {
  const features = [
    {
      icon: MessageSquare,
      title: 'Rich Discussions',
      description: 'Engage in meaningful conversations with nested comments and real-time updates'
    },
    {
      icon: Award,
      title: 'Reputation & Badges',
      description: 'Earn reputation points and unlock badges as you contribute to the community'
    },
    {
      icon: Shield,
      title: 'Moderation Tools',
      description: 'Keep the community safe with built-in moderation and content review features'
    },
    {
      icon: Zap,
      title: 'Instant Notifications',
      description: 'Stay updated with real-time notifications for mentions, replies, and messages'
    },
    {
      icon: Heart,
      title: 'Bookmarks & Likes',
      description: 'Save your favorite posts and show appreciation with likes and reactions'
    },
    {
      icon: Share2,
      title: 'Direct Messaging',
      description: 'Connect privately with other members through our secure messaging system'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Everything You Need to Build Community
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Powerful features designed to foster engagement, collaboration, and growth within your community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-slate-200 hover:border-blue-300 transition-colors">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}