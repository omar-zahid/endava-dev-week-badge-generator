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

type FormValues = {
  name: string;
  company: string;
};

export function CardWithForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
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
                {...register("name")}
              />
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
