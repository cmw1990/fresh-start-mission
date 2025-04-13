
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Heart, Brain, Battery, Coffee, Droplets, Moon } from 'lucide-react';

const HolisticHealth = () => {
  const categories = [
    {
      title: "Energy Management",
      icon: <Battery className="h-8 w-8 text-green-500" />,
      description: "Strategies for maintaining physical energy during nicotine reduction",
      sections: [
        {
          title: "Understanding Energy Slumps",
          content: `
            <p>When reducing nicotine intake, many people experience temporary but significant energy drops. This happens because:</p>
            <ul>
              <li>Nicotine is a stimulant that artificially boosts your energy and alertness</li>
              <li>Your body has adapted to functioning with regular nicotine stimulation</li>
              <li>Without nicotine, your natural energy regulation systems need time to readjust</li>
              <li>Withdrawal symptoms can temporarily disrupt sleep patterns, further affecting energy levels</li>
            </ul>
            <p>Remember that these energy fluctuations are temporary and typically improve significantly after 2-3 weeks.</p>
          `
        },
        {
          title: "Quick Energy Boosting Techniques",
          content: `
            <p>When you're experiencing an energy slump, try these scientifically-backed approaches:</p>
            <ul>
              <li><strong>Micro-Movement:</strong> Even 5 minutes of physical activity like brisk walking, stretching, or jumping jacks can boost circulation and energy</li>
              <li><strong>Cold Exposure:</strong> Splash cold water on your face or take a quick cold shower to trigger alertness</li>
              <li><strong>Deep Breathing:</strong> 10 deep belly breaths with extended exhalations can increase oxygen flow and energy</li>
              <li><strong>Strategic Hydration:</strong> Dehydration worsens fatigue; drink a glass of water with a pinch of salt for better absorption</li>
              <li><strong>Nature Exposure:</strong> Even brief exposure to natural light and outdoor environments improves alertness</li>
            </ul>
          `
        },
        {
          title: "Nutrition for Stable Energy",
          content: `
            <p>What you eat significantly impacts your energy levels during nicotine reduction:</p>
            <ul>
              <li>Focus on balanced meals with protein, healthy fats, and complex carbohydrates</li>
              <li>Avoid high-sugar foods that cause energy crashes</li>
              <li>Consider smaller, more frequent meals to maintain steady blood sugar</li>
              <li>Some find that temporarily increasing protein intake helps manage energy fluctuations</li>
              <li>Stay adequately hydrated - even mild dehydration can significantly impact energy levels</li>
            </ul>
            <p>Many people find that their taste buds become more sensitive after reducing nicotine, making healthy foods more enjoyable over time.</p>
          `
        }
      ]
    },
    {
      title: "Focus Enhancement",
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      description: "Techniques to maintain mental clarity and concentration",
      sections: [
        {
          title: "Why Focus Suffers During Withdrawal",
          content: `
            <p>Temporary cognitive fog and attention difficulties are common when reducing nicotine use because:</p>
            <ul>
              <li>Nicotine directly affects neurotransmitters involved in attention and cognitive function</li>
              <li>Your brain has adapted to functioning with these chemical alterations</li>
              <li>While readjusting to functioning without nicotine, concentration may temporarily decline</li>
              <li>Stress and anxiety about quitting can further impact cognitive resources</li>
            </ul>
            <p>Most people notice significant improvements in concentration within 2-4 weeks, with many reporting better focus than before quitting once fully adjusted.</p>
          `
        },
        {
          title: "Practical Focus Techniques",
          content: `
            <p>These evidence-based strategies can help manage focus difficulties:</p>
            <ul>
              <li><strong>Pomodoro Technique:</strong> Work in focused 25-minute intervals with short breaks</li>
              <li><strong>Environment Optimization:</strong> Minimize distractions in your physical space</li>
              <li><strong>Task Segmentation:</strong> Break complex tasks into smaller, more manageable steps</li>
              <li><strong>Mindfulness Practice:</strong> Even brief mindfulness sessions improve attention control</li>
              <li><strong>Single-Tasking:</strong> Focus exclusively on one task rather than multitasking</li>
              <li><strong>Implementation Intentions:</strong> Create specific "if-then" plans for focus challenges</li>
            </ul>
          `
        },
        {
          title: "Supplements & Natural Aids",
          content: `
            <p>Some natural compounds may support cognitive function during nicotine reduction:</p>
            <ul>
              <li><strong>L-theanine:</strong> Found in green tea, promotes calm alertness without sedation</li>
              <li><strong>Rhodiola rosea:</strong> An adaptogenic herb that may improve mental stamina</li>
              <li><strong>B vitamins:</strong> Particularly B6, B12, and folate support brain function</li>
              <li><strong>Omega-3 fatty acids:</strong> Support overall cognitive health and function</li>
            </ul>
            <p>Always consult with a healthcare provider before starting any supplement regimen.</p>
          `
        }
      ]
    },
    {
      title: "Mood Regulation",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      description: "Strategies for emotional balance during nicotine withdrawal",
      sections: [
        {
          title: "Understanding Mood Changes",
          content: `
            <p>Temporary mood fluctuations during nicotine reduction are normal and result from:</p>
            <ul>
              <li>Changes in dopamine and other neurotransmitter systems previously regulated by nicotine</li>
              <li>Stress hormones that can be elevated during withdrawal</li>
              <li>Sleep disruptions that affect emotional regulation</li>
              <li>The psychological challenge of changing an established habit</li>
            </ul>
            <p>Most people experience significant improvement in mood stability within 2-4 weeks, with many reporting better overall mood than before quitting.</p>
          `
        },
        {
          title: "Immediate Mood Management",
          content: `
            <p>When experiencing difficult emotions, these techniques can help provide relief:</p>
            <ul>
              <li><strong>Emotional Labeling:</strong> Simply naming your emotions reduces their intensity</li>
              <li><strong>5-4-3-2-1 Grounding:</strong> Identify 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste</li>
              <li><strong>Physical Movement:</strong> Even brief exercise releases endorphins that improve mood</li>
              <li><strong>Social Connection:</strong> Briefly connecting with a supportive person can regulate emotions</li>
              <li><strong>Progressive Muscle Relaxation:</strong> Systematically tensing and releasing muscle groups</li>
            </ul>
          `
        },
        {
          title: "Building Emotional Resilience",
          content: `
            <p>Developing these practices can help build longer-term emotional stability:</p>
            <ul>
              <li><strong>Gratitude Practice:</strong> Daily noting of 3 things you appreciate</li>
              <li><strong>Regular Physical Activity:</strong> Even moderate exercise significantly improves mood</li>
              <li><strong>Sleep Hygiene:</strong> Prioritizing sleep quality directly impacts emotional regulation</li>
              <li><strong>Cognitive Reframing:</strong> Practicing looking at situations from different perspectives</li>
              <li><strong>Mindfulness Practice:</strong> Building awareness without judgment improves emotional processing</li>
              <li><strong>Social Support:</strong> Regular connection with understanding people</li>
            </ul>
          `
        }
      ]
    },
    {
      title: "Sleep Optimization",
      icon: <Moon className="h-8 w-8 text-indigo-500" />,
      description: "Techniques for better sleep quality during nicotine reduction",
      sections: [
        {
          title: "Why Sleep Changes During Withdrawal",
          content: `
            <p>Many people experience temporary sleep disruptions when reducing nicotine because:</p>
            <ul>
              <li>Nicotine affects sleep architecture and circadian rhythms</li>
              <li>Your body needs to reestablish natural sleep regulation</li>
              <li>Withdrawal symptoms like anxiety can interfere with falling and staying asleep</li>
              <li>Dreams may temporarily become more vivid as REM sleep rebounds</li>
            </ul>
            <p>Most sleep disruptions peak within the first week and significantly improve by week 2-3.</p>
          `
        },
        {
          title: "Sleep Environment Optimization",
          content: `
            <p>Creating ideal conditions for quality sleep:</p>
            <ul>
              <li><strong>Temperature:</strong> Keep your bedroom cool (65-68°F/18-20°C is optimal for most people)</li>
              <li><strong>Light:</strong> Ensure your sleep environment is as dark as possible</li>
              <li><strong>Sound:</strong> Minimize noise disruptions with earplugs or white noise if needed</li>
              <li><strong>Comfort:</strong> Invest in a supportive mattress and pillows that work for your body</li>
              <li><strong>Electronics:</strong> Remove devices from the bedroom or use night mode features</li>
            </ul>
          `
        },
        {
          title: "Evening Routine for Better Sleep",
          content: `
            <p>Developing a consistent pre-sleep routine signals your body it's time to wind down:</p>
            <ul>
              <li>Maintain consistent sleep and wake times, even on weekends</li>
              <li>Avoid caffeine after noon and limit alcohol, which disrupts sleep quality</li>
              <li>Dim lights 1-2 hours before bedtime to support melatonin production</li>
              <li>Consider relaxation techniques like gentle stretching, reading, or a warm bath</li>
              <li>Try 10 minutes of deep breathing or progressive muscle relaxation before sleep</li>
              <li>If you can't fall asleep within 20 minutes, get up and do something relaxing until you feel sleepy</li>
            </ul>
          `
        }
      ]
    },
    {
      title: "Hydration & Nutrition",
      icon: <Droplets className="h-8 w-8 text-cyan-500" />,
      description: "How proper nutrition supports nicotine reduction",
      sections: [
        {
          title: "Nutrition Basics During Nicotine Reduction",
          content: `
            <p>Strategic nutrition can help manage withdrawal symptoms and cravings:</p>
            <ul>
              <li>Nicotine affects how your body processes certain nutrients and regulates blood sugar</li>
              <li>Metabolism often temporarily slows when reducing nicotine intake</li>
              <li>Taste and smell perception often change, affecting food preferences</li>
              <li>Some people experience increased appetite during withdrawal</li>
            </ul>
            <p>A thoughtful approach to nutrition can ease the transition and minimize weight concerns.</p>
          `
        },
        {
          title: "Hydration Strategy",
          content: `
            <p>Proper hydration is particularly important during nicotine reduction:</p>
            <ul>
              <li>Aim for 2-3 liters (68-100 oz) of water daily during nicotine withdrawal</li>
              <li>Mild dehydration worsens fatigue, headaches, and cravings</li>
              <li>Consider adding electrolytes to water, especially if experiencing headaches</li>
              <li>Herbal teas can provide both hydration and beneficial compounds</li>
              <li>Drinking water can help manage oral fixation and temporary hunger sensations</li>
            </ul>
          `
        },
        {
          title: "Foods That Support Withdrawal",
          content: `
            <p>Certain foods may help ease specific withdrawal symptoms:</p>
            <ul>
              <li><strong>For energy stability:</strong> Complex carbohydrates paired with protein (e.g., whole grain toast with eggs)</li>
              <li><strong>For oral fixation:</strong> Crunchy vegetables, sugar-free gum, or frozen grapes</li>
              <li><strong>For stress reduction:</strong> Foods rich in magnesium like dark leafy greens and nuts</li>
              <li><strong>For dopamine support:</strong> Tyrosine-rich foods like eggs, cheese, and legumes</li>
              <li><strong>For brain function:</strong> Omega-3 rich foods like salmon, walnuts, and flaxseeds</li>
            </ul>
            <p>Small, balanced meals every 3-4 hours help maintain steady blood sugar and energy levels.</p>
          `
        }
      ]
    },
    {
      title: "Caffeine Management",
      icon: <Coffee className="h-8 w-8 text-yellow-700" />,
      description: "Adjusting caffeine intake during nicotine reduction",
      sections: [
        {
          title: "The Nicotine-Caffeine Connection",
          content: `
            <p>Understanding the important relationship between these two substances:</p>
            <ul>
              <li>Nicotine accelerates caffeine metabolism by up to 50%</li>
              <li>When you reduce nicotine, caffeine stays in your system much longer</li>
              <li>This means your usual caffeine amount can suddenly feel like 1.5-2x stronger</li>
              <li>This can cause anxiety, jitters, sleep problems, and increased heart rate</li>
            </ul>
            <p>Many withdrawal symptoms attributed to nicotine are actually caffeine overload.</p>
          `
        },
        {
          title: "Caffeine Adjustment Strategy",
          content: `
            <p>How to manage caffeine during your nicotine reduction:</p>
            <ul>
              <li>Consider reducing caffeine intake by approximately 50% when reducing nicotine</li>
              <li>Do this gradually to avoid caffeine withdrawal headaches</li>
              <li>Be especially mindful of afternoon caffeine consumption</li>
              <li>Consider switching to half-caf or decaf versions of your usual beverages</li>
              <li>Watch for hidden caffeine in teas, sodas, energy drinks, and chocolate</li>
            </ul>
            <p>After 1-2 weeks, your body will begin adjusting to the new caffeine metabolism rate.</p>
          `
        },
        {
          title: "Caffeine Alternatives",
          content: `
            <p>If you're looking to reduce caffeine while maintaining energy:</p>
            <ul>
              <li><strong>Green tea:</strong> Contains L-theanine which provides balanced energy without jitters</li>
              <li><strong>Golden milk:</strong> Turmeric-based beverage with anti-inflammatory properties</li>
              <li><strong>Chicory root coffee:</strong> Coffee-like flavor without caffeine</li>
              <li><strong>Rooibos tea:</strong> Naturally caffeine-free with a rich flavor profile</li>
              <li><strong>Dandelion root tea:</strong> Earthy, coffee-like taste with liver-supporting properties</li>
            </ul>
          `
        }
      ]
    }
  ];

  return (
    <div className="container py-12 px-4 mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Holistic Health Guide</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Practical strategies for managing energy, focus, mood, and overall wellbeing during your nicotine reduction journey.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-4">The Holistic Approach to Nicotine Reduction</h2>
        <p className="mb-4">
          Reducing nicotine isn't just about willpower—it's about understanding and supporting your body and mind through a significant transition.
        </p>
        <p className="mb-4">
          Nicotine affects multiple systems in your body, from neurotransmitters that regulate mood and focus to hormones that influence energy and metabolism. When you reduce or eliminate nicotine, these systems need time to recalibrate.
        </p>
        <p>
          This guide provides evidence-based strategies to support your body during this adjustment period, making your journey more comfortable and increasing your chances of success.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="mb-2">{category.icon}</div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {category.sections.map((section, idx) => (
                  <li key={idx}>{section.title}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Content Sections */}
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-gray-100">{category.icon}</div>
            <h2 className="text-2xl font-bold">{category.title}</h2>
          </div>

          {category.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-10">
              <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: section.content }}></div>
            </div>
          ))}
        </div>
      ))}

      <div className="bg-gradient-to-r from-fresh-50 to-green-50 rounded-xl p-8 mb-10">
        <h3 className="text-xl font-semibold mb-4">Remember: Progress, Not Perfection</h3>
        <p className="mb-4">
          Every person's journey to reducing nicotine is unique. Some days will be easier than others, and that's completely normal.
        </p>
        <p>
          Focus on implementing these strategies gradually. Even small improvements in your energy, focus, mood, and sleep can create positive momentum that makes your journey more sustainable and successful.
        </p>
      </div>

      <div className="flex justify-between">
        <Link to="/tools">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
        <Link to="/tools/calculators">
          <Button variant="default" className="bg-fresh-500 hover:bg-fresh-600">
            Explore Calculators
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HolisticHealth;
