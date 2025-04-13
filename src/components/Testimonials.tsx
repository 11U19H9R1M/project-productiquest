
import React from 'react';
import { Star } from 'lucide-react';

const Testimonial = ({ quote, author, role, company, rating }: { 
  quote: string, 
  author: string, 
  role: string, 
  company: string,
  rating: number
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
    <div className="flex mb-4">
      {Array(rating).fill(0).map((_, i) => (
        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <blockquote className="flex-1">
      <p className="text-gray-600 text-lg leading-relaxed mb-4">{quote}</p>
    </blockquote>
    <footer className="mt-2">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-purple-400 flex items-center justify-center text-white font-bold">
            {author.charAt(0)}
          </div>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">{role}, {company}</p>
        </div>
      </div>
    </footer>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This platform has transformed how our distributed engineering team works. The AI insights into our focus time and productivity patterns were eye-opening.",
      author: "Sarah Chen",
      role: "CTO",
      company: "TechNova",
      rating: 5
    },
    {
      quote: "As a freelancer juggling multiple clients, the predictive deadline features have saved me from overcommitting numerous times.",
      author: "Marcus Johnson",
      role: "Design Consultant",
      company: "Independent",
      rating: 5
    },
    {
      quote: "The enterprise security features made getting approval from our compliance team a breeze. Self-hosting option sealed the deal for us.",
      author: "Jennifer Lopez",
      role: "CISO",
      company: "FinanceCore",
      rating: 5
    },
    {
      quote: "Integration with our existing dev tools was seamless. The ML-based insights about our team's productivity patterns have helped us optimize our sprint planning.",
      author: "David Kim",
      role: "Engineering Manager",
      company: "SoftServe",
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by Teams Worldwide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            See how companies and professionals are enhancing their productivity.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
