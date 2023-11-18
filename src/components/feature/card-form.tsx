"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "../ui/form";
import { toast } from "../ui/use-toast";

type FormValues = {
  name: string;
  company: string;
};

export function CardWithForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      company: "Endava Malaysia",
    },
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch("/api", {
        method: "post",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.name}.pdf`;
      a.click();
      toast({
        title: "Badge generated successfully",
        description: "Your badge has been generated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to generate badge: ${error.message}`,
      });
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Download badge</CardTitle>
        <CardDescription>
          Generate your badge for Endava DevWeek 2023
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="my-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name on the badge"
                className={errors.name ? "border-red-600" : ""}
                {...register("name", { required: "Name is required." })}
              />
              {errors.name && (
                <span className="text-sm text-red-600">
                  {errors?.name?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Company</Label>
              <FormField
                control={control}
                name="company"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Endava Malaysia">
                        Endava Malaysia
                      </SelectItem>
                      <SelectItem value="Endava Romania">
                        Endava Romania
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" form="my-form" className="w-full">
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
