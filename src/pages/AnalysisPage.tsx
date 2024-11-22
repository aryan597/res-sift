import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Meteors } from '@/components/ui/meteors'
import { BarChart3 } from 'lucide-react'
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar"

interface AnalysisResult {
  overallScore: number;
  atsScore: number;
  experienceFit: number;
  roleFit: number;
  skillsFit: number;
  qualificationFit: number;
  cultureFit: number;
  missingKeywords: string[];
  analysis: string;
}

const AnalysisPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loadingText, setLoadingText] = useState("Analyzing your resume...");
  const navigate = useNavigate();

  const analyzePhrases = [
    "Analyzing resume structure...",
    "Matching skills with job description...",
    "Calculating ATS compatibility...",
    "Evaluating experience fit...",
    "Generating comprehensive analysis..."
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setLoadingText(analyzePhrases[currentIndex]);
      currentIndex = (currentIndex + 1) % analyzePhrases.length;
    }, 2000);

    // Simulate API call
    const analyzeResume = async () => {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobDescription: localStorage.getItem('jobDescription'),
            resumePdf: localStorage.getItem('resumePdf'),
          }),
        });

        const data = await response.json();
        setResult(data);
        setIsAnalyzing(false);
      } catch (error) {
        console.error('Analysis failed:', error);
        // Handle error appropriately
      }
    };

    analyzeResume();
    return () => clearInterval(interval);
  }, []);

  const ScoreCard = ({ label, score }: { label: string; score: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/30 p-6 rounded-xl border border-neon-green/30"
    >
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <AnimatedCircularProgressBar
        max={100}
        min={0}
        value={score}
        gaugePrimaryColor="rgb(79 70 229)"
        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
      />
      <span className="text-sm mt-1 block">{score}% Match</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Meteors number={20} />
      
      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-8"
          >
            <BarChart3 className="w-16 h-16 text-neon-green" />
          </motion.div>
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl font-bold text-center"
          >
            {loadingText}
          </motion.h2>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Resume Analysis Complete</h1>
            <p className="text-xl text-gray-400">Here's how your profile matches the job requirements</p>
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <ScoreCard label="Overall Match" score={result?.overallScore || 0} />
            <ScoreCard label="ATS Score" score={result?.atsScore || 0} />
            <ScoreCard label="Experience Fit" score={result?.experienceFit || 0} />
            <ScoreCard label="Role Fit" score={result?.roleFit || 0} />
            <ScoreCard label="Skills Fit" score={result?.skillsFit || 0} />
            <ScoreCard label="Culture Fit" score={result?.cultureFit || 0} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/30 p-6 rounded-xl border border-neon-green/30"
          >
            <h3 className="text-xl font-bold mb-4">Missing Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {result?.missingKeywords.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-black/30 p-6 rounded-xl border border-neon-green/30"
          >
            <h3 className="text-xl font-bold mb-4">Detailed Analysis</h3>
            <p className="text-gray-300 leading-relaxed">{result?.analysis}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-neon-green/10 p-8 rounded-xl text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Want More Insights?</h3>
            <p className="mb-6">Sign up to unlock advanced features and detailed recommendations</p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate('/signup')}
                className="bg-neon-green text-black hover:bg-neon-green/80"
              >
                Sign Up Now
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="border-neon-green text-neon-green hover:bg-neon-green/20"
              >
                Login
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <footer className="mt-20 text-center text-gray-400">
        <p>© 2024 RE-SIFT. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AnalysisPage; 