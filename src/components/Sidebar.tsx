import Card from './Card';
// eslint-disable-next-line import/no-cycle
import SidebarLink from './SidebarLink';

export interface SidebarLink {
  icon: string;
  link: string;
  label: string;
}

const links: SidebarLink[] = [
  { label: 'Home', icon: 'Grid', link: '/home' },
  {
    label: 'Calendar',
    icon: 'Calendar',
    link: '/calendar',
  },
  { label: 'Profile', icon: 'User', link: '/profile' },
  {
    label: 'Settings',
    icon: 'Settings',
    link: '/settings',
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      <div className="w-full flex justify-center items-center" />
      {links && links.map(link => <SidebarLink link={link} key={link.icon} />)}
    </Card>
  );
};

export default Sidebar;
