import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function OnboardingIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace({
      pathname: '/onboarding/step-[id]',
      params: { id: '1' },
    });
  }, [router]);

  return null;
}
