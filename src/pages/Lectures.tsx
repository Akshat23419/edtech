import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { PlayIcon, CheckIcon, ClockIcon, DotFilledIcon, FileTextIcon, ChatBubbleIcon } from '@radix-ui/react-icons';

const Lectures = () => {
  const { lectureId } = useParams();
  const { state, dispatch } = useApp();
  const [selectedLecture, setSelectedLecture] = useState(state.currentLecture || state.lectures[0]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'User1',
      content: 'Great explanation of the concepts! This really helped me understand the fundamentals.',
      timestamp: '2 hours ago',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '2',
      author: 'User2',
      content: 'Could you provide more examples on this topic? I\'d love to see practical applications.',
      timestamp: '5 hours ago',
      avatar: '/api/placeholder/40/40'
    }
  ]);

  useEffect(() => {
    if (lectureId) {
      const lecture = state.lectures.find(l => l.id === lectureId);
      if (lecture) {
        setSelectedLecture(lecture);
        dispatch({ type: 'SET_CURRENT_LECTURE', payload: lecture });
      }
    }
  }, [lectureId, state.lectures, dispatch]);

  const handleLectureSelect = (lecture: typeof selectedLecture) => {
    setSelectedLecture(lecture);
    dispatch({ type: 'SET_CURRENT_LECTURE', payload: lecture });
  };

  const handleMarkWatched = () => {
    if (selectedLecture) {
      dispatch({ type: 'MARK_LECTURE_WATCHED', payload: selectedLecture.id });
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        author: 'You',
        content: comment,
        timestamp: 'Just now',
        avatar: '/api/placeholder/40/40'
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  const watchedPercentage = (state.watchedLectures.length / state.lectures.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Course Progress</h2>
            <span className="text-sm text-muted-foreground">
              {state.watchedLectures.length} of {state.lectures.length} completed
            </span>
          </div>
          <Progress value={watchedPercentage} className="h-2" />
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="mb-6 overflow-hidden">
                <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <PlayIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold">{selectedLecture?.title}</p>
                    <p className="text-sm opacity-75">Video Player</p>
                    <Button className="mt-4" variant="neon" size="sm">
                      Play Video
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">{selectedLecture?.title}</h1>
                    <Button
                      onClick={handleMarkWatched}
                      variant={selectedLecture?.isWatched ? "secondary" : "neon"}
                    >
                      {selectedLecture?.isWatched ? (
                        <><CheckIcon className="mr-2 h-4 w-4" /> Watched</>
                      ) : (
                        <><ClockIcon className="mr-2 h-4 w-4" /> Mark as Watched</>
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                    <div className="flex items-center">
                      <ClockIcon className="mr-1 h-4 w-4" />
                      {selectedLecture?.duration}
                    </div>
                    <div className="flex items-center">
                      <DotFilledIcon className="h-4 w-4" />
                      {selectedLecture?.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {selectedLecture?.description}
                  </p>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Resources
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLecture?.resources.map(resource => (
                        <Button key={resource} variant="outline" size="sm">
                          {resource}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ChatBubbleIcon className="mr-2 h-5 w-5" />
                    Discussion ({comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Textarea
                      placeholder="Share your thoughts or ask a question..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mb-4"
                    />
                    <Button onClick={handleAddComment} variant="neon">
                      Post Comment
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {comments.map(comment => (
                      <div key={comment.id} className="flex gap-4 p-4 rounded-lg bg-secondary/20">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                          {comment.author[0]}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{comment.author}</span>
                            <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-muted-foreground">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Course Playlist</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[600px]">
                    <div className="p-4 space-y-2">
                      {state.lectures.map((lecture, index) => (
                        <motion.div
                          key={lecture.id}
                          className={`
                            playlist-item p-4 rounded-lg cursor-pointer
                            ${selectedLecture?.id === lecture.id ? 'active' : ''}
                          `}
                          onClick={() => handleLectureSelect(lecture)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative">
                              <div className="w-16 h-12 bg-gradient-secondary rounded overflow-hidden flex items-center justify-center">
                                {lecture.isWatched ? (
                                  <CheckIcon className="h-6 w-6 text-success" />
                                ) : (
                                  <PlayIcon className="h-6 w-6 text-primary" />
                                )}
                              </div>
                              <div className="absolute -top-1 -left-1 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm leading-tight mb-1 truncate">
                                {lecture.title}
                              </h4>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <ClockIcon className="mr-1 h-3 w-3" />
                                {lecture.duration}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lectures;