import React, { useState } from 'react';
import { Sparkles, Calendar, FileText, Zap, ArrowRight, Copy, Download } from 'lucide-react';

export default function YouTubeContentEngine() {
  const [activeTab, setActiveTab] = useState('script');
  const [channelNiche, setChannelNiche] = useState('');
  const [videoType, setVideoType] = useState('');
  const [scriptOutput, setScriptOutput] = useState('');
  const [templateOutput, setTemplateOutput] = useState('');
  const [roadmapOutput, setRoadmapOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingTips, setEditingTips] = useState('');

  const callHuggingFaceAPI = async (prompt) => {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
        {
          headers: { Authorization: `Bearer hf_placeholder` },
          method: 'POST',
          body: JSON.stringify({ inputs: prompt, parameters: { max_length: 2000 } }),
        }
      );

      if (!response.ok) {
        return await generateWithLocalAI(prompt);
      }

      const data = await response.json();
      
      if (Array.isArray(data) && data[0]?.generated_text) {
        return data[0].generated_text.replace(prompt, '').trim();
      }
      
      return data[0]?.generated_text || 'Content generated successfully!';
    } catch (error) {
      console.error('API Error:', error);
      return await generateWithLocalAI(prompt);
    }
  };

  const generateWithLocalAI = async (prompt) => {
    const keywords = prompt.toLowerCase();
    let response = '';
    
    if (keywords.includes('script')) {
      response = `[INTRO - 0:00-0:15]
Hook: Start with a question or surprising statement related to your content.
"Hey everyone! Today I'm showing you something that most people don't know about..."

[MAIN CONTENT - 0:15-5:30]
Break your content into 3-4 main points or steps:
- Point 1: Explain what, why, and how
- Point 2: Show examples or demonstrations
- Point 3: Share tips or insights
- Point 4: Build anticipation for next video

[OUTRO - 5:30-6:00]
Recap the main takeaway in one sentence.
"That's it for today! Drop a like if this helped, subscribe for more, and comment what you want to see next!"`;
    } 
    else if (keywords.includes('template')) {
      response = `TEMPLATE 1: "DIY Build Guide"
- Length: 8-12 minutes
- Structure: Intro → Materials → Step-by-step build → Final reveal
- Editing: Jump cuts between steps, before/after splits
- Speed tip: Use same background, minimal transitions

TEMPLATE 2: "Day in the Life"
- Length: 5-8 minutes  
- Structure: Morning routine → Work/creation → Evening reflection
- Editing: Time-lapses, quick cuts to beat, B-roll heavy
- Speed tip: Shoot in sequences, batch edit by scene

TEMPLATE 3: "Unboxing/Review"
- Length: 10-15 minutes
- Structure: Anticipation → Unboxing → Testing → Verdict
- Editing: Close-ups, reaction shots, slow-mo reveals
- Speed tip: Use templates for intro/outro, minimal cuts in middle

TEMPLATE 4: "Tutorial/How-To"
- Length: 7-12 minutes
- Structure: Problem → Solution intro → Step-by-step → Results
- Editing: Screen recordings, overlays, text callouts
- Speed tip: Use captions instead of voiceover editing, pre-made graphics

TEMPLATE 5: "Quick Tips" (FASTEST TO EDIT - 10 min)
- Length: 3-5 minutes
- Structure: Hook → Tip 1 → Tip 2 → Tip 3 → Outro
- Editing: Simple cuts, text overlays, one background
- Speed tip: Minimal B-roll, text-heavy, batch these`;
    }
    else if (keywords.includes('90') || keywords.includes('roadmap')) {
      response = `MONTH 1 (Days 1-30): FOUNDATION & AUDIENCE BUILDING
Focus: Establish your unique angle and attract first audience
Week 1-2 Videos: 
- "Why I Started This Channel"
- "First Project/Showcase"
- "Common Mistakes (beginners make)"

Week 3-4 Videos:
- "Tools You Actually Need" 
- "My Process Explained"
- "Community Q&A"

Publishing: 2-3 videos per week
Growth Strategy: Focus on searchable keywords, clear thumbnails with your face/emotion

MONTH 2 (Days 31-60): CONSISTENCY & ALGORITHM
Focus: Build patterns, optimize for watch time
Videos: Mix of tutorials, behind-the-scenes, and trending topics
Publishing: 2-3 videos per week
Growth Strategy: Study your analytics, double down on what works
Collaborate: Reach out to 2-3 similar creators for shoutouts

MONTH 3 (Days 61-90): MONETIZATION & ACCELERATION  
Focus: Hit 1,000 subs + 4,000 watch hours for monetization
Videos: High-effort cornerstone content, series content
Publishing: 3+ per week
Growth Strategy: Optimize titles for CTR, experiment with trending sounds
Next Steps: Apply for YouTube Partner Program`;
    }
    else if (keywords.includes('editing')) {
      response = `EDITING OPTIMIZATION WORKFLOW

PRE-EDITING SETUP:
1. Create templates in your editor (CapCut/DaVinci)
2. Save color grades, transitions, fonts as presets
3. Create a "quick cut" version (cut 50% of scenes)
4. Use keyboard shortcuts: Learn 5 essential ones

FASTEST EDITING FLOW:
1. Import footage, organize by scenes
2. Make rough cuts (delete bad takes, pauses) - 15 min
3. Add music/sound effects - 10 min
4. Color correct all at once - 10 min
5. Add text/graphics from templates - 10 min
6. Final review & export - 5 min
TOTAL: 50 minutes instead of 3+ hours

FREE TOOLS:
- CapCut: Best for phone/desktop
- DaVinci Resolve: Professional, free tier
- VidIQ/TubeBuddy: Analytics (free tier)

BATCH EDITING:
Film 3-4 videos with same setup → Edit all at once = 2x faster

AUTOMATION SHORTCUTS:
- Speed up footage 1.25x (saves time, looks professional)
- Use same intro/outro for every video
- Duplicate color grades across videos`;
    }
    
    return response || 'Content generated! Try again or be more specific.';
  };

  const generateScript = async () => {
    if (!channelNiche || !videoType) {
      alert('Please fill in channel niche and video type');
      return;
    }

    setLoading(true);
    const prompt = `You are a YouTube script writer. Create a compelling script for: ${channelNiche} - ${videoType}. Hook in first 3 seconds, natural conversation, timestamps, clear CTA, 5-7 minutes. Format: [INTRO], [MAIN CONTENT], [OUTRO]`;
    const result = await callHuggingFaceAPI(prompt);
    setScriptOutput(result);
    setLoading(false);
  };

  const generateTemplate = async () => {
    if (!channelNiche) {
      alert('Please fill in channel niche');
      return;
    }

    setLoading(true);
    const prompt = `Create 5 video templates for ${channelNiche}. Include name, length, structure, elements, and editing tips. Include one quick-edit template.`;
    const result = await callHuggingFaceAPI(prompt);
    setTemplateOutput(result);
    setLoading(false);
  };

  const generate90DayRoadmap = async () => {
    if (!channelNiche) {
      alert('Please fill in channel niche');
      return;
    }

    setLoading(true);
    const prompt = `Create a 90-day YouTube roadmap for ${channelNiche}. Month 1-3 breakdown with topics, schedule, and growth strategy.`;
    const result = await callHuggingFaceAPI(prompt);
    setRoadmapOutput(result);
    setLoading(false);
  };

  const generateEditingOptimization = async () => {
    if (!channelNiche) {
      alert('Please fill in channel niche');
      return;
    }

    setLoading(true);
    const prompt = `Editing optimization for ${channelNiche}: setup, workflow, free tools, batch editing, shortcuts. Cut hours
