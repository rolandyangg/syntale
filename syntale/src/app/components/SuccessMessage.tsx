import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle2, Sparkles, Mail } from "lucide-react";

interface SuccessMessageProps {
  email: string;
  onCreateAnother: () => void;
}

export function SuccessMessage({ email, onCreateAnother }: SuccessMessageProps) {
  return (
    <Card className="bg-slate-900/60 backdrop-blur-xl border-slate-800/50 shadow-2xl">
      <div className="p-12 text-center space-y-6">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <CheckCircle2 className="w-20 h-20 text-green-400" />
            <div className="absolute inset-0 blur-2xl bg-green-500/40 animate-pulse" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Story Submitted!
          </h2>
          <p className="text-slate-300 text-lg">
            Your creative vision is being processed
          </p>
        </div>

        {/* Email Confirmation */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Mail className="w-5 h-5" />
            <span className="text-sm">We'll send your story to:</span>
          </div>
          <p className="text-purple-400 font-mono text-lg">{email}</p>
        </div>

        {/* Info */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <p className="text-slate-300 text-sm text-left">
              Your story is now being crafted with AI magic! Depending on complexity, 
              this may take a few minutes. We'll notify you via email as soon as your 
              Instagram reel is ready.
            </p>
          </div>
        </div>

        {/* Create Another Button */}
        <Button
          onClick={onCreateAnother}
          variant="outline"
          className="mt-8 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 hover:text-white transition-all duration-300"
        >
          Create Another Story
        </Button>
      </div>
    </Card>
  );
}
