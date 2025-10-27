
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import AppShowcase from "./pages/AppShowcase";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import StressAnxietyPage from "./pages/StressAnxietyPage";
import DepressionPage from "./pages/DepressionPage";
import RelationshipsPage from "./pages/RelationshipsPage";
import WorkplacePage from "./pages/WorkplacePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/app" element={<AppShowcase />} />
          <Route path="/stress-anxiety" element={<StressAnxietyPage />} />
          <Route path="/depression" element={<DepressionPage />} />
          <Route path="/relationships" element={<RelationshipsPage />} />
          <Route path="/workplace" element={<WorkplacePage />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
