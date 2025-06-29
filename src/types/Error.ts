import type { PostgrestError } from "@supabase/supabase-js"

export interface CustomError extends Error {
  customerCode?: number
}
export interface ExtendedPostgresError extends PostgrestError {
  statusCode?: number
}
