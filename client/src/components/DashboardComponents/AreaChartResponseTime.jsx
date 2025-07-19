import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts'
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} 


export default function AreaChartResponseTime({color,numberOfValues,payload}) {

    const chartData = payload.map(check => ({
    latency: check.latency,
    timestamp: new Date(check.createdAt).toLocaleTimeString()
    }));
    return (

      <Card className="flex flex-col h-96 ">
        <CardHeader>
          <CardTitle>Response Time</CardTitle>
          <CardDescription>Last {numberOfValues} uptime checks — response time in milliseconds</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center flex-1 p-0 min-h-0 overflow-hidden">
            <ChartContainer config={chartConfig} className="h-full w-[98%]">
            <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="timestamp" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis dataKey="latency" tickLine={false} axisLine={false} tickMargin={8}  />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area
                dataKey="latency"            // ← use "latency" here
                type="natural"
                fill={color}
                fillOpacity={0.4}
                stroke={color}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-1 text-sm">
            <span className="font-medium flex items-center gap-1">
              Average 
            </span>
            <span className="text-muted-foreground">1125 ms</span>
          </div>
        </CardFooter>
      </Card>
  )
}
