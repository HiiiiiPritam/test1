import { Workspace } from "../models/workspace.js";

export const createOrUpdateWorkspace = async (req, res) => {
  console.log('Received workspace update request:', {
    body: req.body,
    roomId: req.body.roomId
  });
  
  try {
    const { roomId, fileExplorerData, openFiles, activeFile, filesContentMap } = req.body;
    
    console.log('Processing workspace update with data:', {
      roomId,
      fileExplorerData: fileExplorerData ? 'present' : 'missing',
      openFiles: openFiles ? openFiles.length : 'missing',
      activeFile: activeFile ? 'present' : 'missing',
      filesContentMap: filesContentMap ? 'present' : 'missing'
    });

    const workspace = await Workspace.findOneAndUpdate(
      { roomId },
      {
        fileExplorerData,
        openFiles,
        activeFile,
        filesContentMap: filesContentMap,
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    );
    
    console.log('Workspace updated successfully:', workspace._id);
    return res.status(200).json(workspace);
  } catch (error) {
    console.error("Workspace save error:", error);
    // Send more detailed error information
    return res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const getWorkspace = async (req, res) => {
  console.log('Received workspace get request:', {
    params: req.params,
    roomId: req.params.roomId
  });

  try {
    const { roomId } = req.params;
    
    if (!roomId) {
      console.log('No roomId provided');
      return res.status(400).json({ error: "Room ID required" });
    }

    console.log('Fetching workspace for roomId:', roomId);
    const workspace = await Workspace.findOne({ roomId });
    
    console.log('Workspace fetch result:', workspace ? 'found' : 'not found');
    if (!workspace) {
      return res.status(404).json({ error: "Workspace not found" });
    }

    return res.status(200).json(workspace);
  } catch (error) {
    console.error("Workspace load error:", error);
    return res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};