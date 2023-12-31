"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStoreModal } from "@/hooks/store-hooks";
import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be contain atleast two character" }),
});

export default function StoreForm() {
  const useStore = useStoreModal();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", { name: values.name });
      window.location.assign(`/${response.data.id}`);
    } catch (error: any) {
      console.log("something went wrong ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-5 gap-4">
          <Button
            disabled={loading}
            onClick={useStore.onClose}
            variant={"outline"}
          >
            cancel
          </Button>
          <Button disabled={loading} type={"submit"} variant={"default"}>
            create
          </Button>
        </div>
      </form>
    </Form>
  );
}
