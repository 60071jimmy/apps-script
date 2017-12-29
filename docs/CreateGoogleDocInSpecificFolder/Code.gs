// Develop by Jimmy HU <s103360021@gmail.com>
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This function performs the implementation of creating a file in the specific folder.
// Usage: Set the MyDocName and the MyFolderFullPath, then just run Example function.

function Example() {
  // Set Doc file name
  var MyDocName = "TestFile5";
  
  // Set Doc file path
  var MyFolderFullPath = "/Google Apps Script/TestFiles";
  
  var docID = CreateGoogleDocInSpecificFolder(MyDocName, MyFolderFullPath);
  
  var doc = DocumentApp.openById(docID);
    
  // Access the body of the document, then add a paragraph.
  doc.getBody().appendParagraph('This document was created by Google Apps Script.');
      
}

function CreateGoogleDocInSpecificFolder(docName, FolderFullPath)
{
  var docID;
  if(FolderFullPath == '/')
  {
    // Create a new Google Doc in Root
    var docRoot = DocumentApp.create(docName);
    var docRootID = docRoot.getId();
    docRoot.saveAndClose();
    return docRootID;
  }
  else
  {
    // Create a new Google Doc in Root
    var docRoot = DocumentApp.create(docName);
    var docRootID = docRoot.getId();
    docRoot.saveAndClose();
    
    // Get new Google Doc file ID (Use in copy)
    var docRootFile = DriveApp.getFileById(docRootID);
    
    var TargetFolders = getFolder(FolderFullPath);   
    while (TargetFolders.hasNext())
    {
      var folder = TargetFolders.next();
      
      // Copy Google Doc to correct file path
      var docFile = docRootFile.makeCopy(docName, folder);
      
      docID = docFile.getId();
    }
    
    // Delete Google Doc in Root
    DriveApp.removeFile(docRootFile);
    
    return docID;
  } 
}

// getFolder function could return the folder which is locate at Path.
function getFolder(Path)
{
  var SubFolder;
  var arr = Path.split("/");
  for (var loopnum = 1; loopnum < arr.length; loopnum = loopnum + 1)
  {
    var FolderName = arr[loopnum];
    if(loopnum == 1)
    {
      SubFolder = DriveApp.getRootFolder().searchFolders("title contains '"+FolderName+"'");
    }
    else
    {
      if (SubFolder.hasNext())
      {
        var folderTemp = SubFolder.next();
        SubFolder = folderTemp.searchFolders("title contains '"+FolderName+"'");
      }
    }
  }
  return SubFolder;
}