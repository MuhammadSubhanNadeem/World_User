import { createRoot } from "react-dom/client";
import Main_router from "./main_router/main_router";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
let queryClient = new QueryClient();
createRoot(document.getElementById("main")).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false}/>
    <Main_router />
  </QueryClientProvider>
);
