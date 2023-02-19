'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, User, Grid, Calendar } from 'react-feather';
// eslint-disable-next-line import/no-cycle
import { SidebarLink as SidebarLinkType } from './Sidebar';

const icons = { Settings, User, Grid, Calendar } as const;

const SidebarLink = ({ link }: { link: SidebarLinkType }) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    // active pathname
    isActive = true;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const Icon = icons[link.icon];

  return (
    <Link href={link.link}>
      <Icon
        size={40}
        className={clsx(
          'stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out',
          isActive && 'stroke-violet-600',
        )}
      />
    </Link>
  );
};

export default SidebarLink;
