/**
 * SHARED TYPE DEFINITIONS
 * 
 * This file contains TypeScript types and Zod schemas that are used
 * by BOTH the frontend (React) and backend (Worker).
 * 
 * WHY SHARED TYPES?
 * - Ensures frontend and backend agree on data structure
 * - Prevents type mismatches and runtime errors
 * - Enables end-to-end type safety
 * - Single source of truth for API contracts
 * 
 * EXAMPLE USE CASES:
 * 
 * 1. API Request/Response Types:
 *    export const CreateSubscriptionSchema = z.object({
 *      plan_id: z.number(),
 *      user_id: z.string(),
 *    });
 *    export type CreateSubscriptionRequest = z.infer<typeof CreateSubscriptionSchema>;
 * 
 * 2. Database Model Types:
 *    export const SubscriptionPlanSchema = z.object({
 *      id: z.number(),
 *      name: z.string(),
 *      price: z.number(),
 *      devices_limit: z.number(),
 *    });
 *    export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
 * 
 * 3. Form Validation:
 *    export const ContactFormSchema = z.object({
 *      name: z.string().min(2),
 *      email: z.string().email(),
 *      message: z.string().min(10),
 *    });
 * 
 * HOW TO USE:
 * - Import types in both frontend and backend
 * - Use Zod schemas for runtime validation
 * - Derive TypeScript types with z.infer<>
 * 
 * NOTE: Currently empty - add types as you build new features!
 */

import z from "zod";

/**
 * Types shared between the client and server go here.
 *
 * For example, we can add zod schemas for API input validation, and derive types from them:
 *
 * export const TodoSchema = z.object({
 *   id: z.number(),
 *   name: z.string(),
 *   completed: z.number().int(), // 0 or 1
 * })
 *
 * export type TodoType = z.infer<typeof TodoSchema>;
 */
