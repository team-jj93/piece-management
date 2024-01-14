"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import * as z from "zod";

import { Button } from "@/components/atoms/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { cn } from "@/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover";
import DayPicker from "@/components/atoms/day-picker";
import Textarea from "@/components/atoms/textarea";
import { pieces } from "@/resources/pieces";

const pieceEditorSchema = z.object({
  name: z.string({ required_error: "필수 작성" }),
  receivedDate: z.date({ required_error: "필수 작성" }),
  scheduledDepartureDate: z.date({ required_error: "필수 작성" }),
  requester: z.string().optional(),
  imgUrl: z.string().optional(),
  label: z.string().optional(),
  memo: z.string().optional(),
});

interface ImageInputProps {
  onChange: (event: any) => void;
}

const ImageInput = ({ onChange }: ImageInputProps) => {
  return (
    <Input
      type="file"
      onChange={() => {
        onChange({ target: { value: pieces[0].imgUrl } });
      }}
    ></Input>
  );
};

export type PieceEditorValues = z.infer<typeof pieceEditorSchema>;

interface PieceEditorProps {
  onSubmit: (data: PieceEditorValues) => void;
}

const PieceEditor = ({ onSubmit }: PieceEditorProps) => {
  const form = useForm<PieceEditorValues>({
    resolver: zodResolver(pieceEditorSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="그림 이름" {...field} />
              </FormControl>
              {/* <FormDescription>그림</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="receivedDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>입고일</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        // format(field.value, "PPP")
                        field.value.toLocaleDateString()
                      ) : (
                        <span>날짜를 선택해주세요.</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <DayPicker
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scheduledDepartureDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>출고 예정일</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        // format(field.value, "PPP")
                        field.value.toLocaleDateString()
                      ) : (
                        <span>날짜를 선택해주세요.</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <DayPicker
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>요청자</FormLabel>
              <FormControl>
                <Input placeholder="요청자" {...field} />
              </FormControl>
              {/* <FormDescription>그림</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>라벨</FormLabel>
              <FormControl>
                <Input placeholder="라벨" {...field} />
              </FormControl>
              {/* <FormDescription>그림</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imgUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>그림 사진</FormLabel>
              {field.value && <img src={field.value} alt="ss" />}
              <FormControl>
                <ImageInput onChange={field.onChange} />
              </FormControl>
              {/* <FormDescription>그림</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메모</FormLabel>
              <FormControl>
                <Textarea placeholder="메모" {...field} />
              </FormControl>
              {/* <FormDescription>그림</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">등록</Button>
      </form>
    </Form>
  );
};

export default PieceEditor;
