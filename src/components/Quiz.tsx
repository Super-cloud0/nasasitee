import { useState } from 'react';
import { CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react';
import { Quiz as QuizType } from '../types';

interface Props {
  quiz: QuizType;
  onComplete: (correct: boolean) => void;
}

export default function Quiz({ quiz, onComplete }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      const isCorrect = selectedAnswer === quiz.correct_answer;
      setTimeout(() => {
        onComplete(isCorrect);
      }, 2000);
    }
  };

  const isCorrect = selectedAnswer === quiz.correct_answer;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 text-white">
      <h3 className="text-xl font-semibold mb-4">Quiz Time!</h3>
      <p className="text-lg mb-6">{quiz.question}</p>

      <div className="space-y-3 mb-6">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && setSelectedAnswer(index)}
            disabled={showResult}
            className={`w-full p-4 text-left rounded-lg border transition-colors ${
              showResult
                ? index === quiz.correct_answer
                  ? 'bg-green-900 border-green-500'
                  : index === selectedAnswer
                  ? 'bg-red-900 border-red-500'
                  : 'bg-gray-800 border-gray-700'
                : selectedAnswer === index
                ? 'bg-blue-900 border-blue-500'
                : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showResult && index === quiz.correct_answer && (
                <CheckCircle className="text-green-400" size={20} />
              )}
              {showResult && index === selectedAnswer && index !== quiz.correct_answer && (
                <XCircle className="text-red-400" size={20} />
              )}
            </div>
          </button>
        ))}
      </div>

      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded-lg transition-colors font-semibold"
        >
          Submit Answer
        </button>
      )}

      {showResult && (
        <div className={`text-center py-4 rounded-lg ${isCorrect ? 'bg-green-900' : 'bg-red-900'}`}>
          <p className="text-xl font-bold">
            {isCorrect ? 'Correct!' : 'Incorrect!'}
          </p>
          <p className="text-sm mt-2">
            {isCorrect
              ? 'Great job! You really know your astronomy.'
              : `The correct answer was: ${quiz.options[quiz.correct_answer]}`}
          </p>
        </div>
      )}
    </div>
  );
}
