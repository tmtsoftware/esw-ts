import {HttpConnection} from "../location";
import {Prefix} from "../../models";
import {resolve} from "../location/LocationUtils";
import {extractHostPort} from "../../utils/Utils";
import {SequenceManagerConfig} from "../../config/SequenceManagerConfig";

export const SequenceManagerConnection = HttpConnection(
  new Prefix(SequenceManagerConfig.subsystem, SequenceManagerConfig.componentName),
  SequenceManagerConfig.componentType
)

export const resolveSequenceManager: () => Promise<{ port: number; host: string }> = async () => {
  const location = await resolve(SequenceManagerConnection)
  return extractHostPort(location.uri)
}
