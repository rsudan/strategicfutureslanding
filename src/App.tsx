import React, { useState } from 'react';
import {
  Search,
  ChevronRight,
  Radar,
  Activity,
  Target,
  Map,
  TrendingUp,
  Wind,
  Lightbulb,
  Layers,
  Triangle,
  Grid,
  Circle,
  ChevronsRight,
  Maximize2,
  X,
  ArrowRight,
  BookOpen,
  Users,
  Clock
} from 'lucide-react';

// --- Data Structure Based on User Image ---

const PHASES = [
  {
    id: 1,
    title: "Environmental Sensing",
    subtitle: "Detecting change",
    description: "Detecting change through scanning and monitoring.",
    color: "bg-blue-100 text-blue-800",
    borderColor: "border-blue-200",
    icon: Radar
  },
  {
    id: 2,
    title: "Deep Analysis",
    subtitle: "Understanding drivers",
    description: "Understanding the drivers and dynamics of change.",
    color: "bg-indigo-100 text-indigo-800",
    borderColor: "border-indigo-200",
    icon: Layers
  },
  {
    id: 3,
    title: "Consequence Mapping",
    subtitle: "Exploring impacts",
    description: "Exploring the cascading impacts of change.",
    color: "bg-teal-100 text-teal-800",
    borderColor: "border-teal-200",
    icon: Activity
  },
  {
    id: 4,
    title: "Futures Visualization",
    subtitle: "Visualizing pathways",
    description: "Visualizing alternative future pathways.",
    color: "bg-emerald-100 text-emerald-800",
    borderColor: "border-emerald-200",
    icon: Map
  },
  {
    id: 5,
    title: "Scenario Development",
    subtitle: "Building narratives",
    description: "Building narratives about potential futures.",
    color: "bg-amber-100 text-amber-800",
    borderColor: "border-amber-200",
    icon: BookOpen
  },
  {
    id: 6,
    title: "Strategy & Action",
    subtitle: "Testing robustness",
    description: "Testing strategies against futures to drive action.",
    color: "bg-rose-100 text-rose-800",
    borderColor: "border-rose-200",
    icon: Target
  }
];

