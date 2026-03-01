import { useState } from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Wand2, Mail, Film, Thermometer, Layers, Mic, Type, Globe } from "lucide-react";

interface StoryFormProps {
  onSubmit: (email: string) => void;
}

export function StoryForm({ onSubmit }: StoryFormProps) {
  const [storyInput, setStoryInput] = useState("");
  const [email, setEmail] = useState("");
  const [temperature, setTemperature] = useState([0.7]);
  const [scenes, setScenes] = useState("3");
  const [duration, setDuration] = useState([15]);
  const [voiceType, setVoiceType] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(email);
    }, 1000);
  };

  const isFormValid = storyInput.trim() !== "" && email.trim() !== "" && email.includes("@");

  return (
    <Card className="bg-slate-900/60 backdrop-blur-xl border-slate-800/50 shadow-2xl">
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Story Input */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-purple-400" />
            <Label htmlFor="story" className="text-slate-200">
              Your Story Idea
            </Label>
          </div>
          <Textarea
            id="story"
            placeholder="Describe the story you want to bring to life... Be creative, be bold!"
            value={storyInput}
            onChange={(e) => setStoryInput(e.target.value)}
            className="min-h-[120px] bg-slate-800/50 border-slate-700/50 text-slate-100 placeholder:text-slate-500 focus:border-purple-500/50 focus:ring-purple-500/20 resize-none"
            required
          />
          <p className="text-xs text-slate-500">
            {storyInput.length} characters
          </p>
        </div>

        {/* Temperature Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-orange-400" />
              <Label className="text-slate-200">Creativity Level</Label>
            </div>
            <span className="text-sm font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
              {temperature[0].toFixed(2)}
            </span>
          </div>
          <Slider
            value={temperature}
            onValueChange={setTemperature}
            min={0}
            max={2}
            step={0.01}
            className="[&_[role=slider]]:bg-purple-500 [&_[role=slider]]:border-purple-400"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Very Creative</span>
          </div>
        </div>

        {/* Number of Scenes */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <Label htmlFor="scenes" className="text-slate-200">
              Number of Scenes
            </Label>
          </div>
          <Select value={scenes} onValueChange={setScenes}>
            <SelectTrigger 
              id="scenes"
              className="bg-slate-800/50 border-slate-700/50 text-slate-100 focus:border-blue-500/50 focus:ring-blue-500/20"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="1" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">1 Scene</SelectItem>
              <SelectItem value="2" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">2 Scenes</SelectItem>
              <SelectItem value="3" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">3 Scenes</SelectItem>
              <SelectItem value="4" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">4 Scenes</SelectItem>
              <SelectItem value="5" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">5 Scenes</SelectItem>
              <SelectItem value="6" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">6 Scenes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reel Duration */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-pink-400" />
              <Label className="text-slate-200">Reel Duration</Label>
            </div>
            <span className="text-sm font-mono text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full">
              {duration[0]}s
            </span>
          </div>
          <Slider
            value={duration}
            onValueChange={setDuration}
            min={5}
            max={30}
            step={1}
            className="[&_[role=slider]]:bg-pink-500 [&_[role=slider]]:border-pink-400"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>5s</span>
            <span>15s</span>
            <span>30s</span>
          </div>
        </div>

        {/* Voice Type */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-cyan-400" />
            <Label htmlFor="voice" className="text-slate-200">
              Voice Type
            </Label>
          </div>
          <Select value={voiceType} onValueChange={setVoiceType}>
            <SelectTrigger 
              id="voice"
              className="bg-slate-800/50 border-slate-700/50 text-slate-100 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            >
              <SelectValue placeholder="Select voice type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="male-professional" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Male - Professional</SelectItem>
              <SelectItem value="male-casual" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Male - Casual</SelectItem>
              <SelectItem value="male-energetic" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Male - Energetic</SelectItem>
              <SelectItem value="female-professional" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Female - Professional</SelectItem>
              <SelectItem value="female-casual" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Female - Casual</SelectItem>
              <SelectItem value="female-energetic" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Female - Energetic</SelectItem>
              <SelectItem value="neutral" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Subtitle Font Family */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-yellow-400" />
            <Label htmlFor="font" className="text-slate-200">
              Subtitle Font Family
            </Label>
          </div>
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger 
              id="font"
              className="bg-slate-800/50 border-slate-700/50 text-slate-100 focus:border-yellow-500/50 focus:ring-yellow-500/20"
            >
              <SelectValue placeholder="Select font family" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="inter" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Inter</SelectItem>
              <SelectItem value="montserrat" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Montserrat</SelectItem>
              <SelectItem value="roboto" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Roboto</SelectItem>
              <SelectItem value="poppins" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Poppins</SelectItem>
              <SelectItem value="opensans" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Open Sans</SelectItem>
              <SelectItem value="bebas" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Bebas Neue</SelectItem>
              <SelectItem value="anton" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Anton</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <Label htmlFor="language" className="text-slate-200">
              Language
            </Label>
          </div>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger 
              id="language"
              className="bg-slate-800/50 border-slate-700/50 text-slate-100 focus:border-emerald-500/50 focus:ring-emerald-500/20"
            >
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="en" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">English</SelectItem>
              <SelectItem value="es" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Spanish</SelectItem>
              <SelectItem value="fr" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">French</SelectItem>
              <SelectItem value="de" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">German</SelectItem>
              <SelectItem value="it" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Italian</SelectItem>
              <SelectItem value="pt" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Portuguese</SelectItem>
              <SelectItem value="ja" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Japanese</SelectItem>
              <SelectItem value="ko" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Korean</SelectItem>
              <SelectItem value="zh" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Chinese</SelectItem>
              <SelectItem value="ar" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Arabic</SelectItem>
              <SelectItem value="hi" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Email Input */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-green-400" />
            <Label htmlFor="email" className="text-slate-200">
              Email Address
            </Label>
          </div>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-800/50 border-slate-700/50 text-slate-100 placeholder:text-slate-500 focus:border-green-500/50 focus:ring-green-500/20"
            required
          />
          <p className="text-xs text-slate-500">
            We'll send your generated story to this email once it's ready
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white font-semibold py-6 rounded-xl shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              Create My Story
            </div>
          )}
        </Button>
      </form>
    </Card>
  );
}