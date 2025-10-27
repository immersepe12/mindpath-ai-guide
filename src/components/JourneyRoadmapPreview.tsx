import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { CheckCircle, Circle, Lock, ChevronDown, ChevronUp, Brain, Headphones, FileText, BarChart, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  type: "reflection" | "audio" | "writing" | "assessment" | "tip";
  title: string;
  completed: boolean;
}

interface Day {
  number: number;
  title: string;
  status: "completed" | "active" | "locked";
  tasks?: Task[];
}

const sampleDays: Day[] = [
  { number: 5, title: "Managing Triggers", status: "locked" },
  { number: 4, title: "Building Resilience", status: "locked" },
  {
    number: 3,
    title: "Coping Strategies",
    status: "active",
    tasks: [
      { id: "1", type: "reflection", title: "What are your main coping mechanisms?", completed: true },
      { id: "2", type: "audio", title: "5-Minute Mindful Breathing", completed: true },
      { id: "3", type: "writing", title: "Journal about a recent challenge", completed: false },
      { id: "4", type: "assessment", title: "Rate your stress level (1-10)", completed: false },
      { id: "5", type: "tip", title: "Celebrate small wins today", completed: false },
    ]
  },
  { number: 2, title: "Identifying Patterns", status: "completed" },
  { number: 1, title: "Getting Started", status: "completed" },
];

const getTaskIcon = (type: Task["type"]) => {
  switch (type) {
    case "reflection": return Brain;
    case "audio": return Headphones;
    case "writing": return FileText;
    case "assessment": return BarChart;
    case "tip": return Lightbulb;
  }
};

const JourneyRoadmapPreview = () => {
  const [expandedDay, setExpandedDay] = useState<number | null>(3);

  const toggleDay = (dayNumber: number) => {
    setExpandedDay(expandedDay === dayNumber ? null : dayNumber);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your{" "}
            <span className="bg-gradient-to-r from-accent to-mindtalk-green bg-clip-text text-transparent">
              Guided Roadmap
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow a structured path designed by mental health experts. Each day unlocks new tasks, 
            insights, and progress toward your recovery goals.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-card to-card/80 border-2">
            <CardContent className="p-8">
              {/* Journey Header */}
              <div className="text-center mb-8 pb-6 border-b">
                <h3 className="text-2xl font-bold mb-2">Stress & Anxiety Recovery Journey</h3>
                <p className="text-muted-foreground mb-4">Day 3 of 10 • 30% Complete</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-to-r from-accent to-mindtalk-green h-2 rounded-full transition-all duration-500" style={{ width: "30%" }}></div>
                </div>
              </div>

              {/* Journey Roadmap */}
              <div className="space-y-4">
                {sampleDays.map((day) => {
                  const isExpanded = expandedDay === day.number;
                  const Icon = day.status === "completed" ? CheckCircle : day.status === "active" ? Circle : Lock;
                  const canExpand = day.status === "active" && day.tasks;

                  return (
                    <div key={day.number}>
                      <div
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer",
                          day.status === "active" 
                            ? "bg-primary/10 border-2 border-primary hover:bg-primary/15" 
                            : day.status === "completed"
                            ? "bg-accent/10 border border-accent/30 hover:bg-accent/15"
                            : "bg-muted/50 border border-muted opacity-60 cursor-not-allowed"
                        )}
                        onClick={() => canExpand && toggleDay(day.number)}
                      >
                        <Icon className={cn(
                          "w-6 h-6 shrink-0",
                          day.status === "completed" ? "text-accent" : 
                          day.status === "active" ? "text-primary" : 
                          "text-muted-foreground"
                        )} />
                        
                        <div className="flex-1">
                          <div className="font-semibold">
                            Day {day.number}: {day.title}
                          </div>
                          {day.status === "active" && day.tasks && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {day.tasks.filter(t => t.completed).length} of {day.tasks.length} tasks completed
                            </div>
                          )}
                        </div>

                        {canExpand && (
                          isExpanded ? 
                            <ChevronUp className="w-5 h-5 text-muted-foreground" /> : 
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>

                      {/* Expanded Tasks */}
                      {isExpanded && day.tasks && (
                        <div className="ml-10 mt-3 space-y-2 animate-in slide-in-from-top duration-300">
                          {day.tasks.map((task) => {
                            const TaskIcon = getTaskIcon(task.type);
                            return (
                              <div
                                key={task.id}
                                className={cn(
                                  "flex items-start gap-3 p-3 rounded-lg border transition-all hover:shadow-sm",
                                  task.completed 
                                    ? "bg-accent/5 border-accent/30" 
                                    : "bg-card border-border hover:border-primary/50"
                                )}
                              >
                                <div className={cn(
                                  "p-2 rounded-lg shrink-0",
                                  task.completed ? "bg-accent/10" : "bg-muted"
                                )}>
                                  <TaskIcon className={cn(
                                    "w-4 h-4",
                                    task.completed ? "text-accent" : "text-muted-foreground"
                                  )} />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    {task.completed && (
                                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                                    )}
                                    <span className={cn(
                                      "text-sm",
                                      task.completed && "line-through text-muted-foreground"
                                    )}>
                                      {task.title}
                                    </span>
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1 capitalize">
                                    {task.type} Task {!task.completed && "• 10 XP"}
                                  </div>
                                </div>

                                {!task.completed && (
                                  <button className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-lg hover:bg-primary/90 transition-colors shrink-0">
                                    Start
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">120</div>
                  <div className="text-sm text-muted-foreground">XP Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">3</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-mindtalk-blue">12</div>
                  <div className="text-sm text-muted-foreground">Tasks Done</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JourneyRoadmapPreview;
