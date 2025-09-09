import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayIcon, CodeIcon, RocketIcon, LightningBoltIcon, GearIcon, StarIcon } from '@radix-ui/react-icons';
import heroBackground from '@/assets/hero-bg.jpg';

const features = [
  {
    icon: PlayIcon,
    title: 'Interactive Video Learning',
    description: 'Watch high-quality coding tutorials with our advanced video player and playlist system.'
  },
  {
    icon: CodeIcon,
    title: 'In-Browser Compiler',
    description: 'Practice coding instantly with our powerful compiler supporting multiple programming languages.'
  },
  {
    icon: RocketIcon,
    title: 'Progress Tracking',
    description: 'Track your learning journey with detailed progress analytics and achievement badges.'
  }
];

const testimonials = [
  {
    name: 'Saksham',
    role: 'Software Engineer at Google',
    content: 'TechEd transformed my coding skills. The interactive compiler made learning so much easier!',
    rating: 5
  },
  {
    name: 'Raj',
    role: 'Full Stack Developer',
    content: 'Best platform for learning programming. The video quality and explanations are top-notch.',
    rating: 5
  },
  {
    name: 'Akshat',
    role: 'CS Student',
    content: 'Finally found a platform that combines theory with hands-on practice perfectly.',
    rating: 5
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden bg-gradient-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-4xl lg:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="text-gradient animate-text-shimmer bg-[length:200%_100%]">
                  Learn. Code. Build.
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Master programming with our interactive platform featuring video tutorials and a powerful in-browser compiler.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Button
                  size="lg"
                  variant="neon"
                  className="text-lg px-8 py-6"
                  onClick={() => navigate('/lectures')}
                >
                  <PlayIcon className="mr-2 h-5 w-5" />
                  Start Learning
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 hover:border-primary"
                  onClick={() => navigate('/compiler')}
                >
                  <CodeIcon className="mr-2 h-5 w-5" />
                  Try Compiler
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-gradient">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to become a proficient programmer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-hover h-full bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-gradient">
              Student Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers who've accelerated their careers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-hover h-full bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gradient">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of learners and start building amazing projects today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="neon"
                className="text-lg px-8 py-6"
                onClick={() => navigate('/lectures')}
              >
                <RocketIcon className="mr-2 h-5 w-5" />
                Begin Learning
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <CodeIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">TechEd</span>
              </div>
              <p className="text-muted-foreground">
                Empowering the next generation of developers through interactive learning.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Lectures</p>
                <p>Compiler</p>
                <p>Progress Tracking</p>
                <p>Community</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Help Center</p>
                <p>Contact Us</p>
                <p>Bug Reports</p>
                <p>Feature Requests</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Cookie Policy</p>
                <p>GDPR</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TechEd. All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;