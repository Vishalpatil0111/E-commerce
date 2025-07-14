import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";
import { syncUserCreation, syncUserDeletion, syncUserUpdate } from "@/config/ingest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdate,
    syncUserDeletion
  ],
});