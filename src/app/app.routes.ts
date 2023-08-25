import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: '',
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'home',
                loadChildren: () => import('app/modules/home/home.routes'),
            },
            {
                path: 'customer',
                loadChildren: () =>
                    import('app/modules/customer/customer.routes'),
            },
        ],
    },
    { path: '**', redirectTo: 'home' },
];
