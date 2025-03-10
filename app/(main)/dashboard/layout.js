import React, { Suspense } from 'react';
import Loading from './loading';

const Layout = ({ children }) => {
    return (
        <div className='px-5'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='gradient-title text-6xl font-bold'>Industry Insights</h1>
            </div>
            <Suspense fallback={<Loading className='mt-4' width={'100%'} color='gray' />}>
                {children}
            </Suspense>
        </div>
    );
};

export default Layout;
