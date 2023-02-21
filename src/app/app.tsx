// import React from "react";
import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { AppContext } from "./context/app/appContext";

import Layout from "./components/layout/Layout";

type Props = {};

export default function App({}: Props) {
    const queryClient = new QueryClient();
    const { appRouter } = useContext(AppContext);

    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <RouterProvider router={appRouter} />
            </Layout>
        </QueryClientProvider>
    );
}
