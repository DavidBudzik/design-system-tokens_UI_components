import { ArrowUpRight, ArrowRight, Github, Droplet, Box, LayoutTemplate, Check, ArrowRightCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { premadeThemes } from '../data/themePalettes';

export default function LandingPage() {

  return (
    <div className="bg-white text-neutral-900 antialiased overflow-x-hidden scroll-smooth">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <Logo 
                baseColors={premadeThemes[0]?.baseColors || {
                  cta: '#E03600',
                  primary: '#242424',
                  secondary: '#EDEDED',
                  danger: '#E03636',
                  success: '#1CD166',
                  warning: '#FFB529',
                  link: '#308FED',
                  background: '#FFFFFF',
                  foreground: '#171717',
                }}
                className="w-10 h-10"
              />
              <span className="font-bold text-xl tracking-tight text-neutral-900" style={{ fontFamily: '"Open Sans", sans-serif' }}>Design Book</span>
            </Link>
            <div className="hidden md:flex space-x-10">
              <a href="#architecture" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-widest">Structure</a>
              <a href="#features" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-widest">Features</a>
              <a href="#preview" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-widest">Library</a>
              <Link to="/documentation" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-widest">Documentation</Link>
            </div>
            <div>
              <Link 
                to="/app" 
                className="text-sm bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 rounded-none transition-all flex items-center gap-2 font-medium"
              >
                <span>Launch App</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-neutral-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block border-b-2 border-neutral-900 pb-1 mb-8">
            <span className="text-neutral-900 text-xs font-bold uppercase tracking-[0.2em]">The Design System Handbook</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-neutral-900 mb-8 leading-tight font-serif">
            Design as <br />
            <span className="italic text-neutral-500">Structured Data.</span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-neutral-600 font-light leading-relaxed font-serif">
            A comprehensive study on Design Tokens and Atomic Design principles. 
            Transforming aesthetic decisions into scalable, semantic code.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/app"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-neutral-900 rounded-none hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
            >
              <span className="mr-3">Open Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a 
              href="https://github.com/davidbudzik/design-system-tokens_UI_components" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-neutral-900 transition-all duration-200 bg-transparent border-2 border-neutral-200 rounded-none hover:border-neutral-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
            >
              <Github className="w-4 h-4 mr-3" />
              View Source
            </a>
          </div>
        </div>
      </header>

      {/* Architecture / Concept Section */}
      <section id="architecture" className="py-24 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-200 pb-6">
            <div>
              <h2 className="text-4xl font-medium text-neutral-900 font-serif">System Architecture</h2>
              <p className="mt-2 text-lg text-neutral-500 font-serif italic">From primitive values to complex interfaces.</p>
            </div>
            <div className="hidden md:block text-neutral-400 font-mono text-xs">FIG. 01 — STRUCTURE</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-0 left-0 w-full h-px bg-neutral-200 z-0"></div>

            {/* Step 1: Tokens */}
            <div className="relative z-10 bg-white pt-8 group h-full">
              {/* Standardized Circle Indicator */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-neutral-300 rounded-full z-20 group-hover:bg-neutral-900 group-hover:border-neutral-900 transition-all duration-300"></div>
              
              <div className="border border-neutral-200 p-8 hover:shadow-xl hover:border-neutral-900 transition-all duration-300 bg-neutral-50 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-neutral-400">01. ATOMS</span>
                  <Droplet className="w-5 h-5 text-neutral-900" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-neutral-900 mb-4">Design Tokens</h3>
                <p className="text-neutral-600 text-sm mb-6 leading-relaxed flex-grow">The atomic units of style. Visual attributes like color and spacing stored as platform-agnostic data.</p>
                <div className="bg-white border border-neutral-200 p-4 font-mono text-xs text-neutral-600 shadow-sm mt-auto h-40 flex flex-col justify-center">
                  <div>
                    <span className="text-neutral-400">// tokens.json</span><br />
                    {'{'}<br />
                    &nbsp;&nbsp;"color": {'{'}<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;"base": <span className="font-bold text-neutral-900">"#000000"</span><br />
                    &nbsp;&nbsp;{'}'}<br />
                    {'}'}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Components */}
            <div className="relative z-10 bg-white pt-8 group h-full">
              {/* Standardized Circle Indicator */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-neutral-300 rounded-full z-20 group-hover:bg-neutral-900 group-hover:border-neutral-900 transition-all duration-300"></div>
              
              <div className="border border-neutral-200 p-8 hover:shadow-xl hover:border-neutral-900 transition-all duration-300 bg-neutral-50 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-neutral-400">02. MOLECULES</span>
                  <Box className="w-5 h-5 text-neutral-900" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-neutral-900 mb-4">UI Components</h3>
                <p className="text-neutral-600 text-sm mb-6 leading-relaxed flex-grow">Encapsulated elements that consume tokens. Ensuring consistency across every touchpoint.</p>
                <div className="bg-white border border-neutral-200 p-4 font-mono text-xs text-neutral-600 shadow-sm mt-auto h-40 flex flex-col justify-center">
                  <div>
                    &lt;Button<br />
                    &nbsp;&nbsp;variant=<span className="font-bold text-neutral-900">"primary"</span><br />
                    /&gt;
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Patterns */}
            <div className="relative z-10 bg-white pt-8 group h-full">
              {/* Standardized Circle Indicator */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-neutral-300 rounded-full z-20 group-hover:bg-neutral-900 group-hover:border-neutral-900 transition-all duration-300"></div>
              
              <div className="border border-neutral-200 p-8 hover:shadow-xl hover:border-neutral-900 transition-all duration-300 bg-neutral-50 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-neutral-400">03. ORGANISMS</span>
                  <LayoutTemplate className="w-5 h-5 text-neutral-900" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-neutral-900 mb-4">Patterns</h3>
                <p className="text-neutral-600 text-sm mb-6 leading-relaxed flex-grow">Complex layouts built by composing components. The final user interface experienced by the user.</p>
                <div className="p-4 bg-white border border-neutral-200 flex flex-col gap-2 shadow-sm mt-auto h-40 justify-center">
                  <div className="h-2 w-1/3 bg-neutral-200"></div>
                  <div className="h-6 w-full bg-neutral-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section id="features" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-200 pb-6">
            <div>
              <h2 className="text-4xl font-medium text-neutral-900 font-serif">Key Features</h2>
              <p className="mt-2 text-lg text-neutral-500 font-serif italic">What makes this system powerful.</p>
            </div>
            <div className="hidden md:block text-neutral-400 font-mono text-xs">FIG. 03 — FEATURES</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-neutral-200 p-6 bg-white">
              <h3 className="text-xl font-serif font-medium text-neutral-900 mb-3">Token-Based Design</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">All visual properties are defined as reusable tokens, ensuring consistency and easy theming.</p>
            </div>
            <div className="border border-neutral-200 p-6 bg-white">
              <h3 className="text-xl font-serif font-medium text-neutral-900 mb-3">Atomic Components</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">Built following atomic design principles for maximum reusability and maintainability.</p>
            </div>
            <div className="border border-neutral-200 p-6 bg-white">
              <h3 className="text-xl font-serif font-medium text-neutral-900 mb-3">Dark Mode Support</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">Full dark mode implementation with semantic color tokens that adapt automatically.</p>
            </div>
            <div className="border border-neutral-200 p-6 bg-white">
              <h3 className="text-xl font-serif font-medium text-neutral-900 mb-3">Export Capabilities</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">Export tokens in multiple formats (CSS, JSON, SCSS) for use across different platforms.</p>
            </div>
            <div className="border border-neutral-200 p-6 bg-white">
              <h3 className="text-xl font-serif font-medium text-neutral-900 mb-3">Interactive Documentation</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">Live component library with interactive examples and real-time token editing.</p>
            </div>
            <div className="border border-neutral-200 p-6 bg-white">
              <h3 className="text-xl font-serif font-medium text-neutral-900 mb-3">Type-Safe Tokens</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">TypeScript definitions ensure type safety when using tokens in your codebase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Workflow & Integration (Token Presets & Exports) */}
      <section id="workflow" className="py-24 border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-200 pb-6">
            <div>
              <h2 className="text-4xl font-medium text-neutral-900 font-serif">Workflow & Integration</h2>
              <p className="mt-2 text-lg text-neutral-500 font-serif italic">From configuration to production code.</p>
            </div>
            <div className="hidden md:block text-neutral-400 font-mono text-xs">FIG. 02 — PIPELINE</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Token Presets (Left Column) */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-900 flex items-center justify-center text-white">
                  <span className="font-mono text-xs font-bold">A</span>
                </div>
                <h3 className="text-2xl font-serif font-medium text-neutral-900">Token Presets</h3>
              </div>
              
              <p className="text-neutral-600 leading-relaxed mb-8">
                Presets act as the "context" for your design system. Instead of hard-coding values, switch entire themes or densities instantly.
              </p>

              {/* Visual Representation of Presets */}
              <div className="border border-neutral-200 p-6 bg-neutral-50">
                <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-4">
                  <span className="font-mono text-xs font-bold text-neutral-400 uppercase">Active Preset</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-white border border-neutral-200 text-xs font-mono text-neutral-400">Light</span>
                    <span className="px-2 py-1 bg-neutral-900 text-white text-xs font-mono">Dark Mode</span>
                  </div>
                </div>
                
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">color.surface.primary</span>
                    <span className="text-neutral-900 font-bold">#111827</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">color.text.base</span>
                    <span className="text-neutral-900 font-bold">#F9FAFB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">spacing.scale</span>
                    <span className="text-neutral-900 font-bold">Compact (4px)</span>
                  </div>
                </div>
              </div>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-neutral-900 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-neutral-900 block font-medium">Multi-Brand Theming</strong>
                    <span className="text-neutral-500 text-sm">Swap entire color palettes (e.g., Enterprise vs. Consumer) without touching code.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-neutral-900 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-neutral-900 block font-medium">Density Switching</strong>
                    <span className="text-neutral-500 text-sm">Control spacing scales globally to support "Compact" or "Spacious" viewport modes.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Export Options (Right Column) */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-900 flex items-center justify-center text-white">
                  <span className="font-mono text-xs font-bold">B</span>
                </div>
                <h3 className="text-2xl font-serif font-medium text-neutral-900">Platform Exports</h3>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-8">
                The engine of the system. Automatically transform your abstract JSON tokens into platform-specific code ready for production.
              </p>

              {/* Visual Representation of Exports */}
              <div className="border border-neutral-200 bg-white">
                <div className="flex border-b border-neutral-200">
                  <div className="px-4 py-2 border-r border-neutral-200 text-xs font-mono font-bold bg-neutral-50 text-neutral-900">CSS</div>
                  <div className="px-4 py-2 border-r border-neutral-200 text-xs font-mono text-neutral-400 hover:text-neutral-900 cursor-pointer">Swift</div>
                  <div className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-neutral-900 cursor-pointer">Android</div>
                </div>
                <div className="p-6 bg-neutral-900 text-neutral-300 font-mono text-xs overflow-x-auto">
                  <pre><code>:root {'{'}<br />
  <span className="text-neutral-500">  /* Semantic Colors */</span><br />
  --color-primary: <span className="text-white">#000000</span>;<br />
  --color-surface: <span className="text-white">#FFFFFF</span>;<br />
<br />
  <span className="text-neutral-500">  /* Spacing Scale */</span><br />
  --spacing-unit: <span className="text-white">0.25rem</span>;<br />
  --spacing-md: <span className="text-white">calc(var(--spacing-unit) * 4)</span>;<br />
{'}'}</code></pre>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <ArrowRightCircle className="w-5 h-5 text-neutral-900 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-neutral-900 block font-medium">Web (CSS/SCSS)</strong>
                    <span className="text-neutral-500 text-sm">Generates CSS Custom Properties for runtime theming or SCSS variables for compilation.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRightCircle className="w-5 h-5 text-neutral-900 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-neutral-900 block font-medium">Native Mobile (iOS & Android)</strong>
                    <span className="text-neutral-500 text-sm">Exports UIColor constants for Swift and XML/Kotlin resources for Android.</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Visual Showcase / CTA */}
      <section id="preview" className="py-32 bg-white relative overflow-hidden">
        {/* Abstract shape */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-neutral-50 border-l border-neutral-100 hidden lg:block"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-5xl font-serif font-medium text-neutral-900 mb-6">Explore the Library</h2>
            <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
              Access the complete component library, documentation, and source code. Built for scalability and designed for clarity.
            </p>
            <Link 
              to="/app" 
              className="inline-flex items-center px-10 py-5 bg-neutral-900 text-white font-bold rounded-none hover:bg-neutral-800 transition-colors"
            >
              Browse Components
            </Link>
          </div>
          
          <div className="lg:w-1/2 w-full">
            {/* Mock Interface Representation - Clean Wireframe Style */}
            <div className="bg-white border-2 border-neutral-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
              <div className="border-b-2 border-neutral-100 pb-4 mb-6 flex justify-between items-center">
                <div className="font-mono text-sm font-bold text-neutral-900">DASHBOARD.VIEW</div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-neutral-200 rounded-full"></div>
                  <div className="w-3 h-3 bg-neutral-200 rounded-full"></div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3 space-y-4 border-r border-neutral-100 pr-4">
                  <div className="h-2 w-12 bg-neutral-900 mb-6"></div>
                  <div className="h-8 w-full bg-neutral-100"></div>
                  <div className="h-8 w-full bg-white border border-neutral-200"></div>
                  <div className="h-8 w-full bg-white border border-neutral-200"></div>
                  <div className="h-8 w-full bg-white border border-neutral-200"></div>
                </div>
                <div className="col-span-9 space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="h-10 w-48 bg-neutral-900"></div>
                    <div className="h-8 w-24 border border-neutral-900"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="h-40 border border-neutral-200 p-4">
                      <div className="h-4 w-24 bg-neutral-200 mb-2"></div>
                      <div className="h-16 w-full bg-neutral-50"></div>
                    </div>
                    <div className="h-40 border border-neutral-200 p-4">
                      <div className="h-4 w-24 bg-neutral-200 mb-2"></div>
                      <div className="h-16 w-full bg-neutral-50"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="documentation" className="py-24 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-200 pb-6">
            <div>
              <h2 className="text-4xl font-medium text-neutral-900 font-serif">Documentation</h2>
              <p className="mt-2 text-lg text-neutral-500 font-serif italic">Complete guide to using Design Book.</p>
            </div>
            <div className="hidden md:block text-neutral-400 font-mono text-xs">FIG. 04 — GUIDE</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="border border-neutral-200 p-8 bg-white hover:shadow-xl hover:border-neutral-900 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-neutral-900">User Guide</h3>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                Comprehensive documentation covering all features, from basic navigation to advanced token management. Learn how to explore tokens, use components, manage themes, and export your design system.
              </p>
              <Link
                to="/documentation"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors uppercase tracking-widest"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="border border-neutral-200 p-8 bg-white hover:shadow-xl hover:border-neutral-900 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center">
                  <Box className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-neutral-900">Quick Start</h3>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                Get started quickly with our step-by-step guide. Learn the basics of navigating the interface, viewing tokens, exploring components, and exporting your design system in minutes.
              </p>
              <ul className="space-y-2 text-sm text-neutral-600 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-neutral-900 mt-0.5 flex-shrink-0" />
                  <span>Navigate the interface</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-neutral-900 mt-0.5 flex-shrink-0" />
                  <span>Explore design tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-neutral-900 mt-0.5 flex-shrink-0" />
                  <span>Use UI components</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-neutral-900 mt-0.5 flex-shrink-0" />
                  <span>Export tokens</span>
                </li>
              </ul>
              <Link
                to="/documentation"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors uppercase tracking-widest"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-neutral-500 text-sm font-mono">
            &copy; {new Date().getFullYear()} David Budzik.
          </div>
          <div className="flex gap-6">
            <a 
              href="https://github.com/davidbudzik/design-system-tokens_UI_components" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        .bg-grid {
          background-size: 20px 20px;
          background-image: linear-gradient(to right, #e5e5e5 1px, transparent 1px),
                            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}

