import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  subDays,
  startOfYear,
  endOfYear,
  format,
} from "date-fns";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const now = new Date();
  const startOfLastMonth = startOfMonth(subMonths(now, 1));
  const endOfLastMonth = endOfMonth(subMonths(now, 1));

  const lastMonthContacts = await db.contact.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
    },
  });

  const startOfThisMonth = startOfMonth(now);
  const currentMonthContacts = await db.contact.count({
    where: {
      userId: user.id,
      createdAt: {
        gte: startOfThisMonth,
        lte: now,
      },
    },
  });

  const percentageChange =
    lastMonthContacts === 0
      ? currentMonthContacts > 0
        ? 100
        : 0
      : ((currentMonthContacts - lastMonthContacts) / lastMonthContacts) * 100;

  const thirtyDaysAgo = subDays(new Date(), 30);

  const activeLeads = await db.lead.count({
    where: {
      userId: user.id,
      updatedAt: {
        gte: thirtyDaysAgo,
      },
      status: {
        in: ["CONTACTED", "QUALIFIED"],
      },
    },
  });

  const lastMonthActiveLeads = await db.lead.count({
    where: {
      userId: user.id,
      status: {
        in: ["CONTACTED", "QUALIFIED"],
      },
      createdAt: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
    },
  });
  const leadPercentageChange =
    lastMonthActiveLeads === 0
      ? activeLeads > 0
        ? 100
        : 0
      : ((activeLeads - lastMonthActiveLeads) / lastMonthActiveLeads) * 100;

  const wonDeals = await db.deals.aggregate({
    _sum: {
      value: true,
    },
    where: {
      userId: user.id,
      stage: "WON",
    },
  });
  const totalWonValue = wonDeals._sum.value || 0;

  const lastMonthWon = await db.deals.aggregate({
    _sum: {
      value: true,
    },
    where: {
      userId: user.id,
      stage: "WON",
      createdAt: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
    },
  });

  const lastMonthWonValue = lastMonthWon._sum.value || 0;

  // Calculate percentage change
  const wonChange =
    lastMonthWonValue === 0
      ? totalWonValue > 0
        ? 100
        : 0
      : ((totalWonValue - lastMonthWonValue) / lastMonthWonValue) * 100;

  //Lost
  const lostDeals = await db.deals.aggregate({
    _sum: {
      value: true,
    },
    where: {
      userId: user.id,
      stage: "LOST",
    },
  });
  const totalLostValue = lostDeals._sum.value || 0;

  const lastMonthLost = await db.deals.aggregate({
    _sum: {
      value: true,
    },
    where: {
      userId: user.id,
      stage: "LOST",
      createdAt: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
    },
  });

  const lastMonthLostValue = lastMonthLost._sum.value || 0;

  // Calculate percentage change
  const lostChange =
    lastMonthLostValue === 0
      ? totalLostValue > 0
        ? 100
        : 0
      : ((totalLostValue - lastMonthLostValue) / lastMonthLostValue) * 100;

  //recent contacts

  const recentContacts = await db.contact.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  //tasks
  const upcomingTasks = await db.task.findMany({
    where: {
      userId: user.id,
      dueDate: {
        gte: new Date(),
      },
      status: {
        not: "COMPLETED",
      },
    },
    orderBy: {
      dueDate: "asc",
    },
    take: 5,
  });

  //monthly deals value
  const start = startOfYear(now);
  const end = endOfYear(now);

  const wonDealsByMonth = await db.deals.groupBy({
    by: ["createdAt"],
    where: {
      userId: user.id,
      stage: "WON",
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    _sum: {
      value: true,
    },
  });
  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const monthName = format(new Date(0, index), "MMM");
    const monthValue = wonDealsByMonth
      .filter((deal) => new Date(deal.createdAt).getMonth() === index)
      .reduce((sum, deal) => sum + (deal._sum.value || 0), 0);

    return { name: monthName, value: monthValue };
  });

  //lead source
  const leadsBySource = await db.lead.groupBy({
    by: ["source"],
    where: {
      userId: user.id,
    },
    _count: {
      _all: true,
    },
  });

  const leadSourceData = leadsBySource.map((item) => ({
    name: item.source || "Unknown",
    value: item._count._all,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentMonthContacts}</div>
              <p className="text-muted-foreground text-xs">
                {percentageChange > 0 ? "+" : ""}
                {percentageChange.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeLeads}</div>
              <p className="text-muted-foreground text-xs">
                {leadPercentageChange > 0 ? "+" : ""}
                {leadPercentageChange.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deals Won</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalWonValue}</div>
              <p className="text-muted-foreground text-xs">
                {wonChange > 0 ? "+" : ""}
                {wonChange.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deals Lost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalLostValue}</div>
              <p className="text-muted-foreground text-xs">
                {lostChange > 0 ? "+" : ""}
                {lostChange.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <DashboardCharts
          monthlyData={monthlyData}
          leadSourceData={leadSourceData}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Contacts</CardTitle>
              <CardDescription>
                Latest contacts added to your CRM
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div
                    key={contact.email}
                    className="flex items-center space-x-4"
                  >
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                      <span className="text-primary font-medium">
                        {contact.firstName.charAt(0)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm leading-none font-medium">
                        {contact.firstName}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {contact.email}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {contact.company}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>
                Your scheduled tasks for the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm leading-none font-medium">
                        {task.subject}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {task.dueDate.toDateString()}
                      </p>
                    </div>
                    <div
                      className={`rounded-full px-2 py-1 text-xs ${
                        task.priority === "HIGHEST"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : task.priority === "HIGH"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                    >
                      {task.priority}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
