import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface StepProps {
  step: number;
  currentStep: number;
  completed: boolean;
}

interface StepperProps{
  stepNow: number;
}

const Step = ({ step, currentStep, completed }: StepProps) => {
  return (
    <div className="flex items-center">
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full ${completed ? "bg-success" : "bg-white border-2"
          } ${step <= currentStep ? "border-roxoPrincipal" : "border-cinza"}`}
      >
        {completed ? (
          <CheckIcon className="text-white w-5 h-5" />
        ) : (
          <div
            className={`w-3 h-3 rounded-full ${step <= currentStep ? "bg-roxoPrincipal" : "bg-cinza"
              }`}
          />
        )}
      </div>
      <div
        className={`flex-1 h-1 ${step < currentStep ? "bg-success" : "bg-cinza"
          }`}
      />
    </div>
  );
};

const Stepper = ({stepNow}:StepperProps) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center gap-2">
        <Step step={1} currentStep={stepNow} completed={stepNow > 1} />
        <span className="font-medium">Autoavaliação</span>
      </div>
      <Separator orientation="horizontal" className="bg-cinza w-40 h-[2px]" />
      <div className="flex flex-col items-center gap-2">
        <Step step={2} currentStep={stepNow} completed={stepNow > 2} />
        <span className="font-medium">Avaliação 360</span>
      </div>
    </div>
  );
};

export default Stepper;
