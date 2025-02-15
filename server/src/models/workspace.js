import mongoose from "mongoose";

const fileExplorerNodeSchema = new mongoose.Schema({
  id: String,
  name: String,
  isFolder: Boolean,
  path: String,
  nodes: []
});

fileExplorerNodeSchema.add({ nodes: [fileExplorerNodeSchema] });

const fileSchema = new mongoose.Schema({
  name: String,
  content: String,
  language: String,
  path: String
});

const filesContentSchema = new mongoose.Schema({
  path: String,
  file: fileSchema
});

const workspaceSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  fileExplorerData: fileExplorerNodeSchema,
  openFiles: [fileSchema],
  activeFile: fileSchema,
  filesContent: [filesContentSchema],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export const Workspace = mongoose.model("Workspace", workspaceSchema);
