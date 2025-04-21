import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { StaffList } from "./pages/staff/list.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { VolunteersList } from "./pages/volunteers/list.tsx";
import {SignIn} from "./pages/signin/list.tsx";{/*страница войти */}
import {Layout} from "./components/layout.tsx"
import {EventsList} from "./pages/events/list.tsx"
import { WorkerAccount } from "./pages/workeraccount/list.tsx";
import { WorkerEditProfile } from "./pages/workereditprofile/list.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider theme={theme} defaultColorScheme="light">
  <BrowserRouter>
  
    <Routes >
    <Route element={<Layout/>}>

      <Route path="/" element={<App />} />
      <Route path="staff">
        <Route index element={<StaffList />} />
        {/* <Route path=":staffid" element={<StaffID />} />
        <Route path="trending" element={<Trending />} /> */}
      </Route>
      <Route path="events">
        <Route index element={<EventsList />} />  
      </Route>
      <Route path="volunteers">
        <Route index element={<VolunteersList />} />
        {/* <Route path=":staffid" element={<StaffID />} />
        <Route path="trending" element={<Trending />} /> */}
      </Route>
      <Route path="signin">
        <Route index element={<SignIn/>}/>
      </Route>
      <Route path="workeraccount">
        <Route index element={<WorkerAccount/>}/>
      </Route>
      <Route path="workereditprofile">
        <Route index element={<WorkerEditProfile/>}/>
      </Route>

    </Route>
    </Routes>
    
  </BrowserRouter>
  </MantineProvider>
);
