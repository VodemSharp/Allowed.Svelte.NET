import {ServerData} from "svelte-dotnet";
import {Configuration} from "./Configuration";

export class AppServerData extends ServerData {
    configuration: Configuration = new Configuration();
}