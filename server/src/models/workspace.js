import mongoose from 'mongoose';

const fileExplorerNodeSchema = new mongoose.Schema({
  id: String,
  name: String,
  isFolder: Boolean,
  path: String,
  nodes: [] 
});

// Self-reference for nested nodes
fileExplorerNodeSchema.add({ nodes: [fileExplorerNodeSchema] });

const fileSchema = new mongoose.Schema({
  name: String,
  content: String,
  language: String,
  path: String
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
  filesContentMap: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export const Workspace = mongoose.model('Workspace', workspaceSchema);