'use client';

import * as React from 'react';
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers
} from '@tabler/icons-react';

import { NavDocuments } from 'global/nav-documents';
import { NavMain } from 'global/nav-main';
import { NavSecondary } from 'global/nav-secondary';
import { NavUser } from 'global/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from 'global/ui/sidebar';
// import { TeamSwitcher } from './team-switcher';
// import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';
// import { Separator } from './ui/separator';

const data = {
  user: {
    name: 'admin',
    email: 'admin@flowblitz.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Dashboards',
      url: '/studio',
      icon: IconDashboard
    },
    {
      title: 'Lifecycle',
      url: '/studio/app',
      icon: IconListDetails
    },
    {
      title: 'Analytics',
      url: '/studio/app/1',
      icon: IconChartBar
    },
    {
      title: 'Projects',
      url: '/studio/web/dev/1234',
      icon: IconFolder
    },
    {
      title: 'Team',
      url: '#',
      icon: IconUsers
    }
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#'
        },
        {
          title: 'Archived',
          url: '#'
        }
      ]
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#'
        },
        {
          title: 'Archived',
          url: '#'
        }
      ]
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#'
        },
        {
          title: 'Archived',
          url: '#'
        }
      ]
    }
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp
    },
    {
      title: 'AI Search',
      url: '#',
      icon: IconSearch
    }
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: IconDatabase
    },
    {
      name: 'Reports',
      url: '#',
      icon: IconReport
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: IconFileWord
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/" className="h-full">
                <IconInnerShadowTop className="!size-6" />
                <span className="text-base font-semibold">Flowblitz</span>
                {/* <SidebarTrigger className="-ml-1" /> */}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <TeamSwitcher
          teams={[
            {
              name: 'Plat4ormation',
              logo: GalleryVerticalEnd,
              plan: 'Enterprise'
            },
            {
              name: 'UniKomm',
              logo: AudioWaveform,
              plan: 'Enterprise'
            },
            {
              name: 'Own Inc.',
              logo: Command,
              plan: 'Consulting'
            }
          ]}
        /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
