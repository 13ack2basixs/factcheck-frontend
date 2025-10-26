"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ShieldCheck, Newspaper, ScanText, Globe } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Article Overview",
    url: "/report/overview",
    icon: Newspaper,
  },
  {
    title: "Credibility Insights",
    url: "/report/credibility",
    icon: ShieldCheck,
  },
  {
    title: "Language Analysis",
    url: "/report/language",
    icon: ScanText,
  },
  {
    title: "Impact Channels",
    url: "/report/impact",
    icon: Globe,
  },
];

const raw = sessionStorage.getItem("scrapeResult");
const data = raw ? JSON.parse(raw) : null;

export default function Report() {
  return (
    <SidebarProvider>
      {/* Left sidebar */}
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="text-primary">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Main content area */}
      <main>
        <section className="">
          <h2 className="">
            Article Overview
          </h2>

          <div className="">
            <p className="">
              URL: {data.data.url}  
            </p>

            <p className="">
              Headline: {data.data.title}
            </p>

            <p className="">
              {data.data.content}
            </p>
          </div>
        </section>
      </main>
      <SidebarTrigger />
    </SidebarProvider>
  )
}