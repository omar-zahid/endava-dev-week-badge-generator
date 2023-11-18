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
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    toast({
      title: "Generating badge with the following information:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
