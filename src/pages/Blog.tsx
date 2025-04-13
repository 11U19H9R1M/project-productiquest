
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Search, 
  TrendingUp, 
  BookOpen, 
  Video, 
  FileText, 
  Calendar, 
  Clock, 
  ChevronRight,
  Bookmark,
  ThumbsUp,
  Share2,
  Tag,
  Filter,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedArticles, setSavedArticles] = useState<number[]>([]);
  const [likedArticles, setLikedArticles] = useState<number[]>([]);
  const { toast } = useToast();
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Simulate loading articles
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Load saved articles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('saved_articles');
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
    
    const liked = localStorage.getItem('liked_articles');
    if (liked) {
      setLikedArticles(JSON.parse(liked));
    }
  }, []);
  
  // Handle search functionality
  useEffect(() => {
    if (searchQuery.length > 1) {
      setIsSearching(true);
      const filteredResults = featuredArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const timer = setTimeout(() => {
        setSearchResults(filteredResults);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [searchQuery]);
  
  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSaveArticle = (articleId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newSavedArticles = savedArticles.includes(articleId)
      ? savedArticles.filter(id => id !== articleId)
      : [...savedArticles, articleId];
    
    setSavedArticles(newSavedArticles);
    localStorage.setItem('saved_articles', JSON.stringify(newSavedArticles));
    
    toast({
      title: savedArticles.includes(articleId) ? "Article removed from bookmarks" : "Article saved to bookmarks",
      duration: 2000,
    });
  };
  
  const handleLikeArticle = (articleId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const newLikedArticles = likedArticles.includes(articleId)
      ? likedArticles.filter(id => id !== articleId)
      : [...likedArticles, articleId];
    
    setLikedArticles(newLikedArticles);
    localStorage.setItem('liked_articles', JSON.stringify(newLikedArticles));
  };
  
  const handleShareArticle = (article: any, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href + '?article=' + article.id,
      });
    } else {
      toast({
        title: "Link copied to clipboard",
        description: "Share this article with your network",
        duration: 2000,
      });
    }
  };
  
  const featuredArticles = [
    {
      id: 1,
      title: "5 Ways AI is Transforming Remote Work Productivity",
      excerpt: "Discover how machine learning algorithms are helping teams achieve more in less time.",
      image: "https://placehold.co/800x450/9b87f5/FFFFFF/png?text=AI+Productivity",
      author: "Alex Johnson",
      authorAvatar: "https://i.pravatar.cc/150?img=32",
      date: "May 15, 2023",
      readTime: "8 min read",
      category: "AI & ML",
      tags: ["artificial intelligence", "productivity", "remote work"],
      featured: true
    },
    {
      id: 2,
      title: "HIPAA Compliance for Remote Teams: A Complete Guide",
      excerpt: "Everything your healthcare organization needs to know about maintaining compliance with remote workers.",
      image: "https://placehold.co/800x450/6E59A5/FFFFFF/png?text=HIPAA+Compliance",
      author: "Sarah Miller",
      authorAvatar: "https://i.pravatar.cc/150?img=44",
      date: "April 28, 2023",
      readTime: "12 min read",
      category: "Compliance",
      tags: ["HIPAA", "healthcare", "compliance", "security"]
    },
    {
      id: 3,
      title: "The Future of Time Tracking: Blockchain Verification",
      excerpt: "How distributed ledger technology is revolutionizing timesheet accuracy and preventing fraud.",
      image: "https://placehold.co/800x450/8B5CF6/FFFFFF/png?text=Blockchain+Time+Tracking",
      author: "Michael Chen",
      authorAvatar: "https://i.pravatar.cc/150?img=11",
      date: "June 2, 2023",
      readTime: "10 min read",
      category: "Technology",
      tags: ["blockchain", "time tracking", "security"]
    },
    {
      id: 4,
      title: "Building a Culture of Deep Work in Distributed Teams",
      excerpt: "Strategies to encourage focus and minimize distractions in remote work environments.",
      image: "https://placehold.co/800x450/7E69AB/FFFFFF/png?text=Deep+Work",
      author: "Elena Rodriguez",
      authorAvatar: "https://i.pravatar.cc/150?img=25",
      date: "July 12, 2023",
      readTime: "9 min read",
      category: "Productivity",
      tags: ["deep work", "focus", "remote teams"]
    },
    {
      id: 5,
      title: "How to Choose the Right Time Management System for Your Team",
      excerpt: "A comparison of popular methodologies and tools to optimize your team's productivity.",
      image: "https://placehold.co/800x450/9b87f5/FFFFFF/png?text=Time+Management",
      author: "David Park",
      authorAvatar: "https://i.pravatar.cc/150?img=15",
      date: "August 5, 2023",
      readTime: "7 min read",
      category: "Time Management",
      tags: ["productivity", "time management", "tools"]
    },
    {
      id: 6,
      title: "The Psychology of Productivity: What Really Works",
      excerpt: "Research-backed strategies to combat procrastination and boost your work output.",
      image: "https://placehold.co/800x450/8B5CF6/FFFFFF/png?text=Psychology+of+Productivity",
      author: "Jennifer Wu",
      authorAvatar: "https://i.pravatar.cc/150?img=20",
      date: "September 10, 2023",
      readTime: "11 min read",
      category: "Psychology",
      tags: ["psychology", "productivity", "motivation"]
    }
  ];
  
  const trendingTopics = [
    { id: 1, name: "Remote Productivity", count: 24 },
    { id: 2, name: "AI Analytics", count: 19 },
    { id: 3, name: "HIPAA Compliance", count: 15 },
    { id: 4, name: "Distributed Teams", count: 12 },
    { id: 5, name: "Time Management", count: 10 },
    { id: 6, name: "Deep Work", count: 8 },
    { id: 7, name: "Blockchain", count: 7 },
    { id: 8, name: "Security", count: 6 }
  ];
  
  const videoTutorials = [
    {
      id: 1,
      title: "Getting Started with ProductiQuest",
      thumbnail: "https://placehold.co/600x400/9b87f5/FFFFFF/png?text=Getting+Started",
      duration: "5:32"
    },
    {
      id: 2,
      title: "Advanced AI Analytics Dashboard",
      thumbnail: "https://placehold.co/600x400/8B5CF6/FFFFFF/png?text=AI+Analytics",
      duration: "8:47"
    },
    {
      id: 3,
      title: "Team Productivity Reports",
      thumbnail: "https://placehold.co/600x400/7E69AB/FFFFFF/png?text=Productivity+Reports",
      duration: "6:15"
    },
    {
      id: 4,
      title: "Compliance Settings Configuration",
      thumbnail: "https://placehold.co/600x400/6E59A5/FFFFFF/png?text=Compliance+Settings",
      duration: "7:23"
    }
  ];
  
  const categories = [
    { id: "all", name: "All" },
    { id: "ai", name: "AI & ML" },
    { id: "compliance", name: "Compliance" },
    { id: "technology", name: "Technology" },
    { id: "productivity", name: "Productivity" },
    { id: "psychology", name: "Psychology" }
  ];
  
  const topicColor = (count: number) => {
    if (count > 20) return "bg-red-500";
    if (count > 15) return "bg-orange-500";
    if (count > 10) return "bg-yellow-500";
    if (count > 5) return "bg-green-500";
    return "bg-blue-500";
  };
  
  const filteredArticles = activeCategory === 'all' 
    ? featuredArticles 
    : featuredArticles.filter(article => 
        article.category.toLowerCase() === activeCategory.toLowerCase() ||
        article.tags.some(tag => tag.toLowerCase() === activeCategory.toLowerCase())
      );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-secondary to-secondary/50 dark:from-secondary/30 dark:to-background py-16">
          <div className="container px-4 mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Knowledge Hub
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Insights, tutorials, and best practices for optimizing remote work productivity
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              className="relative max-w-xl mx-auto"
              ref={searchRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Search articles, guides, and tutorials..."
                  className="pr-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="absolute right-0 top-0 bottom-0 rounded-l-none">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <AnimatePresence>
                {isSearching && (
                  <motion.div 
                    className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg p-2 overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm text-muted-foreground mb-2">
                      {searchResults.length === 0 ? "No results found" : `Found ${searchResults.length} results`}
                    </p>
                    
                    <div className="max-h-64 overflow-y-auto">
                      {searchResults.map(article => (
                        <Button key={article.id} variant="ghost" className="w-full justify-start text-sm mb-1 p-2" asChild>
                          <a href={`#article-${article.id}`} className="flex items-start">
                            <FileText className="mr-2 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-left">{article.title}</p>
                              <p className="text-xs text-muted-foreground text-left truncate">{article.excerpt}</p>
                            </div>
                          </a>
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
        
        {/* Category Filters */}
        <section className="py-4 border-b">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between overflow-x-auto pb-2 no-scrollbar">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium hidden sm:block">Categories:</span>
                <div className="flex space-x-2">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Articles Column */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="all">
                  <div className="flex justify-between items-center mb-6">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="insights">Insights</TabsTrigger>
                      <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                      <TabsTrigger value="guides">Guides</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="hidden sm:inline">Sort by:</span>
                      <select className="ml-2 bg-transparent">
                        <option>Most Recent</option>
                        <option>Most Popular</option>
                        <option>Trending</option>
                      </select>
                    </div>
                  </div>
                  
                  <TabsContent value="all" className="space-y-8">
                    {isLoading ? (
                      <>
                        <Card className="overflow-hidden">
                          <div className="aspect-video relative">
                            <Skeleton className="w-full h-full" />
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                              <Skeleton className="h-10 w-10 rounded-full" />
                              <div className="ml-2 space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-32" />
                              </div>
                            </div>
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4 mb-4" />
                            <Skeleton className="h-10 w-32" />
                          </CardContent>
                        </Card>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {[1, 2].map(i => (
                            <Card key={i} className="overflow-hidden">
                              <div className="aspect-video relative">
                                <Skeleton className="w-full h-full" />
                              </div>
                              <CardContent className="p-4">
                                <Skeleton className="h-5 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-2/3 mb-4" />
                                <div className="flex items-center mt-4">
                                  <Skeleton className="h-6 w-6 rounded-full" />
                                  <Skeleton className="h-3 w-24 ml-2" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Featured Article */}
                        {filteredArticles.length > 0 && filteredArticles.some(article => article.featured) && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300" id={`article-${filteredArticles.find(a => a.featured)?.id}`}>
                              <div className="aspect-video relative">
                                <img 
                                  src={filteredArticles.find(a => a.featured)?.image} 
                                  alt={filteredArticles.find(a => a.featured)?.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                                  {filteredArticles.find(a => a.featured)?.category}
                                </div>
                              </div>
                              <CardContent className="p-6">
                                <div className="flex items-center mb-4">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={filteredArticles.find(a => a.featured)?.authorAvatar} />
                                    <AvatarFallback>AJ</AvatarFallback>
                                  </Avatar>
                                  <div className="ml-2 text-sm">
                                    <span className="font-medium">{filteredArticles.find(a => a.featured)?.author}</span>
                                    <div className="flex items-center text-muted-foreground">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      <span className="mr-2">{filteredArticles.find(a => a.featured)?.date}</span>
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>{filteredArticles.find(a => a.featured)?.readTime}</span>
                                    </div>
                                  </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{filteredArticles.find(a => a.featured)?.title}</h3>
                                <p className="text-muted-foreground">{filteredArticles.find(a => a.featured)?.excerpt}</p>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                  {filteredArticles.find(a => a.featured)?.tags.map((tag, idx) => (
                                    <Badge key={idx} variant="outline" className="cursor-pointer hover:bg-secondary" onClick={() => setActiveCategory(tag)}>
                                      <Tag className="h-3 w-3 mr-1" />
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <div className="flex justify-between items-center mt-4">
                                  <Button>Read Article</Button>
                                  
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={(e) => handleSaveArticle(filteredArticles.find(a => a.featured)?.id || 1, e)}
                                      className={savedArticles.includes(filteredArticles.find(a => a.featured)?.id || 1) ? "text-primary" : ""}
                                    >
                                      <Bookmark className="h-5 w-5" />
                                      <span className="sr-only">Bookmark</span>
                                    </Button>
                                    
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={(e) => handleLikeArticle(filteredArticles.find(a => a.featured)?.id || 1, e)}
                                      className={likedArticles.includes(filteredArticles.find(a => a.featured)?.id || 1) ? "text-primary" : ""}
                                    >
                                      <ThumbsUp className="h-5 w-5" />
                                      <span className="sr-only">Like</span>
                                    </Button>
                                    
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={(e) => handleShareArticle(filteredArticles.find(a => a.featured), e)}
                                    >
                                      <Share2 className="h-5 w-5" />
                                      <span className="sr-only">Share</span>
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                        
                        {/* Regular Articles */}
                        <div className="grid md:grid-cols-2 gap-6">
                          {filteredArticles.filter(article => !article.featured).map((article, index) => (
                            <motion.div
                              key={article.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              id={`article-${article.id}`}
                            >
                              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                                <div className="aspect-video relative">
                                  <img 
                                    src={article.image} 
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                                    {article.category}
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="absolute top-2 right-2 bg-background/80 hover:bg-background text-primary rounded-full p-1.5"
                                    onClick={(e) => handleSaveArticle(article.id, e)}
                                  >
                                    <Bookmark 
                                      className={`h-4 w-4 ${savedArticles.includes(article.id) ? "fill-current" : ""}`} 
                                    />
                                    <span className="sr-only">Bookmark</span>
                                  </Button>
                                </div>
                                <CardContent className="p-4 flex-grow">
                                  <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                                    <a href={`#article-${article.id}`}>{article.title}</a>
                                  </h3>
                                  <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                                  
                                  {/* Tags */}
                                  <div className="flex flex-wrap gap-1 mt-3">
                                    {article.tags.slice(0, 2).map((tag, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs cursor-pointer hover:bg-secondary" onClick={() => setActiveCategory(tag)}>
                                        {tag}
                                      </Badge>
                                    ))}
                                    {article.tags.length > 2 && (
                                      <Badge variant="outline" className="text-xs">+{article.tags.length - 2}</Badge>
                                    )}
                                  </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 mt-auto flex justify-between border-t">
                                  <div className="flex items-center text-sm">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={article.authorAvatar} />
                                      <AvatarFallback>SM</AvatarFallback>
                                    </Avatar>
                                    <span className="ml-2 font-medium">{article.author}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8"
                                      onClick={(e) => handleLikeArticle(article.id, e)}
                                    >
                                      <ThumbsUp className={`h-4 w-4 ${likedArticles.includes(article.id) ? "fill-current text-primary" : ""}`} />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8"
                                      onClick={(e) => handleShareArticle(article, e)}
                                    >
                                      <Share2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </CardFooter>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                        
                        <div className="flex justify-center">
                          <Button variant="outline" className="flex items-center">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Load More
                          </Button>
                        </div>
                      </>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="insights">
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">More insights articles coming soon!</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tutorials">
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">More tutorials coming soon!</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="guides">
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">More guides coming soon!</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Sidebar Content */}
              <div className="space-y-8">
                {/* Trending Topics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                      Trending Topics
                    </CardTitle>
                    <CardDescription>Popular topics our readers are exploring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {trendingTopics.map(topic => (
                        <motion.div 
                          key={topic.id}
                          whileHover={{ scale: 1.05 }}
                          className={`${topicColor(topic.count)} text-white px-3 py-1 rounded-full text-sm flex items-center hover:opacity-90 transition-opacity cursor-pointer`}
                          onClick={() => setActiveCategory(topic.name.toLowerCase())}
                        >
                          <span>{topic.name}</span>
                          <span className="ml-1 bg-white bg-opacity-20 rounded-full px-1.5 text-xs">
                            {topic.count}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Video Tutorials */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Video className="mr-2 h-5 w-5 text-primary" />
                      Video Tutorials
                    </CardTitle>
                    <CardDescription>Learn by watching our step-by-step guides</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Carousel className="w-full">
                      <CarouselContent>
                        {videoTutorials.map(video => (
                          <CarouselItem key={video.id}>
                            <div className="relative aspect-video rounded-md overflow-hidden group cursor-pointer">
                              <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <motion.div 
                                  className="bg-white bg-opacity-90 rounded-full p-3"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"></path>
                                  </svg>
                                </motion.div>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                                {video.duration}
                              </div>
                            </div>
                            <h4 className="mt-2 text-sm font-medium">{video.title}</h4>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex justify-end gap-1 mt-2">
                        <CarouselPrevious className="relative left-0 right-0 translate-x-0 translate-y-0" />
                        <CarouselNext className="relative left-0 right-0 translate-x-0 translate-y-0" />
                      </div>
                    </Carousel>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Tutorials</Button>
                  </CardFooter>
                </Card>
                
                {/* Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-primary" />
                      Resources
                    </CardTitle>
                    <CardDescription>Templates, checklists, and guides</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <motion.a 
                        href="#" 
                        className="block p-3 rounded-lg border hover:bg-muted transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <h4 className="font-medium flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-primary" />
                          HIPAA Compliance Checklist
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Ensure your remote work policies meet healthcare regulations
                        </p>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="block p-3 rounded-lg border hover:bg-muted transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <h4 className="font-medium flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-primary" />
                          Remote Work Policy Template
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Customizable template for your organization's remote work guidelines
                        </p>
                      </motion.a>
                      <motion.a 
                        href="#" 
                        className="block p-3 rounded-lg border hover:bg-muted transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <h4 className="font-medium flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-primary" />
                          Time Tracking Best Practices
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Optimize productivity with our proven time management strategies
                        </p>
                      </motion.a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container px-4 mx-auto text-center">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Stay Updated
            </motion.h2>
            <motion.p 
              className="text-primary-foreground/80 max-w-2xl mx-auto mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get the latest productivity insights, compliance updates, and product news delivered directly to your inbox.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row max-w-md mx-auto gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button variant="secondary" onClick={() => toast({ title: "Subscribed!", description: "Thank you for subscribing to our newsletter." })}>
                Subscribe
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
