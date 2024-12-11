"use client";

import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import { usePathname } from "next/navigation";
const steps = ["Select Order", "Confirm Order", "Payment"];

const MainFlowLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname();

    const getActiveStep = (path: string) => {
        switch (path) {
            case "/select-order":
                return 0;
            case "/confirm-order":
                return 1;
            case "/payment":
                return 2;
            default:
                return 0;
        }
    };

    const activeStep = getActiveStep(pathname);

    return (
        <>
            <Box
                sx={{
                    margin: "10px",
                    backgroundColor: "rgba(7, 13, 23, 0.8)",
                    color: "#f0f0f0",
                }}
            >
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel
                                sx={{
                                    "& .MuiStepLabel-label": {
                                        color: "#f0f0f0", // Change text color
                                    },
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            {children}
        </>
    );
};

export default MainFlowLayout;
