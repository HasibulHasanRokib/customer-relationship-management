"use client";

import { useState } from "react";
import { PlusCircle, Search, CalendarIcon, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Sample data
const initialOpportunities = [
  {
    id: "1",
    name: "Enterprise Software Solution",
    company: "ABC Corporation",
    value: 75000,
    stage: "Proposal",
    probability: 60,
    expectedCloseDate: new Date(2025, 5, 15),
    owner: "John Doe",
  },
  {
    id: "2",
    name: "Cloud Migration Project",
    company: "XYZ Industries",
    value: 120000,
    stage: "Negotiation",
    probability: 80,
    expectedCloseDate: new Date(2025, 4, 30),
    owner: "Sarah Johnson",
  },
  {
    id: "3",
    name: "Security Upgrade",
    company: "Tech Solutions",
    value: 45000,
    stage: "Discovery",
    probability: 40,
    expectedCloseDate: new Date(2025, 6, 10),
    owner: "Michael Chen",
  },
  {
    id: "4",
    name: "Data Analytics Platform",
    company: "Global Enterprises",
    value: 95000,
    stage: "Closed Won",
    probability: 100,
    expectedCloseDate: new Date(2025, 3, 15),
    owner: "John Doe",
  },
  {
    id: "5",
    name: "Mobile App Development",
    company: "Innovative Systems",
    value: 65000,
    stage: "Proposal",
    probability: 50,
    expectedCloseDate: new Date(2025, 5, 5),
    owner: "Emma Williams",
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  value: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Value must be a positive number",
  }),
  stage: z.string(),
  probability: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100,
      {
        message: "Probability must be between 0 and 100",
      },
    ),
  expectedCloseDate: z.date({
    required_error: "Expected close date is required",
  }),
  owner: z.string(),
  notes: z.string().optional(),
});

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      value: "",
      stage: "Discovery",
      probability: "50",
      expectedCloseDate: new Date(),
      owner: "John Doe",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newOpportunity = {
      id: (opportunities.length + 1).toString(),
      ...values,
      value: Number(values.value),
      probability: Number(values.probability),
    };
    setOpportunities([...opportunities, newOpportunity]);
    setOpen(false);
    form.reset();
  }

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      opportunity.name.toLowerCase().includes(searchTermLower) ||
      opportunity.company.toLowerCase().includes(searchTermLower) ||
      opportunity.stage.toLowerCase().includes(searchTermLower) ||
      opportunity.owner.toLowerCase().includes(searchTermLower)
    );
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Discovery":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Proposal":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Negotiation":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Closed Won":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Closed Lost":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600 dark:text-green-400";
    if (probability >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Opportunity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Opportunity</DialogTitle>
              <DialogDescription>
                Create a new sales opportunity for your pipeline.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opportunity Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enterprise Software Solution"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC Corporation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Value ($)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                          <Input
                            className="pl-8"
                            placeholder="50000"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stage</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Discovery">Discovery</SelectItem>
                            <SelectItem value="Proposal">Proposal</SelectItem>
                            <SelectItem value="Negotiation">
                              Negotiation
                            </SelectItem>
                            <SelectItem value="Closed Won">
                              Closed Won
                            </SelectItem>
                            <SelectItem value="Closed Lost">
                              Closed Lost
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="probability"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Probability (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expectedCloseDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Expected Close Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select owner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="John Doe">John Doe</SelectItem>
                            <SelectItem value="Sarah Johnson">
                              Sarah Johnson
                            </SelectItem>
                            <SelectItem value="Michael Chen">
                              Michael Chen
                            </SelectItem>
                            <SelectItem value="Emma Williams">
                              Emma Williams
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional information about this opportunity..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Opportunity</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center gap-2">
        <Search className="text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search opportunities..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Probability</TableHead>
              <TableHead>Expected Close</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOpportunities.length > 0 ? (
              filteredOpportunities.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell className="font-medium">
                    {opportunity.name}
                  </TableCell>
                  <TableCell>{opportunity.company}</TableCell>
                  <TableCell>${opportunity.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStageColor(opportunity.stage)}`}
                    >
                      {opportunity.stage}
                    </span>
                  </TableCell>
                  <TableCell
                    className={`font-medium ${getProbabilityColor(opportunity.probability)}`}
                  >
                    {opportunity.probability}%
                  </TableCell>
                  <TableCell>
                    {format(opportunity.expectedCloseDate, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>{opportunity.owner}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No opportunities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
