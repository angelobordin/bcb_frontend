/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'campaign',
        title: 'Big Chat Brasil',
        type: 'group',
        children: [
            {
                id: 'campaign.customer',
                title: 'Clientes',
                type: 'basic',
                icon: 'heroicons_outline:building-office-2',
                link: '/customer',
            },
            {
                id: 'campaign.plan',
                title: 'Planos',
                type: 'basic',
                icon: 'heroicons_outline:device-phone-mobile',
                link: '/plan',
            },
            {
                id: 'campaign.message',
                title: 'Mensagens',
                type: 'basic',
                icon: 'heroicons_outline:chat-bubble-bottom-center-text',
                link: '/message',
            },
        ],
    },
];
