
export const CONTENT = {
  hero: {
    heading: "7+ years in web development..\nare you feeling stuck in the same place?",
    subHeading: "It's time to break the slowdown",
    description: [
      "You’re skilled. You’re experienced. But your career isn’t moving the way it should.",
      "Webolution gives you the strategy to rise—not just the skills."
    ],
    primaryCta: "Start Your Webolution",
    secondaryCta: "Take the Career Audit"
  },
  quizHub: {
    heading: "Choose Your Evolution Path",
    subHeading: "Select a diagnostic tool to uncover your hidden professional leverage.",
    variants: [
      {
        id: 'career',
        title: "Career Strategy Audit",
        description: "Deep dive into your professional trajectory and mindset blocks.",
        icon: 'TrendingUp',
        tag: 'ESSENTIAL',
        color: 'brand-green'
      },
      {
        id: 'voice',
        title: "Voice Signature Scan",
        description: "Analyze your vocal presence, resonance, and leadership tone.",
        icon: 'Mic2',
        tag: 'NEW',
        color: 'blue-400'
      },
      {
        id: 'audio',
        title: "Audio Intuition Test",
        description: "Listen to high-stakes scenarios. Test your professional EQ.",
        icon: 'Headphones',
        tag: 'INTERACTIVE',
        color: 'purple-400'
      },
      {
        id: 'image',
        title: "Visual System Design",
        description: "Identify architecture flaws in complex technical diagrams.",
        icon: 'Layout',
        tag: 'TECHNICAL',
        color: 'orange-400'
      }
    ]
  },
  audioQuiz: {
    title: "The Listening Leader",
    scenarios: [
      {
        id: 1,
        title: "The Boardroom Conflict",
        context: "Listen to the tone of the stakeholders. Who is truly in control of the room?",
        options: ["The loud challenger", "The quiet decision maker", "The mediator", "The observer"],
        correct: 1
      },
      {
        id: 2,
        title: "The Subtle Rejection",
        context: "A client provides feedback on a proposal. Detect the underlying hesitation.",
        options: ["Budget concerns", "Timeline anxiety", "Technical distrust", "Internal politics"],
        correct: 2
      }
    ]
  },
  imageQuiz: {
    title: "The Visual Architect",
    scenarios: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1551288049-bbda48658a7d?auto=format&fit=crop&q=80&w=1000",
        question: "Spot the primary scalability bottleneck in this microservices cluster.",
        options: ["Database locking", "N+1 Query Issue", "Circular dependency", "Memory leak"],
        correct: 2
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1000",
        question: "Which UI pattern here violates established accessibility (a11y) standards?",
        options: ["Low color contrast", "Missing focus state", "Non-semantic HTML", "All of the above"],
        correct: 3
      }
    ]
  },
  realityCheck: {
    heading: "You're not stuck because you lack talent 💡",
    text: "You might already have the skills. What's missing is clarity, strategy, and execution at the right level. 🚀",
    urgencyBox: {
      heading: "The longer you wait, the harder it becomes",
      items: [
        { text: "The industry shifts every few months", emoji: "🌪️" },
        { text: "Passion quietly turns into routine", emoji: "🤖" },
        { text: "The fear of being “left behind” grows", emoji: "😰" },
        { text: "Junior devs seem to move faster", emoji: "🐇" },
        { text: "“Learn more, work harder” stops working", emoji: "🧱" }
      ]
    },
    painReview: {
      heading: "You’re working hard, but your career isn’t moving",
      text: [
        "You’re experienced, dedicated, and reliable, yet promotions are rare and growth feels stagnant.",
        "Expectations rise, tech evolves, but your next step still feels unclear.."
      ]
    }
  },
  problem: {
    highlight: "STUCK?", 
    description: "You’re not stuck because you lack talent. You might already have the skills.",
    description2: "What’s missing is clarity, strategy, and execution at the right level.",
    primaryCta: "Start Your Webolution",
    secondaryCta: "LEARN HOW IT WORKS"
  },
  agitate: {
    heading: "Is your web development career stuck in neutral?",
    text: "The real issue isn't lack of talent—it's invisible career blockers and outdated strategies that silently hold you back.",
    bullets: [
      "The industry shifts every few months",
      "Passion quietly turns into routine",
      "The fear of being “left behind” grows",
      "Junior devs seem to move faster"
    ],
    conclusion: "It’s not frustration — it’s the early signal of mid-career stagnation, something many skilled developers face long before they even realize it."
  },
  mythTruth: {
    heading: "Why the old advice fails?",
    subHeading: "'Just learn more and work harder.' This myth keeps developers stuck. Real growth requires strategy, visibility, influence, and mindset.",
    cards: [
      {
        type: "myth",
        label: "Myth",
        text: "\"Hard work = promotion\""
      },
      {
        type: "truth",
        label: "Truth",
        text: "\"Strategy + visibility = leverage\""
      }
    ]
  },
  solution: {
    heading: "Your Blueprint for a Future-Proof Developer Career",
    intro: [
      "Webolution is a career-engineering system for developers who feel stuck.",
      "It helps you uncover hidden blockers, gain clarity, and build a career blueprint that makes you in-demand and confident."
    ],
    roadmapTitle: "How It Works",
    phases: [
      {
        phase: "Phase 1: Debug",
        title: "UNLOCK WHAT’S QUIETLY HOLDING YOU BACK",
        text: "Identify the internal and external blockers slowing your career"
      },
      {
        phase: "Phase 2: Design",
        title: "ARCHITECT YOUR NEXT-LEVEL CAREER",
        text: "Stop guessing. Build a personalized roadmap aligned with your strengths, passion, and the industry"
      },
      {
        phase: "Phase 3: Develop & Deploy",
        title: "GIVE BIRTH TO YOUR DREAM CAREER",
        text: "Execute with clarity, ship meaningful work, and turn ambition into visible results"
      },
      {
        phase: "Phase 4: Deliver",
        title: "LEVERAGE COMPOUND IMPACT",
        text: "Create momentum that multiplies. Build influence, expand impact, and grow continuously over time"
      }
    ],
    cta: "Take the Assessment"
  },
  assessment: {
    intro: {
      heading: "Career Presence Audit",
      subHeading: "Evaluate your career mindset and professional authority",
      list: [
        "50 questions to complete",
        "Takes 8-12 minutes",
        "Answer honestly for accuracy",
        "Your results are private"
      ],
      cta: "Begin Audit",
      back: "Back to Home"
    },
    questions: [
      "I stay calm and composed even in stressful situations.",
      "I enjoy meeting new people and initiating conversations.",
      "I prefer planning ahead rather than acting spontaneously.",
      "I am comfortable expressing my opinions openly.",
      "I adapt quickly when plans or environments change.",
      "I am detail-oriented and careful in my work.",
      "I find it easy to empathize with others’ feelings.",
      "I remain optimistic even when facing challenges.",
      "I tend to reflect deeply before making decisions.",
      "I am self-disciplined and consistent in my habits.",
      "I take ownership of my mistakes and learn from them.",
      "I consistently complete tasks before deadlines.",
      "I prefer working independently rather than in teams.",
      "I accept constructive feedback positively.",
      "I remain accountable even when no one is monitoring me.",
      "I stay motived even during repetitive tasks.",
      "I prioritize quality over speed when completing work.",
      "I willingly take initiative without waiting for instructions.",
      "I stay focused even when distractions are present.",
      "I am comfortable handling multiple tasks at once.",
      "I collaborate well with people who think differently from me.",
      "I actively listen when others are speaking",
      "I handle conflicts calmly and professionally.",
      "I am respectful even when I disagree with someone.",
      "I encourage and support my teammates.",
      "I communicate clearly and confidently.",
      "I value teamwork over personal recognition.",
      "I am comfortable working with people from diverse backgrounds.",
      "I try to resolve misunderstandings quickly.",
      "I am open to others’ ideas and perspectives.",
      "I enjoy solving complex or challenging problems.",
      "I analyze situations logically before acting.",
      "I can identify the root cause of a problem easily.",
      "I think creatively when traditional solutions fail.",
      "I consider risks before making decisions.",
      "I am able to learn new concepts quickly.",
      "I remain patient while solving difficult tasks.",
      "I break large problems into smaller manageable steps.",
      "I rely on evidence and facts rather than assumptions.",
      "I evaluate multiple solutions before selecting one.",
      "I set clear personal and professional goals.",
      "I actively work on improving my weaknesses.",
      "I am motivated by opportunities to learn and grow.",
      "I feel confident about my strengths and abilities.",
      "I regularly reflect on my progress and achievements.",
      "I remain persistent even when progress is slow.",
      "I am driven by long-term success rather than short-term rewards.",
      "I seek feedback to improve my performance.",
      "I feel a strong sense of purpose in what I do.",
      "I believe my mindset plays a key role in my success."
    ]
  },
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "1. What is Webolution?",
        answer: "Webolution is a career navigation system for mid-career software developers who feel stuck in the “valley of stagnation.” It helps you move from quiet frustration and stalled growth to clarity, momentum, and a visible, thriving career—without burning out or starting over."
      },
      {
        question: "2. Who is this book for?",
        answer: "Webolution is for mid-career web and software developers who feel capable but overlooked, tired of guessing their next move, or stuck despite working hard. If you’re not a beginner but not where you should be, this book is built for you."
      },
      {
        question: "3. How is Webolution different from other career books?",
        answer: "Most career books tell you to learn more, work harder, or be more confident. Webolution goes deeper. It helps you debug the hidden blockers slowing your growth, design a roadmap tailored to you, deploy focused action, and deliver results that compound over time. It’s not motivation—it’s orientation."
      }
    ]
  },
  footer: {
    heading: "Ready to rise beyond stagnation?",
    cta: "Start Your Webolution",
    subText: "No more guessing. No more plateau. Build the career you deserve."
  },
  aida: {
    steps: [
      { text: "Your career plateau isn't a lack of talent—it's a lack of strategy." },
      { text: "Most developers work harder to get ahead. We teach you to work smarter." },
      { text: "Shift from an Individual Contributor mindset to a Strategic Leader." },
      { text: "Ready to engineer the career you've always wanted?" }
    ],
    cta: "Start Your Audit"
  },
  blog: {
    listHero: {
      heading: "Career Engineering Blog",
      subHeading: "Insights for the High-Performance Developer",
      intro: "Explore strategies, mindset shifts, and technical leadership principles designed for the mid-career developer."
    },
    posts: [
      {
        id: "stagnation-myth",
        category: "Strategy",
        badge: "Essential",
        date: "Nov 15, 2023",
        title: "The Stagnation Myth: Why 'Hard Work' is Holding You Back",
        summary: "Why the advice that got you to senior developer is exactly what's keeping you from principal."
      },
      {
        id: "visibility-leverage",
        category: "Leadership",
        date: "Dec 02, 2023",
        title: "Invisible Impact: The Art of Strategic Visibility",
        summary: "How to ensure your contributions are recognized by the people who matter most."
      }
    ],
    details: {
      "stagnation-myth": {
        title: "The Stagnation Myth",
        heroHook: "Effort is the currency of the junior. Strategy is the currency of the leader.",
        silentPlateau: {
          heading: "The 7-Year Itch",
          text: "Most developers hit a wall around year seven. They are fast, reliable, and invisible."
        },
        hardWorkVsStrategy: {
          heading: "Leverage vs Labor",
          text: "When you code 10 hours a day, you are a worker. When you design systems that save 1000 hours, you are a strategist.",
          myth: "Output equals Value",
          truth: "Outcome equals Value"
        },
        realReason: {
          heading: "The Hidden Blockers",
          points: [
            "Over-reliance on technical skills alone",
            "Fear of organizational politics",
            "Lack of a personal career roadmap"
          ]
        },
        webolutionIntro: {
          heading: "The Webolution Method",
          text: "We treat your career like a high-scale system: Audit, Design, Deploy, and Deliver."
        },
        framework: [
          { phase: "Phase 1: Debug", text: "Identify the internal scripts that keep you small." },
          { phase: "Phase 2: Design", text: "Architect a professional persona that commands respect." }
        ],
        closing: {
          text: "The plateau is optional.",
          cta: "Take the first step"
        }
      }
    }
  },
  podcast: {
    hero: {
      heading: "The Webolution Podcast",
      subHeading: "The Voice of the Strategic Developer",
      intro: "Join us as we interview industry leaders on how they navigated the jump from technical expert to strategic influencer."
    },
    episodes: [
      {
        id: "principal-mindset",
        category: "Leadership",
        duration: "24:15",
        title: "Ep 01: The Principal Mindset with Sarah Chen",
        summary: "Sarah explains how she moved from Senior Engineer to Principal in 18 months by changing her communication style."
      }
    ],
    details: {
      "principal-mindset": {
        title: "Ep 01: The Principal Mindset",
        description: "In this episode, Sarah Chen breaks down the specific steps she took to gain visibility in a remote-first organization.",
        talkingPoints: [
          "Identifying high-leverage projects",
          "Speaking the language of the business",
          "Navigating pushback from peers"
        ],
        oldAdvice: {
          myth: "Let your work speak for itself.",
          truth: "If you don't speak for your work, no one will."
        },
        blueprint: {
          heading: "Principal Career Blueprint",
          summary: "A breakdown of the core competencies needed for high-level technical roles.",
          phases: [
            { id: 1, title: "Influence", desc: "Building cross-functional relationships." },
            { id: 2, title: "Vision", desc: "Setting the technical direction for the team." },
            { id: 3, title: "Execution", desc: "Delivering complex projects predictably." },
            { id: 4, title: "Legacy", desc: "Mentoring the next generation of leaders." }
          ]
        },
        cta: "Download the Episode Notes"
      }
    }
  },
  ebook: {
    library: {
      heading: "Webolution Library",
      subHeading: "Career blueprints for mid-career web developers"
    },
    list: [
      {
        id: "webolution-blueprint",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
        title: "Webolution",
        subTitle: "A Blueprint for Mid-Career Web Developers",
        summary: "A career-engineering system for developers who feel stuck and want clarity, strategy, and growth.",
        meta: "7+ years • Career Strategy • eBook"
      }
    ],
    details: {
      "webolution-blueprint": {
        title: "Webolution",
        chapters: [
          {
            id: "intro",
            title: "Introduction",
            content: {
              heading: "The Silent Plateau",
              text: "7+ years in web development… are you feeling stuck in the same place?\n\nIt’s time to break the slowdown.\n\nYou’re skilled. You’re experienced. But your career isn’t moving the way it should."
            }
          },
          {
            id: "problem",
            title: "The Problem: Career Stagnation",
            content: {
              heading: "Stagnation isn't a lack of talent.",
              subHeading: "You already have the skills. What's missing is clarity, strategy, and execution at the right level.",
              points: [
                "The industry shifts every few months.",
                "Passion quietly turns into routine.",
                "Fear of being left behind grows.",
                "Junior developers seem to move faster.",
                "“Learn more, work harder” stops working."
              ]
            }
          },
          {
            id: "advice",
            title: "Why Old Advice Fails",
            content: {
              quote: "Just learn more and work harder.",
              explanation: "This myth keeps developers stuck. Real growth requires strategy, visibility, influence, and mindset.",
              myth: "Hard work = promotion",
              truth: "Strategy + visibility = leverage"
            }
          },
          {
            id: "blueprint",
            title: "The Webolution Blueprint",
            content: {
              heading: "Your Blueprint for a Future-Proof Career",
              description: "Webolution is a career-engineering system for developers who want to scale their impact."
            }
          },
          {
            id: "phase1",
            title: "Phase 1: Debug",
            content: {
              heading: "Unlock what’s quietly holding you back",
              description: "Identify internal and external blockers slowing your career growth."
            }
          },
          {
            id: "phase2",
            title: "Phase 2: Design",
            content: {
              heading: "Architect your next-level career",
              description: "Build a personalized roadmap aligned with strengths, passion, and industry needs."
            }
          },
          {
            id: "phase3",
            title: "Phase 3: Develop & Deploy",
            content: {
              heading: "Give birth to your dream career",
              description: "Execute with clarity, ship meaningful work, and create visible results."
            }
          },
          {
            id: "phase4",
            title: "Phase 4: Deliver",
            content: {
              heading: "Leverage compound impact",
              description: "Build influence, expand impact, and grow continuously over time."
            }
          }
        ],
        footer: {
          cta: "Continue your Webolution journey"
        }
      }
    }
  }
};
