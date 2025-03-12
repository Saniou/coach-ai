"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

const ClearDataButton = () => {
  const router = useRouter();
  
  const handleClearData = async () => {
    try {
      // Викликаємо API для очищення даних
      await fetch('/api/clear-dashboard-data', { method: 'POST' });

      // Після очищення редіректимо на сторінку onboarding
      router.push('/onboarding');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  return (
    <Button variant="destructive" onClick={handleClearData}>
      Delete Profile
    </Button>
  );
}

export default ClearDataButton;
