import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
      <CardContent>
      <div className="flex items-center h-[40px]">
        
        {children}
      </div>
      </CardContent>
      {footer && <CardFooter className="text-muted-foreground">{footer}</CardFooter>}
    </Card>
  );
}

export default CardComponent
