import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type OnboardingAnswers = Record<number, string[]>;

type OnboardingContextValue = {
  answers: OnboardingAnswers;
  setAnswer: (stepId: number, values: string[]) => void;
  resetAnswers: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<OnboardingAnswers>({});

  const value = useMemo<OnboardingContextValue>(
    () => ({
      answers,
      setAnswer: (stepId, values) => {
        setAnswers((current) => ({
          ...current,
          [stepId]: values,
        }));
      },
      resetAnswers: () => setAnswers({}),
    }),
    [answers]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingAnswers() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboardingAnswers must be used inside OnboardingProvider');
  }

  return context;
}
