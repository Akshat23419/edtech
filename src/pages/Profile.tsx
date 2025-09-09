import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PersonIcon, 
  CalendarIcon, 
  StarIcon, 
  RocketIcon, 
  CodeIcon, 
  PlayIcon,
  BadgeIcon,
  ClockIcon,
  StarFilledIcon as TrophyIcon
} from '@radix-ui/react-icons';

const Profile = () => {
  const { state } = useApp();
  
  const watchedPercentage = (state.watchedLectures.length / state.lectures.length) * 100;
  const totalWatchTime = state.lectures.reduce((acc, lecture) => {
    if (state.watchedLectures.includes(lecture.id)) {
      const [minutes, seconds] = lecture.duration.split(':').map(Number);
      return acc + minutes + (seconds / 60);
    }
    return acc;
  }, 0);

  const achievements = [
    {
      id: 'first-video',
      title: 'First Steps',
      description: 'Watched your first video',
      icon: PlayIcon,
      earned: state.watchedLectures.length > 0,
      date: '2024-01-15'
    },
    {
      id: 'code-runner',
      title: 'Code Runner',
      description: 'Executed your first program',
      icon: CodeIcon,
      earned: Object.keys(state.codeSnippets).length > 0,
      date: '2024-01-16'
    },
    {
      id: 'dedicated-learner',
      title: 'Dedicated Learner',
      description: 'Completed 5 lectures',
      icon: StarIcon,
      earned: state.watchedLectures.length >= 5,
      date: null
    },
    {
      id: 'course-master',
      title: 'Course Master',
      description: 'Completed all lectures',
      icon: TrophyIcon,
      earned: state.watchedLectures.length === state.lectures.length,
      date: null
    }
  ];

  const recentActivity = [
    {
      type: 'video',
      title: 'Watched "Introduction to Programming"',
      timestamp: '2 hours ago'
    },
    {
      type: 'code',
      title: 'Practiced JavaScript in compiler',
      timestamp: '3 hours ago'
    },
    {
      type: 'video',
      title: 'Watched "Variables and Data Types"',
      timestamp: '1 day ago'
    },
    {
      type: 'achievement',
      title: 'Earned "Code Runner" badge',
      timestamp: '2 days ago'
    }
  ];

  const stats = [
    {
      label: 'Lectures Watched',
      value: state.watchedLectures.length,
      total: state.lectures.length,
      icon: PlayIcon,
      color: 'text-primary'
    },
    {
      label: 'Code Languages',
      value: Object.keys(state.codeSnippets).length,
      total: 4,
      icon: CodeIcon,
      color: 'text-accent'
    },
    {
      label: 'Achievements',
      value: achievements.filter(a => a.earned).length,
      total: achievements.length,
      icon: BadgeIcon,
      color: 'text-success'
    },
    {
      label: 'Watch Time',
      value: Math.round(totalWatchTime),
      unit: 'min',
      icon: ClockIcon,
      color: 'text-highlight'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-hero" />
            <CardContent className="relative pt-0 pb-8">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
                <Avatar className="w-32 h-32 border-4 border-background">
                  <AvatarImage src="/api/placeholder/128/128" />
                  <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl font-bold mb-2">Akshat</h1>
                  <p className="text-muted-foreground mb-4">
                    Aspiring Full Stack Developer • Learning since January 2024
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <StarIcon className="mr-1 h-3 w-3" />
                      Intermediate
                    </Badge>
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      <RocketIcon className="mr-1 h-3 w-3" />
                      Active Learner
                    </Badge>
                  </div>
                </div>
                
                <Button variant="neon">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="card-hover text-center">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {stat.value}
                    {stat.total && <span className="text-muted-foreground">/{stat.total}</span>}
                    {stat.unit && <span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="progress" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="progress" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Course Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Programming Fundamentals</span>
                          <span className="text-sm text-muted-foreground">
                            {state.watchedLectures.length}/{state.lectures.length}
                          </span>
                        </div>
                        <Progress value={watchedPercentage} className="h-3" />
                        <p className="text-sm text-muted-foreground mt-2">
                          {Math.round(watchedPercentage)}% completed
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        {state.lectures.map((lecture) => (
                          <div
                            key={lecture.id}
                            className={`flex items-center gap-3 p-3 rounded-lg ${
                              state.watchedLectures.includes(lecture.id)
                                ? 'bg-success/10 border border-success/20'
                                : 'bg-secondary/20'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              state.watchedLectures.includes(lecture.id)
                                ? 'bg-success text-white'
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {state.watchedLectures.includes(lecture.id) ? (
                                <StarIcon className="h-4 w-4" />
                              ) : (
                                <PlayIcon className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{lecture.title}</p>
                              <p className="text-xs text-muted-foreground">{lecture.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Coding Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Coding Practice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(state.codeSnippets).map(([language, code]) => (
                        <div key={language} className="p-4 rounded-lg bg-secondary/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium capitalize">{language}</span>
                            <Badge variant="outline">{code.split('\n').length} lines</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground font-mono bg-background/50 p-2 rounded overflow-hidden">
                            {code.split('\n')[0]}...
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-6">
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className={`card-hover ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-success/10 to-success/5 border-success/20' 
                        : 'opacity-60'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            achievement.earned 
                              ? 'bg-success/20 text-success' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            <achievement.icon className="h-8 w-8" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1 flex items-center gap-2">
                              {achievement.title}
                              {achievement.earned && (
                                <Badge variant="secondary" className="bg-success/20 text-success text-xs">
                                  Earned
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {achievement.description}
                            </p>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                Earned on {achievement.date}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-secondary/20">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          {activity.type === 'video' && <PlayIcon className="h-5 w-5 text-primary" />}
                          {activity.type === 'code' && <CodeIcon className="h-5 w-5 text-accent" />}
                          {activity.type === 'achievement' && <BadgeIcon className="h-5 w-5 text-success" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;