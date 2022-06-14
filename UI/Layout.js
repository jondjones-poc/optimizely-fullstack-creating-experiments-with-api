import Head from 'next/head'
import React from 'react';

import Header from './Header'
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({children, ...props}) => {

    return (
        <>
            <Head>
                <title>Optimizely REST API Example</title>
                <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,600,600i" rel="stylesheet" />
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
            </Head>

            <div className="dashboard-main-wrapper">

                <Header {...props} />
                <Sidebar {...props} />

                <div className="dashboard-wrapper">
                    <div className="container-fluid  dashboard-content">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="page-header">
                                    <h2 className="pageheader-title">My Active Experiments</h2>
                                </div>
                            </div>
                        </div>

                        {children}

                    </div>

                    <Footer {...props} />
                </div>
            </div>

            <script type="text/javascript" src="assets/vendor/jquery/jquery-3.3.1.min.js"></script>
            <script type="text/javascript" src="assets/vendor/slimscroll/jquery.slimscroll.js"></script>
            <script type="text/javascript" src="assets/vendor/custom-js/jquery.multi-select.html"></script>
            <script type="text/javascript" src="assets/libs/js/main-js.js"></script>
        </>
    );
};

export default Layout;
