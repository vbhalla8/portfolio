import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Figma, Linkedin, Mail, Menu, X, ExternalLink, Github } from 'lucide-react';

const VerticalScrollingText = () => (
  <div className="absolute right-0 top-0 bottom-0 w:[100rem] bg-[#8169B1] overflow-hidden md:w-12">
    <style>{`
      @keyframes scroll {
        0% { transform: translateY(0%); }
        100% { transform: translateY(-33.33%); }
      }
      .scrolling-text {
        animation: scroll 20s linear infinite;
        writing-mode: vertical-rl;
        white-space: nowrap;
      }
    `}</style>



    
    <div className="flex flex-col h-full">
      <div className="scrolling-text font-didact text-black text-sm md:text-lg tracking-wider p-2 md:p-3">
        designer & developer ✧˖° // currently @ Georgia Institute of Technology
        designer & developer ✧˖° // currently @ Georgia Institute of Technology
        designer & developer ✧˖° // currently @ Georgia Institute of Technology
        designer & developer ✧˖° // currently @ Georgia Institute of Technology
      </div>
    </div>
  </div>
);

// 3D Image Carousel Component with Global Mouse Tracking
const Carousel3D = ({ setActivePage }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [globalMousePos, setGlobalMousePos] = useState({ x: 0, y: 0 });
  const [isInCarousel, setIsInCarousel] = useState(false);
  
  const carouselItems = [
    { image: "images/determ (1).png", title: "De>Terminal", page: "de-terminal" },
    { image: "images/month.ly.png", title: "Month.ly", page: "monthly" },
    { image: "images/graph (1).png", title: "Graphic Medicine", page: "graphic-med" },
    { image: "images/spotify (1).png", title: "Spotify Wrapped", page: "spotify" },
    { image: "images/studyhive.png", title: "GT Study Hive", page: "studyhive" },
  ];

  // Track mouse position relative to the carousel container
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setGlobalMousePos({ x: x * 3, y: y * 3 }); // Larger multiplier for bigger 3D span
  };

  const handleMouseLeave = () => {
    setGlobalMousePos({ x: 0, y: 0 });
    setIsInCarousel(false);
  };

  const goToSlide = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (direction === 'next') {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Calculate shine angle based on mouse position
  const shineAngle = Math.atan2(globalMousePos.y, globalMousePos.x) * (180 / Math.PI) + 90;

  const getSlideStyle = (index) => {
    const total = carouselItems.length;
    let diff = index - currentIndex;
    
    // Normalize diff for circular carousel
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    
    const isActive = diff === 0;
    
    // Base positions
    let baseTranslateX = 0;
    let baseTranslateZ = -150;
    let baseRotateY = 0;
    let baseScale = 0.3;
    let zIndex = 0;
    let opacity = 0;
    let filter = 'grayscale(100%) brightness(0.5)';
    
    if (isActive) {
      baseTranslateX = 0;
      baseTranslateZ = 60;
      baseRotateY = 0;
      baseScale = 1;
      zIndex = 30;
      opacity = 1;
      filter = 'grayscale(0%) brightness(1)';
    } else if (diff === -1) {
      baseTranslateX = -75;
      baseTranslateZ = -20;
      baseRotateY = 35;
      baseScale = 0.75;
      zIndex = 20;
      opacity = 0.8;
      filter = 'grayscale(20%) brightness(0.9)';
    } else if (diff === 1) {
      baseTranslateX = 75;
      baseTranslateZ = -20;
      baseRotateY = -35;
      baseScale = 0.75;
      zIndex = 20;
      opacity = 0.8;
      filter = 'grayscale(20%) brightness(0.9)';
    } else if (diff === -2 || diff === total - 2) {
      baseTranslateX = -130;
      baseTranslateZ = -80;
      baseRotateY = 45;
      baseScale = 0.55;
      zIndex = 10;
      opacity = 0.5;
      filter = 'grayscale(50%) brightness(0.7)';
    } else if (diff === 2 || diff === -(total - 2)) {
      baseTranslateX = 130;
      baseTranslateZ = -80;
      baseRotateY = -45;
      baseScale = 0.55;
      zIndex = 10;
      opacity = 0.5;
      filter = 'grayscale(50%) brightness(0.7)';
    }
    
    // Apply mouse-based 3D effect to ALL visible cards - BIGGER range
    const mouseInfluence = isActive ? 1 : (Math.abs(diff) === 1 ? 0.6 : 0.35);
    const rotateX = isInCarousel ? -globalMousePos.y * 20 * mouseInfluence : 0;
    const rotateY = baseRotateY + (isInCarousel ? globalMousePos.x * 20 * mouseInfluence : 0);
    const translateZ = baseTranslateZ + (isInCarousel && isActive ? 30 : 0);
    const scale = baseScale + (isInCarousel && isActive ? 0.08 : 0);
    
    return {
      transform: `translateX(${baseTranslateX}%) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      opacity,
      filter,
      transition: isInCarousel ? 'all 0.15s ease-out' : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-72 sm:h-80 md:h-96" 
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInCarousel(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic ambient glow that follows mouse - BIGGER movement */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-200"
        style={{
          transform: isInCarousel ? `translateX(${globalMousePos.x * 50}px) translateY(${globalMousePos.y * 50}px)` : 'none',
        }}
      >
        <div 
          className="w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-300"
          style={{
            background: isInCarousel 
              ? 'radial-gradient(circle, rgba(129, 105, 177, 0.35) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(129, 105, 177, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>
      
      {/* Carousel Container */}
      <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {carouselItems.map((item, index) => {
          const isActive = index === currentIndex;
          const total = carouselItems.length;
          let diff = index - currentIndex;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;
          const isVisible = Math.abs(diff) <= 2;
          
          return (
            <div
              key={index}
              className="absolute cursor-pointer"
              style={{
                ...getSlideStyle(index),
                width: '300px',
                height: '210px',
              }}
              onClick={() => {
                if (isActive) {
                  setActivePage(item.page);
                } else if (diff === 1 || diff === -(total - 1)) {
                  goToSlide('next');
                } else if (diff === -1 || diff === total - 1) {
                  goToSlide('prev');
                }
              }}
            >
              <div className="relative w-full h-full">
                {/* Glow effect behind active card - BIGGER */}
                {isActive && (
                  <div
                    className="absolute -inset-6 rounded-3xl blur-2xl transition-all duration-150"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(129, 105, 177, 0.8), transparent 70%)',
                      opacity: isInCarousel ? 1 : 0.4,
                      transform: `translateZ(-50px) scale(1.4) translateX(${globalMousePos.x * 25}px) translateY(${globalMousePos.y * 25}px)`,
                    }}
                  />
                )}
                
                {/* Main card */}
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                  style={{
                    boxShadow: isActive 
                      ? `0 35px 70px -15px rgba(129, 105, 177, ${isInCarousel ? 0.7 : 0.4}), 
                         0 0 ${isInCarousel ? 60 : 30}px rgba(129, 105, 177, ${isInCarousel ? 0.5 : 0.2}),
                         ${globalMousePos.x * 25}px ${globalMousePos.y * 25}px 50px rgba(0,0,0,0.35)`
                      : '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
                    transition: 'box-shadow 0.15s ease-out',
                  }}
                >
                  {/* Image with parallax effect - BIGGER movement */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      transform: isVisible && isInCarousel
                        ? `translateX(${globalMousePos.x * (isActive ? -18 : -10)}px) translateY(${globalMousePos.y * (isActive ? -18 : -10)}px) scale(${isActive ? 1.15 : 1.08})`
                        : 'scale(1.02)',
                      transition: isInCarousel ? 'transform 0.12s ease-out' : 'transform 0.4s ease-out',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Dynamic shine effect - always visible when mouse is in carousel */}
                  {isVisible && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-150"
                      style={{
                        background: isInCarousel
                          ? `linear-gradient(${shineAngle}deg, 
                              transparent 0%, 
                              rgba(255,255,255,0) 25%, 
                              rgba(255,255,255,${isActive ? 0.45 : 0.2}) 50%, 
                              rgba(255,255,255,0) 75%, 
                              transparent 100%)`
                          : 'transparent',
                        opacity: isInCarousel ? 1 : 0,
                      }}
                    />
                  )}
                  
                  {/* Edge highlight that follows mouse */}
                  {isActive && isInCarousel && (
                    <div
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{
                        background: `linear-gradient(${shineAngle + 90}deg, 
                          rgba(255,255,255,0.2) 0%, 
                          transparent 25%, 
                          transparent 75%, 
                          rgba(129, 105, 177, 0.25) 100%)`,
                      }}
                    />
                  )}
                  
                  {/* Floating sparkles on active card - BIGGER movement */}
                  {isActive && isInCarousel && (
                    <>
                      <div 
                        className="absolute w-2.5 h-2.5 bg-white/80 rounded-full"
                        style={{ 
                          top: `${25 + globalMousePos.y * 20}%`, 
                          left: `${15 + globalMousePos.x * 20}%`,
                          boxShadow: '0 0 15px rgba(255,255,255,0.9)',
                          animation: 'pulse 2s ease-in-out infinite',
                        }} 
                      />
                      <div 
                        className="absolute w-2 h-2 bg-purple-300/90 rounded-full"
                        style={{ 
                          top: `${75 - globalMousePos.y * 15}%`, 
                          right: `${20 - globalMousePos.x * 15}%`,
                          boxShadow: '0 0 12px rgba(196, 181, 253, 0.9)',
                          animation: 'pulse 2.5s ease-in-out infinite 0.5s',
                        }} 
                      />
                      <div 
                        className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
                        style={{ 
                          bottom: `${30 + globalMousePos.y * 12}%`, 
                          left: `${70 + globalMousePos.x * 12}%`,
                          boxShadow: '0 0 10px rgba(255,255,255,0.7)',
                          animation: 'pulse 1.8s ease-in-out infinite 0.3s',
                        }} 
                      />
                    </>
                  )}
                  
                  {/* Title overlay */}
                  {isActive && (
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center pb-4 transition-opacity duration-300"
                      style={{
                        opacity: isInCarousel ? 1 : 0.7,
                      }}
                    >
                      <div 
                        className="text-center transition-transform duration-150"
                        style={{
                          transform: isInCarousel 
                            ? `translateY(0) translateX(${globalMousePos.x * 12}px) translateY(${globalMousePos.y * 3}px)`
                            : 'translateY(5px)',
                        }}
                      >
                        <span className="text-white font-didact text-lg font-bold drop-shadow-lg block">
                          {item.title}
                        </span>
                        <span className="text-purple-300 text-xs font-didact opacity-90">Click to explore ✦</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Inner glow border - BIGGER */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl transition-all duration-150"
                    style={{
                      boxShadow: isActive && isInCarousel
                        ? `inset 0 0 50px rgba(255,255,255,0.2), 
                           inset ${-globalMousePos.x * 60}px ${-globalMousePos.y * 60}px 100px rgba(129, 105, 177, 0.2)`
                        : 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide('prev')}
        className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-purple-500/30 group backdrop-blur-sm"
      >
        <svg className="w-6 h-6 text-gray-600 group-hover:text-[#8169B1] transition-all duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => goToSlide('next')}
        className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 hover:bg-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-purple-500/30 group backdrop-blur-sm"
      >
        <svg className="w-6 h-6 text-gray-600 group-hover:text-[#8169B1] transition-all duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Dot Indicators */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#8169B1] scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
      
      {/* Current project title below */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center z-40">
        <p className="text-[#8169B1] font-didact font-bold text-lg sm:text-xl">
          {carouselItems[currentIndex].title}
        </p>
        <p className="text-gray-500 text-sm font-didact">Click to explore →</p>
      </div>
    </div>
  );
};

Carousel3D.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

const projects = [
  {
    id: 1,
    title: "Month.ly",
    image: "images/month.ly.png",
    description: "Developed a full-stack menstrual health tracking application using React Native for cross-platform mobile development,ensuring consistent user experience across iOS and Android devices",
    borderColor: "border-gray-300",
    liveUrl: "https://apps.apple.com/us/app/month-ly-period-tracker/id6758260411",
    page: "monthly"
  },
  {
  id: 2,
  title: "De>Terminal",
  borderColor: "border-white-800",
  image: "images/determ (2).png",
  description: "Full-stack cryptocurrency trading platform with terminal-style interface. Designed comprehensive UI/UX components and built responsive applications using React, TypeScript, and Tailwind CSS.",
  liveUrl: "https://www.determinal.app/",
  page: "de-terminal"
  },
  
  {
    id: 3,
    title: "Graphic Medicen",
    image: "images/graph (1).png",
    description: "Collaborated with the website team to develop and launch the Graphic Medicine website as part of Georgia Tech's VIP program. Integrated Figma mockups into WordPress.",
    borderColor: "border-gray-300",
    liveUrl: "https://sites.gatech.edu/graphicmedicinelab/",
    page: "graphic-med"
  },
  {
    id: 4,
    title: "Spotify Wrapped",
    image: "images/spotify (1).png",
    description: "Led frontend development for Spotify Wrapped. Created user experiences through Figma prototypes and content delivery using the Spotify API.",
    borderColor: "border-gray-300",
    liveUrl:"https://kenzieelle4.wixsite.com/atl-eats-demo/detailed-description",
    page: "spotify"
  },
  {
    id: 5,
    title: "Broconomy",
    image: "images/brocon.png",
    description: "Worked on a Unity game which deals with concerns about climate change and human damages to the environment",
    borderColor: "border-gray-300",
    liveUrl: "https://navibhalla113.wixsite.com/broconomy"
  },
  {
    id: 6,
    title: "AtlantaEats",
    image: "images/atleats (1).png",
    description: "Developed a full-stack web application for exploring Atlanta restaurants, featuring Google Maps integration.",
    borderColor: "border-gray-300",
    liveUrl:"https://kenzieelle4.wixsite.com/atl-eats-demo/copy-of-detailed-description"
  },
  {
    id: 7,
    title: "GT Study Hive",
    image: "images/studyhive.png",
    description: "Led the UI/UX design of an interactive platform that connects Georgia Tech students for study groups, enhancing useability and engagement. ",
    borderColor: "border-gray-300" , 
    liveUrl:"https://navibhalla113.wixsite.com/gt-study-hive",
    page: "studyhive"
  },
  {
    id: 8,
    title: "Sleep Tracker App",
    image: "images/niteapp.png",
    description: "Sleep tracker app mock up design for individuals who have struggles sleeping.",
    borderColor: "border-gray-300",
    liveUrl:"https://www.figma.com/design/1L7fsGe3G5EQu5gxjZFGj5/Untitled?node-id=0-1&t=wt2iSIyVXyzMR5cB-1"
  },
  {
    id: 9,
    title: "Cloud CTRL",
    image: "images/CC (1).png",
    description: "Designed a Cyber-Punk clothing brand as a group and was incharge of developing the mascot and billboard design. ",
    borderColor: "border-gray-300",
    liveUrl:"https://www.figma.com/deck/L5ecK4XkvADP00cyV9xN0E/Cloud_Ctrl_Final_All?node-id=1-32&t=R256QabZqVxW5b70-1"
  },

  
];


const workExperiences = [
  {
    title: "Web Developer Intern",
    company: "AH Webdesign",
    period: "May 2026 - August 2026",
    responsibilities: [
      "Designed and shipped the backend services behind client facing chatbots on the Claude API, building a retrieval layer over each client's own documentation so answers stay grounded in approved content, and every request is scoped to that client's data",
      "Built a Next.js and TypeScript site from scratch, factoring it into a typed, reusable component library with naming and structure clear enough for the team to extend in the future",
      "Migrated live client sites, including ASG and Knias Medical, onto custom PHP themes built to match each client's approved designs exactly, cutting over production traffic on their launch dates",
      "Translated what clients ask for into what they need, and built it start to finish across backend, frontend, and launch"
    ]
  },
  {
    title: "Full-Stack Intern",
    company: "De >Terminal",
    period: "May 2025 - August 2025",
    companyUrl: "https://www.determinal.app/",
    responsibilities: [
      "Wired up REST and Twitter/X APIs with Node.js to stream live crypto prices into React charts that update as the market moves",
      "Consolidated markets, wallets, and individual token views into one tabbed React dashboard, replacing full page loads with components that swap in place so users switch views instantly",
      "Turned Figma designs into working React, TypeScript, and Tailwind interfaces, matching the designer's spacing and interactions exactly and releasing alongside the design and product team"
    ]
  },
  {
    title: "Teaching Assistant, Objects and Design",
    company: "Georgia Institute of Technology",
    period: "Jan 2025 - May 2025",
    responsibilities: [
      "Introduced industry testing practices to the course, teaching unit testing and CI on Django and REST projects so students validated their own code before submission",
      "Mentored students through weekly office hours and individual debugging sessions, helping them reason through object-oriented design tradeoffs in their own code",
      "Taught core object-oriented principles and API design, helping students write code that was structured rather than just functional"
    ]
  }
];

// Project Detail Pages
const ProjectPageWrapper = ({ children, setActivePage }) => (
  <div className="min-h-screen bg-black relative overflow-hidden">
    {/* Back button */}
    <button 
      onClick={() => setActivePage('work')}
      className="fixed top-6 left-6 z-50 bg-[#8169B1] text-white px-4 py-2 rounded-full font-didact hover:bg-purple-600 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
    >
      <span>←</span> Back 
    </button>
    
    {/* Decorative background blobs */}
    <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl" />
    <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-600/10 rounded-[30%_70%_70%_30%/30%_52%_48%_70%] blur-3xl" />
    
    <div className="container mx-auto px-6 py-20 relative z-10">
      {children}
    </div>
  </div>
);

ProjectPageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  setActivePage: PropTypes.func.isRequired
};

// Frontend Carousel Component for De>Terminal
const FrontendCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { src: "images/DeterminalHomePage (1).png", alt: "Sign In Flow" },
    { src: "images/carsolfrontendpt2.png", alt: "Sign In Flow" },
    { src: "images/CrasolFronend.png", alt: "Dashboard UI" },
    // Add more images here
  ];

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative mb-4">
      {/* Carousel Container with fixed aspect ratio */}
      <div className="relative w-full rounded-xl overflow-hidden border border-purple-500/20 bg-black/10">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
          {/* Actual carousel images with crossfade transitions */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain"
              />
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={() => goToSlide((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((currentIndex + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Label */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
            <p className="text-white font-didact text-center">{images[currentIndex].alt}</p>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-3 bg-[#8169B1]'
                : 'w-3 h-3 bg-gray-500 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// De-Terminal Project Page
const DeTerminalPage = ({ setActivePage }) => {
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
  <ProjectPageWrapper title="De>Terminal" setActivePage={setActivePage}>
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div 
        data-section="hero"
        className={`text-center mb-16 transition-opacity duration-1500 ${
          visibleSections.has('hero') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white font-didact mb-4">
          De<span className="text-[#8169B1]">&gt;</span>Terminal
        </h1>
        <p className="text-purple-300 text-lg md:text-xl font-didact">
          Full-Stack Internship • May 2025 - August 2025
        </p>
      </div>
      
      {/* Main Image */}
      <div 
        data-section="main-image"
        className={`mb-16 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 transition-opacity duration-1500 ${
          visibleSections.has('main-image') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img 
          src="images/DeterminalHomePage (1).png" 
          alt="De>Terminal Project"
          className="w-full h-auto object-cover"
        />
      </div>
      
      {/* Project Overview */}
      <div 
        data-section="overview"
        className={`grid md:grid-cols-2 gap-12 mb-16 transition-opacity duration-1500 ${
          visibleSections.has('overview') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div>
          <h2 className="text-2xl font-bold text-white font-didact mb-4 flex items-center gap-2">
            <span className="text-[#8169B1]">✦</span> Overview
          </h2>
          <p className="text-gray-300 leading-relaxed font-didact">
          De Terminal is an advanced cryptocurrency trading terminal built for Solana-based crypto traders. 
          The tagline is &ldquo;The operating system for the trenches&rdquo; which is aimed at active traders who want powerful, customizable tools.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white font-didact mb-4 flex items-center gap-2">
            <span className="text-[#8169B1]">✦</span> My Role
          </h2>
          <p className="text-gray-300 leading-relaxed font-didact">
            Led the development of intuitive tabbed navigation systems and built responsive 
            front-end applications using React, TypeScript, and Tailwind CSS, translating 
            Figma prototypes into production-ready components.
          </p>
        </div>
      </div>

      {/* Problem & Solution Section */}
      <div 
        data-section="problem-solution"
        className={`mb-16 transition-opacity duration-1500 ${
          visibleSections.has('problem-solution') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold text-white font-didact mb-6 flex items-center gap-2">
          <span className="text-[#8169B1]">✦</span> Problem & Solution
        </h2>
        <div className="bg-white/5 rounded-xl p-6 border border-purple-500/20">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-purple-300 mb-3">The Problem</h3>
            <p className="text-gray-300 leading-relaxed font-didact">
              Cryptocurrency traders needed a more intuitive and streamlined platform to access real-time market data, 
              execute trades, and monitor their portfolios without switching between multiple tools.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-300 mb-3">The Solution</h3>
            <p className="text-gray-300 leading-relaxed font-didact">
              Developed a unified terminal-style interface that combines trading tools, social feeds, 
              and market analytics in one seamless experience, reducing complexity and improving workflow efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Design Process Section - Expanded */}
      <div 
        data-section="development-process"
        className={`mb-16 transition-opacity duration-1500 ${
          visibleSections.has('development-process') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold text-white font-didact mb-6 flex items-center gap-2">
          <span className="text-[#8169B1]">✦</span> The Development Process
        </h2>
        
        {/* Step 1: Design Process: Brand Identity Redesign & UI System Dev */}
        <div className="mb-12 bg-white/5 rounded-xl p-6 md:p-8 border border-purple-500/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-[#8169B1] font-bold text-4xl md:text-5xl">01</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Design Process</h3>
          </div>
          
          <ul className="text-gray-300 leading-relaxed mb-6 list-disc list-inside space-y-2">
            <li>Redesigned and established the company&apos;s brand identity from the ground up, creating a cohesive visual language now adopted as the official brand standard. Developed comprehensive UI mockups in Figma focused on first-time user experiences which focused on reducing friction points in the user journey.</li>
            <li>Built a complete component library and design system that streamlined developer handoff and ensured brand consistency across all development points. This systematic approach enabled the development team to implement designs faster and with greater accuracy, reducing back and forth revisions and accelerating product deployment.</li>

          </ul>
          
          {/* Design Process Images */}
          <div className="">
            <div>
              <a 
                href="https://www.figma.com/design/w6Ph0GIgpRGpULOz5z9KpL/UI-Components-Library-%3EDeterminal?node-id=2869-1009&t=njzD01XudkFC0o5r-1"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/60 transition-all duration-300 cursor-pointer group"
              >
                <img 
                  src="images/DesignDetermialpg.png" 
                  alt="Design Process 1"
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-800"
                />
              </a>
              <a 
                href="https://www.figma.com/design/w6Ph0GIgpRGpULOz5z9KpL/UI-Components-Library-%3EDeterminal?node-id=2869-1009&t=njzD01XudkFC0o5r-1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-3 text-purple-300 hover:text-purple-200 transition-colors duration-300 font-didact"
              >
                Click to view component library
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Step 2: Frontend Development: Design --> Development*/}
        <div className="mb-12 bg-white/5 rounded-xl p-6 md:p-8 border border-purple-500/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-[#8169B1] font-bold text-4xl md:text-5xl">02</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Frontend Development</h3>
          </div>
          
          <ul className="text-gray-300 leading-relaxed mb-6 list-disc list-inside space-y-2">
            <li>Translated design mockups into production ready code by building the complete landing page and sign-in flow using React and Tailwind CSS. Implemented the custom component library and brand identity system, ensuring adherence to design specifications while maintaining responsive functionality across all devices.</li>
            <li>Developed reusable React components that aligned with the design system, enabling consistent UI patterns and faster feature development. Utilized Tailwind CSS for efficient styling that matched the brand&apos;s visual language while maintaining clean, maintainable code architecture.</li>

          </ul>
          
          {/* Frontend Work Images - Carousel */}
          <FrontendCarousel />
        </div>

        {/* Step 3: Backend Development:Twitter API & Real-Time Search */}
        <div className="mb-12 bg-white/5 rounded-xl p-6 md:p-8 border border-purple-500/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-[#8169B1] font-bold text-4xl md:text-5xl">03</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Backend Development</h3>
          </div>
          
          <ul className="text-gray-300 leading-relaxed mb-6 list-disc list-inside space-y-2">
            <li>Integrated Twitter (X) OAuth 2.0 authentication, enabling users to securely log in with their Twitter accounts and providing seamless single sign-on functionality. Architected backend services to handle API authentication flows, token management, and session persistence.</li>
            <li>Developed a real-time tweet search engine leveraging Twitter&apos;s API to fetch and filter content based on user-defined keywords. Built specifically for crypto market analysis, the system retrieves tweets from recent to historical timeframes, allowing users to track sentiment and discussions around specific cryptocurrencies (e.g., &ldquo;doge&rdquo;, &ldquo;bitcoin&rdquo;).</li>
            <li>Implemented data processing pipelines to parse Twitter API responses, format tweet data, and structure it for frontend consumption. Ensured the retrieved content seamlessly integrated with the UI design system, maintaining brand consistency while displaying dynamic, real-time social media data.</li>

          </ul>
          {/* Backend Work Images */}
          <div className="">
            <div className="rounded-xl overflow-hidden border border-purple-500/20">
              <img 
                src="images/Backendcarsol.png" 
                alt="Backend Work 1"
                className="w-full h-auto object-cover"
              />
            </div>

          </div>
          

        </div>

      </div>

      {/* Architecture Section */}
      <div 
        data-section="architecture"
        className={`mb-1 transition-opacity duration-1500 ${
          visibleSections.has('architecture') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold text-white font-didact mb-6 flex items-center gap-2">
          <span className="text-[#8169B1]">✦</span> System Architecture
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6 font-didact">
          The De&gt;Terminal platform is built on a scalable, modular architecture that seamlessly integrates 
          frontend components, backend services, and external APIs to deliver a robust trading experience.
        </p>
        <div className="rounded-xl overflow-hidden border border-purple-500/20 bg-black p-4 flex justify-center">
          <img 
            src="images/Architecture.png" 
            alt="System Architecture Diagram"
            className="w-full md:w-3/4 lg:w-2/3 h-auto object-contain"
          />
        </div>
      </div>
      
      {/* Tech Stack */}
      <div 
        data-section="tech-stack"
        className={`mb-16 transition-opacity duration-1500 ${
          visibleSections.has('tech-stack') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold text-white font-didact mb-6 flex items-center gap-2">
          <span className="text-[#8169B1]">✦</span> Tech Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Twitter API', 'REST APIs'].map((tech) => (
            <span 
              key={tech}
              className="px-4 py-2 bg-[#8169B1]/20 text-purple-300 rounded-full font-didact text-sm border border-purple-500/30 hover:bg-[#8169B1]/40 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Key Achievements */}
      <div 
        data-section="achievements"
        className={`mb-16 transition-opacity duration-1500 ${
          visibleSections.has('achievements') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold text-white font-didact mb-6 flex items-center gap-2">
          <span className="text-[#8169B1]">✦</span> Key Achievements
        </h2>
        <div className="space-y-4">
          {[
            "Designed and developed comprehensive UI/UX component library using Figma",
            "Built responsive front-end applications with mobile-first responsive design principles",
            "Integrated Twitter API to fetch and display real-time cryptocurrency data",
            "Reduced user task completion time by 40% through streamlined UI architecture"
          ].map((achievement, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <span className="text-[#8169B1] font-bold">{idx + 1}.</span>
              <p className="text-gray-300 font-didact">{achievement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact & Results Section */}
      <div 
        data-section="impact"
        className={`mb-16 transition-opacity duration-1500 ${
          visibleSections.has('impact') ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold text-white font-didact mb-6 flex items-center gap-2">
          <span className="text-[#8169B1]">✦</span> Impact & Results
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30 text-center">
            <div className="text-4xl font-bold text-[#8169B1] mb-2">40%</div>
            <p className="text-gray-300">Task completion time reduced</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30 text-center">
            <div className="text-4xl font-bold text-[#8169B1] mb-2">100+</div>
            <p className="text-gray-300">Components created</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30 text-center">
            <div className="text-4xl font-bold text-[#8169B1] mb-2">5+</div>
            <p className="text-gray-300">Pages designed</p>
          </div>
        </div>
      </div>
      
      {/* External Link */}
      <div className="text-center">
        <a 
          href="https://www.determinal.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#8169B1] text-white px-8 py-3 rounded-full font-didact font-bold hover:bg-purple-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30"
        >
          Visit De&gt;Terminal <ExternalLink size={18} />
        </a>
      </div>
    </div>
  </ProjectPageWrapper>
  );
};

DeTerminalPage.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

// Month.ly Case Study Page
const MonthlyPage = ({ setActivePage }) => {
  const problemCards = [
    { title: 'Cold', body: 'Charts, storage, and clinical language for something people experience as a mood, not a metric.' },
    { title: 'Leaky', body: 'Cycle data is sold, shared with advertisers, or parsed by insurers — none of it feels like it belongs to the user.' },
    { title: 'Boring', body: 'Nothing about logging a symptom makes you want to open the app again tomorrow.' }
  ];

  const researchItems = [
    { title: 'Competitive teardown', body: 'Walked the onboarding and privacy policies of the mainstream trackers. Almost all of them ask for more than they need on day one.' },
    { title: 'Conversations with users', body: 'People described phases in terms of energy and mood — "crash out week," "main character week" — long before they used the medical names.' },
    { title: 'Cycle-phase literature', body: 'Grounded the four phases and their typical symptom clusters so the playful copy still said something true.' },
    { title: 'Data minimum', body: 'Worked backwards from the smallest record that still supports a prediction: dates, flow, symptoms — nothing else gets stored.' }
  ];

  const processSteps = [
    { label: 'Sketch', color: '#D98CA0', caption: 'Hand-drawn before the app existed' },
    { label: 'Token pass', color: '#B98CD9', caption: 'Five phases become five pastel cards' },
    { label: 'Prototype / Build', color: '#7FB8C9', caption: 'Rebuilt as a working React Native screen' }
  ];

  const phones = [
    { src: 'images/monthly-app-home.png', title: 'Home', body: 'One number, one phase, the moment the app opens.' },
    { src: 'images/monthly-app-period-history.png', title: 'Period History', body: 'List and calendar views over the same records, edit anytime.' },
    { src: 'images/monthly-app-cycle-analytics.png', title: 'Cycle Analytics', body: 'Predictions framed as a fortune, not a diagnosis.' }
  ];

  const phases = [
    { name: 'Get Started', image: 'images/monthly-rookie-getstarted.png' },
    { name: 'Menstrual', image: 'images/monthly-rookie-menstrual.png' },
    { name: 'Follicular', image: 'images/monthly-rookie-follicular.png' },
    { name: 'Ovulation', image: 'images/monthly-rookie-ovulation.png' },
    { name: 'Luteal', image: 'images/monthly-rookie-luteal.png' }
  ];

  const techStack = [
    { name: 'React Native', body: 'Front end. One codebase, native feel, fast iteration.' },
    { name: 'Spring Boot', body: 'Auth and REST API, business logic and predictions.' },
    { name: 'Railway', body: 'Backend deployment and database hosting.' },
    { name: 'Apple Connect', body: 'TestFlight builds and App Store review.' }
  ];

  const challenges = [
    { title: 'Predicting on thin data', body: 'A new user has logged one period, and averaging their cycle is confident to a fault. Every prediction surfaces a range instead of a single date.' },
    { title: 'Playful but not careless', body: '"Crash out phase" is funny, a wrong prediction is not. The playful voice stays in the copy, never in the numbers.' },
    { title: 'Hand-drawn art at 3x', body: 'Rookie’s line work falls apart when it’s scaled up or reproduced programmatically. Each state is its own drawn asset instead of being auto-generated.' }
  ];

  const nextSteps = [
    { title: 'On-device history', body: 'Cache period history locally first, sync when connected — no phase gated on a network call.' },
    { title: 'More Rookie', body: 'Sub-phase states for spotting and mid-cycle spikes, differentiating day by day within a phase.' },
    { title: 'Android', body: 'The React Native codebase is most of the way there — native modules are the last mile.' }
  ];

  const sketches = [
    { src: 'images/monthly-sketch-4.jpg', rotate: -2, mt: 0 },
    { src: 'images/monthly-sketch-1.jpg', rotate: 3, mt: 8 },
    { src: 'images/monthly-sketch-7.jpg', rotate: 2, mt: 0 },
    { src: 'images/monthly-sketch-6.jpg', rotate: -3, mt: 12 },
    { src: 'images/monthly-sketch-2.jpg', rotate: -1, mt: 0 },
    { src: 'images/monthly-sketch-3.jpg', rotate: 2, mt: 6 }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#8B7C9C' }}>
      <button
        onClick={() => setActivePage('work')}
        className="fixed top-6 left-6 z-50 bg-[#2A2438] text-white px-4 py-2 rounded-full font-didact hover:bg-[#3a3350] transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
      >
        <span>←</span> Back
      </button>

      <div className="max-w-4xl mx-auto px-6 py-20 md:py-24">
        {/* Hero */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl md:text-5xl font-bold font-didact italic" style={{ color: '#F7F1E8' }}>
              Month.ly
            </span>
            <img src="images/monthly-logo.png" alt="Month.ly logo" className="h-16 md:h-24 w-auto" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-didact leading-tight mb-6" style={{ color: '#F7F1E8' }}>
            A period tracker that isn&apos;t a medical chart.
          </h1>
          <p className="font-didact leading-relaxed mb-8 max-w-xl" style={{ color: '#E4DCEE' }}>
            Month.ly turns your cycle into five illustrated phases of one character, Rookie.
            React Native on the front, Spring Boot on the back, and no data sold to anybody.
          </p>
          <div className="flex flex-wrap gap-3">
            {['New project', 'Design + dev work', 'React Native · Spring Boot', 'Railway · Apple Connect'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full font-didact text-sm"
                style={{ backgroundColor: '#F7F1E8', color: '#2A2438' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 01 The Problem */}
        <div className="mb-20">
          <p className="font-didact text-base md:text-lg font-bold tracking-wide uppercase mb-3" style={{ color: '#F3DCEA' }}>01 &middot; The Problem</p>
          <h2 className="text-2xl md:text-3xl font-bold font-didact leading-snug mb-8" style={{ color: '#F7F1E8' }}>
            Period tracking apps are clinical and they sell/share private data that does not feel safe.
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {problemCards.map((card) => (
              <div key={card.title} className="rounded-2xl p-6" style={{ backgroundColor: '#F7F1E8' }}>
                <h3 className="font-bold font-didact mb-2" style={{ color: '#2A2438' }}>{card.title}</h3>
                <p className="font-didact text-sm leading-relaxed" style={{ color: '#5C5468' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 02 Research */}
        <div className="mb-20">
          <p className="font-didact text-base md:text-lg font-bold tracking-wide uppercase mb-3" style={{ color: '#F3DCEA' }}>02 &middot; Research</p>
          <h2 className="text-2xl md:text-3xl font-bold font-didact mb-8" style={{ color: '#F7F1E8' }}>What I looked at</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {researchItems.map((item, idx) => (
              <div key={item.title} className="rounded-2xl p-6 flex gap-4" style={{ backgroundColor: '#F7F1E8' }}>
                <div
                  className="flex items-center justify-center rounded-full font-bold font-didact text-sm shrink-0 w-7 h-7"
                  style={{ backgroundColor: '#EADDF3', color: '#6D5D82' }}
                >
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold font-didact mb-1" style={{ color: '#2A2438' }}>{item.title}</h4>
                  <p className="font-didact text-sm leading-relaxed" style={{ color: '#5C5468' }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 03 Design Process */}
        <div className="mb-20">
          <p className="font-didact text-base md:text-lg font-bold tracking-wide uppercase mb-3" style={{ color: '#F3DCEA' }}>03 &middot; Design Process</p>
          <h2 className="text-2xl md:text-3xl font-bold font-didact mb-4" style={{ color: '#F7F1E8' }}>
            From cream paper to a character you collect
          </h2>
          <p className="font-didact leading-relaxed mb-10 max-w-2xl" style={{ color: '#E4DCEE' }}>
            The first direction was a warm cream journal: cream backgrounds, dusty plum headlines. It solved
            &quot;not clinical&quot; but not &quot;come back tomorrow.&quot; The second pass gave every phase its own
            hue and drew Rookie five times over — the app became something to check on, not just fill in.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div key={step.label}>
                <div className="h-1 w-10 rounded-full mb-3" style={{ backgroundColor: step.color }} />
                <p className="font-bold font-didact mb-1" style={{ color: '#F7F1E8' }}>{step.label}</p>
                <p className="font-didact text-sm" style={{ color: '#E4DCEE' }}>{step.caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Three taps to the answer */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold font-didact mb-10" style={{ color: '#F7F1E8' }}>
            Three taps to the answer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {phones.map((screen) => (
              <div key={screen.title}>
                <div className="rounded-[2rem] overflow-hidden mb-4 shadow-xl">
                  <img src={screen.src} alt={screen.title} className="w-full h-auto" />
                </div>
                <p className="font-bold font-didact text-sm mb-1" style={{ color: '#F7F1E8' }}>{screen.title}</p>
                <p className="font-didact text-xs leading-relaxed" style={{ color: '#E4DCEE' }}>{screen.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rookie transforms by your energy */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold font-didact mb-4" style={{ color: '#F7F1E8' }}>
            Rookie transforms by your energy
          </h2>
          <p className="font-didact leading-relaxed mb-8 max-w-2xl" style={{ color: '#E4DCEE' }}>
            Each phase is a card: a colour, a PMS score, and a phase power written the way people actually talk
            about it. Log a period and the card changes — the reward for tracking is finding out which Rookie you get.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {phases.map((phase) => (
              <div key={phase.name}>
                <div className="rounded-xl overflow-hidden shadow-lg mb-2">
                  <img src={phase.image} alt={phase.name} className="w-full h-auto" />
                </div>
                <p className="font-didact text-xs text-center" style={{ color: '#F7F1E8' }}>{phase.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it fits together */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold font-didact mb-8" style={{ color: '#F7F1E8' }}>
            How it fits together
          </h2>
          <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: '#6D5D82' }}>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { name: 'React Native', body: 'iOS app, screens, phase timeline, tap-to-reveal predictions.' },
                { name: 'Spring Boot', body: 'REST controllers, auth, cycle-prediction service.' },
                { name: 'Database', body: 'Users, period records, symptom logs, Rookie collection state.' }
              ].map((box) => (
                <div key={box.name} className="rounded-xl p-4" style={{ backgroundColor: '#F7F1E8' }}>
                  <p className="font-bold font-didact text-sm mb-1" style={{ color: '#2A2438' }}>{box.name}</p>
                  <p className="font-didact text-xs leading-relaxed" style={{ color: '#5C5468' }}>{box.body}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <p className="font-didact text-xs" style={{ color: '#E8DFF0' }}>
                <span className="font-bold">Railway</span> — hosts the Spring Boot service and the database
              </p>
              <p className="font-didact text-xs" style={{ color: '#E8DFF0' }}>
                <span className="font-bold">Apple Connect</span> — builds and reviews the React Native client
              </p>
            </div>
          </div>
        </div>

        {/* What I built it with */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold font-didact mb-8" style={{ color: '#F7F1E8' }}>
            What I built it with
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="rounded-2xl p-5" style={{ backgroundColor: '#F7F1E8' }}>
                <p className="font-bold font-didact text-sm mb-2" style={{ color: '#2A2438' }}>{tech.name}</p>
                <p className="font-didact text-xs leading-relaxed" style={{ color: '#5C5468' }}>{tech.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Harder than expected */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold font-didact mb-8" style={{ color: '#F7F1E8' }}>
            Three things that were harder than expected
          </h2>
          <div className="space-y-3">
            {challenges.map((item) => (
              <div key={item.title} className="rounded-2xl p-5 md:flex md:items-baseline md:gap-6" style={{ backgroundColor: '#F7F1E8' }}>
                <h3 className="font-bold font-didact text-sm mb-1 md:mb-0 md:w-1/4 shrink-0" style={{ color: '#2A2438' }}>{item.title}</h3>
                <p className="font-didact text-sm leading-relaxed" style={{ color: '#5C5468' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rookie Initial Sketches Playground */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold font-didact mb-4" style={{ color: '#F7F1E8' }}>
            Rookie Initial Sketches Playground
          </h2>
          <p className="font-didact leading-relaxed mb-8 max-w-2xl" style={{ color: '#E4DCEE' }}>
            My favorite part of this project was designing a mascot that felt friendly and playful, so users
            could actually enjoy checking in on their cycle instead of dreading it.
          </p>
          <div className="columns-2 md:columns-3 gap-4">
            {sketches.map((sketch) => (
              <div
                key={sketch.src}
                className="mb-4 break-inside-avoid transition-transform duration-300 hover:rotate-0 hover:scale-105"
                style={{ transform: `rotate(${sketch.rotate}deg)`, marginTop: sketch.mt }}
              >
                <img src={sketch.src} alt="Rookie sketch" className="w-full h-auto rounded-lg shadow-xl" />
              </div>
            ))}
          </div>
        </div>

        {/* What I'd do next */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-didact mb-8" style={{ color: '#F7F1E8' }}>
            What I&apos;d do next
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {nextSteps.map((step) => (
              <div key={step.title} className="rounded-2xl p-6" style={{ backgroundColor: '#D9BFC7' }}>
                <h3 className="font-bold font-didact text-sm mb-2" style={{ color: '#2A2438' }}>{step.title}</h3>
                <p className="font-didact text-xs leading-relaxed" style={{ color: '#5C4F5C' }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

MonthlyPage.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

// Generic Project Page Template (for other projects)
const GenericProjectPage = ({ setActivePage, project }) => (
  <ProjectPageWrapper title={project.title} setActivePage={setActivePage}>
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white font-didact mb-4">
          {project.title}
        </h1>
        <p className="text-purple-300 text-lg md:text-xl font-didact">
          {project.subtitle}
        </p>
      </div>
      
      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-auto object-cover"
        />
      </div>
      
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white font-didact mb-4 flex items-center gap-2">
          <span className="text-[#8169B1]">✦</span> About
        </h2>
        <p className="text-gray-300 leading-relaxed font-didact text-lg">
          {project.description}
        </p>
      </div>
      
      {project.liveUrl && (
        <div className="text-center">
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#8169B1] text-white px-8 py-3 rounded-full font-didact font-bold hover:bg-purple-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/30"
          >
            View Project <ExternalLink size={18} />
          </a>
        </div>
      )}
    </div>
  </ProjectPageWrapper>
);

GenericProjectPage.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    liveUrl: PropTypes.string
  }).isRequired
};

// Project data for detail pages
const projectDetails = {
  'monthly': {
    title: "Month.ly",
    subtitle: "Full-Stack Health Application",
    image: "images/month.ly.png",
    description: "Developed a full-stack menstrual health tracking application using React Native for cross-platform mobile development, ensuring consistent user experience across iOS and Android devices. The app features intuitive cycle tracking, symptom logging, and predictive analytics.",
    liveUrl: "https://apps.apple.com/us/app/month-ly-period-tracker/id6758260411"
  },
  'graphic-med': {
    title: "Graphic Medicine",
    subtitle: "Georgia Tech VIP Program",
    image: "images/graph (1).png",
    description: "Collaborated with the website team to develop and launch the Graphic Medicine website as part of Georgia Tech's VIP program. Integrated Figma mockups into WordPress, creating an accessible platform for healthcare communication through visual storytelling.",
    liveUrl: "https://sites.gatech.edu/graphicmedicinelab/"
  },
  'spotify': {
    title: "Spotify Wrapped",
    subtitle: "Frontend Development Project",
    image: "images/spotify (1).png",
    description: "Led frontend development for a Spotify Wrapped recreation. Created immersive user experiences through Figma prototypes and implemented dynamic content delivery using the Spotify API to showcase users' listening habits.",
    liveUrl: "https://kenzieelle4.wixsite.com/atl-eats-demo/detailed-description"
  },
  'studyhive': {
    title: "GT Study Hive",
    subtitle: "UI/UX Design Project",
    image: "images/studyhive.png",
    description: "Led the UI/UX design of an interactive platform that connects Georgia Tech students for study groups, enhancing usability and engagement. Features include smart matching, scheduling integration, and collaborative tools.",
    liveUrl: "https://navibhalla113.wixsite.com/gt-study-hive"
  }
};





 /*start of homenav ↓ */

const HomeNavigation = ({ setActivePage, setHoveredNav }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add/remove body class when mobile menu opens/closes
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Mobile Menu Button - Fixed positioning */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-[#8169B1] text-white rounded-md shadow-lg touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#8169B1] z-40 flex items-center justify-center">
          <div className="flex flex-col gap-8 text-white text-xl">
            <a onClick={() => { setActivePage('work'); setIsMobileMenuOpen(false); }} 
               className="cursor-pointer hover:text-purple-200 transition-colors p-4 touch-manipulation">Work</a>
            <a onClick={() => { setActivePage('playground'); setIsMobileMenuOpen(false); }}
               className="cursor-pointer hover:text-purple-200 transition-colors p-4 touch-manipulation">Playground</a>
            <a onClick={() => { setActivePage('resume'); setIsMobileMenuOpen(false); }}
               className="cursor-pointer hover:text-purple-200 transition-colors p-4 touch-manipulation">Resume</a>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:block absolute right-0 top-16 w-3/5">
        <nav className="bg-[#8169B1] text-white p-2 flex justify-between items-center text-lg font-didact">
          <div className="text-xl font-bold ml-4">VB</div>
          <div className="flex font-bold  font-didact gap-6 text-xl mr-8">
            <a 
              onClick={() => setActivePage('work')} 
              onMouseEnter={() => setHoveredNav('work')}
              onMouseLeave={() => setHoveredNav(null)}
              className="cursor-pointer hover:text-purple-200 transform transition-transform duration-300 hover:-translate-y-1"
            >Work</a>
            <a 
              onClick={() => setActivePage('playground')} 
              onMouseEnter={() => setHoveredNav('playground')}
              onMouseLeave={() => setHoveredNav(null)}
              className="cursor-pointer hover:text-purple-200 transform transition-transform duration-300 hover:-translate-y-1"
            >Playground</a>
            <a 
              onClick={() => setActivePage('resume')} 
              onMouseEnter={() => setHoveredNav('resume')}
              onMouseLeave={() => setHoveredNav(null)}
              className="cursor-pointer hover:text-purple-200 transform transition-transform duration-300 hover:-translate-y-1"
            >Resume</a>
          </div>
        </nav>
      </div>
    </div>
  );
};

HomeNavigation.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  setHoveredNav: PropTypes.func.isRequired
};



// HomePage Component - Fixed to prevent scroll and fit content properly
const HomePage = ({ hoveredNav }) => {
  return (
  <div className="min-h-screen flex flex-col lg:flex-row bg-[#E4E4E2] overflow-hidden">
    {/* Left side - About Me Section */}
    <div className="w-full lg:w-2/5 min-h-screen">
      <div className="bg-[#1B1B1B] h-full relative">
        <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-between">
          {/* About Me Header */}
          <div className="mb-4">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl mb-3 text-center lg:text-left lg:ml-40">
              <span>✽</span> About Me <span>✽</span>
            </h2>
          </div>

          {/* About Me Text */}
          <div className="text-[#D2D2D2] text-sm sm:text-base lg:text-lg xl:text-xl max-w-none lg:max-w-lg space-y-2 sm:space-y-3 px-2 sm:px-4 lg:px-0 flex-1">
            <p className="leading-relaxed">
              ❀ I am currently an undergraduate student at Georgia Institute of
              Technology. I am pursuing a B.S. in Computational Media with a focus on
              Intelligence and Interaction Design, combining technical proficiency with
              design thinking to create impactful, user-focused solutions. I specialize in
              prototyping interfaces, conducting user research, and developing
              interactive applications that are both innovative and visually engaging.
            </p>
          </div>

          {/* Desktop profile image - moved down more */}
          <div className="hidden xl:block absolute bottom-[0.5rem] right-20 w-30 xl:w-60 h-auto">
            <img
              src="images/portpic.png"
              alt="port pic"
              className="w-full h-auto object-cover transform transition-transform duration-300 hover:-translate-y-2"
            />
          </div>

          {/* Social links section */}
          <div className="mt-2 sm:mt-3">
            <p className="text-purple-400 text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4 text-center lg:text-left lg:ml-6">
              let&apos;s connect !
            </p>

            <div className="flex flex-row lg:flex-col justify-center lg:justify-start lg:ml-20 gap-3 sm:gap-4 lg:gap-6">
              <a
                href="https://github.com/vbhalla8"
                className="bg-white rounded-full p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center hover:bg-[#8169B1] transition-all transform hover:-translate-y-2 duration-300 ease-in-out"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </a>
              <a
                href="https://www.linkedin.com/in/vaishnavibhalla/"
                className="bg-white rounded-full p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center hover:bg-[#8169B1] transition-all transform hover:-translate-y-2 duration-300 ease-in-out"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </a>
              <a
                href="mailto:vbhalla8@gatech.edu"
                className="bg-white rounded-full p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center hover:bg-[#8169B1] transition-all transform hover:-translate-y-2 duration-300 ease-in-out"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Vertical text bar */}
        <VerticalScrollingText />
      </div>
    </div>

    {/* Right side with background art */}
    <div className="w-full lg:w-3/5 min-h-screen relative bg-[#D9D9D9]">
      {/* Background Art Images - crossfade on nav hover */}
      {/* Default homepage art - fades out when hovering nav */}
      <div 
        className="absolute inset-0 bg-no-repeat pointer-events-none transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: 'url(images/HomepageArt.png)',
          backgroundPosition: '58% center',
          backgroundSize: '81%',
          opacity: hoveredNav ? 5 : 0.95,
        }}
      />
      {/* Work page art */}
      <div 
        className="absolute inset-0 bg-no-repeat pointer-events-none transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: 'url(images/WorkPageArt.png)',
          backgroundPosition: '58% center',
          backgroundSize: '81%',
          opacity: hoveredNav === 'work' ? 0.95 : 0,
        }}
      />
      {/* Playground page art */}
      <div 
        className="absolute inset-0 bg-no-repeat pointer-events-none transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: 'url(images/PlaygroundPageArt.png)',
          backgroundPosition: '58% center',
          backgroundSize: '81%',
          opacity: hoveredNav === 'playground' ? 0.95 : 0,
        }}
      />
      {/* Resume page art */}
      <div 
        className="absolute inset-0 bg-no-repeat pointer-events-none transition-opacity duration-700 ease-in-out"
        style={{
          backgroundImage: 'url(images/ResumePageArt.png)',
          backgroundPosition: '58% center',
          backgroundSize: '81%',
          opacity: hoveredNav === 'resume' ? 0.95 : 0,
        }}
      />
      
      <div className="relative z-10 flex flex-col items-center bg-transparent justify-end p-4 sm:p-6 lg:p-8 h-full pb-8 lg:pb-12">
          {/* Text content */}
          <div className="text-center px-4 sm:px-6">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#8169B1] font-didact mb-2 sm:mb-3 leading-tight text-[#8771B4]"
              style={{
                WebkitTextStroke: '20px #D9D9D9',
                paintOrder: 'stroke fill'
              }}
            >
            Vaishnavi Bhalla
          </h1>
            <h2 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#D9D9D9] mb-2 sm:mb-3"
              style={{
                WebkitTextStroke: '8px #8169B1',
                paintOrder: 'stroke fill'
              }}
            >
            BS in Computational Media
          </h2>
            <p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#D9D9D9] leading-relaxed"
              style={{
                WebkitTextStroke: '8px #8169B1',
                paintOrder: 'stroke fill'
              }}
            >
            Concentration in Intelligence and Interactive Design
          </p>
        </div>
      </div>
    </div>
  </div>
);
};

HomePage.propTypes = {
  hoveredNav: PropTypes.string
};

const SideNavigation = ({ activePage, setActivePage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Add/remove body class when mobile menu opens/closes
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);
  
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-[#8169B1] text-white rounded-md shadow-lg touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#8169B1] z-40 flex items-center justify-center">
          <div className="flex flex-col gap-8 text-white text-xl">
            <a onClick={() => { setActivePage('home'); setIsMobileMenuOpen(false); }} 
               className={`cursor-pointer hover:text-purple-200 transition-colors p-4 touch-manipulation ${activePage === 'home' ? 'text-purple-200' : ''}`}>
              Home
            </a>
            <a onClick={() => { setActivePage('work'); setIsMobileMenuOpen(false); }}
               className={`cursor-pointer hover:text-purple-200 transition-colors p-4 touch-manipulation ${activePage === 'work' ? 'text-purple-200' : ''}`}>
              Work
            </a>
            <a onClick={() => { setActivePage('playground'); setIsMobileMenuOpen(false); }}
               className={`cursor-pointer hover:text-purple-200 transition-colors p-4 touch-manipulation ${activePage === 'playground' ? 'text-purple-200' : ''}`}>
              Playground
            </a>
            <a onClick={() => { setActivePage('resume'); setIsMobileMenuOpen(false); }}
               className={`cursor-pointer hover:text-purple-200 transition-colors p-4 touch-manipulation ${activePage === 'resume' ? 'text-purple-200' : ''}`}>
              Resume
            </a>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-16 right-0 z-50">
        <div 
          className="flex"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`bg-[#8169B1] text-white  overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-end ${
            isHovered ? 'w-[390px] ' : 'w-6'
          }`}>
            <div className="flex gap-8  text-lg text-base whitespace-nowrap px-6">
              <a onClick={() => setActivePage('home')} className={`cursor-pointer hover:text-purple-200 transform transition-transform duration-300 hover:-translate-y-1 ${activePage === 'home' ? 'text-purple-200' : ''}`}>Home</a>
              <a onClick={() => setActivePage('work')} className={`cursor-pointer hover:text-purple-200 transform transition-transform duration-300 hover:-translate-y-1 ${activePage === 'work' ? 'text-purple-200' : ''}`}>Work</a>
              <a onClick={() => setActivePage('playground')} className={`cursor-pointer hover:text-purple-200 transform transition-transform duration-300 hover:-translate-y-1 ${activePage === 'playground' ? 'text-purple-200' : ''}`}>Playground</a>
              <a onClick={() => setActivePage('resume')} className={`cursor-pointer hover:text-purple-200 transform transition-transform duration-300 hover:-translate-y-1 ${activePage === 'resume' ? 'text-purple-200' : ''}`}>Resume</a>
            </div>
          </div>

          <div className="bg-[#8169B1] text-white p-0 flex items-center w-10 h-10 relative group">
            <div className="text-xl font-bold cursor-pointer md-1 px-1" onClick={() => setActivePage('home')}>VB</div>
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-75 -translate-x-5
              ${isHovered ? 'opacity-0' : (isVisible ? 'opacity-100' : 'opacity-0')}`}>
              <div className="text-white text-xl">←</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SideNavigation.propTypes = {
  activePage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};




 /*start of work/epx ↓ */

 const ProjectCard = ({ project, delay, setActivePage }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const handleCardClick = () => {
    if (project.page) {
      setActivePage(project.page);
    }
  };
  
  return (
    <div className={`w-full relative group transition-all duration-700 ease-out transform
       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="w-full relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white/80 p-2">
          <h3 className="text-xl lg:text-l md:text-lg sm:text-base font-bold mb-1 sm:mb-2 font-didact text-center">
            {project.title}
          </h3>
          
          <p className="text-[16px] sm:text-xs md:text-sm lg:text-base text-center mb-2 font-didact overflow-hidden">
            {project.description}
          </p>
          
          <div className="flex gap-2">
            {(project.page === 'monthly' || project.page === 'de-terminal') && (
              <button
                onClick={handleCardClick}
                className="p-1 sm:p-1.5 bg-[#8169B1] text-white rounded-full hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center"
                title="View Details"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            )}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 sm:p-1.5 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 sm:p-1.5 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                <Figma className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    liveUrl: PropTypes.string.isRequired,
    figmaUrl: PropTypes.string,
    page: PropTypes.string
  }).isRequired,
  delay: PropTypes.number.isRequired,
  setActivePage: PropTypes.func.isRequired
};

const BackgroundTile = ({ index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const defaultColor = (Math.floor(index / 3) + (index % 3)) % 2 === 0 ? 'bg-[#8169B1]' : 'bg-[#1B1B1B]';
  const alternateColor = (Math.floor(index / 3) + (index % 3)) % 2 === 0 ? 'bg-[#1B1B1B]' : 'bg-[#8169B1]';

  useEffect(() => {
    const randomDelay = Math.random() * 4000 + 3000; // Random delay between 3-7 seconds
    const timer = setInterval(() => {
      setIsFlipped(prev => !prev);
      setTimeout(() => setIsFlipped(prev => !prev), 500); // Slower flash duration of 500ms
    }, randomDelay);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`aspect-square border-2 border-white/70 w-full h-full transition-all duration-500 ${
        isFlipped ? alternateColor : defaultColor
      }`}
    />
  );
};

BackgroundTile.propTypes = {
  index: PropTypes.number.isRequired
};

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 font-didact font-bold text-lg transition-all duration-300 
      ${active 
        ? 'text-white bg-[#8169B1] border-t border-l border-r border-[#8169B1] rounded-t-lg relative -mb-px' 
        : 'text-gray-300 hover:text-white bg-[#262626] border-t border-l border-r border-gray-600 rounded-t-lg'
      }`}
  >
    {children}
  </button>
);

TabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

const WorkExperienceItem = ({ experience, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`border-l-4 border-[#8169B1] bg-[#262626] p-6 transition-all duration-700 ease-out transform
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      hover:bg-[#2d2d2d]`}>
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white font-didact">{experience.title}</h3>
        <span className="text-[#8169B1] text-sm font-medium">{experience.period}</span>
      </div>
      <h4 className="text-lg text-[#8169B1] mt-1 font-didact">
  {experience.companyUrl ? (
    <a 
      href={experience.companyUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:text-purple-300 transition-colors duration-300 underline"
    >
      {experience.company}
    </a>
  ) : (
    experience.company
  )}
</h4>      <ul className="text-gray-300 space-y-2 mt-4">
        {experience.responsibilities.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-[#8169B1] mr-2">•</span>
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

WorkExperienceItem.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    companyUrl: PropTypes.string,
    responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  delay: PropTypes.number.isRequired
};

const WorkPage = ({ setActivePage }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const gridSize = 3;
  const totalTiles = gridSize * gridSize;
  
  return (
    <div className="bg-[#1B1B1B] min-h-screen relative w-full overflow-hidden">
      <div className="relative pb-20 bg-[#1B1B1B] pt-16 md:pt-8">
        <div className="fixed inset-0 grid grid-cols-3 grid-rows-3 scale-125">
          {[...Array(totalTiles)].map((_, index) => (
            <BackgroundTile
              key={index}
              index={index}
            />
          ))}
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 py-8">
          <div className="bg-[#1B1B1B] p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl relative z-10">
            <div className="flex mb-6">
              <div className="flex flex-col md:flex-row gap-1 border-b border-[#8169B1] w-full">
                <TabButton 
                  active={activeTab === 'projects'} 
                  onClick={() => setActiveTab('projects')}
                >
                  Projects
                </TabButton>
                <TabButton 
                  active={activeTab === 'work'} 
                  onClick={() => setActiveTab('work')}
                >
                  Work
                </TabButton>
              </div>
            </div>
            
            {/* Only render Project cards when projects tab is active */}
            {activeTab === 'projects' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 divide-x divide-y divide-[#8169B1]/20 bg-[#262626]">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    delay={200 * index}
                    setActivePage={setActivePage}
                  />
                ))}
              </div>
            )}
            
            {/* Only render Work experience items when work tab is active */}
            {activeTab === 'work' && (
              <div className="space-y-0 divide-y divide-[#8169B1]/20">
                {workExperiences.map((experience, index) => (
                  <WorkExperienceItem 
                    key={index} 
                    experience={experience} 
                    delay={200 * index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-[#1B1B1B] w-full h-20"></div>
    </div>
  );
};

WorkPage.propTypes = {
  setActivePage: PropTypes.func.isRequired
};

 /*start of playground ↓ */

// Interactive dot background that will be applied via CSS instead of a component
const dotBackgroundStyle = `
  .dot-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#555 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 1;
  }

  .container-with-dots {
    position: relative;
    background-color: #1B1B1B;
  }

  .container-with-dots::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(#555 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 1;
    pointer-events: none;
  }

  .content-layer {
    position: relative;
    z-index: 2;
  }

  @keyframes moveDots {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 40px 40px;
    }
  }

  .mouse-move-effect {
    transition: background-position 0.1s;
  }
`;

const ImageSlideshow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const slideshowImages = [
    {
      id: "slide1",
      source: "images/PLaYgrouND copy 2.png",
      className: "md:top-[13rem] md:left-[40rem] top-[20rem] left-[1rem] w-[10rem] md:w-[45rem] h-[30rem] md:h-[41rem]"
    },
    {
      id: "slide2",
      source: "images/Playground copy.png",
      className: "md:top-[13rem] md:left-[40rem] top-[20rem] left-[1rem] w-[10rem] md:w-[45rem] h-[30rem] md:h-[41rem]"
    },
    {
      id: "slide3",
      source: "images/pLAYGROUND.png",
      className: "md:top-[13rem] md:left-[40rem] top-[20rem] left-[1rem] w-[10rem] md:w-[45rem] h-[30rem] md:h-[41rem]"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === slideshowImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 280);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`absolute transition-opacity duration-1500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {slideshowImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute ${image.className} ease-in-out
            ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
            w-[500px] h-auto max-h-[600px] min-h-[300px]`}
        >
          <div className="relative w-full h-full">
            <img
              src={image.source}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const ImageSlideshow2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const slideshowImages2 = [
    {
      id: "slide1",
      source: "images/Paintings ^ (1).png",
      className: "md:top-[-142rem] md:left-[40rem] top-[-110rem] left-[0rem] w-[13rem]  h-[20rem]  md:w-[38rem] md:h-[41rem]"
    },
    {
      id: "slide2",
      source: "images/pAiNTinGs ^2.png",
      className: "md:top-[-142rem] md:left-[40rem] top-[-110rem] left-[0rem] w-[13rem]  h-[20rem]  md:w-[38rem] md:h-[41rem]"
    },
    {
      id: "slide3",
      source: "images/PAINTINGS ^3.png",
      className: "md:top-[-142rem] md:left-[40rem] top-[-110rem] left-[0rem] w-[13rem]  h-[20rem]  md:w-[38rem] md:h-[41rem]"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === slideshowImages2.length - 1 ? 0 : prevIndex + 1
      );
    }, 280);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`absolute transition-opacity duration-1500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {slideshowImages2.map((image, index) => (
        <div
          key={image.id}
          className={`absolute ${image.className} ease-in-out
            ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
            w-[500px] h-auto max-h-[600px] min-h-[300px]`}
        >
          <div className="relative w-full h-full">
            <img
              src={image.source}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};


const FreeStyleGallery = () => {
  const [visibleItems, setVisibleItems] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const firstSectionHeight = window.innerHeight * 4; // Quadrupled the height
      const progress = Math.min(scrollPosition / firstSectionHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const artPieces = [
    {
      id: 1,
      title: "lighthouse",
      className: "top-[1rem] left-[9rem] w-[20rem] h-[50rem] z-10",
      source: "images/lighthouse.png",
      isSwirl: false,
      appearAt: 0
    },
    {
      id: 2,
      title: "swirl4",
      className: "hidden md:block fixed md:top-[0vh] md:left-[47vw] md:w-[30vw]",
      source: "images/swirl4.png",
      isSwirl: true,
      animationDelay: "0s",
      appearAt: 0.01
    },
    {
      id: 3,
      title: "swirl1",
      className: "hidden md:block fixed md:top-[60vh] md:left-[12vw] md:w-[20vw]",
      source: "images/swirl1.png",
      isSwirl: true,
      animationDelay: "2s",
      appearAt: 0.04
    },
    {
      id: 4,
      title: "swirl5",
      className: "hidden md:block fixed md:top-[1vh] md:left-[20vw] md:w-[25vw]",
      source: "images/swirl5.png",
      isSwirl: true,
      animationDelay: "1s",
      appearAt: 0.10
    },
    {
      id: 5,
      title: "swirl2",
      className: "hidden md:block fixed md:top-[10vh] md:left-[69vw] md:w-[40vw]",
      source: "images/swirl2.png",
      isSwirl: true,
      animationDelay: "0.5s",
      appearAt: 0.20
    },
    {
      id: 7,
      title: "Swirl6",
      className: "hidden md:block fixed md:top-[60vh] md:right-[15vw] md:w-[20vw]",
      source: "images/swirl3.png",
      isSwirl: true,
      animationDelay: "1.5s",
      appearAt: 0.25
    },
    {
      id: 8,
      title: "swirl2",
      className: "hidden md:block fixed md:top-[40vh] md:left-[32vw] md:w-[25vw]",
      source: "images/swirl2.png",
      isSwirl: true,
      animationDelay: "2.5s",
      appearAt: 0.30
    },
    {
      id: 9,
      title: "swirl2",
      className: "hidden md:block fixed md:top-[1vh] md:left-[71vw] md:w-[17vw]",
      source: "images/swirl2.png",
      isSwirl: true,
      animationDelay: "1.5s",
      appearAt: 0.38
    }, 
    {
      id: 10,
      title: "swirl2",
      className: "hidden md:block fixed md:top-[40vh] md:left-[13vw] md:w-[17vw]",
      source: "images/swirl2.png",
      isSwirl: true,
      animationDelay: "1.5s",
      appearAt: 0.48
    }
  ];

  useEffect(() => {
    artPieces.forEach((piece) => {
      if (scrollProgress >= piece.appearAt) {
        setVisibleItems(prev => ({
          ...prev,
          [piece.id]: true
        }));
      } else {
        setVisibleItems(prev => ({
          ...prev,
          [piece.id]: false
        }));
      }
    });
  }, [scrollProgress]);

  return (
    <>
      {/* Main scrollable container */}
      <div className="relative w-full" style={{ height: '400vh' }}> {/* Quadrupled the height */}
        {/* Fixed background container */}
        <div className="fixed inset-0 w-full h-screen overflow-hidden">
          {/* Swirls Layer */}
          <div className="absolute inset-0">
            {artPieces.map((piece) => (
              <div
                key={piece.id}
                className={`${piece.className} transform transition-all duration-2000
                  ${visibleItems[piece.id] 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-90 translate-y-10'}`}
                style={piece.isSwirl ? {
                  animation: visibleItems[piece.id] ? `rotate 20s infinite linear` : 'none',
                  animationDelay: piece.animationDelay,
                  transformOrigin: 'center center',
                  transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)'
                } : {}}
              >
                <img
                  src={piece.source}
                  alt={piece.title}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Slideshows */}
          <div className="absolute inset-0 z-30">
            <div className="relative w-full h-full">
              <ImageSlideshow />
              <ImageSlideshow2 />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

const GridGallery = ({ forceAnimate }) => {
  const [visibleItems, setVisibleItems] = useState({});
  const [hoveredId, setHoveredId] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  
  const startAnimation = () => {
    artPieces.forEach((piece, index) => {
      setTimeout(() => {
        setVisibleItems(prev => ({
          ...prev,
          [piece.id]: true
        }));
      }, index * 150);
    });
  };
  
  useEffect(() => {
    if (forceAnimate) {
      startAnimation();
    }
  }, [forceAnimate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.1}
    );

    const element = document.getElementById('SecondGallery');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Close zoom modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && zoomedImage) {
        setZoomedImage(null);
      }
    };

    if (zoomedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [zoomedImage]);

  const handleImageClick = (piece) => {
    setZoomedImage(piece);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  const artPieces = [
    {
      id: 1,
      title: "dune",
      source: "images/dune.png",
      category: "digital-art"
    },
    {
      id: 8,
      title: "sketch 1",
      source: "images/Sketch1.png",
      category: "sketches"
    },
    {
      id: 2,
      title: "howls moving castle",
      source: "images/howlsmoving.png",
      category: "digital-art"
    },
    {
      id: 7,
      title: "pokemon cards",
      source: "images/pokemoncards.png",
      category: "traditional-art"
    },
    {
      id: 3,
      title: "howls",
      source: "images/howls.png",
      category: "digital-art"
    },
    {
      id: 9,
      title: "cloud ctrl sketch",
      source: "images/clourctrlsketch.png",
      category: "sketches"
    },
    {
      id: 4,
      title: "pokemon",
      source: "images/pokemon copy.png",
      category: "digital-art"
    },
    {
      id: 10,
      title: "sketch 2",
      source: "images/Sketch2.png",
      category: "sketches"
    },
    {
      id: 5,
      title: "group artwork",
      source: "images/Group 5 copy.png",
      category: "digital-art"
    },
    {
      id: 11,
      title: "zoro sketch",
      source: "images/zorosketch.png",
      category: "sketches"
    },
    {
      id: 6,
      title: "zoro",
      source: "images/zoro.png",
      category: "digital-art"
    },
    {
      id: 12,
      title: "chopper sketch",
      source: "images/PokemonElectircguy.png",
      category: "sketches"
    },
    {
      id: 13,
      title: "merry sketch",
      source: "images/KittyWallet.png",
      category: "sketches"
    },
    {
      id: 14,
      title: "soul king sketch",
      source: "images/KubaPainting.png",
      category: "sketches"
    },
    {
      id: 15,
      title: "bagpainting",
      source: "images/BagPainitng.png",
      category: "TradArt "
    }
  ];

  return (
    <>
      <div 
        id="SecondGallery" 
        className="w-full min-h-screen content-layer bg-gradient-to-b from-[#1B1B1B] to-[#2D2D2D] py-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Gallery Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white font-didact mb-4">
              
            </h2>
            <div className="w-24 h-1 bg-[#8169B1] mx-auto rounded-full"></div>
          </div>

          {/* Masonry Grid Layout */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {artPieces.map((piece, index) => (
              <div
                key={piece.id}
                className={`break-inside-avoid mb-6 transition-all duration-700 ease-out transform
                  ${visibleItems[piece.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  hover:z-10`}
                onMouseEnter={() => setHoveredId(piece.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div 
                  className={`relative transform transition-all duration-500 group cursor-pointer
                    ${hoveredId === piece.id ? 'scale-105' : 'scale-100'}`}
                  onClick={() => handleImageClick(piece)}
                >
                  <img
                    src={piece.source}
                    alt={piece.title}
                    className={`w-full h-auto object-cover transition-all duration-500 rounded-lg shadow-xl
                      ${hoveredId === piece.id ? 'brightness-110 contrast-110' : 'brightness-95'}`}
                  />
                  
                  {/* Subtle overlay on hover */}
                  <div className={`absolute inset-0 bg-black/10 rounded-lg transition-opacity duration-300
                    ${hoveredId === piece.id ? 'opacity-100' : 'opacity-0'}`}/>

                  {/* Hover border effect */}
                  <div className={`absolute inset-0 border-2 border-[#8169B1] rounded-lg transition-all duration-500
                    ${hoveredId === piece.id ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}/>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Footer */}
          <div className="text-center mt-16">
            <p className="text-gray-400 text-lg font-didact">
              ~ end of collection ~
            </p>
          </div>
        </div>

        {/* Ambient background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-10">
            <div className="particle-container">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    '--particle-size': `${Math.random() * 3 + 1}px`,
                    '--particle-delay': `${Math.random() * 8}s`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .particle-container {
            position: relative;
            width: 100%;
            height: 100%;
          }
          
          .particle {
            position: absolute;
            width: var(--particle-size);
            height: var(--particle-size);
            background: #8169B1;
            border-radius: 50%;
            animation: float 20s infinite linear;
            animation-delay: var(--particle-delay);
            opacity: 0.4;
          }
          
          @keyframes float {
            0% {
              transform: translateY(100vh) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 0.4;
            }
            90% {
              opacity: 0.4;
            }
            100% {
              transform: translateY(-100vh) translateX(50px);
              opacity: 0;
            }
          }
        `}</style>
      </div>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 md:p-4"
          onClick={handleCloseZoom}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={handleCloseZoom}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-[#8169B1]/80 hover:bg-[#8169B1] backdrop-blur-sm rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold transition-all duration-200 border border-[#8169B1]/40 hover:border-[#8169B1] shadow-lg"
            >
              ×
            </button>
            
            {/* Zoomed image container */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={zoomedImage.source}
                alt={zoomedImage.title}
                className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                style={{
                  maxWidth: 'calc(100vw - 1rem)',
                  maxHeight: 'calc(100vh - 1rem)'
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

GridGallery.propTypes = {
  forceAnimate: PropTypes.bool.isRequired
};

// Mouse Move Handler Component
const MouseMoveHandler = ({ children }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    
    const handleMouseMove = (e) => {
      if (!container) return;
      
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      // Calculate position relative to container (0-100%)
      const offsetX = (x / width) * 10;
      const offsetY = (y / height) * 10;
      
      // Apply the background position offset
      container.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    };
    
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="mouse-move-effect">
      {children}
    </div>
  );
};

MouseMoveHandler.propTypes = {
  children: PropTypes.node.isRequired
};

const PlaygroundPage = () => {
  const [shouldAnimateGrid, setShouldAnimateGrid] = useState(false);
  
  useEffect(() => {
    // Apply the dot background style
    const style = document.createElement('style');
    style.textContent = dotBackgroundStyle;
    document.head.appendChild(style);
    
    // Set shouldAnimateGrid to true when the user scrolls past the first section
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition > windowHeight * 0.5) {
        setShouldAnimateGrid(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      document.head.removeChild(style);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full pt-16 md:pt-0">
      <div className="min-h-screen">
        <MouseMoveHandler>
          <div className="min-h-screen relative container-with-dots">
            <div className="relative">
              <FreeStyleGallery />
            </div>
          </div>
        </MouseMoveHandler>
      </div>
      <div className="min-h-screen">
        <MouseMoveHandler>
          <div className="container-with-dots">
            <GridGallery forceAnimate={shouldAnimateGrid} />
          </div>
        </MouseMoveHandler>
      </div>
    </div>
  );
};



 /*start of resume ↓ */


const EyeTracker = ({ isDarkMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Eye center position (fixed)
    const eyeCenterX = window.innerWidth - 700;
    const eyeCenterY = 560;

    const deltaX = mousePosition.x - eyeCenterX;
    const deltaY = mousePosition.y - eyeCenterY;
    const angle = Math.atan2(deltaY, deltaX);

    // Increased maximum distance for more noticeable movement
    const maxDistance = 24;
    
    // Add easing to make movement smoother
    const ease = (x) => {
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    };
    
    // Calculate distance from eye to mouse with easing
    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), maxDistance * 2);
    const normalizedDistance = distance / (maxDistance * 2);
    const easedDistance = ease(normalizedDistance) * maxDistance;

    const newX = Math.cos(angle) * easedDistance;
    const newY = Math.sin(angle) * easedDistance;

    setPupilPosition({ 
      x: newX, 
      y: newY 
    });
  }, [mousePosition]);

  const renderEye = () => (
    <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-full border-2 border-gray-300 shadow-lg">
      {/* White of the eye */}
      <div className="absolute w-[5rem] h-[5rem] rounded-full bg-white border-4 border-gray-200">
        {/* Iris */}
        <div 
          className="absolute w-[5rem] h-[5rem] rounded-full bg-[#654ea3]"
          style={{
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${pupilPosition.x}px), calc(-50% + ${pupilPosition.y}px))`
          }}
        >
          {/* Pupil */}
          <div className="absolute w-12 h-12 rounded-full bg-gray-900"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          {/* Light reflection */}
          <div className="absolute w-6 h-6 rounded-full bg-white opacity-75"
            style={{
              top: '25%',
              left: '25%'
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="hidden md:flex fixed gap-16 top-[21rem] right-[20rem] z-50">
      {isDarkMode ? (
        <>
          {renderEye()}
          {renderEye()}
        </>
      ) : (
        <>
          {renderEye()}
          {renderEye()}
        </>
      )}
    </div>
  );
};

EyeTracker.propTypes = {
  isDarkMode: PropTypes.bool.isRequired
};





// New component for penguin with eyes
const PenguinWithEyes = ({ isDarkMode, isHoveringClickMe }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pupilPositions, setPupilPositions] = useState({ 
    left: { x: 0, y: 0 }, 
    right: { x: 0, y: 0 } 
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Get penguin container position
    const penguinContainer = document.getElementById('penguin-container');
    if (!penguinContainer) return;

    const rect = penguinContainer.getBoundingClientRect();
    
    // Eye positions relative to penguin (moved down and right)
    const leftEyeX = rect.left + rect.width * 0.40;
    const leftEyeY = rect.top + rect.height * 0.50;
    const rightEyeX = rect.left + rect.width * 0.63; // Updated to match your current position
    const rightEyeY = rect.top + rect.height * 0.50;

    const calculatePupilPosition = (eyeX, eyeY) => {
      const deltaX = mousePosition.x - eyeX;
      const deltaY = mousePosition.y - eyeY;
      const angle = Math.atan2(deltaY, deltaX);
      const maxDistance = 8;
      
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), maxDistance * 3);
      const normalizedDistance = distance / (maxDistance * 3);
      const actualDistance = normalizedDistance * maxDistance;

      return {
        x: Math.cos(angle) * actualDistance,
        y: Math.sin(angle) * actualDistance
      };
    };

    setPupilPositions({
      left: calculatePupilPosition(leftEyeX, leftEyeY),
      right: calculatePupilPosition(rightEyeX, rightEyeY)
    });
  }, [mousePosition]);

  const renderEye = (side) => (
    <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-full border-2 border-gray-300 shadow-lg">
      {isHoveringClickMe ? (
        // Purple star eye when hovering over "click me"
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            viewBox="0 0 100 100" 
            className="w-6 h-6 md:w-8 md:h-8 fill-purple-500 animate-pulse"
          >
            <path d="M50 0 L61 35 L97 35 L68 57 L79 91 L50 70 L21 91 L32 57 L3 35 L39 35 Z" />
          </svg>
        </div>
      ) : (
        // Normal pupil
        <div 
          className="absolute w-5 h-5 md:w-6 md:h-6 bg-black rounded-full transition-transform duration-100 ease-out"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${pupilPositions[side].x}px), calc(-50% + ${pupilPositions[side].y}px))`
          }}
        >
          {/* Light reflection */}
          <div className="absolute w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full top-0.5 left-0.5" />
        </div>
      )}
    </div>
  );

  return (
    <div 
      id="penguin-container"
      className={`relative transition-all duration-700 transform ${
        isDarkMode 
          ? 'scale-110 brightness-110 contrast-125 hue-rotate-15' 
          : 'scale-100'
      }`}
    >
      <img
        src="images/penguu.png"
        alt="Decorative penguin"
        className={`w-60 md:w-80 h-auto object-contain transition-all duration-700 ${
          isDarkMode 
            ? 'drop-shadow-2xl filter brightness-110' 
            : 'drop-shadow-lg'
        }`}
      />
      
      {/* Left Eye */}
      <div className="absolute" style={{ 
        left: '40%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        {renderEye('left')}
      </div>

      {/* Right Eye */}
      <div className="absolute" style={{ 
        left: '63%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        {renderEye('right')}
      </div>
      
      {/* Glow effect for dark mode */}
      {isDarkMode && (
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-xl" />
      )}
    </div>
  );
};

PenguinWithEyes.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  isHoveringClickMe: PropTypes.bool.isRequired
};

const ResumePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringClickMe, setIsHoveringClickMe] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseEnter = () => {
    setIsDarkMode(true);
    setIsHoveringClickMe(true);
  };

  const handleMouseLeave = () => {
    setIsDarkMode(false);
    setIsHoveringClickMe(false);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-700 ease-in-out pt-16 md:pt-0 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#0a0a0a] via-[#1B1B1B] to-[#2d1b3d]' 
        : 'bg-gradient-to-br from-[#f8f8f6] via-[#E4E4E2] to-[#d4d4d0]'
    }`}>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-700 ${
              isDarkMode ? 'bg-purple-400/20' : 'bg-[#8169B1]/10'
            }`}
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Cursor follower effect */}
      {isDarkMode && (
        <div 
          className="fixed pointer-events-none z-10 rounded-full transition-all duration-300"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(129, 105, 177, 0.15) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top left corner decoration */}
          <div className={`absolute top-10 left-10 w-20 h-20 transition-all duration-700 ${
            isDarkMode ? 'text-purple-400/30' : 'text-[#8169B1]/20'
          }`}>

          </div>
          
          {/* Bottom right corner decoration */}

        </div>

        {/* Main content container */}
        <div className="text-center space-y-8 relative">
          
          {/* Title with enhanced styling */}
          <div className="relative">
            <h1 className={`text-5xl md:text-7xl font-bold font-didact transition-all duration-700 transform ${
              isDarkMode 
                ? 'text-white drop-shadow-2xl scale-105' 
                : 'text-gray-800 scale-100'
            }`}>
              <span className={`inline-block transition-all duration-700 ${
                isDarkMode ? 'animate-pulse' : ''
              }`}>
                ✦
              </span>
              {' '}my resume{' '}
              <span className={`inline-block transition-all duration-700 ${
                isDarkMode ? 'animate-pulse' : ''
              }`}>
                ✦
              </span>
            </h1>
            
            {/* Underline effect */}
            <div className={`mx-auto mt-4 h-1 transition-all duration-700 ${
              isDarkMode 
                ? 'w-80 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400' 
                : 'w-60 bg-[#8169B1]'
            } rounded-full`} />
          </div>

          {/* Simple purple text link with hover detection */}
          <div className="relative group">
            <a 
              href="images/VB_Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`
                font-didact text-2xl md:text-3xl font-bold cursor-pointer
                transition-all duration-500 transform hover:scale-110 hover:-translate-y-2
                ${isDarkMode 
                  ? 'text-purple-300 hover:text-purple-200' 
                  : 'text-[#8169B1] hover:text-purple-700'
                }
              `}
            >
              click me !
            </a>
          </div>

          {/* Decorative text */}
          <p className={`text-lg md:text-xl font-didact transition-all duration-700 ${
            isDarkMode 
              ? 'text-purple-200/80' 
              : 'text-gray-600'
          }`}>
            {isDarkMode ? '~ A closer look ~' : '~ A closer look ~'}
          </p>
        </div>

        {/* Penguin illustration with eyes - now receives hover state */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-y-16 pointer-events-none z-10">
          <PenguinWithEyes isDarkMode={isDarkMode} isHoveringClickMe={isHoveringClickMe} />
        </div>


      </div>


    </div>
  );
};



// Main Portfolio Component
const Portfolio = () => {
  const [activePage, setActivePage] = useState('home');
  const [hoveredNav, setHoveredNav] = useState(null);

  // Check if current page is a project detail page
  const isProjectPage = ['de-terminal', 'monthly', 'graphic-med', 'spotify', 'studyhive'].includes(activePage);

  return (
    <div className="min-h-screen bg-white">
      {activePage === 'home' ? (
        <>
          <HomeNavigation setActivePage={setActivePage} setHoveredNav={setHoveredNav} />
          <HomePage hoveredNav={hoveredNav} />
        </>
      ) : isProjectPage ? (
        <>
          {/* Project Detail Pages */}
          {activePage === 'de-terminal' && <DeTerminalPage setActivePage={setActivePage} />}
          {activePage === 'monthly' && <MonthlyPage setActivePage={setActivePage} />}
          {activePage === 'graphic-med' && <GenericProjectPage setActivePage={setActivePage} project={projectDetails['graphic-med']} />}
          {activePage === 'spotify' && <GenericProjectPage setActivePage={setActivePage} project={projectDetails['spotify']} />}
          {activePage === 'studyhive' && <GenericProjectPage setActivePage={setActivePage} project={projectDetails['studyhive']} />}
        </>
      ) : (
        <>
          <SideNavigation 
            activePage={activePage} 
            setActivePage={setActivePage}
          />
          {activePage === 'work' && <WorkPage setActivePage={setActivePage} />}
          {activePage === 'playground' && <PlaygroundPage />}
          {activePage === 'resume' && <ResumePage />}
        </>
      )}
    </div>
  );
};

export default Portfolio;