
import { Card, CardContent } from "./ui/card";
import { Calendar, BookOpen, HeadphonesIcon, FileText, Pill, TrendingUp } from "lucide-react";

const AppShowcaseSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Everything You Need in One App
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your progress, access resources, and stay connected with your therapy team - all in one beautiful, intuitive interface.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Daily Scheduling</h3>
              <p className="text-muted-foreground">
                Smart scheduling system that adapts to your routine and reminds you of daily micro-tasks.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Learning Resources</h3>
              <p className="text-muted-foreground">
                Access curated content, exercises, and educational materials tailored to your journey.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <HeadphonesIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Audio Sessions</h3>
              <p className="text-muted-foreground">
                Guided meditations, breathing exercises, and therapeutic audio content on-demand.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Progress Journal</h3>
              <p className="text-muted-foreground">
                Document your thoughts, track mood patterns, and reflect on your growth journey.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Pill className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Medication Tracking</h3>
              <p className="text-muted-foreground">
                Set reminders and track medication adherence with smart notifications.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
            <CardContent className="p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Visualize your progress with detailed charts and insights from your daily activities.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AppShowcaseSection;
