import {File} from "./file.js";
import {FileReference} from "./file-reference";

export interface FileProvider {
  getFileContent(ref: FileReference): Promise<File>;
}
