import configuration from '~/configuration';
import { Cog8ToothIcon, ShieldCheckIcon, CodeBracketIcon, Squares2X2Icon, MagnifyingGlassPlusIcon, CodeBracketSquareIcon, ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline';

const NAVIGATION_CONFIG = {
  items: [
    {
      label: 'common:dashboardTabLabel',
      path: configuration.paths.appHome,
      Icon: ({ className }: { className: string }) => {
        return <Squares2X2Icon className={className} />;
      },
    },
    {
      label: 'common:settingsTabLabel',
      path: '/settings',
      Icon: ({ className }: { className: string }) => {
        return <Cog8ToothIcon className={className} />;
      },
    },
    {
      label: 'common:searchLabel',
      path: '/search',
      Icon: ({ className }: { className: string }) => {
        return <MagnifyingGlassPlusIcon        className={className} />;
      },
    },
    {
      label: 'common:reportsLabel',
      path: '/dataview',
      Icon: ({ className }: { className: string }) => {
        return <ArchiveBoxArrowDownIcon        className={className} />;
      },
    },
    {
      label: 'common:adminLabel',
      path: '/admin',
      Icon: ({ className }: { className: string }) => {
        return <ShieldCheckIcon
        className={className} />;
      },
    },
    {
      label: 'common:NYLabel',
      path: '/nystate',
      Icon: ({ className }: { className: string }) => {
        return <CodeBracketSquareIcon className={className} />;
      },
    },
  ],
};

export default NAVIGATION_CONFIG;
