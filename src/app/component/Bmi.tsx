"use client";

import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
interface bmiResult {
  category: string;
  bmi: string;
}

const BMI = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<bmiResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleHeight = (e: ChangeEvent<HTMLInputElement>): void => {
    setHeight(e.target.value);
  };

  const handleWeight = (e: ChangeEvent<HTMLInputElement>): void => {
    setWeight(e.target.value);
  };

  const calculateBmi = (): void => {
    if (!weight || !height) {
      setError("Please enter height and weight!");
      return;
    }

    const heightInmeters: number = parseFloat(height) / 100;
    const weightInKg: number = parseFloat(weight);

    if (heightInmeters <= 0) {
      setError("Please enter height in positive number.");
      return;
    }

    if (weightInKg <= 0) {
      setError("please enter width in positive number .");
      return;
    }

    const bmiValue = weightInKg /( heightInmeters * heightInmeters)
    console.log(bmiValue)
    let category = "";

    if (bmiValue < 18.5) {
      category = "Underweight"; // Set category based on BMI value
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = "Normal";
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    setResult({ bmi: bmiValue.toFixed(1), category: category });
    setError("");
  };

  return (
    <div className="w-[450px] h-[500px] bg-white p-6">
      <h1 className="text-3xl font-bold text-black">BMI Calculator</h1>
      <p className="text-black">
        Enter your height and weight to calculate your Bmi
      </p>
      <div className="flex flex-col gap-8 pt-8">
        <div>
          <Label htmlFor="height" className="text-black">
            Height(cm)
          </Label>
          <Input
            placeholder="Enter height in cm"
            id="height"
            type="string"
            value={height}
            onChange={handleHeight}
          />
        </div>
        <div>
          <Label htmlFor="weight" className="text-black">
            weight(cm)
          </Label>
          <Input
            placeholder="Enter width in cm"
            id="width"
            type="string"
            value={weight}
            onChange={handleWeight}
          />
        </div>
        <Button className="mt-4" onClick={calculateBmi}>
          Calculate
        </Button>
      </div>

      {error && <div className="text-red-600 text-center mt-6"> {error}</div>}

      {result && (
        <div className="text-black mt-9">
          <p className="text-center font-bold text-3xl">{result.bmi}</p>
          <p className="text-center font-bold text-3xl">{result.category}</p>
        </div>
      )}
    </div>
  );
};

export default BMI;
