import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "../components/scroll-to-top/scroll-to-top";
import { RouteTypes } from "./route-types";
import LoadingSuspense from "../components/loading-suspense/loading-suspense";
import HubsPage from "../pages/hubs/hubs";
const DevicesPage = lazy(() => import("../pages/devices/devices"));
const SingleHubPage = lazy(() => import("../pages/hubs/single-hub"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path={RouteTypes.singleHub}
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <SingleHubPage />
            </Suspense>
          }
        />

        <Route
          path={RouteTypes.devices}
          element={
            <Suspense fallback={<LoadingSuspense />}>
              <DevicesPage />
            </Suspense>
          }
        />
        <Route path={RouteTypes.hubs} element={<HubsPage />} />

        <Route path="*" element={<Navigate replace to={RouteTypes.hubs} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
