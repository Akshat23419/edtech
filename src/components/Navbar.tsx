import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CodeIcon, PlayIcon, HomeIcon, PersonIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';

const navItems = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Lectures', href: '/lectures', icon: PlayIcon },
  { name: 'Compiler', href: '/compiler', icon: CodeIcon },
  { name: 'Profile', href: '/profile', icon: PersonIcon },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const NavLink = ({ item, mobile = false }: { item: typeof navItems[0]; mobile?: boolean }) => {
    const isActive = location.pathname === item.href;
    
    return (
      <Link
        to={item.href}
        onClick={() => mobile && setIsOpen(false)}
        className={`
          relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
          ${isActive 
            ? 'text-primary bg-primary/10' 
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
          }
          ${mobile ? 'text-lg' : ''}
        `}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.name}</span>
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </Link>
    );
  };

  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <CodeIcon className="h-5 w-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-primary rounded-lg opacity-50 blur-lg animate-glow-pulse" />
            </motion.div>
            <span className="text-xl font-bold text-gradient">TechEd</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <HamburgerMenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <CodeIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gradient">TechEd</span>
                  </div>
                  
                  {navItems.map((item) => (
                    <NavLink key={item.name} item={item} mobile />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};