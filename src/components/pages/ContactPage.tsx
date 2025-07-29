import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.8 }}
      className="h-screen w-full flex items-center justify-center p-8"
    >
      <div className="max-w-4xl w-full flex items-center gap-12">
        {/* Left Side - Scroll Decoration */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="hidden lg:block flex-1"
        >
          <div className="relative">
            {/* Ancient Scroll Background */}
            <div className="w-96 h-[600px] bg-gradient-to-b from-card via-card/90 to-card border-l-4 border-r-4 border-accent/40 rounded-lg shadow-mystical relative overflow-hidden">
              {/* Scroll Texture */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
              </div>
              
              {/* Mystical Runes */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                  className="absolute text-accent/30 text-2xl font-bold"
                  style={{
                    top: `${10 + (i * 7)}%`,
                    left: `${20 + (i % 3) * 20}%`,
                  }}
                >
                  ⟐
                </motion.div>
              ))}
            </div>

            {/* Floating Candles */}
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-16 bg-gradient-warm rounded-full shadow-warm"
                style={{
                  top: `${20 + i * 50}%`,
                  [i === 0 ? 'left' : 'right']: '-20px',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                }}
              >
                <div className="w-full h-3 bg-secondary rounded-full mt-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1 max-w-md"
        >
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                <span className="bg-gradient-to-r from-accent via-primary-glow to-accent bg-clip-text text-transparent">
                  Send
                </span>{" "}
                <span className="text-foreground">Message</span>
              </h2>
              <p className="text-muted-foreground">
                Inscribe your words upon this digital scroll
              </p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <div className="space-y-2">
                <Label htmlFor="name" className="text-accent font-medium">
                  Your Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-card/80 backdrop-blur-sm border-primary/30 focus:border-accent transition-all duration-300"
                  placeholder="Enter your name..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-accent font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-card/80 backdrop-blur-sm border-primary/30 focus:border-accent transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-accent font-medium">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="bg-card/80 backdrop-blur-sm border-primary/30 focus:border-accent transition-all duration-300 resize-none"
                  placeholder="Share your thoughts, project ideas, or just say hello..."
                  required
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  variant="mystical"
                  size="lg"
                  className="w-full relative group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Seal the Message
                    <motion.span
                      animate={{ rotate: [0, 180, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="text-lg"
                    >
                      ⟐
                    </motion.span>
                  </span>
                  
                  {/* Magical seal effect */}
                  <div className="absolute inset-0 bg-gradient-ethereal opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />
                </Button>
              </motion.div>
            </motion.form>

            {/* Contact Links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-center space-y-4"
            >
              <p className="text-muted-foreground text-sm">Or connect directly:</p>
              <div className="flex justify-center space-x-6">
                {[
                  { name: 'GitHub', symbol: '⚡' },
                  { name: 'LinkedIn', symbol: '◈' },
                  { name: 'Email', symbol: '✉' },
                ].map((link) => (
                  <motion.a
                    key={link.name}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center gap-2 text-accent hover:text-primary-glow transition-colors duration-300"
                  >
                    <span className="text-lg">{link.symbol}</span>
                    <span className="text-sm font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ContactPage;