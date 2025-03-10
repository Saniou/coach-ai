import React, { Suspense } from 'react';
import Loading from '../dashboard/loading';

const Layout = ({ children }) => {
    return (
        <div className='px-5'>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
        </div>
    );
};

export default Layout;