const TOOLS = [
  // Phase 1: Environmental Sensing
  {
    id: 'weak-signals',
    phaseId: 1,
    name: "Weak Signals Scanner",
    subtitle: "Early indicator detection",
    description: "Discover early indicators of emerging trends, disruptions, and shifts that could impact development policies and operations before they become mainstream.",
    icon: Activity,
    time: "30-60 mins",
    participants: "3-10",
    url: "https://wbweaksignals.netlify.app/"
  },
  {
    id: 'trend-radar',
    phaseId: 1,
    name: "Trends Radar",
    subtitle: "Trend tracking & visualization",
    description: "Visualize emerging trends across technology, society, economy, and environment. Map by time horizon and impact to prioritize those most relevant to your context.",
    icon: Radar,
    time: "2 hours",
    participants: "5-15",
    url: "https://wbtrendsradar.netlify.app/"
  },
  // Phase 2: Deep Analysis
  {
    id: 'cla',
    phaseId: 2,
    name: "Causal Layered Analysis",
    subtitle: "Deep structure exploration",
    description: "Deconstructs issues into four layers: Litany, Systemic Causes, Worldview, and Metaphor, to find deep leverage points for transformation.",
    icon: Layers,
    time: "3 hours",
    participants: "4-8",
    url: "https://causallayeredanalysis.netlify.app/"
  },
  {
    id: 'futures-triangle',
    phaseId: 2,
    name: "Futures Triangle",
    subtitle: "Push, pull & weight dynamics",
    description: "Maps the three forces shaping the future: the Push of the present, the Pull of the future, and the Weight of history.",
    icon: Triangle,
    time: "1 hour",
    participants: "3-12",
    url: "https://futurestriangle.netlify.app/"
  },
  {
    id: 'cross-impact',
    phaseId: 2,
    name: "Cross-Impact Matrix",
    subtitle: "Driver interaction analysis",
    description: "Analyzes how different trends and drivers might influence each other, identifying key drivers that have systemic impact.",
    icon: Grid,
    time: "2-4 hours",
    participants: "Expert Group",
    url: "https://crossimpact.netlify.app/"
  },
  // Phase 3: Consequence Mapping
  {
    id: 'futures-wheel',
    phaseId: 3,
    name: "Futures Wheel",
    subtitle: "Impact cascade visualization",
    description: "A structured brainstorming method to visualize direct and indirect consequences of a specific change or event.",
    icon: Circle,
    time: "45 mins",
    participants: "3-8",
    url: "https://futureswheel.netlify.app/"
  },
  // Phase 4: Futures Visualization
  {
    id: 'futures-cone',
    phaseId: 4,
    name: "Futures Cone",
    subtitle: "Alternative futures pathways",
    description: "Classifies futures into Projected, Probable, Plausible, and Preposterous to widen the scope of strategic thinking.",
    icon: Maximize2,
    time: "1 hour",
    participants: "5-20",
    url: "https://futurescone.netlify.app/"
  },
  {
    id: 'three-horizons',
    phaseId: 4,
    name: "Three Horizons",
    subtitle: "Transformation trajectories",
    description: "Connects the present (Horizon 1) to the desired future (Horizon 3) via the space of transition and innovation (Horizon 2).",
    icon: TrendingUp,
    time: "3 hours",
    participants: "10-25",
    url: "https://threehorizons.netlify.app/"
  },
  // Phase 5: Scenario Development
  {
    id: 'scenario-engine',
    phaseId: 5,
    name: "Scenario Engine",
    subtitle: "Narrative generation",
    description: "A framework for constructing detailed, plausible narratives about the future based on critical uncertainties.",
    icon: BookOpen,
    time: "1-2 days",
    participants: "10-30",
    url: "https://scenarioplanning.netlify.app/"
  },
  {
    id: 'backcasting',
    phaseId: 5,
    name: "Backcasting Planner",
    subtitle: "Goal-based roadmapping",
    description: "Starts with a preferred future and works backward to identify the steps required today to achieve it.",
    icon: ChevronsRight,
    time: "4 hours",
    participants: "5-15",
    url: "https://backcasting.netlify.app/"
  },
  // Phase 6: Strategy & Action
  {
    id: 'wind-tunnel',
    phaseId: 6,
    name: "Wind Tunnel",
    subtitle: "Strategy robustness testing",
    description: "Tests current strategies against multiple future scenarios to ensure they are robust and resilient under different conditions.",
    icon: Wind,
    time: "4 hours",
    participants: "Strategy Team",
    url: "https://windtunnel.netlify.app/"
  },
  {
    id: 'concept-analyzer',
    phaseId: 6,
    name: "Concept Analyzer",
    subtitle: "Project concept analysis",
    description: "Evaluates specific project concepts for future-readiness and alignment with long-term trends.",
    icon: Search,
    time: "1 hour",
    participants: "Project Team",
    url: "https://futurereadiness.netlify.app/"
  },
  {
    id: 'pitch-studio',
    phaseId: 6,
    name: "Pitch Studio",
    subtitle: "Innovation pitch platform",
    description: "Helps teams craft compelling narratives for their innovations that are grounded in robust foresight.",
    icon: Users,
    time: "2 hours",
    participants: "Innovators",
    url: "https://wbmultiagent.netlify.app/"
  }
];

// --- Components ---

