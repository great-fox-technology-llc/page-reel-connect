import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Layout,
  Users,
  ShoppingBag,
  Zap,
  Globe,
  BarChart3,
  Check,
  Star,
} from "lucide-react";

export default function Landing() {
  const { setTheme } = useTheme();

  // Force dark theme on landing page
  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 animate-fade-in">
              Build Your <span className="gradient-text">Social</span> Website
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up">
              Create stunning websites with drag-and-drop. Share posts, stories & reels. 
              Connect with your community. All in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary text-lg px-8 hover:opacity-90 transition-opacity">
                  Start Building Free
                </Button>
              </Link>
              <Link to="/discover">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Explore Creators
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 max-w-6xl mx-auto">
            <div className="glass rounded-3xl p-2 shadow-glow animate-float">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold gradient-text">50K+</div>
                    <div className="text-muted-foreground mt-2">Creators</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text">1M+</div>
                    <div className="text-muted-foreground mt-2">Websites</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text">$10M+</div>
                    <div className="text-muted-foreground mt-2">Revenue</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text">99.9%</div>
                    <div className="text-muted-foreground mt-2">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Build & Connect
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful tools for creators, entrepreneurs, and communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 glass border-border hover:border-primary/50 transition-all hover:shadow-glow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free, upgrade when you're ready to grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 ${
                  plan.featured
                    ? "glass border-primary shadow-glow scale-105"
                    : "glass border-border"
                }`}
              >
                {plan.featured && (
                  <div className="inline-block px-4 py-1 rounded-full bg-gradient-primary text-white text-sm font-semibold mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/auth">
                  <Button
                    className={`w-full ${
                      plan.featured
                        ? "bg-gradient-primary hover:opacity-90"
                        : ""
                    }`}
                    variant={plan.featured ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by Creators Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 glass border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary"></div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your Dream Website?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators building beautiful social websites
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-primary text-lg px-8 hover:opacity-90 transition-opacity">
              Start Building Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="font-bold">SocialBuilder</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Build, connect, and grow your online presence
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Templates</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
            © 2025 SocialBuilder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Layout,
    title: "Drag & Drop Builder",
    description: "Create stunning pages with our intuitive canvas builder. No coding required.",
  },
  {
    icon: Users,
    title: "Social Feed & Stories",
    description: "Share posts, stories, and reels. Connect with your community in real-time.",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce Ready",
    description: "Sell products directly from your website with built-in commerce tools.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with instant page loads and smooth interactions.",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Connect your own domain and build your brand identity.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track your growth with detailed analytics and performance metrics.",
  },
];

const plans = [
  {
    name: "Free",
    price: 0,
    featured: false,
    cta: "Start Free",
    features: [
      "Free subdomain",
      "Unlimited pages",
      "Basic widgets",
      "1-2 GB storage",
      "Community support",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    price: 9,
    featured: true,
    cta: "Start Pro Trial",
    features: [
      "Custom domain",
      "Unlimited pages",
      "Premium widgets",
      "20-50 GB storage",
      "E-commerce tools",
      "Advanced analytics",
      "Priority support",
      "Ad-free experience",
    ],
  },
  {
    name: "Enterprise",
    price: 125,
    featured: false,
    cta: "Contact Sales",
    features: [
      "Unlimited domains",
      "White-label platform",
      "Unlimited storage",
      "Advanced commerce",
      "API access",
      "Dedicated manager",
      "Custom integrations",
      "Enterprise security",
    ],
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Artist",
    content:
      "SocialBuilder transformed how I showcase my work. The canvas builder is intuitive and my portfolio looks stunning!",
  },
  {
    name: "Mike Johnson",
    role: "Entrepreneur",
    content:
      "I built my entire e-commerce store in days. The social features help me connect with customers directly.",
  },
  {
    name: "Emma Davis",
    role: "Content Creator",
    content:
      "The best platform for creators. Stories, posts, and my website all in one place. Absolutely love it!",
  },
];
