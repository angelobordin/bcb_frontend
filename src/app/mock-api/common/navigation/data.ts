/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'campaign',
        title: 'Campanhas',
        type: 'group',
        children: [
            {
                id: 'campaign.customer',
                title: 'Clientes',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/customer',
            },
        ],
    },
];
