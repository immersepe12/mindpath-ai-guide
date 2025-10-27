import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, MessageCircle, Calendar, UserCheck } from "lucide-react";

const IntegrationFlowSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-secondary/30 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything Works Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your journal feeds Dr. Riya insights, your AI companion supports you 24/7, 
            and your therapist sees the complete picture of your journey
          </p>
        </div>

        {/* Your Daily Flow */}
        <Card className="p-8 md:p-12 mb-12 bg-gradient-to-br from-background to-mindtalk-blue/5">
          <h3 className="text-2xl font-bold mb-8 text-center">Your Typical Day</h3>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Morning */}
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-mindtalk-orange to-mindtalk-orange-light flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Morning</h4>
                  <p className="text-sm text-muted-foreground">Journal your thoughts</p>
                </div>
              </div>
              <ArrowRight className="hidden md:block absolute top-8 -right-6 w-5 h-5 text-muted-foreground" />
            </div>

            {/* Throughout Day */}
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-mindtalk-blue to-mindtalk-purple flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Throughout Day</h4>
                  <p className="text-sm text-muted-foreground">Chat with Dr. Riya</p>
                </div>
              </div>
              <ArrowRight className="hidden md:block absolute top-8 -right-6 w-5 h-5 text-muted-foreground" />
            </div>

            {/* Daily Tasks */}
            <div className="relative">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-mindtalk-green to-mindtalk-green-light flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Daily Tasks</h4>
                  <p className="text-sm text-muted-foreground">Complete assessments</p>
                </div>
              </div>
              <ArrowRight className="hidden md:block absolute top-8 -right-6 w-5 h-5 text-muted-foreground" />
            </div>

            {/* Weekly */}
            <div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-mindtalk-purple to-mindtalk-blue flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Weekly</h4>
                  <p className="text-sm text-muted-foreground">Therapy session reviews</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Integration Benefits */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-mindtalk-purple/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-mindtalk-purple" />
            </div>
            <h4 className="font-semibold mb-2">Journal → AI Learning</h4>
            <p className="text-sm text-muted-foreground">
              Your journal entries train Dr. Riya to understand your patterns and provide better support
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-mindtalk-blue/10 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-mindtalk-blue" />
            </div>
            <h4 className="font-semibold mb-2">AI → Program Insights</h4>
            <p className="text-sm text-muted-foreground">
              Dr. Riya suggests relevant program activities based on your conversations and needs
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-mindtalk-green/10 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-mindtalk-green" />
            </div>
            <h4 className="font-semibold mb-2">All → Therapist Review</h4>
            <p className="text-sm text-muted-foreground">
              Your therapist sees journals, AI conversations, and progress for informed sessions
            </p>
          </Card>
        </div>

        {/* Callout */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-mindtalk-orange/10 via-mindtalk-blue/10 to-mindtalk-purple/10 border border-mindtalk-orange/20">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-3">
              Complete Ecosystem, Seamless Experience
            </h3>
            <p className="text-muted-foreground">
              Unlike other platforms where features work in silos, MindTalk creates a unified healing journey. 
              Every journal entry, every AI conversation, every completed task contributes to your recovery story.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationFlowSection;
