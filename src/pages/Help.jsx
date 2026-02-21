import React from 'react';
import { Search, BookOpen, FileText, Globe, MonitorPlay, Mail, Phone } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const helpCategories = [
    {
      title: "Getting Started",
      links: [
        "System Requirements",
        "Creating a Bootable USB Drive",
        "PXE Network Boot Configuration",
        "First-Time Setup"
      ]
    },
    {
      title: "Drive Erasure Process",
      links: [
        "Understanding Drive Detection",
        "Selecting Wipe Methods",
        "Verification Levels Explained",
        "Handling System Drives",
        "Multi-Drive Operations"
      ]
    },
    {
      title: "Compliance Standards",
      links: [
        "NIST SP 800-88 Rev1 Overview",
        "DoD 5220.22-M Requirements",
        "GDPR Data Erasure Guidelines",
        "ISO 27001 Compliance",
        "Generating Audit Reports"
      ]
    },
    {
      title: "Troubleshooting",
      links: [
        "Drive Not Detected",
        "Wipe Operation Failed",
        "Network Connection Issues",
        "License Synchronization Problems",
        "Report Generation Errors"
      ]
    },
    {
      title: "Advanced Topics",
      links: [
        "Custom Wipe Patterns",
        "Batch Processing",
        "Remote Management",
        "Integration with Asset Management",
        "API Documentation"
      ]
    }
  ];

  return (
    <div className="p-8 max-w-[1200px] mx-auto w-full text-foreground/80 pb-20">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">Help & Documentation</h1>
        <p className="text-sm text-muted">Comprehensive guide for D-Secure Drive Eraser</p>
      </div>

      {/* Search Bar Container */}
      <div className="bg-surface border border-border rounded-xl p-8 mb-10 transition-colors duration-300 shadow-sm">
        <div className="flex gap-4 max-w-4xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search help documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-border text-foreground rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted/60 font-medium"
            />
          </div>
          <button className="px-10 py-3 bg-primary hover:brightness-110 text-white rounded-lg font-bold transition-all shadow-lg active:scale-95 uppercase tracking-widest text-xs">
            Search
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {helpCategories.map((category, index) => (
          <div
            key={index}
            className="bg-surface rounded-xl border border-border p-8 transition-colors duration-300 hover:border-primary/30 group shadow-sm"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{category.title}</h2>
            </div>

            <ul className="space-y-4">
              {category.links.map((link, linkIndex) => (
                <li key={linkIndex} className="group/item">
                  <a
                    href="#"
                    className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-3 font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-border group-hover/item:bg-primary transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Quick Links Section */}
      <div className="bg-surface rounded-xl border border-border p-8 mb-10 transition-colors duration-300 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-8">Quick Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="flex flex-col items-center justify-center p-8 bg-background/30 rounded-xl hover:bg-background/50 transition-all gap-5 group border border-border hover:border-primary/30">
            <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <FileText className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">User Manual (PDF)</span>
          </button>

          <button className="flex flex-col items-center justify-center p-8 bg-background/30 rounded-xl hover:bg-background/50 transition-all gap-5 group border border-border hover:border-primary/30">
            <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Globe className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Online Documentation</span>
          </button>

          <button className="flex flex-col items-center justify-center p-8 bg-background/30 rounded-xl hover:bg-background/50 transition-all gap-5 group border border-border hover:border-primary/30">
            <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <MonitorPlay className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Video Tutorials</span>
          </button>
        </div>
      </div>

      {/* Need Additional Support Section */}
      <div className="bg-surface border border-border rounded-xl p-8 border-l-4 border-l-primary transition-colors duration-300 shadow-md">
        <h3 className="text-lg font-bold text-foreground mb-2">Need Additional Support?</h3>
        <p className="text-sm text-muted mb-8 max-w-2xl leading-relaxed">
          Our enterprise support team is available to assist with technical questions, license management, and compliance inquiries.
        </p>
        <div className="flex flex-wrap items-center gap-x-16 gap-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-[10px] text-muted uppercase font-bold tracking-widest mb-1">Email Support</div>
              <div className="text-sm font-bold text-foreground hover:text-primary cursor-pointer transition-colors">support@dsecure-tech.com</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-[10px] text-muted uppercase font-bold tracking-widest mb-1">Phone Support</div>
              <div className="text-sm font-bold text-foreground hover:text-primary cursor-pointer transition-colors">1-800-DSECURE</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Help;