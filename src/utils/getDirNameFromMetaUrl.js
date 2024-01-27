import {fileURLToPath} from "url";
import {dirname} from "path";

export function getDirNameFromMetaUrl(metaUrl) {
  const __filename = fileURLToPath(metaUrl);
  return dirname(__filename);
}

