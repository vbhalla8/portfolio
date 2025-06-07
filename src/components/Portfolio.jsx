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


const projects = [
  {
    id: 1,
    title: "DE >TERMINAL",
    image: "images/determ (1).png",
    description: "Led UX/UI design and Frontend development for a cryptocurrency trading terminal, creating an intuitive interface with a clean and modern design.",
    borderColor: "border-gray-300",
    liveUrl: "https://www.determinal.app/",
    figmaUrl: "https://www.figma.com/design/w6Ph0GIgpRGpULOz5z9KpL/UI-Components-Library-%3EDeterminal?node-id=2869-1009&t=jLZzgiJI8LzZ3CKF-1"
  },
  {
    id: 1,
    title: "Graphic Medicen",
    image: "images/graph (1).png",
    description: "Collaborated with the website team to develop and launch the Graphic Medicine website as part of Georgia Tech's VIP program. Integrated Figma mockups into WordPress.",
    borderColor: "border-gray-300",
    liveUrl: "https://sites.gatech.edu/graphicmedicinelab/"

    
  },
  {

    id: 2,
    title: "Spotify Wrapped",
    image: "images/spotify (1).png",
    description: "Led frontend development for Spotify Wrapped. Created user experiences through Figma prototypes and content delivery using the Spotify API.",
    borderColor: "border-gray-300",
    liveUrl:"https://kenzieelle4.wixsite.com/atl-eats-demo/detailed-description"
  },
  {
    id: 1,
    title: "Broconomy",
    image: "images/brocon.png",
    description: "Worked on a Unity game which deals with concerns about climate change and human damages to the environment",
    borderColor: "border-gray-300",
    liveUrl: "https://navibhalla113.wixsite.com/broconomy"

    
  },

  {
    id: 3,
    title: "AtlantaEats",
    image: "images/atleats (1).png",
    description: "Developed a full-stack web application for exploring Atlanta restaurants, featuring Google Maps integration.",
    borderColor: "border-gray-300",
    liveUrl:"https://kenzieelle4.wixsite.com/atl-eats-demo/copy-of-detailed-description"
  },
  {
    id: 4,
    title: "GT Study Hive",
    image: "images/studyhive.png",
    description: "Led the UI/UX design of an interactive platform that connects Georgia Tech students for study groups, enhancing useability and engagement. ",
    borderColor: "border-gray-300" , 
    liveUrl:"https://navibhalla113.wixsite.com/gt-study-hive"
  },
  {
    id: 6,
    title: "Sleep Tracker App",
    image: "images/niteapp.png",
    description: "Sleep tracker app mock up design for individuals who have struggles sleeping.",
    borderColor: "border-gray-300",
    liveUrl:"https://www.figma.com/design/1L7fsGe3G5EQu5gxjZFGj5/Untitled?node-id=0-1&t=wt2iSIyVXyzMR5cB-1"
  },
  {
    id: 5,
    title: "Cloud CTRL",
    image: "images/CC (1).png",
    description: "Designed a Cyber-Punk clothing brand as a group and was incharge of developing the mascot and billboard design. ",
    borderColor: "border-gray-300",
    liveUrl:"https://www.figma.com/deck/L5ecK4XkvADP00cyV9xN0E/Cloud_Ctrl_Final_All?node-id=1-32&t=R256QabZqVxW5b70-1"
  },

  
];


const workExperiences = [
  
  {
    title: "Teaching Assistant",
    company: "Georgia Insitute of Technology",
    period: "Jan 2025 - Present",
    responsibilities: [
      "Addressed students' lecture and homework questions, providing clarification and support",
      "Guided students in developing full-stack web applications using Django, emphasizing best practices in front-end and back-end integration",
      "Mentored students on debugging and optimizing their projects, focusing on scalability and performance",
    ]
  },
  {
    title: "UI/UX Design Intern",
    company: "Indago",
    period: "Summer 2024",
    responsibilities: [
      "Created wireframes and prototypes using Figma for client projects",
      "Conducted user research and usability testing to improve user experience",
      "Collaborated with development team to ensure design feasibility"
    ]
  },
  {
    title: "CS Tutor",
    company: "Georgia State University",
    period: "Jan 2023 - Apr 2023",
    responsibilities: [
      "Worked with over 50 Programming students, explaining challenging concepts into simpler, more digestible explanations",
      "Helped build a solid foundation for them to excel with their course work"
    ]
  }
];







 /*start of homenav ↓ */

