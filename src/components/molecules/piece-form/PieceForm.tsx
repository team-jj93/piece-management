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
import ImageField from "./components/ImageField";

const pieceFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "작성해주세요." })
    .min(2, { message: "이름은 2글자 이상으로 작성해주세요." }),
  receivedDate: z.date({ required_error: "작성해주세요." }),
  scheduledDepartureDate: z.date({ required_error: "작성해주세요." }),
  requester: z.string().optional(),
  imgUrl: z.string().optional(),
  label: z.string().optional(),
  memo: z.string().optional(),
});

export type PieceFormValues = z.infer<typeof pieceFormSchema>;

interface PieceFormProps {
  defaultValues?: Partial<PieceFormValues>;
  className?: string;
  getImageUrl: (file: File) => Promise<string>;
  onSubmit: (data: PieceFormValues) => void;
}

// TO-DO
// date 선택후 창이 꺼지지 않는 문제 해결해야함
// Popover 컴포넌트를 직접 짜야 함.
const PieceForm = ({
  defaultValues,
  className,
  getImageUrl,
  onSubmit,
}: PieceFormProps) => {
  const form = useForm<PieceFormValues>({
    defaultValues: {
      name: "",
      ...defaultValues,
    },
    resolver: zodResolver(pieceFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input placeholder="그림 이름" autoComplete="off" {...field} />
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
                    initialFocus
                    selected={field.value}
                    onSelect={(receivedDate) => {
                      const scheduledDepartureDate =
                        form.getValues().scheduledDepartureDate;

                      if (
                        scheduledDepartureDate &&
                        receivedDate &&
                        scheduledDepartureDate <= receivedDate
                      ) {
                        form.setValue(
                          "scheduledDepartureDate",
                          new Date(
                            receivedDate.getFullYear(),
                            receivedDate.getMonth(),
                            receivedDate.getDate() + 1
                          )
                        );
                      }

                      field.onChange(receivedDate);
                    }}
                    disabled={{
                      after: new Date(),
                    }}
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
                    disabled={{
                      before: (() => {
                        const receivedDate = form.getValues().receivedDate;
                        return (
                          receivedDate &&
                          new Date(
                            receivedDate.getFullYear(),
                            receivedDate.getMonth(),
                            receivedDate.getDate() + 1
                          )
                        );
                      })(),
                    }}
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
              {/* {field.value && <Image src={field.value} alt="ss" />}
              <FormControl>
                <ImageInput onChange={field.onChange} />
              </FormControl> */}
              {/* <FormDescription>그림</FormDescription> */}
              <FormControl>
                <ImageField
                  value={field.value}
                  onChange={field.onChange}
                  getImageUrl={getImageUrl}
                />
              </FormControl>
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

export default PieceForm;
