import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className = "", ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={`accordion-item ${className}`.trim()} {...props} />);
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className = "", children, ...props }, ref) => <AccordionPrimitive.Header className="accordion-header"><AccordionPrimitive.Trigger ref={ref} className={`accordion-trigger ${className}`.trim()} {...props}>{children}<ChevronDown className="accordion-chevron" /></AccordionPrimitive.Trigger></AccordionPrimitive.Header>);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className = "", children, ...props }, ref) => <AccordionPrimitive.Content ref={ref} className="accordion-content" {...props}><div className={`accordion-content-inner ${className}`.trim()}>{children}</div></AccordionPrimitive.Content>);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
