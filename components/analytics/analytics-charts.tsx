"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AnalyticsChartsProps {
  conversionRateData: {
    name: string;
    rate: number;
  }[];
}

export function AnalyticsCharts({ conversionRateData }: AnalyticsChartsProps) {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Lead Conversion Rate</CardTitle>
          <CardDescription>
            Monthly lead conversion rate for the current year
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={conversionRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#8884d8"
                name="Conversion Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
