import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function OnboardingIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to first step
    router.replace('/onboarding/step-1');
  }, []);

  return null;
}