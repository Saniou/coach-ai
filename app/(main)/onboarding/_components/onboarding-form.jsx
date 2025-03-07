'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // або "react-hot-toast"
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";

const OnboardingForm = ({ industries }) => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const watchIndustry = watch("industry");

  const onSubmit = async (values) => {
    try {
      // Форматуємо industry та subIndustry
      const formattedIndustry = values.subIndustry
        ? `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`
        : values.industry;

      // Форматуємо skills у масив
      const formattedSkills = values.skills
        ? values.skills.split(",").map((skill) => skill.trim())
        : [];

      // Відправляємо дані на сервер
      await updateUserFn({
        ...values,
        industry: formattedIndustry,
        experience: Number(values.experience), // Перетворюємо на число
        skills: formattedSkills,
      });
    } catch (error) {
      console.error("Onboarding error:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  // Ефект для перенаправлення після успішного оновлення
  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      router.push("/dashboard");
    }
  }, [updateResult, updateLoading, router]);

  return (
    <div className="flex items-center justify-center">
      <Card className='w-full max-w-lg mt-10 mx-2'>
        <CardHeader>
          <CardTitle className='gradient-title text-4xl'>Complete Your Profile</CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Поле для вибору галузі */}
            <div className='space-y-2'>
              <Label htmlFor='industry'>Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue('industry', value);
                  setSelectedIndustry(industries.find((ind) => ind.id === value));
                }}
                value={watchIndustry}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem value={ind.id} key={ind.id}>
                      {ind.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* Поле для вибору спеціалізації (якщо галузь вибрана) */}
            {watchIndustry && (
              <div className='space-y-2'>
                <Label htmlFor='subIndustry'>Specialization</Label>
                <Select
                  onValueChange={(value) => setValue('subIndustry', value)}
                >
                  <SelectTrigger id="subIndustry">
                    <SelectValue placeholder="Select your specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((ind) => (
                      <SelectItem value={ind} key={ind}>
                        {ind}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* Поле для років досвіду */}
            <div className='space-y-2'>
              <Label htmlFor='experience'>Years of experience</Label>
              <Input
                id='experience'
                type='number'
                min='0'
                max='50'
                placeholder='Enter years of experience'
                {...register('experience')}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Поле для навичок */}
            <div className='space-y-2'>
              <Label htmlFor='skills'>Your skills</Label>
              <Input
                id='skills'
                placeholder='e.g., JavaScript, Python, Data Analytics'
                {...register('skills')}
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple skills with commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-500">
                  {errors.skills.message}
                </p>
              )}
            </div>

            {/* Поле для біографії */}
            <div className='space-y-2'>
              <Label htmlFor='bio'>Professional Bio</Label>
              <Textarea
                id='bio'
                className='h-32'
                placeholder='Tell us about your professional background...'
                {...register('bio')}
              />
              {errors.bio && (
                <p className="text-sm text-red-500">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* Кнопка для відправки форми */}
            <Button type='submit' className='w-full' disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Complete Profile'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;