'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { History, Swords } from 'lucide-react';

import { cn } from '@/lib/utils';

const routes = [
  {
    label: 'Interview',
    icon: Swords,
    href: '/dashboard',
    color: 'text-sky-500'
  },
  {
    label: 'History',
    icon: History,
    href: '/dashboard/history',
    color: 'text-red-500'
  }
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 flex flex-col">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                pathname === route.href
                  ? 'text-white bg-white/10'
                  : 'text-zinc-400'
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
