import { AnalyticsCharts } from "@/components/analytics/analytics-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import {
  eachMonthOfInterval,
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
} from "date-fns";
import { redirect } from "next/navigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description: "View your CRM analytics and insights",
};

export default async function AnalyticsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  //total leads
  const now = new Date();
  const startOfLastMonth = startOfMonth(subMonths(now, 1));
  const endOfLastMonth = endOfMonth(subMonths(now, 1));

  const lastMonthLeads = await db.lead.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
    },
  });

  const startOfThisMonth = startOfMonth(now);
  const currentMonthLeads = await db.lead.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: startOfThisMonth,
        lte: now,
      },
    },
  });

  const percentageChange =
    lastMonthLeads === 0
      ? currentMonthLeads > 0
        ? 100
        : 0
      : ((currentMonthLeads - lastMonthLeads) / lastMonthLeads) * 100;

  //qualified leads
  const lastMonthQualifiedLeads = await db.lead.count({
    where: {
      userId: user.id,
      status: "QUALIFIED",
      createdAt: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
    },
  });

  const currentMonthQualifiedLeads = await db.lead.count({
    where: {
      userId: user.id,
      status: "QUALIFIED",
      createdAt: {
        gte: startOfThisMonth,
        lte: now,
      },
    },
  });

  const percentageChangeOfQualified =
    lastMonthQualifiedLeads === 0
      ? currentMonthQualifiedLeads > 0
        ? 100
        : 0
      : ((currentMonthQualifiedLeads - lastMonthQualifiedLeads) /
          lastMonthQualifiedLeads) *
        100;

  //Lead Conversion Rate
  const lastMonthConvertedLeads = await db.lead.count({
    where: {
      userId: user.id,
      status: "QUALIFIED",
      createdAt: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
    },
  });

  const lastMonthConversionRate =
    lastMonthLeads > 0 ? (lastMonthConvertedLeads / lastMonthLeads) * 100 : 0;

  const currentMonthConvertedLeads = await db.lead.count({
    where: {
      userId: user.id,
      status: "QUALIFIED",
      createdAt: {
        gte: startOfThisMonth,
        lte: now,
      },
    },
  });

  const currentMonthConversionRate =
    currentMonthLeads > 0
      ? (currentMonthConvertedLeads / currentMonthLeads) * 100
      : 0;

  const conversionRatePercentageChange =
    lastMonthConversionRate === 0
      ? currentMonthConversionRate > 0
        ? 100
        : 0
      : ((currentMonthConversionRate - lastMonthConversionRate) /
          lastMonthConversionRate) *
        100;

  //chats

  const months = eachMonthOfInterval({
    start: startOfYear(now),
    end: endOfYear(now),
  });

  const conversionRateData = await Promise.all(
    months.map(async (monthDate) => {
      const start = startOfMonth(monthDate);
      const end = endOfMonth(monthDate);

      const monthlyLeads = await db.lead.count({
        where: {
          userId: user.id,
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      });

      const monthlyQualifiedLeads = await db.lead.count({
        where: {
          userId: user.id,
          status: "QUALIFIED",
          createdAt: {
            gte: start,
            lte: end,
          },
        },
      });

      return {
        name: start.toLocaleString("default", { month: "short" }),
        rate:
          monthlyLeads > 0 ? (monthlyQualifiedLeads / monthlyLeads) * 100 : 0,
      };
    }),
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonthLeads}</div>
            <p className="text-muted-foreground text-xs">
              {percentageChange > 0 ? "+" : ""}
              {percentageChange.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {" "}
              {currentMonthConversionRate.toFixed(1)}%
            </div>
            <p className="text-muted-foreground text-xs">
              {conversionRatePercentageChange > 0 ? "+" : ""}
              {conversionRatePercentageChange.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Qualified Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentMonthQualifiedLeads}
            </div>
            <p className="text-muted-foreground text-xs">
              {percentageChangeOfQualified > 0 ? "+" : ""}
              {percentageChangeOfQualified.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <AnalyticsCharts conversionRateData={conversionRateData} />
    </div>
  );
}
