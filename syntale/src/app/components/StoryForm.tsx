import React, { useState } from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Wand2, Mail, Thermometer, Layers, Mic, Type, Globe, Music2 } from "lucide-react";

// Webhook settings
const WEBHOOK_URL = "https://hook.us2.make.com/cybmyxytqni64dpm548gb8bka42w7sqc";
const WEBHOOK_API_KEY_HEADER = "x-make-apikey";
const WEBHOOK_API_KEY = "key";

function generateReelId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

interface StoryFormProps {
  onSubmit: (email: string) => void;
}

export function StoryForm({ onSubmit }: StoryFormProps) {
  const [storyInput, setStoryInput] = useState("");
  const [email, setEmail] = useState("");
  const [temperature, setTemperature] = useState([1]);
  const [scenes, setScenes] = useState("3");
  const [voiceType, setVoiceType] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [language, setLanguage] = useState("");
  const [backgroundMusicUrl, setBackgroundMusicUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);

    try {
      const reelId = generateReelId();

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [WEBHOOK_API_KEY_HEADER]: WEBHOOK_API_KEY,
        },
        body: JSON.stringify({
          id: reelId,
          story: storyInput,
          email,
          temperature: temperature[0],
          scenes: Number(scenes),
          voiceType,
          fontFamily,
          language,
          backgroundMusicUrl: backgroundMusicUrl.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed with status ${response.status}`);
      }

      onSubmit(email);
    } catch (error) {
      console.error("Failed to submit story to webhook", error);
    } finally {
      setIsLoading(false);
    }
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
              <SelectItem value="en-US-AvaNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Ava</SelectItem>
              <SelectItem value="en-US-AndrewNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Andrew</SelectItem>
              <SelectItem value="en-US-EmmaNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Emma</SelectItem>
              <SelectItem value="en-US-BrianNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Brian</SelectItem>
              <SelectItem value="en-US-JennyNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Jenny</SelectItem>
              <SelectItem value="en-US-GuyNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Guy</SelectItem>
              <SelectItem value="en-US-AriaNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Aria</SelectItem>
              <SelectItem value="en-US-DavisNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Davis</SelectItem>
              <SelectItem value="en-US-NancyNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Nancy</SelectItem>
              <SelectItem value="en-US-ChristopherNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Christopher</SelectItem>
              <SelectItem value="en-US-AshleyNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Ashley</SelectItem>
              <SelectItem value="en-US-EricNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Eric</SelectItem>
              <SelectItem value="en-US-MichelleNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Michelle</SelectItem>
              <SelectItem value="en-US-TonyNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Tony</SelectItem>
              <SelectItem value="en-US-SaraNeural" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Sara</SelectItem>
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
              <SelectItem value="Arial" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Arial</SelectItem>
              <SelectItem value="Arial Bold" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Arial Bold</SelectItem>
              <SelectItem value="Oswald Bold" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Oswald Bold</SelectItem>
              <SelectItem value="NotoSans Bold" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">NotoSans Bold</SelectItem>
              <SelectItem value="Simplified Chinese" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Simplified Chinese</SelectItem>
              <SelectItem value="Traditional Chinese" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Traditional Chinese</SelectItem>
              <SelectItem value="Japanese" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Japanese</SelectItem>
              <SelectItem value="Korean" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Korean</SelectItem>
              <SelectItem value="Korean Bold" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Korean Bold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Background Music URL */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Music2 className="w-5 h-5 text-rose-400" />
            <Label htmlFor="backgroundMusic" className="text-slate-200">
              Background Music URL
            </Label>
          </div>
          <Input
            id="backgroundMusic"
            type="url"
            placeholder="https://example.com/music.mp3"
            value={backgroundMusicUrl}
            onChange={(e) => setBackgroundMusicUrl(e.target.value)}
            className="bg-slate-800/50 border-slate-700/50 text-slate-100 placeholder:text-slate-500 focus:border-rose-500/50 focus:ring-rose-500/20"
          />
          <p className="text-xs text-slate-500">
            Optional: Add a link to background music for your story
          </p>
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
              <SelectItem value="English" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">English</SelectItem>
              <SelectItem value="Spanish" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Spanish</SelectItem>
              <SelectItem value="French" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">French</SelectItem>
              <SelectItem value="German" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">German</SelectItem>
              <SelectItem value="Italian" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Italian</SelectItem>
              <SelectItem value="Portuguese" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Portuguese</SelectItem>
              <SelectItem value="Dutch" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Dutch</SelectItem>
              <SelectItem value="Russian" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Russian</SelectItem>
              <SelectItem value="Chinese" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Chinese</SelectItem>
              <SelectItem value="Japanese" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Japanese</SelectItem>
              <SelectItem value="Korean" className="text-slate-100 focus:bg-slate-700 focus:text-slate-100">Korean</SelectItem>
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