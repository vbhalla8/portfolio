import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code, FileText, Menu, X, ExternalLink, ChevronDown } from 'lucide-react';

const VerticalScrollingText = () => (
  <div className="absolute right-0 top-0 bottom-0 w-12 bg-[#8169B1] overflow-hidden md:w-13">
    <style jsx>{`
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




const projects = [
  {
    id: 1,
    title: "Graphic Medicen",
    image: "images/graph (1).png",
    description: "Collaborated with the website team to develop and launch the Graphic Medicine website as part of Georgia Tech's VIP program. Integrated Figma mockups into a WordPress platform, ensuring seamless functionality and visual appeal.",
    borderColor: "border-gray-300",
    liveUrl: "https://sites.gatech.edu/graphicmedicinelab/"

    
  },
  {

    id: 2,
    title: "Spotify Wrapped",
    image: "images/spotify (1).png",
    description: "Led frontend development for Spotify Wrapped, implementing animated designs and maintaining cohesive styles. Created engaging user experiences through Figma prototypes and dynamic content delivery using the Spotify API.",
    borderColor: "border-gray-300",
    liveUrl:"https://kenzieelle4.wixsite.com/atl-eats-demo/detailed-description"
  },
  {
    id: 3,
    title: "AtlantaEats",
    image: "images/atleats (1).png",
    description: "Developed a full-stack web application for exploring Atlanta restaurants, featuring Google Maps integration. Created responsive front-end components and implemented robust search functionality.",
    borderColor: "border-gray-300",
    liveUrl:"https://kenzieelle4.wixsite.com/atl-eats-demo/copy-of-detailed-description"
  },
  {
    id: 4,
    title: "GT Study Hive",
    image: "images/studyhive.png",
    description: "Led the design and front-end development of an interactive platform that connects Georgia Tech students for study groups, enhancing useability and engagement ",
    borderColor: "border-gray-300" , 
    liveUrl:"https://navibhalla113.wixsite.com/gt-study-hive"
  },
  {
    id: 5,
    title: "Cloud CTRL",
    image: "images/cloudctrl.png",
    description: "Designed a Cyber-Punk clothing brand as a group and was incharge of developing the mascot and billboard design. ",
    borderColor: "border-gray-300",
    liveUrl:"https://www.figma.com/deck/L5ecK4XkvADP00cyV9xN0E/Cloud_Ctrl_Final_All?node-id=1-32&t=R256QabZqVxW5b70-1"
  },
  {
    id: 6,
    title: "Sleep Tracker App",
    image: "images/niteapp.png",
    description: "Sleep tracker app mock up design for individuals who have struggles sleeping.",
    borderColor: "border-gray-300",
    liveUrl:"https://www.figma.com/design/1L7fsGe3G5EQu5gxjZFGj5/Untitled?node-id=0-1&t=wt2iSIyVXyzMR5cB-1"
  }
  
];









 /*start of homenav ↓ */

const HomeNavigation = ({ setActivePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Mobile Menu Button */}
      <div className="md:hidden absolute top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-[#8169B1] text-white rounded-md"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#8169B1] z-40 flex items-center justify-center">
          <div className="flex flex-col gap-8 text-white text-xl">
            <a onClick={() => { setActivePage('work'); setIsMobileMenuOpen(false); }} 
               className="cursor-pointer hover:text-purple-200">Work</a>
            <a onClick={() => { setActivePage('playground'); setIsMobileMenuOpen(false); }}
               className="cursor-pointer hover:text-purple-200">Playground</a>
            <a onClick={() => { setActivePage('resume'); setIsMobileMenuOpen(false); }}
               className="cursor-pointer hover:text-purple-200">Resume</a>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:block absolute right-0 top-16 w-3/5">
        <nav className="bg-[#8169B1] text-white p-2 flex justify-between items-center text-lg font-didact">
          <div className="text-xl font-bold ml-4">VB</div>
          <div className="flex font-bold  font-didact gap-6 text-xl mr-8">
            <a onClick={() => setActivePage('work')} className="cursor-pointer hover:text-purple-200 transform transition-transform duration-300 hover:-translate-y-1">Work</a>
            <a onClick={() => setActivePage('playground')} className="cursor-pointer hover:text-purple-200 transform transition-transform duration-300 hover:-translate-y-1">Playground</a>
            <a onClick={() => setActivePage('resume')} className="cursor-pointer hover:text-purple-200 transform transition-transform duration-300 hover:-translate-y-1">Resume</a>
          </div>
        </nav>
      </div>
    </div>
  );
};

// HomePage Component - Changed to prevent scrolling by using fixed height
const HomePage = () => (
  // Changed from min-h-screen to h-screen to lock the height to viewport
  <div className="h-screen flex flex-col md:flex-row bg-[#E4E4E2] overflow-hidden">
    {/* Left side - About Me Section */}
    <div className="w-full md:w-2/5">
      <div className="bg-[#1B1B1B] min-h-screen relative">
        <div className="p-4 md:p-8">
          <div className="mb-1">
            <h2 className="text-white text-2xl md:text-3xl mb-3 justify-center md:ml-40">
              <span>✽</span> About Me <span>✽</span>
            </h2>
          </div>

          <div className="text-white text-lg md:text-2xl max-w-lg space-y-4 px-4 md:px-0">
            <p>
              I am currently an undergraduate student at Georgia Institute of
              Technology. I'm pursuing a B.S. in Computational Media with a focus on
              Intelligence and Interaction Design, combining technical proficiency with
              design thinking to create impactful, user-focused solutions. I specialize in
              prototyping interfaces, conducting user research, and developing
              interactive applications that are both innovative and visually engaging.
            </p>
          </div>

          <div className="hidden md:block absolute top-90 right-20 w-60 h-[403px]">
            <img
              src="images/portpic.png"
              alt="port pic"
              className="w-full h-full object-cover -translate-y-5 translate-x-420 transform transition-transform duration-300 hover:-translate-y-9"
            />
          </div>

          {/* Social links section */}
          <div className="mt-6 md:mt-10">
            <p className="text-purple-400 text-3xl md:text-4xl mb-4 md:mb-6 text-center md:text-left">let's connect !</p>

            <div className="flex flex-row md:flex-col justify-center md:ml-20 gap-6 md:gap-10">
              <a
                href="https://github.com/vbhalla8"
                className="bg-white rounded-full p-2 md:p-3 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#8169B1] transition-all transform hover:-translate-y-2 duration-300 ease-in-out"
              >
                <Github className="w-6 h-6 md:w-8 md:h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/vaishnavibhalla/"
                className="bg-white rounded-full p-2 md:p-3 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#8169B1]  transition-all transform hover:-translate-y-2 duration-300 ease-in-out"
              >
                <Linkedin className="w-6 h-6 md:w-8 md:h-8" />
              </a>
              <a
                href="mailto:vbhalla8@gatech.edu"
                className="bg-white rounded-full p-2 md:p-3 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:bg-[#8169B1]  transition-all transform hover:-translate-y-2 duration-300 ease-in-out"
              >
                <Mail className="w-6 h-6 md:w-8 md:h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Vertical text bar */}
        <VerticalScrollingText />
      </div>
    </div>

    {/* Right side */}
    <div className="w-full md:w-1/2 mt-[-.3rem]">
      <div className="flex flex-col items-center bg-[#E4E4E2] justify-center p-4 md:p-8 mt-8 md:mt-32">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(-3px); }
          50% { transform: translateY(-8px); }
        }
        .floating-jellyfish {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
      <img
          src="images/Jellyfishhehe.png"
          alt="Jelly Image"
          className="relative object-cover w-full max-w-md md:max-w-none md:w-[600px] h-auto md:h-[500px] floating-jellyfish"
          style={{
            top: "-29px",
            right: '-76px',
            md: { right: '-100px' },
            flexShrink: 0
          }}
        />


        <div className="text-center md:ml-40 -mt-2">
          <h1 className="text-4xl md:text-6xl font-bold ml-text-black-000 font-didact mb-1">Vaishnavi Bhalla</h1>
          <h2 className="text-2xl md:text-3xl text-purple-800 mb-1">BS in Computational Media</h2>
          <p className="text-xl md:text-2xl text-gray-600 ">
            Concentration in Intelligence and Interactive Design
          </p>
        </div>
      </div>
    </div>
  </div>
);

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
  
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-[#8169B1] text-white rounded-md"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#8169B1] z-40 flex items-center justify-center">
          <div className="flex flex-col gap-8 text-white text-xl">
            <a onClick={() => { setActivePage('home'); setIsMobileMenuOpen(false); }} 
               className={`cursor-pointer hover:text-purple-200 ${activePage === 'home' ? 'text-purple-200' : ''}`}>
              Home
            </a>
            <a onClick={() => { setActivePage('work'); setIsMobileMenuOpen(false); }}
               className={`cursor-pointer hover:text-purple-200 ${activePage === 'work' ? 'text-purple-200' : ''}`}>
              Work
            </a>
            <a onClick={() => { setActivePage('playground'); setIsMobileMenuOpen(false); }}
               className={`cursor-pointer hover:text-purple-200 ${activePage === 'playground' ? 'text-purple-200' : ''}`}>
              Playground
            </a>
            <a onClick={() => { setActivePage('resume'); setIsMobileMenuOpen(false); }}
               className={`cursor-pointer hover:text-purple-200 ${activePage === 'resume' ? 'text-purple-200' : ''}`}>
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




 /*start of work/epx ↓ */

const ProjectCard = ({ project, borderStyle }) => (
  <div className={`border-2 ${borderStyle} w-full relative group`}>
    {/* Responsive image container */}
    <div className=" w-full relative">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      {/* Overlay with responsive text */}
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 font-didact">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-center mb-3 font-didact">
          {project.description}
        </p>
        <div className="flex gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const BackgroundTile = ({ isActive }) => (
  <div 
    className={`aspect-square transition-opacity duration-500 ${
      isActive ? 'bg-[#8169B1] opacity-100' : 'bg-[#8169B1] opacity-0'
    }`}
  />
);

const WorkPage = () => {
  const [activeIndices, setActiveIndices] = useState(new Set());
  const gridSize = 6;
  const totalTiles = gridSize * gridSize;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndices(prev => {
        const newIndices = new Set(prev);
        const numChanges = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < numChanges; i++) {
          const index = Math.floor(Math.random() * totalTiles);
          if (newIndices.has(index)) {
            newIndices.delete(index);
          } else {
            newIndices.add(index);
          }
        }
        return newIndices;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1B1B1B] min-h-screen relative w-full">
      {/* Fixed header */}
      <div className="border-b-2 border-[#8169B1] bg-[#1B1B1B] sticky top-0 z-20">
        <h2 className="text-xl font-bold p-2 text:didact  text-white">Work/EXP</h2>
      </div>
      
      <div className="relative pb-20 bg-[#1B1B1B]">
        {/* Background Grid */}
        <div className="fixed inset-0 grid grid-cols-4 gap-4 p-4">
          {[...Array(totalTiles)].map((_, index) => (
            <BackgroundTile 
              key={index} 
              isActive={activeIndices.has(index)} 
            />
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="relative max-w-4xl mx-auto px-4 py-8">
          <div className="bg-[#1B1B1B] p-8 rounded-lg shadow-2xl relative z-10">
            <div className="grid grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="relative">
                  <ProjectCard 
                    project={project} 
                    borderStyle={project.borderColor} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Extra padding at bottom to ensure full coverage */}
      <div className="bg-[#1B1B1B] w-full h-20"></div>
    </div>
  );
};


 /*start of playground ↓ */

const ScrollArrow = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('SecondGallery');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToNext}
      className="absolute bottom-[10rem] left-[67rem] transform -translate-x-1/2 
                 text-[#F4E4C5] cursor-pointer z-50"
      aria-label="Scroll to next section"
    >
      <ChevronDown 
        size={48} 
        className="animate-bounce hover:scale-110 transition-transform duration-200"
      />
    </button>
  );
};
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
      className: "md:top-[13rem] md:left-[40rem] top-[1rem] left-[1rem] w-[18rem] md:w-[45rem] h-[25rem] md:h-[40rem]"
    },
    {
      id: "slide2",
      source: "images/Playground copy.png",
      className: "md:top-[13rem] md:left-[40rem] top-[1rem] left-[1rem] w-[18rem] md:w-[45rem] h-[25rem] md:h-[40rem]"
    },
    {
      id: "slide3",
      source: "images/pLAYGROUND.png",
      className: "md:top-[13rem] md:left-[40rem] top-[1rem] left-[1rem] w-[18rem] md:w-[45rem] h-[25rem] md:h-[40rem]"
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
    <div className={`absolute transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
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

const FreeStyleGallery = () => {
  const [visibleItems, setVisibleItems] = useState({});
  
  useEffect(() => {
    artPieces.forEach((piece, index) => {
      setTimeout(() => {
        setVisibleItems(prev => ({
          ...prev,
          [piece.id]: true
        }));
      }, index * 100);
    });
  }, []);

  const artPieces = [
    {
      id: 1,
      title: "lighthouse",
      className: "top-[1rem] left-[9rem] w-[20rem] h-[50rem]",
      source: "images/lighthouse.png",
      isSwirl: false
    },
    {
      id: 2,
      title: "swirl4",
      className: "md:top-[-9rem] md:left-80 top-[0rem] left-[0rem] w-[70rem] md:w-[30rem] h-[0rem] md:h-[20rem]",
      source: "images/swirl4.png",
      isSwirl: true,
      animationDelay: "0s"
    },
    {
      id: 3,
      title: "swirl1",
      className: "md:top-[30rem] md:left-[-5rem] top-[0] left-[-0] w-[15rem] md:w-[20rem] h-[0] md:h-[10rem]",
      source: "images/swirl1.png",
      isSwirl: true,
      animationDelay: "2s"
    },
    {
      id: 4,
      title: "swirl5",
      className: "md:top-[13rem] md:left-[25rem] top-[0] left-[0] w-[15rem] md:w-[27rem] h-[0] md:h-[20rem]",
      source: "images/swirl5.png",
      isSwirl: true,
      animationDelay: "1s"
    },
    {
      id: 5,
      title: "swirl2",
      className: "md:top-[-4rem] md:right-[-5rem] top-[0] right-[0] w-[26rem] md:w-[36rem] h-[0] md:h-[27rem]",
      source: "images/swirl2.png",
      isSwirl: true,
      animationDelay: "0.5s"
    },
    {
      id: 7,
      title: "Swirl6",
      className: "md:top-[23rem] md:right-[-4rem] top-[0] right-[0] w-[15rem] md:w-[20rem] h-[0] md:h-[30rem]",
      source: "images/swirl3.png",
      isSwirl: true,
      animationDelay: "1.5s"
    },
    {
      id: 8,
      title: "swirl2",
      className: "md:top-[1rem] md:left-[-7rem] top-[0] left-[-0] w-[20rem] md:w-[25rem] h-[0] md:h-[25rem]",
      source: "images/swirl2.png",
      isSwirl: true,
      animationDelay: "2.5s"
    },
    {
      id: 9,
      title: "swirl1",
      className: "md:top-[4rem] md:left-[43rem] top-[0] left-[0rem] w-[0] md:w-[30rem] h-[0] md:h-[20rem]",
      source: "images/swirl1.png",
      isSwirl: true,
      animationDelay: "2s"
    },
    {
      id: 10,
      title: "Swirl6",
      className: "md:top-[30rem] md:right-[50rem] top-[0] right-[0] w-[0] md:w-[15rem] h-[0] md:h-[24rem]",
      source: "images/swirl3.png",
      isSwirl: true,
      animationDelay: "1.5s"
    }
  ];

  return (
    <div className="relative w-full min-h-screen md:h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[#1B1B1B]" />
      {artPieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute ${piece.className} transform transition-all duration-500
            ${visibleItems[piece.id] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          style={piece.isSwirl ? {
            animation: `rotate 20s infinite linear`,
            animationDelay: piece.animationDelay
          } : {}}
        >
          <div className="relative w-full h-full">
            <img
              src={piece.source}
              alt={piece.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      ))}
      <style jsx global>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <ImageSlideshow />
    </div>
  );
};

const GridGallery = ({ forceAnimate }) => {
  const [visibleItems, setVisibleItems] = useState({});
  const [isInView, setIsInView] = useState(false);
  
  const startAnimation = () => {
    artPieces.forEach((piece, index) => {
      setTimeout(() => {
        setVisibleItems(prev => ({
          ...prev,
          [piece.id]: true
        }));
      }, index * 100);
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
          setIsInView(true);
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('SecondGallery');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const artPieces = [
    {
      id: 1,
      title: "dune",
      source: "images/dune.png",
      width: "w-[14rem] lg:w-[24rem]",
      height: "h-[20rem] lg:h-[34rem]",
      position: "lg:top-[10rem] lg:left-[15rem] top-[8rem] left-[7rem]"
    },
    {
      id: 2,
      title: "dune",
      source: "images/howlsmoving.png",
      width: "w-[24rem] lg:w-[39rem]",
      height: "h-[16rem] lg:h-[26rem]",
      position: "lg:top-[10rem] lg:left-[41rem] top-[30rem] left-[3rem]"
    },
    {
      id: 4,
      title: "howls",
      source: "images/howls.png",
      width: "w-[17rem] lg:w-[24rem]",
      height: "h-[18rem] lg:h-[25em]",
      position: "lg:top-[46rem] lg:left-[15rem] top-[48rem] left-[6rem]"
    },
    {
      id: 5,
      title: "secondpoke",
      source: "images/pokemon copy.png",
      width: "w-[13rem] lg:w-[24rem]",
      height: "h-[16rem] lg:h-[29rem]",
      position: "lg:top-[73rem] lg:left-[15rem] top-[68rem] left-[8rem]"
    },
    {
      id: 6,
      title: "fullhow",
      source: "images/Group 5 copy.png",
      width: "w-[19rem] lg:w-[39rem]",
      height: "h-[16rem] lg:h-[32rem]",
      position: "lg:top-[38rem] lg:left-[41rem] top-[86rem] left-[5rem]"
    },
    {
      id: 8,
      title: "fullhow",
      source: "images/zoro.png",
      width: "w-[13rem] lg:w-[39rem]",
      height: "h-[12rem] lg:h-[36rem]",
      position: "lg:top-[72rem] lg:left-[41rem] top-[104rem] left-[8rem]"
    }
  ];

  // Calculate the maximum height needed based on the positions and heights of images
  const maxHeight = Math.max(...artPieces.map(piece => {
    const topMatch = piece.position.match(/lg:top-\[(\d+)rem\]/);
    const heightMatch = piece.height.match(/lg:h-\[(\d+)rem\]/);
    if (topMatch && heightMatch) {
      return parseInt(topMatch[1]) + parseInt(heightMatch[1]);
    }
    return 0;
  }));

  return (
    <div 
      id="SecondGallery" 
      className="w-full relative overflow-x-hidden bg-[#1B1B1B]"
      style={{ height: `${maxHeight + 20}rem` }} // Add some padding
    >
      <div className="relative w-full h-full">
        {artPieces.map((piece) => (
          <div
            key={piece.id}
            className={`absolute ${piece.position} transition-all duration-500 hover:scale-105 group
              ${visibleItems[piece.id] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          >
            <div className={`relative ${piece.width} ${piece.height}`}>
              <img
                src={piece.source}
                alt={piece.title}
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlaygroundPage = () => {
  const [shouldAnimateGrid, setShouldAnimateGrid] = useState(false);

  const handleScrollClick = () => {
    setShouldAnimateGrid(true);
  };

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#1B1B1B]">
      <div className="snap-start">
        <div className="min-h-screen p-4 md:p-8 pt-16 relative">
          <div className="mx-auto">
            <FreeStyleGallery />
            <ScrollArrow onScrollClick={handleScrollClick} />
          </div>
        </div>
      </div>
      <div className="snap-start">
        <GridGallery forceAnimate={shouldAnimateGrid} />
      </div>
    </div>
  );
};





 /*start of resume ↓ */

 const Blinkingline = () => {
  const lines = [
    {
      id: 1, 
      title: "line 1",
      className: "top-[-18rem] left-[-17rem] w-0 h-0 md:w-[55rem] md:h-[1.8rem] ",
      isBlinking: true, 
      animationDelay: "0s",
      rotation: 90
    },
    {
      id: 2,
      title: "line2",
      className: "top-[2rem] left-[-1.2rem] w-0 h-0 md:w-[96rem] md:h-[1.8rem] ",
      isBlinking: true,
      animationDelay: "1s",
      rotation: 180
    }
  ];

  return (
    <div className="relative w-full h-96">
      {lines.map((line) => (
        <div
          key={line.id}
          className={`
            absolute bg-[#8169B1]
            ${line.className}
            ${line.isBlinking ? 'animate-pulse' : ''}
          `}
          style={{
            transform: `rotate(${line.rotation}deg)`,
            animationDelay: line.animationDelay,
            animationDuration: '2s',
            animationIterationCount: 'infinite'
          }}
        />
      ))}
    </div>
  );
};

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

  const renderEye = (offsetX = 0) => (
    <div className="relative w-[5rem] h-[5rem] right-[20rem] top-[1rem] flex items-center justify-center bg-white rounded-full shadow-lg">
      {/* White of the eye */}
      <div className="absolute w-[5rem] h-[5rem] rounded-full bg-white border-4 border-gray-200">
        {/* Iris */}
        <div 
          className="absolute w-[5rem] h-[5rem rounded-full bg-[#654ea3]"
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

  const renderStar = (offsetX = 0) => (
    <div className="relative w-[5rem] h-[5rem] right-[20rem] top-[1rem] flex items-center justify-center">
      <svg 
        viewBox="0 0 100 100" 
        className="w-[5rem] h-[5rem]"
        style={{
          transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <path
          className="fill-purple-400"
          d="M50 0 L61 35 L97 35 L68 57 L79 91 L50 70 L21 91 L32 57 L3 35 L39 35 Z"
        />
      </svg>
    </div>
  );

  return (
    <div className="fixed flex gap-16 top-[21rem] right-[20rem] z-50">
      {isDarkMode ? (
        <>
          {renderStar(0)}
          {renderStar(1)}
        </>
      ) : (
        <>
          {renderEye(0)}
          {renderEye(1)}
        </>
      )}
    </div>
  );
};



const ResumePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleMouseEnter = () => {
    setIsDarkMode(true);
  };

  const handleMouseLeave = () => {
    setIsDarkMode(false);   
  };

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#1B1B1B]' : 'bg-[#E4E4E2]'}`}>
      <EyeTracker isDarkMode={isDarkMode} />
      
      <div className="h-full relative">
        {/* Main content container with resume text */}
        <div className="flex flex-col items-center justify-center h-screen px-4">
          {/* Resume text section - Adjust margin/padding here to move text */}
          <div className="  mt-10 relative right[-10rem] text-center">  {/* Changed from right-[-100rem] to left-[-30rem] */}
          <h1 className={`text-6xl font-bold font-didact mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            ~ my resume ˙ᵕ˙
          </h1>
          <a 
            href="images/VB_Resume.pdf" 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`cursor-pointer font-didact text-4xl ${isDarkMode ? 'text-purple-400' : 'text-[#8169B1]'} hover:scale-110 transition-transform`}
          >
            click me !
          </a>
        </div>
          {/* Star section */}
          <div className={`mt-[1rem] ${isDarkMode ? 'text-purple-400' : 'text-[#8169B1]'}`}>
            <svg className="w-[40rem] h-[30rem]" viewBox="0 0 100 100">
              <path
                fill="currentColor"
                d="M50 0 L61 35 L97 35 L68 57 L79 91 L50 70 L21 91 L32 57 L3 35 L39 35 Z"
              />
            </svg>
          </div>

          {/* Image section */}
          <div className="hidden md:block absolute top-[12rem] right-[28rem] w-[40rem] h-[420px]">
            <img
              src="images/penguu.png"
              alt="port pic"
              className="w-full h-full object-cover -translate-y-5 translate-x-420 transform transition-transform"
            />
          </div>

          <Blinkingline />
        </div>
      </div>
    </div>
  );
};



// Main Portfolio Component - Added conditional scrolling prevention
const Portfolio = () => {
  const [activePage, setActivePage] = useState('home');

  return (
    // Added conditional classes to prevent scrolling only on home page
    // h-screen and overflow-hidden for home page
    // min-h-screen for other pages to allow scrolling
    <div className={`${activePage === 'home' ? 'h-screen overflow-hidden' : 'min-h-screen'} bg-white`}>
      {activePage === 'home' ? (
        <>
          <HomeNavigation setActivePage={setActivePage} />
          <HomePage />
        </>
      ) : (
        <>
          <SideNavigation 
            activePage={activePage} 
            setActivePage={setActivePage}
          />
          {activePage === 'work' && <WorkPage />}
          {activePage === 'playground' && <PlaygroundPage />}
          {activePage === 'resume' && <ResumePage />}
        </>
        
      )}
      
    </div>
  );
};

export default Portfolio;