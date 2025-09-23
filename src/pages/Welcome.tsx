import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Users, Target, Trophy, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const [showFullRules, setShowFullRules] = useState(false);

  const quickRules = [
    "Players take turns placing single letters on empty cells",
    "Words form horizontally (left→right) and vertically (top→bottom)",
    "Valid words (min 2 letters) score points",
    "Game ends when grid is full - highest score wins!"
  ];

  const detailedRules = [
    {
      title: "Gameplay",
      rules: [
        "Each player takes turns placing ONE letter on any empty cell",
        "Letters can be any A-Z (no special characters or numbers)",
        "You cannot move or change letters once placed"
      ]
    },
    {
      title: "Word Formation",
      rules: [
        "Words form in two directions: horizontally (left to right) and vertically (top to bottom)",
        "Minimum word length is 2 letters",
        "Only real English words count for scoring",
        "Common abbreviations and proper nouns don't score"
      ]
    },
    {
      title: "Scoring",
      rules: [
        "Each valid word scores points equal to its length",
        "Words are validated instantly when formed",
        "The same word can score multiple times if formed separately",
        "Simple plurals (just adding 's') don't score unless meaningful"
      ]
    },
    {
      title: "Winning",
      rules: [
        "Game ends when all grid cells are filled",
        "Player with the highest total score wins",
        "In case of tie, it's a draw!"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">
            Word<span className="text-player-1">Grid</span>
          </h1>
          <p className="text-xl text-muted-foreground font-body">
            Strategic letter placement meets word creation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Start Card */}
          <Card className="bg-gradient-card border-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-heading">
                <Play className="w-6 h-6 text-player-1" />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickRules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-score-highlight mt-0.5 flex-shrink-0" />
                    <p className="text-foreground font-body">{rule}</p>
                  </div>
                ))}
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    2 Players
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="w-4 h-4" />
                    Strategy Game
                  </div>
                </div>

                <Button 
                  onClick={() => navigate('/game')}
                  className="w-full bg-gradient-player-1 hover:opacity-90 text-player-1-foreground font-heading font-semibold py-3"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Game
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Full Rules Card */}
          <Card className="bg-gradient-card border-border shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-heading">
                <Trophy className="w-6 h-6 text-player-2" />
                Complete Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!showFullRules ? (
                  <>
                    <p className="text-muted-foreground font-body">
                      Want to master the game? Learn the detailed rules, scoring system, and winning strategies.
                    </p>
                    <Button 
                      onClick={() => setShowFullRules(true)}
                      variant="outline"
                      className="w-full border-player-2 text-player-2 hover:bg-player-2-light"
                    >
                      View Full Rules
                    </Button>
                  </>
                ) : (
                  <div className="space-y-6 max-h-96 overflow-y-auto">
                    {detailedRules.map((section, index) => (
                      <div key={index}>
                        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                          {section.title}
                        </h3>
                        <ul className="space-y-2">
                          {section.rules.map((rule, ruleIndex) => (
                            <li key={ruleIndex} className="flex items-start gap-2 text-sm font-body">
                              <span className="w-1.5 h-1.5 bg-player-2 rounded-full mt-2 flex-shrink-0" />
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Button 
                      onClick={() => setShowFullRules(false)}
                      variant="ghost"
                      className="w-full text-muted-foreground hover:text-foreground"
                    >
                      Show Less
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground font-body">
            Ready to test your word skills? Challenge a friend and see who can build the best words!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;