"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadCrumbComponentProps {
  route?: string;
  title?: string;
}

export default function BreadCrumbComponent({
  route,
}: BreadCrumbComponentProps) {
  const routes = route ? route.split("/") : [];
  routes.shift();
  // console.log(routes);
  const getParams = () => {}
  return (
    <Breadcrumb className="my-2 ml-3">
      <BreadcrumbList>
        {routes.map((route, index) => {
          if (route === "course") return null;
          if (index != routes.length - 1)
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem >
                  <BreadcrumbLink
                    className="text-slate-50/50 hover:text-slate-50"
                    href={`/${route}`}
                  >
                    {route}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-slate-50/50" />
              </React.Fragment>
            );
          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbPage className="text-slate-50/90">
                {route}
              </BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
