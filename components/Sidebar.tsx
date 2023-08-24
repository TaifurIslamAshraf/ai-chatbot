"use client";

import { useProModal } from "@/hooks/useProModal";
import { cn } from "@/lib/utils";
import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = ({isPro}:{isPro: boolean}) => {
  const pathName = usePathname();
  const router = useRouter();
  const proModal = useProModal()
  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Home",
      pro: false,
    },
    {
      icon: Plus,
      href: "/chatbot/celebrity/new",
      label: "Create",
      pro: true,
    },
    {
      icon: Settings,
      href: "/chatbot/settings",
      label: "Settings",
      pro: false,
    },
  ];

  const onNaviage = (url: string, pro: boolean) => {

    if(pro && !isPro){
      return proModal.onOpen()
    }

    return router.push(url);
  };

  return (
    <div className="bg-secondary text-primary space-y-4 flex flex-col h-full">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route, index) => {
            return (
              <div
                onClick={() => onNaviage(route.href, route.pro)}
                key={index}
                className={cn(
                  "text-xs text-muted-foreground group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                  pathName === route.href && "bg-primary/10 text-primary"
                )}
              >
                <div className="flex flex-col gap-y-2 items-center flex-1 text-xs">
                  <route.icon className="h-5 w-5" />
                  <p>{route.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
