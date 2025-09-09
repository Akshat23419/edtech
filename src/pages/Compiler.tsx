import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { PlayIcon, ResetIcon, DownloadIcon, UploadIcon } from '@radix-ui/react-icons';

const languages = [
  { value: 'javascript', label: 'JavaScript', version: 'ES2022' },
  { value: 'python', label: 'Python', version: '3.11' },
  { value: 'cpp', label: 'C++', version: 'C++17' },
  { value: 'c', label: 'C', version: 'C99' },
];

const themeOptions = [
  { value: 'vs-dark', label: 'Dark Theme' },
  { value: 'light', label: 'Light Theme' },
  { value: 'hc-black', label: 'High Contrast' },
];

const Compiler = () => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const editorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState('vs-dark');

  const currentCode = state.codeSnippets[state.currentLanguage] || '';
  const currentLanguage = languages.find(lang => lang.value === state.currentLanguage);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      dispatch({
        type: 'SAVE_CODE_SNIPPET',
        payload: { language: state.currentLanguage, code: value }
      });
    }
  };

  const handleLanguageChange = (language: string) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const simulateCodeExecution = async (code: string, language: string, input: string) => {
    // Mock execution - in a real app, this would call a backend API like Judge0
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        switch (language) {
          case 'javascript':
            if (code.includes('console.log')) {
              const match = code.match(/console\.log\(['"`]([^'"`]*)['"`]\)/);
              resolve(match ? match[1] : 'Hello, World!');
            } else {
              resolve('// Output will appear here when you run your code');
            }
            break;
          
          case 'python':
            if (code.includes('print')) {
              const match = code.match(/print\(['"`]([^'"`]*)['"`]\)/);
              resolve(match ? match[1] : 'Hello, World!');
            } else {
              resolve('# Output will appear here when you run your code');
            }
            break;
          
          case 'cpp':
          case 'c':
            if (code.includes('cout') || code.includes('printf')) {
              resolve('Hello, World!');
            } else {
              resolve('// Output will appear here when you run your code');
            }
            break;
          
          default:
            resolve('Output will appear here when you run your code');
        }
      }, 1500);
    });
  };

  const handleRunCode = async () => {
    if (!currentCode.trim()) {
      toast({
        title: "No code to run",
        description: "Please write some code before running.",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setOutput('Running...');

    try {
      const result = await simulateCodeExecution(currentCode, state.currentLanguage, input);
      setOutput(result);
      toast({
        title: "Code executed successfully!",
        description: `Your ${currentLanguage?.label} code ran without errors.`,
      });
    } catch (error) {
      setOutput('Error: ' + (error as Error).message);
      toast({
        title: "Execution failed",
        description: "There was an error running your code.",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    const defaultCode = {
      javascript: '// Welcome to the JavaScript compiler\nconsole.log("Hello, World!");',
      python: '# Welcome to the Python compiler\nprint("Hello, World!")',
      cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
      c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'
    };

    dispatch({
      type: 'SAVE_CODE_SNIPPET',
      payload: { language: state.currentLanguage, code: defaultCode[state.currentLanguage as keyof typeof defaultCode] }
    });
    setOutput('');
    setInput('');
    toast({
      title: "Code reset",
      description: "Editor has been reset to default template.",
    });
  };

  const handleSaveCode = () => {
    const blob = new Blob([currentCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${getFileExtension(state.currentLanguage)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Code saved",
      description: "Your code has been downloaded successfully.",
    });
  };

  const handleLoadCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        dispatch({
          type: 'SAVE_CODE_SNIPPET',
          payload: { language: state.currentLanguage, code: content }
        });
        toast({
          title: "Code loaded",
          description: "File has been loaded successfully.",
        });
      };
      reader.readAsText(file);
    }
  };

  const getFileExtension = (language: string) => {
    switch (language) {
      case 'javascript': return 'js';
      case 'python': return 'py';
      case 'cpp': return 'cpp';
      case 'c': return 'c';
      default: return 'txt';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-4 text-gradient">Code Compiler</h1>
          <p className="text-muted-foreground text-lg">
            Write, compile, and run code in multiple programming languages
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="mb-6 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Language:</label>
            <Select value={state.currentLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{lang.label}</span>
                      <Badge variant="secondary" className="ml-2">{lang.version}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Theme:</label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {themeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLoadCode}
              accept=".js,.py,.cpp,.c,.txt"
              className="hidden"
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              Load
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveCode}
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              Save
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetCode}
            >
              <ResetIcon className="mr-2 h-4 w-4" />
              Reset
            </Button>
            
            <Button
              onClick={handleRunCode}
              disabled={isRunning}
              variant="neon"
            >
              <PlayIcon className="mr-2 h-4 w-4" />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
          </div>
        </motion.div>

        {/* Editor and Output */}
        <motion.div
          className="grid lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Code Editor */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span>Code Editor</span>
                <Badge variant="outline">{currentLanguage?.label}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] overflow-hidden rounded-b-lg">
                <Editor
                  height="100%"
                  language={state.currentLanguage}
                  value={currentCode}
                  theme={theme}
                  onChange={handleCodeChange}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Input/Output Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Input</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter input for your program here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[100px] font-mono"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <span>Output</span>
                  {isRunning && (
                    <Badge variant="outline" className="animate-pulse">
                      Running...
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <pre className="font-mono text-sm whitespace-pre-wrap bg-secondary/20 p-4 rounded-lg min-h-[280px]">
                    {output || 'Output will appear here when you run your code...'}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="basics" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basics">Basics</TabsTrigger>
                  <TabsTrigger value="loops">Loops</TabsTrigger>
                  <TabsTrigger value="functions">Functions</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basics" className="mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/20">
                      <h4 className="font-semibold mb-2">Hello World</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your first program in {currentLanguage?.label}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const examples = {
                            javascript: 'console.log("Hello, World!");',
                            python: 'print("Hello, World!")',
                            cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
                            c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'
                          };
                          dispatch({
                            type: 'SAVE_CODE_SNIPPET',
                            payload: { 
                              language: state.currentLanguage, 
                              code: examples[state.currentLanguage as keyof typeof examples] 
                            }
                          });
                        }}
                      >
                        Load Example
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-secondary/20">
                      <h4 className="font-semibold mb-2">Variables</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Working with variables and data types
                      </p>
                      <Button variant="outline" size="sm">
                        Load Example
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="loops" className="mt-6">
                  <div className="text-center text-muted-foreground">
                    Loop examples coming soon...
                  </div>
                </TabsContent>
                
                <TabsContent value="functions" className="mt-6">
                  <div className="text-center text-muted-foreground">
                    Function examples coming soon...
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced" className="mt-6">
                  <div className="text-center text-muted-foreground">
                    Advanced examples coming soon...
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Compiler;