const Modal = ({ isOpen, onClose, tool, phase }) => {
  if (!isOpen || !tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
        <div className={`p-8 ${phase?.color || 'bg-gray-100'} flex justify-between items-start`}>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/70 rounded-xl backdrop-blur-sm shadow-lg">
              <tool.icon className="w-10 h-10 opacity-90" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2">
                Phase {phase?.id}: {phase?.title}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{tool.name}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-black/10 rounded-full transition-all hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{tool.subtitle}</h3>
          <p className="text-gray-600 leading-relaxed mb-8 text-base">
            {tool.description}
          </p>

          <div className="grid grid-cols-2 gap-5 mb-8">
            <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Duration</span>
              </div>
              <div className="font-semibold text-gray-900 text-lg">{tool.time}</div>
            </div>
            <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Participants</span>
              </div>
              <div className="font-semibold text-gray-900 text-lg">{tool.participants}</div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                if (tool.url) {
                  window.open(tool.url, '_blank');
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/40 hover:shadow-xl hover:scale-105"
            >
              Launch Tool
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activePhase, setActivePhase] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Determine which phases to display
  const displayPhases = activePhase
    ? PHASES.filter(p => p.id === activePhase)
    : PHASES;

  // Filter tools based on search query
  const getToolsForPhase = (phaseId) => {
    return TOOLS.filter(tool =>
      tool.phaseId === phaseId &&
      (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       tool.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const getPhaseDetails = (id) => PHASES.find(p => p.id === id);

  // Check if any tools exist for the current search to show/hide "No results"
  const totalMatchingTools = TOOLS.filter(tool =>
    (activePhase ? tool.phaseId === activePhase : true) &&
    (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     tool.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 font-sans text-slate-900">

      {/* --- Navbar --- */}
      <nav className="bg-gradient-to-r from-[#003366] via-[#004488] to-[#0055aa] text-white sticky top-0 z-40 shadow-lg backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-blue-900/30 transform hover:scale-105 transition-transform">
                WB
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight">Innovation Labs</span>
                <span className="mx-2 text-blue-300">|</span>
                <span className="text-blue-100 font-medium">Foresight Toolkit</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Hero --- */}
      <div className="relative bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-slate-50/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl animate-in">
            <h1 className="text-5xl md:text-6xl font-bold text-[#002244] mb-6 tracking-tight leading-tight">
              Strategic Foresight <span className="text-gradient">Tools</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 font-light">
              A comprehensive suite of tools designed to help World Bank teams navigate uncertainty, anticipate future challenges, and design robust strategies for development impact.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl leading-5 bg-white/80 backdrop-blur-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-lg shadow-slate-200/50 hover:shadow-xl"
                placeholder="Search for a tool (e.g., 'Scenario Engine', 'Radar')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Phase Filter / Navigation */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#002244]">Jump to Phase</h2>
            {activePhase && (
              <button
                onClick={() => setActivePhase(null)}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Show All Phases
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PHASES.map((phase) => {
              const isActive = activePhase === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(isActive ? null : phase.id)}
                  className={`
                    relative flex flex-col items-center justify-center p-5 rounded-xl border text-center transition-all duration-300 transform
                    ${isActive
                      ? `${phase.color} border-transparent ring-2 ring-offset-2 ring-blue-500 shadow-lg scale-105`
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-200 hover:shadow-lg hover:scale-105 hover:-translate-y-1'
                    }
                  `}
                >
                  <phase.icon className={`w-7 h-7 mb-2 transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">Phase {phase.id}</span>
                  <span className={`text-sm font-semibold leading-tight ${isActive ? '' : 'text-slate-800'}`}>
                    {phase.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools by Category */}
        <div className="space-y-16">
          {totalMatchingTools === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-300 shadow-sm">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No tools found</h3>
              <p className="text-slate-500 text-lg">Try adjusting your search or filter.</p>
            </div>
          ) : (
            displayPhases.map((phase) => {
              const phaseTools = getToolsForPhase(phase.id);
              if (phaseTools.length === 0) return null; // Hide phase if no matching tools found in search

              return (
                <div key={phase.id} className="animate-in">
                  {/* Category Header */}
                  <div className={`flex items-center gap-5 mb-8 pb-5 border-b-2 ${phase.borderColor}`}>
                    <div className={`p-4 rounded-xl ${phase.color} shadow-md`}>
                      <phase.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-1">
                        <span className="opacity-40 text-xl font-semibold">0{phase.id}.</span> {phase.title}
                      </h2>
                      <p className="text-slate-600 text-base">{phase.description}</p>
                    </div>
                  </div>

                  {/* Tools Grid for this Phase */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {phaseTools.map((tool) => (
                      <div
                        key={tool.id}
                        onClick={() => setSelectedTool(tool)}
                        className="group bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full card-shine"
                      >
                        <div className={`h-2 w-full ${phase.color.split(' ')[0]}`} />
                        <div className="p-7 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm font-semibold text-blue-600 mb-4">
                            {tool.subtitle}
                          </p>
                          <p className="text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
                            {tool.description}
                          </p>

                          <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-end">
                            <button
                              onClick={(e) => {
                                if (tool.url) {
                                  e.stopPropagation();
                                  window.open(tool.url, '_blank');
                                }
                              }}
                              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-600/40 transform hover:scale-105"
                            >
                              Launch Tool
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="relative bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 text-sm">
          <p className="mb-3 font-medium">© {new Date().getFullYear()} World Bank Group. All rights reserved.</p>
          <div className="space-x-6">
            <a href="#" className="hover:text-[#004488] transition-colors font-medium">Legal</a>
            <a href="#" className="hover:text-[#004488] transition-colors font-medium">Privacy Notice</a>
            <a href="#" className="hover:text-[#004488] transition-colors font-medium">Access to Information</a>
          </div>
        </div>
      </footer>

      {/* --- Modals --- */}
      <Modal
        isOpen={!!selectedTool}
        tool={selectedTool}
        phase={selectedTool ? getPhaseDetails(selectedTool.phaseId) : null}
        onClose={() => setSelectedTool(null)}
      />

    </div>
  );
}