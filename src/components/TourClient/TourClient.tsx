'use client';

import { useState } from 'react';
import TourModuleSelector from '@/components/TourModuleSelector/TourModuleSelector';
import TourContent from '@/components/TourContent/TourContent';

const totalSteps = 9;

export default function TourClient() {
  const [selectedModule, setSelectedModule] = useState('patient-management');
  const [currentStep, setCurrentStep] = useState(1);

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  };

  return (
    <>
      <TourModuleSelector
        selectedModule={selectedModule}
        onModuleChange={setSelectedModule}
      />
      <TourContent
        selectedModule={selectedModule}
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}