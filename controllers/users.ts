import { RouterContext } from "https://deno.land/x/oak@v5.2.0/mod.ts"

type RContext = RouterContext<Record<string | number, string | undefined>, 
Record<string, any>
>;