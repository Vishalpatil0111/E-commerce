import { Inngest } from "inngest";
import dbConnect from "./db";
import User from "@/Models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "commerce-com" });

// ingest function to save user data to database
export const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk"
    },
    {event:'cler/user.created'},
    async ({event}) => {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            const userData = {
                _id: id,
                email: email_addresses[0].email_address,
                name: first_name + ' ' + last_name,
                imageUrl: image_url,
            
            
            }
            await dbConnect();
            await User.create(userData)
        }
)

// Ingest Function to update user data in the database
export const syncUserUpdate = inngest.createFunction(
    {
        id: "update-user-from-clerk"
    },
    {event:'clerk/user.updated'},
    async ({event}) => {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;
            const userData = {
                _id: id,
                email: email_addresses[0].email_address,
                name: first_name + ' ' + last_name,
                imageUrl: image_url,
            }
            await dbConnect();
            await User.findByIdAndUpdate(id, userData, { new: true });
        }
);

// Ingest Function to delete user data from the database
export const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-with-clerk"
    },
    {event:'clerk/user.deleted'},
    async ({event}) => {
            const { id } = event.data;
            await dbConnect();
            await User.findByIdAndDelete(id);
        }
);