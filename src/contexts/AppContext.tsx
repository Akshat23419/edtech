import React, { createContext, useContext, useReducer } from 'react';
import lectureThumb from '@/assets/lecture-thumb.jpg';

// Types
export interface Lecture {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  isWatched: boolean;
  tags: string[];
  resources: string[];
}

export interface AppState {
  currentLecture: Lecture | null;
  lectures: Lecture[];
  watchedLectures: string[];
  codeSnippets: { [key: string]: string };
  currentLanguage: string;
}

type AppAction = 
  | { type: 'SET_CURRENT_LECTURE'; payload: Lecture }
  | { type: 'MARK_LECTURE_WATCHED'; payload: string }
  | { type: 'SAVE_CODE_SNIPPET'; payload: { language: string; code: string } }
  | { type: 'SET_LANGUAGE'; payload: string };

// Initial state with sample data
const initialState: AppState = {
  currentLecture: null,
  lectures: [
    {
      id: '1',
      title: 'Introduction to Programming',
      description: 'Learn the fundamentals of programming with basic concepts and syntax.',
      duration: '15:30',
      thumbnail: lectureThumb,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isWatched: false,
      tags: ['beginner', 'fundamentals'],
      resources: ['Slides PDF', 'Practice Exercises']
    },
    {
      id: '2',
      title: 'Variables and Data Types',
      description: 'Understanding different data types and how to work with variables.',
      duration: '12:45',
      thumbnail: lectureThumb,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isWatched: false,
      tags: ['variables', 'data-types'],
      resources: ['Code Examples', 'Cheat Sheet']
    },
    {
      id: '3',
      title: 'Control Structures',
      description: 'Mastering if statements, loops, and conditional logic.',
      duration: '18:20',
      thumbnail: lectureThumb,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isWatched: false,
      tags: ['control-flow', 'loops'],
      resources: ['Practice Problems']
    },
    {
      id: '4',
      title: 'Functions and Methods',
      description: 'Creating reusable code with functions and understanding scope.',
      duration: '22:10',
      thumbnail: lectureThumb,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isWatched: false,
      tags: ['functions', 'scope'],
      resources: ['Function Library', 'Best Practices Guide']
    },
    {
      id: '5',
      title: 'Object-Oriented Programming',
      description: 'Introduction to classes, objects, and OOP principles.',
      duration: '25:55',
      thumbnail: lectureThumb,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      isWatched: false,
      tags: ['oop', 'classes'],
      resources: ['UML Diagrams', 'Class Examples']
    }
  ],
  watchedLectures: [],
  codeSnippets: {
    javascript: '// Welcome to the JavaScript compiler\nconsole.log("Hello, World!");',
    python: '# Welcome to the Python compiler\nprint("Hello, World!")',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'
  },
  currentLanguage: 'javascript'
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_CURRENT_LECTURE':
      return { ...state, currentLecture: action.payload };
    case 'MARK_LECTURE_WATCHED':
      return {
        ...state,
        watchedLectures: [...state.watchedLectures, action.payload],
        lectures: state.lectures.map(lecture =>
          lecture.id === action.payload ? { ...lecture, isWatched: true } : lecture
        )
      };
    case 'SAVE_CODE_SNIPPET':
      return {
        ...state,
        codeSnippets: {
          ...state.codeSnippets,
          [action.payload.language]: action.payload.code
        }
      };
    case 'SET_LANGUAGE':
      return { ...state, currentLanguage: action.payload };
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};