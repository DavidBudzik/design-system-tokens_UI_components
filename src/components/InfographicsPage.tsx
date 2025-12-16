import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Treemap,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BarChart2, PieChart as PieChartIcon, LayoutDashboard, BarChartHorizontal, LineChart as LineChartIcon, AreaChart as AreaChartIcon } from "lucide-react";

// Sample data generators
const generateColumnData = () => [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
];

const generateDonutData = () => [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const generateTreemapData = () => [
  { name: "A", size: 400 },
  { name: "B", size: 300 },
  { name: "C", size: 200 },
  { name: "D", size: 100 },
  { name: "E", size: 90 },
  { name: "F", size: 80 },
];

const generateBarData = () => [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 200 },
  { name: "Product D", value: 278 },
  { name: "Product E", value: 189 },
];

const generateLineData = () => [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
];

const generateAreaData = () => [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
];

const COLORS = ["var(--primary)", "var(--cta)", "var(--success)", "var(--warning)", "var(--danger)", "var(--link)"];

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function InfographicsPage() {
  const [columnData] = useState(generateColumnData());
  const [donutData] = useState(generateDonutData());
  const [treemapData] = useState(generateTreemapData());
  const [barData] = useState(generateBarData());
  const [lineData] = useState(generateLineData());
  const [areaData] = useState(generateAreaData());

  return (
    <div className="w-full px-6 py-6 max-w-none space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Infographics</h1>
        <p className="text-muted-foreground">
          Interactive chart visualizations using shadcn chart components
        </p>
      </div>

      {/* Column Chart */}
      <section id="annual-revenue" className="scroll-mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Column Chart</CardTitle>
            </div>
            <CardDescription>
              Vertical bar chart showing annual revenue data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={columnData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--primary)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      {/* Donut Chart */}
      <section id="donut-chart" className="scroll-mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Donut Chart</CardTitle>
            </div>
            <CardDescription>
              Pie chart with a hollow center showing distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {donutData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      {/* Treemap Chart */}
      <section id="cluster-analysis" className="scroll-mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Treemap</CardTitle>
            </div>
            <CardDescription>
              Hierarchical data visualization using nested rectangles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <Treemap
                data={treemapData}
                dataKey="size"
                stroke="var(--border)"
                fill="var(--primary)"
                aspectRatio={4/3}
              >
                <ChartTooltip content={<ChartTooltipContent />} />
              </Treemap>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      {/* Bar Chart */}
      <section id="bar-charts" className="scroll-mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChartHorizontal className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Bar Chart</CardTitle>
            </div>
            <CardDescription>
              Horizontal bar chart for comparing categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--cta)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      {/* Line Chart */}
      <section id="line-charts" className="scroll-mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Line Chart</CardTitle>
            </div>
            <CardDescription>
              Line chart showing trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--success)"
                  strokeWidth={2}
                  dot={{ fill: "var(--success)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      {/* Area Chart */}
      <section id="area-charts" className="scroll-mt-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AreaChartIcon className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Area Chart</CardTitle>
            </div>
            <CardDescription>
              Area chart with gradient fill showing cumulative values
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--link)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--link)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--link)"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

