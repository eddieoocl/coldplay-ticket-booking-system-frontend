import * as React from "react"
import { ChartTooltipProps } from "recharts"

import { cn } from "@/lib/utils"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    config: Record<string, { label: string; color: string }>
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
    ({ className, config, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("relative", className)}
                style={
                    {
                        "--color-1": config[Object.keys(config)[0]]?.color,
                        "--color-2": config[Object.keys(config)[1]]?.color,
                        "--color-3": config[Object.keys(config)[2]]?.color,
                        "--color-4": config[Object.keys(config)[3]]?.color,
                        "--color-5": config[Object.keys(config)[4]]?.color,
                        ...Object.fromEntries(
                            Object.entries(config).map(([key, value]) => [
                                `--color-${key}`,
                                value.color,
                            ])
                        ),
                    } as React.CSSProperties
                }
                {...props}
            >
                {children}
            </div>
        )
    }
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<
    HTMLDivElement,
    ChartTooltipProps<number, string>
>(({ active, payload, label, ...props }, ref) => {
    if (active && payload?.length) {
        return (
            <div
                ref={ref}
                className="rounded-lg border bg-background p-2 shadow-sm"
                {...props}
            >
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
                        <span className="font-bold text-muted-foreground">
              {payload[0].value}
            </span>
                    </div>
                    {payload.map((item) => (
                        <div key={item.name} className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {item.name}
              </span>
                            <span className="font-bold" style={{ color: item.color }}>
                {item.value}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return null
})
ChartTooltip.displayName = "ChartTooltip"

export { ChartContainer, ChartTooltip }

