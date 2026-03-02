import { useState } from "react";
import { StoryForm } from "./components/StoryForm";
import { SuccessMessage } from "./components/SuccessMessage";
import { FinishedReelList } from "./components/FinishedReelList";
import { BookOpen } from "lucide-react";

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [reelRefreshTrigger, setReelRefreshTrigger] = useState(0);

  const handleSubmit = (email: string) => {
    setUserEmail(email);
    setIsSubmitted(true);
    setReelRefreshTrigger((t) => t + 1);
  };

  const handleCreateAnother = () => {
    setIsSubmitted(false);
    setUserEmail("");
  };

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="pt-8 pb-4 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="relative">
                <BookOpen className="w-8 h-8 text-purple-400" />
                <div className="absolute inset-0 blur-xl bg-purple-500/50" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Syntale
              </h1>
            </div>
            <p className="text-center text-slate-400 mt-2">
              Transform your ideas into captivating short form video stories
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              {!isSubmitted ? (
                <StoryForm onSubmit={handleSubmit} />
              ) : (
                <SuccessMessage email={userEmail} onCreateAnother={handleCreateAnother} />
              )}
            </div>
            <FinishedReelList refreshAfterSubmitTrigger={reelRefreshTrigger} />
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-4">
          <div className="max-w-4xl mx-auto text-center text-slate-500 text-sm">
            <p>© 2026 Syntale. Bringing your stories to life.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}