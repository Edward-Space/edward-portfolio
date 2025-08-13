import { FloatRoute } from "../FloatRoute";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export const RootLayoutPage = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return (
    <SidebarProvider className="bg-primary/20">
      {/* <AppSidebar /> */}
      <SidebarInset className="py-3 px-3 bg-transparent relative">
        <div className=" rounded-lg bg-background overflow-y-scroll h-[calc(100vh-25px)] scrollbar-hide">
          {children}
        </div>
        <FloatRoute />
      </SidebarInset>
    </SidebarProvider>
  );
};