const HomeNavigation = ({ setActivePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Mobile Menu Button */}
      <div className="md:hidden absolute top-[1em] left-[29em] z-50">
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

HomeNavigation.propTypes = {
  setActivePage: PropTypes.func.isRequired
};



// HomePage Component - Enhanced responsiveness
const HomePage = () => (
  <div className="min-h-screen flex flex-col lg:flex-row bg-[#E4E4E2] overflow-hidden">
    {/* Left side - About Me Section */}
    <div className="w-full lg:w-2/5 min-h-screen lg:min-h-0">
      <div className="bg-[#1B1B1B] min-h-screen relative">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* About Me Header */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl mb-3 text-center lg:text-left lg:ml-40">
              <span>✽</span> About Me <span>✽</span>
            </h2>
          </div>

          {/* About Me Text */}
          <div className="text-[#D2D2D2] text-base sm:text-lg lg:text-xl xl:text-2xl max-w-none lg:max-w-lg space-y-3 sm:space-y-4 px-2 sm:px-4 lg:px-0">
            <p className="leading-relaxed">
              ❀ I am currently an undergraduate student at Georgia Institute of
              Technology. I am pursuing a B.S. in Computational Media with a focus on
              Intelligence and Interaction Design, combining technical proficiency with
              design thinking to create impactful, user-focused solutions. I specialize in
              prototyping interfaces, conducting user research, and developing
              interactive applications that are both innovative and visually engaging.
            </p>
          </div>

          {/* Desktop profile image - hidden on mobile/tablet */}
          <div className="hidden xl:block absolute top-90 right-20 w-48 xl:w-60 h-auto">
            <img
              src="images/portpic.png"
              alt="port pic"
              className="w-full h-auto object-cover -translate-y-5 translate-x-420 transform transition-transform duration-300 hover:-translate-y-9"
            />
          </div>

          {/* Social links section */}
          <div className="mt-6 sm:mt-8 lg:mt-10">
            <p className="text-purple-400 text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 text-center lg:text-left">
              let&apos;s connect !
            </p>

            <div className="flex flex-row lg:flex-col justify-center lg:justify-start lg:ml-20 gap-4 sm:gap-6 lg:gap-10">
              <a
                href="https://github.com/vbhalla8"
                className="bg-white rounded-full p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center hover:bg-[#8169B1] transition-all transform hover:-translate-y-2 duration-300 ease-in-out"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/vaishnavibhalla/"
                className="bg-white rounded-full p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center hover:bg-[#8169B1] transition-all transform hover:-translate-y-2 duration-300 ease-in-out"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </a>
              <a
                href="mailto:vbhalla8@gatech.edu"
                className="bg-white rounded-full p-2 sm:p-3 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 flex items-center justify-center hover:bg-[#8169B1] transition-all transform hover:-translate-y-2 duration-300 ease-in-out"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Vertical text bar */}
        <VerticalScrollingText />
      </div>
    </div>

    {/* Right side */}
    <div className="w-full lg:w-3/5 flex-1">
      <div className="flex flex-col items-center bg-[#E4E4E2] justify-center p-4 sm:p-6 lg:p-8 min-h-screen lg:min-h-0 lg:mt-16 xl:mt-32">
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(-3px); }
            50% { transform: translateY(-8px); }
          }
          .floating-jellyfish {
            animation: float 5s ease-in-out infinite;
          }
        `}</style>
        
        {/* Jellyfish Image */}
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          <img
            src="images/Jellyfishhehe.png"
            alt="Jelly Image"
            className="w-full h-auto object-contain floating-jellyfish"
          />
        </div>

        {/* Text content */}
        <div className="text-center mt-4 sm:mt-6 lg:mt-8 lg:ml-20 xl:ml-40 px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black font-didact mb-1 sm:mb-2 leading-tight">
            Vaishnavi Bhalla
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-800 mb-1 sm:mb-2">
            BS in Computational Media
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
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

SideNavigation.propTypes = {
  activePage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};




 /*start of work/epx ↓ */

 const ProjectCard = ({ project, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
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
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 sm:p-1.5 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
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
    figmaUrl: PropTypes.string
  }).isRequired,
  delay: PropTypes.number.isRequired
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
      <h4 className="text-lg text-[#8169B1] mt-1 font-didact">{experience.company}</h4>
      <ul className="text-gray-300 space-y-2 mt-4">
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
    responsibilities: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  delay: PropTypes.number.isRequired
};

const WorkPage = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const gridSize = 3;
  const totalTiles = gridSize * gridSize;
  
  return (
    <div className="bg-[#1B1B1B] min-h-screen relative w-full overflow-hidden">
      <div className="relative pb-20 bg-[#1B1B1B]">
        <div className="fixed inset-0 grid grid-cols-3 grid-rows-3 scale-125">
          {[...Array(totalTiles)].map((_, index) => (
            <BackgroundTile
              key={index}
              index={index}
            />
          ))}
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 py-8">
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
    <div className={`absolute transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
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
    <div className="w-full">
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

  const renderStar = () => (
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
          {renderStar()}
          {renderStar()}
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
    <div className="relative w-6 h-6 md:w-8 md:h-8 bg-white rounded-full border-2 border-gray-300 shadow-lg">
      {isHoveringClickMe ? (
        // Purple star eye when hovering over "click me"
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            viewBox="0 0 100 100" 
            className="w-4 h-4 md:w-5 md:h-5 fill-purple-500 animate-pulse"
          >
            <path d="M50 0 L61 35 L97 35 L68 57 L79 91 L50 70 L21 91 L32 57 L3 35 L39 35 Z" />
          </svg>
        </div>
      ) : (
        // Normal pupil
        <div 
          className="absolute w-3 h-3 md:w-4 md:h-4 bg-black rounded-full transition-transform duration-100 ease-out"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${pupilPositions[side].x}px), calc(-50% + ${pupilPositions[side].y}px))`
          }}
        >
          {/* Light reflection */}
          <div className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full top-0.5 left-0.5" />
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
    <div className={`min-h-screen relative overflow-hidden transition-all duration-700 ease-in-out ${
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
              href="images/VB_Resume.pdf"
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

  return (
    <div className="min-h-screen bg-white">
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