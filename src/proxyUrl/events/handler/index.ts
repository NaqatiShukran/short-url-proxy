import { InsertUrlHandler } from "src/proxyUrl/commands/handler/insert-url.handler";
import { DeleteUrlHandler } from "./delete-url.handler";
import { UpdateUrlHandler } from "./update-url.handler";

export const EventHandlers = [InsertUrlHandler,UpdateUrlHandler,DeleteUrlHandler];