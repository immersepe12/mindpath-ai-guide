import { MindTalkButton } from "./ui/button-variants";
import { Card, CardContent } from "./ui/card";
import { Video, Calendar, MessageCircle, User, Clock, CheckCircle, ArrowRight } from "lucide-react";
interface TherapySessionHighlightProps {
  variant?: 'journeys' | 'daily';
}
const TherapySessionHighlight = ({
  variant = 'journeys'
}: TherapySessionHighlightProps) => {
  const therapySchedule = [{
    week: "Week 2",
    session: "Initial Assessment",
    status: "completed"
  }, {
    week: "Week 4",
    session: "Progress Review",
    status: "completed"
  }, {
    week: "Week 6",
    session: "Strategy Adjustment",
    status: "current"
  }, {
    week: "Week 8",
    session: "Breakthrough Session",
    status: "upcoming"
  }, {
    week: "Week 10",
    session: "Integration",
    status: "upcoming"
  }, {
    week: "Week 12",
    session: "Completion Review",
    status: "upcoming"
  }];
  if (variant === 'daily') {
    return <div className="mx-3 md:mx-4 mb-3 md:mb-4">
        <Card className="bg-gradient-to-r from-mindtalk-blue/10 to-mindtalk-purple/10 border-mindtalk-blue/20">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-mindtalk-blue rounded-full flex items-center justify-center">
                <Video className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <h4 className="text-mindtalk-blue font-semibold text-sm md:text-base">Therapy Session</h4>
            </div>
            
            <p className="text-xs md:text-sm text-gray-700 mb-2 md:mb-3">
              Your Week 6 session with Dr. Priya is scheduled for tomorrow at 4:00 PM
            </p>
            
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-mindtalk-green" />
              <span className="text-xs md:text-sm text-gray-600">Based on your daily progress</span>
            </div>
            
            <button className="w-full bg-mindtalk-blue text-white py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium flex items-center justify-center gap-1">
              <Video className="w-3 h-3 md:w-4 md:h-4" />
              Join Session Tomorrow
            </button>
          </CardContent>
        </Card>
      </div>;
  }
  return;
};
export default TherapySessionHighlight;