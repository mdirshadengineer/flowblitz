import { AppSidebar } from 'global/app-sidebar';
import { ChartAreaInteractive } from 'global/chart-area-interactive';
import { DataTable } from 'global/data-table';
import { SectionCards } from 'global/section-cards';
import { SiteHeader } from 'global/site-header';
import { SidebarInset, SidebarProvider } from 'global/ui/sidebar';

import data from './data.json'; //TODO: This data from layout should be coming with RSC
/**
 * From this page expectation is this will show the page with its contents
 * @returns
 */
export default function StudioApplicationPage() {
  return (
    <div id="studio-application-page">
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)'
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
