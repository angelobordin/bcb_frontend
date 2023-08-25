/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'campaign',
        title: 'Campanhas de Mensagem',
        type: 'group',
        children: [
            {
                id: 'campaign.customer',
                title: 'Clientes',
                type: 'collapsable',
                children: [
                    {
                        id: 'campaign.customer.register',
                        title: 'Novo Cliente',
                        type: 'basic',
                        icon: 'heroicons_outline:user-plus',
                        link: '/customer/register',
                    },
                    {
                        id: 'campaign.customer.list',
                        title: 'Cadastrados',
                        type: 'basic',
                        icon: 'heroicons_outline:users',
                        link: '/customer/list',
                    },
                ],
            },
        ],
    },
];
