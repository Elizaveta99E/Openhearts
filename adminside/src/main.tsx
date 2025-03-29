import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { StaffList } from "./pages/staff/list.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={theme} defaultColorScheme="dark">
  <BrowserRouter>
  
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="staff">
        <Route index element={<StaffList />} />
        {/* <Route path=":staffid" element={<StaffID />} />
        <Route path="trending" element={<Trending />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
  </MantineProvider>
);
