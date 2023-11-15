import React from "react";
import { cn } from "../lib/helper";

type ContainerProps = {
	children: React.ReactNode;
	className?: string;
};
const Container = ({ children, className }: ContainerProps) => (
	<div className={cn("max-w-5xl m-auto relative px-6", className)}>
		{children}
	</div>
);

export default Container;
