import { CheckCircle, ChevronRight, Circle } from "lucide-react";

interface Step {
    name: string;
    href: string;
    status: "complete" | "current" | "upcoming";
}

interface ProgressBarProps {
    steps: Step[];
}

export default function ProgressBar({ steps }: ProgressBarProps) {
    return (
        <nav aria-label="Progress" className="mb-8">
            <ol role="list" className="flex items-center justify-center">
                {steps.map((step, stepIdx) => (
                    <li key={step.name} className="relative flex items-center">
                        {step.status === "complete" ? (
                            <a href={step.href} className="group">
                                <span className="flex items-center">
                                    <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-600 group-hover:bg-green-800">
                                        <CheckCircle
                                            className="h-5 w-5 text-white"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    <span className="ml-3 text-sm font-medium text-gray-300 group-hover:text-white">
                                        {step.name}
                                    </span>
                                </span>
                            </a>
                        ) : step.status === "current" ? (
                            <a
                                href={step.href}
                                className="flex items-center"
                                aria-current="step"
                            >
                                <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-blue-600 bg-blue-600">
                                    <Circle
                                        className="h-5 w-5 text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                                <span className="ml-3 text-sm font-medium text-blue-600">
                                    {step.name}
                                </span>
                            </a>
                        ) : (
                            <a href={step.href} className="group">
                                <span className="flex items-center">
                                    <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                        <Circle
                                            className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                                        {step.name}
                                    </span>
                                </span>
                            </a>
                        )}

                        {stepIdx !== steps.length - 1 && (
                            <ChevronRight
                                className="h-5 w-5 text-gray-300 mx-4"
                                aria-hidden="true"
                            />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
