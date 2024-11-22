'use client'
  
  import React, { useState, useEffect, useRef } from 'react'
  import { motion, AnimatePresence } from 'framer-motion'
  import {  Share2Icon, MenuIcon, UserIcon, RocketIcon, CodeIcon, BarChartIcon, CheckCircleIcon, StarIcon, ShieldIcon, ZapIcon, VolumeXIcon, Volume2Icon } from 'lucide-react'
  import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Badge } from "@/components/ui/badge"
  import { Meteors } from '@/components/ui/meteors'
  import Particles from "@/components/ui/particles"
  import { useNavigate } from 'react-router-dom';
  
  const HomePage = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const [showAuthDialog, setShowAuthDialog] = useState(false)
    const [authMode, setAuthMode] = useState('login')
    const navigate = useNavigate();
    const [jobDescription, setJobDescription] = useState('');
    const [resumePdf, setResumePdf] = useState<File | null>(null);
    const [linkedInProfile, setLinkedInProfile] = useState('');
    const [githubProfile, setGithubProfile] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50)
        
        const sections = ['home', 'features', 'how-it-works', 'pricing', 'testimonials']
        const current = sections.find(section => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 100 && rect.bottom >= 100
          }
          return false
        })
        if (current) setActiveSection(current)
      }
  
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])
  
    useEffect(() => {
      audioRef.current = new Audio('/src/assets/galaxy.mp3');
      audioRef.current.loop = true;

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }, []);
  
    const toggleAudio = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };
  
    const AuthDialog = () => (
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md bg-black/90 text-white border border-neon-green">
          <DialogHeader>
            <DialogTitle className="text-white">{authMode === 'login' ? 'Login' : 'Sign Up'}</DialogTitle>
            <DialogDescription className="text-white">
              {authMode === 'login' ? 'Welcome back!' : 'Create your account'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              className="bg-black/50 border-neon-green text-white placeholder-white/50"
            />
            <Input
              type="password"
              placeholder="Password"
              className="bg-black/50 border-neon-green text-white placeholder-white/50"
            />
            <Button 
              className="w-full bg-neon-green text-black hover:bg-neon-green/80"
            >
              {authMode === 'login' ? 'Login' : 'Sign Up'}
            </Button>
            <p className="text-center text-sm text-white">
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-neon-pink hover:underline"
              >
                {authMode === 'login' ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  
    const Navbar = () => (
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-700 ease-in-out ${
          isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <span className="text-3xl font-extrabold text-white tracking-wide">
                RE-SIFT
              </span>
            </div>
  
            <div className="hidden md:flex items-center space-x-10">
              {['Home', 'Features', 'How It Works', 'Pricing', 'Testimonials'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={`text-lg font-semibold transition-colors ${
                    activeSection === item.toLowerCase().replace(' ', '-')
                      ? 'text-neon-green'
                      : 'text-white hover:text-neon-green'
                  }`}
                >
                  {item}
                </a>
              ))}
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-neon-blue/20"
                variant="outline"
                onClick={() => {
                  setAuthMode('login')
                  setShowAuthDialog(true)
                }}
              >
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-neon-green/80"
                onClick={() => {
                  setAuthMode('signup')
                  setShowAuthDialog(true)
                }}
              >
                Sign Up
              </Button>
            </div>
  
            <div className="md:hidden">
              <Button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700"
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
  
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="md:hidden bg-black border-t border-neon-green/30"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['Home', 'Features', 'How It Works', 'Pricing', 'Testimonials'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="block px-3 py-2 text-base font-medium text-white hover:text-neon-green hover:bg-neon-green/10 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="space-y-2 pt-4">
                  <Button className="w-full border-neon-blue text-white hover:bg-neon-blue/20 font-bold py-2 px-4 rounded-lg"
                    variant="outline"
                    onClick={() => {
                      setAuthMode('login')
                      setShowAuthDialog(true)
                      setIsMenuOpen(false)
                    }}
                  >
                    Login
                  </Button>
                  <Button className="w-full bg-neon-green text-black hover:bg-neon-green/80 font-bold py-2 px-4 rounded-lg"
                    onClick={() => {
                      setAuthMode('signup')
                      setShowAuthDialog(true)
                      setIsMenuOpen(false)
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    )
  
    const handleAnalyze = () => {
      if (!jobDescription || !resumePdf || !linkedInProfile) {
        // Show error message
        return;
      }

      // Store data in localStorage for the analysis page
      localStorage.setItem('jobDescription', jobDescription);
      localStorage.setItem('resumePdf', URL.createObjectURL(resumePdf));
      localStorage.setItem('linkedInProfile', linkedInProfile);
      localStorage.setItem('githubProfile', githubProfile);
      
      // Navigate to analysis page
      navigate('/analysis');
    };
  
    const AudioButton = () => (
      <motion.button
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black/80 border border-neon-green hover:bg-black/60 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? (
          <Volume2Icon className="w-6 h-6 text-neon-green" />
        ) : (
          <VolumeXIcon className="w-6 h-6 text-neon-green" />
        )}
      </motion.button>
    );
  
    return (
      <div className="relative w-full bg-black text-white font-mono select-none">
        <Navbar />
        <AuthDialog />
        <AudioButton />
  
        <motion.div
          className="fixed inset-0 z-0"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          <Meteors number={20} />
          <Particles className="absolute inset-0" quantity={100} />
          <div className="absolute inset-0 bg-stars-pattern opacity-50"></div>
        </motion.div>
  
        <div className="relative z-10">
          <section id="home" className="min-h-screen flex items-center justify-center py-20 px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-4 bg-neon-pink/20 text-white border border-neon-pink/30">
                  Now in Beta - Try it Free
                </Badge>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 glitch-text" data-text="Career Boost">
                Career Boost
              </h1>
  
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <h2 className="text-xl md:text-2xl text-white mb-6">
                  Your AI-Powered Career Accelerator
                </h2>
                <p className="text-lg md:text-xl text-white mb-12">
                  Transform your job search with intelligent insights and real-time optimization
                </p>
              </motion.div>
  
              <motion.div
                className="w-full max-w-xl mx-auto bg-black/90 p-6 rounded-3xl backdrop-blur-lg border border-neon-green shadow-neon"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <div className="space-y-4">
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full p-3 bg-black/90 border border-neon-green rounded-xl"
                    placeholder="Paste Job Description (required)"
                    rows={3}
                  />
                  <input
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResumePdf(e.currentTarget.files?.[0] || null)}
                    accept=".pdf"
                    className="flex-1 p-3 bg-black/90 border border-neon-green rounded-xl"
                  />
                  <Input
                    type="text"
                    placeholder="LinkedIn Profile"
                    value={linkedInProfile}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkedInProfile(e.target.value)}
                    className="bg-black/50 border-neon-green text-white placeholder-white/50"
                  />
                  <Input
                    type="text"
                    placeholder="GitHub Profile (optional)"
                    value={githubProfile}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGithubProfile(e.target.value)}
                    className="bg-black/50 border-neon-green text-white placeholder-white/50"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Button
                      onClick={handleAnalyze}
                      className="w-full py-4 bg-white text-black hover:bg-white/80 shadow-neon-green"
                    >
                      Analyze My Profile
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
  
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
              >
                {[
                  { label: "Active Users", value: "10,000+", icon: <UserIcon /> },
                  { label: "Success Rate", value: "85%", icon: <StarIcon /> },
                  { label: "Jobs Analyzed", value: "50,000+", icon: <BarChartIcon /> }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/30 border border-neon-blue/20 rounded-xl p-6 shadow-neon"
                  >
                    <div className="text-white mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>
  
          <section id="features" className="py-20 px-6 bg-black/50">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white glitch-text" data-text="Powerful Features">
                  Powerful Features
                </h2>
                <p className="text-lg md:text-xl text-white">Everything you need to accelerate your career journey</p>
              </motion.div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <RocketIcon className="w-12 h-12" />,
                    title: "AI-Powered Analysis",
                    description: "Get instant feedback on your resume and application materials with our advanced AI engine"
                  },
                  {
                    icon: <CodeIcon className="w-12 h-12" />,
                    title: "Technical Skill Matching",
                    description: "Automatically match your skills with job requirements and get suggestions for improvement"
                  },
                  {
                    icon: <BarChartIcon className="w-12 h-12" />,
                    title: "Success Metrics",
                    description: "Track your application success rate and get insights to improve your performance"
                  },
                  {
                    icon: <ZapIcon className="w-12 h-12" />,
                    title: "Real-time Optimization",
                    description: "Get instant suggestions to optimize your application for each job posting"
                  },
                  {
                    icon: <ShieldIcon className="w-12 h-12" />,
                    title: "ATS Compatibility",
                    description: "Ensure your resume passes through Applicant Tracking Systems with our ATS checker"
                  },
                  {
                    icon: <Share2Icon className="w-12 h-12" />,
                    title: "Integration Support",
                    description: "Seamlessly integrate with LinkedIn, GitHub, and other platforms"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black p-8 rounded-2xl backdrop-blur-sm border border-neon-green/20 hover:border-neon-green/50 transition-all shadow-neon group"
                  >
                    <motion.div 
                      className="text-white mb-4 group-hover:text-neon-green transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{feature.title}</h3>
                    <p className="text-white">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
  
          <section id="how-it-works" className="py-20 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white glitch-text" data-text="How It Works">
                  How It Works
                </h2>
                <p className="text-lg md:text-xl text-white">Simple steps to optimize your job search</p>
              </motion.div>
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Upload Materials",
                    description: "Submit your resume and job descriptions"
                  },
                  {
                    step: "02",
                    title: "AI Analysis",
                    description: "Our AI analyzes and provides detailed feedback"
                  },
                  {
                    step: "03",
                    title: "Optimize & Apply",
                    description: "Implement suggestions and track your success"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="text-6xl font-bold text-neon-green/30 mb-4">{item.step}</div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-white">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
  
          <section id="pricing" className="py-20 px-6 bg-black/50">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white glitch-text" data-text="Pricing Plans">
                  Pricing Plans
                </h2>
                <p className="text-lg md:text-xl text-white">Choose the perfect plan for your needs</p>
              </motion.div>
  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Free",
                    price: "0",
                    features: [
                      "3 job applications per month",
                      "Basic AI analysis",
                      "Email support"
                    ]
                  },
                  {
                    name: "Pro",
                    price: "29",
                    featured: true,
                    features: [
                      "Unlimited job applications",
                      "Advanced AI analysis",
                      "Priority support",
                      "Custom resume templates",
                      "Application tracking"
                    ]
                  },
                  {
                    name: "Enterprise",
                    price: "99",
                    features: [
                      "Everything in Pro",
                      "API access",
                      "Custom integrations",
                      "Dedicated account manager",
                      "Team collaboration"
                    ]
                  }
                ].map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: plan.featured ? 1.05 : 1.02 }}
                    className={`${
                      plan.featured
                        ? 'border-2 border-neon-green scale-105'
                        : 'border border-neon-blue'
                    } bg-black rounded-2xl overflow-hidden shadow-neon`}
                  >
                    <div className="p-8">
                      <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">{plan.name}</h3>
                      <div className="mb-6">
                        <span className="text-3xl md:text-4xl font-bold text-white">${plan.price}</span>
                        <span className="text-white">/month</span>
                      </div>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-white">
                            <CheckCircleIcon className="w-5 h-5 mr-2 text-neon-green" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`w-full ${
                          plan.featured
                            ? 'bg-white text-black hover:bg-gray-200'
                            : 'bg-white text-black hover:bg-gray-200'
                        } font-bold py-2 px-4 rounded`}
                      >
                        Get Started
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
  
          <section id="testimonials" className="py-20 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white glitch-text" data-text="Success Stories">
                  Success Stories
                </h2>
                <p className="text-lg md:text-xl text-white">See what our users are saying</p>
              </motion.div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "Software Engineer",
                    company: "Tech Corp",
                    quote: "RE-SIFT helped me land my dream job! The AI analysis was spot-on and helped me optimize my resume perfectly."
                  },
                  {
                    name: "Michael Chen",
                    role: "Product Manager",
                    company: "StartupCo",
                    quote: "The insights provided by RE-SIFT were invaluable. I saw an immediate improvement in my interview callback rate."
                  },
                  {
                    name: "Emily Rodriguez",
                    role: "Data Scientist",
                    company: "DataTech",
                    quote: "The technical skill matching feature saved me so much time. It helped me focus on the right opportunities."
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black p-8 rounded-2xl backdrop-blur-sm border border-neon-green shadow-neon"
                  >
                    <div className="mb-6">
                      <p className="text-white italic">"{testimonial.quote}"</p>
                    </div>
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-neon-blue">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
  
          <footer className="bg-black border-t border-neon-green/30 py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">RE-SIFT</h3>
                  <p className="text-white">
                    Revolutionizing job search with AI-powered insights
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-white">Product</h4>
                  <ul className="space-y-2 text-white">
                    <li><a href="#features" className="hover:text-neon-pink">Features</a></li>
                    <li><a href="#pricing" className="hover:text-neon-pink">Pricing</a></li>
                    <li><a href="#testimonials" className="hover:text-neon-pink">Testimonials</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-neon-green">Company</h4>
                  <ul className="space-y-2 text-neon-blue">
                    <li><a href="#" className="hover:text-neon-pink">About</a></li>
                    <li><a href="#" className="hover:text-neon-pink">Blog</a></li>
                    <li><a href="#" className="hover:text-neon-pink">Careers</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-neon-green">Legal</h4>
                  <ul className="space-y-2 text-neon-blue">
                    <li><a href="#" className="hover:text-neon-pink">Privacy</a></li>
                    <li><a href="#" className="hover:text-neon-pink">Terms</a></li>
                    <li><a href="#" className="hover:text-neon-pink">Security</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-neon-green/30 mt-12 pt-8 text-center text-neon-blue">
                <p>&copy; 2024 RE-SIFT. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
  
        <style>{`
          @keyframes glitch {
            0% {
              text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                           -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                           -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
            }
            14% {
              text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                           -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                           -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
            }
            15% {
              text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                           0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                           -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
            }
            49% {
              text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                           0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                           -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
            }
            50% {
              text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                           0.05em 0 0 rgba(0, 255, 0, 0.75),
                           0 -0.05em 0 rgba(0, 0, 255, 0.75);
            }
            99% {
              text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                           0.05em 0 0 rgba(0, 255, 0, 0.75),
                           0 -0.05em 0 rgba(0, 0, 255, 0.75);
            }
            100% {
              text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                           -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                           -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
            }
          }
  
          .glitch-text {
            animation: glitch 2s infinite;
          }
  
          .bg-grid-pattern {
            background-image: 
              linear-gradient(to right, rgba(0, 255, 0, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 0, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
          }

          .bg-stars-pattern {
            background-image: url('/path/to/stars-or-galaxy-image.jpg');
            background-size: cover;
            background-position: center;
          }
  
          .shadow-neon {
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.3), 0 0 20px rgba(0, 255, 0, 0.2), 0 0 30px rgba(0, 255, 0, 0.1);
          }
  
          html {
            scroll-behavior: smooth;
          }

          * {
            user-select: none;
          }
        `}</style>
      </div>
    )
  }
  
  export default HomePage