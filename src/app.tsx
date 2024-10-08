import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateRoom } from "./features/create-room"
import { Room } from "./features/room"
import { Toaster } from "sonner"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/react-query"

const router = createBrowserRouter([{
  path: '/',
  element: <CreateRoom></CreateRoom>
}, {
  path: '/room/:roomId',
  element: <Room></Room>
}])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster invert richColors></Toaster>
    </QueryClientProvider>
  )
}

