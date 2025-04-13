
import React from 'react';

const TechStack = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Built with Cutting-Edge Technology
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
            Our platform leverages the latest innovations in AI, cloud computing, and security.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">ML</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">TensorFlow</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">TS</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">TypeScript</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">K8s</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">Kubernetes</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">PG</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">PostgreSQL</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">API</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">FastAPI</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">NXT</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">Next.js</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">WS</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">WebSockets</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">RDS</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">Redis</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">ETH</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">Ethereum</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">OAI</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">OpenAI</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">AWS</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">Lambda Edge</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <span className="text-xl font-bold gradient-text">CF</span>
            </div>
            <p className="mt-2 text-sm text-gray-500 text-center">Cloudflare</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
