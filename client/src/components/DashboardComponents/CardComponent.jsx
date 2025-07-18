import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Indicator } from "../Indicator";

import React from 'react';

const CardComponent = ({
  title,
  description,
  footer,
  children,
  className = "",
}) => {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent><Indicator size={50} color="#4caf50" duration={1.2}/>{children}</CardContent>
      {footer && <CardFooter className="text-muted-foreground">{footer}</CardFooter>}
    </Card>
  );
}

export default CardComponent
