
import { FlashMessage } from 'components/flash-message';
import { Footer } from 'components/footer';
import { PropsWithChildren } from 'react';

export function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div>
            <FlashMessage />
            {children}
        </div>
    );
}
