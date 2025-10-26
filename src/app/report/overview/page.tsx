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
]

export default function Report() {
  return (
    <SidebarProvider>
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
      <SidebarTrigger />
    </SidebarProvider>
  )
}