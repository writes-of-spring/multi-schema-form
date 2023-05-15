import { z } from "zod";

const statuses = z.enum(["Save", "Update", "Submit"]);

export const UserSchemaValid = z.object({
  status: z.literal("Submit"),
  name: z.string().min(3),
  email: z.string().email(),
});

export const UserSchemaTypeSafe = z.object({
  status: z.enum(["Save", "Update"]),
  name: z.string(),
  email: z.string(),
  water: z.array(z.string()),
});

export const MySchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("test") }).merge(UserSchemaValid),
  z.object({ status: z.enum(["Save", "Update"]) }).merge(UserSchemaTypeSafe),
]);
