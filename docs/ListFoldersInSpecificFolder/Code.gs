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

// This function performs the implementation of creating the file of the list of folders in the specific folder.
// Usage: Set the ListDocName, the ListDocFullPath, and the SpecificFolder, then just run Example function.
function Example() {
  // Set Doc file name
  var ListDocName = "RootFolderList";
  
  // Set Doc file path
  var ListDocFullPath = "/Google Apps Script/TestFiles";
  
  // Set specific folder, and this program would list its subfolders to Doc file.
  var SpecificFolder = "/";
  
  CreateGoogleDocInSpecificFolder(ListDocName, ListDocFullPath);
  var DocFiles = GoogleDocsInSpecificFolder(ListDocName, ListDocFullPath);
  
  while(DocFiles.hasNext())
  {
    var docFile = DocFiles.next();
    var docID = docFile.getId();
    var doc = DocumentApp.openById(docID);
    
    var Folders = FoldersInSpecificFolder(SpecificFolder);
    while(Folders.hasNext())
    {
      var Folder = Folders.next();
      // Access the body of the document, then add a paragraph.
      doc.getBody().appendParagraph(Folder.getName() + '\t' + Folder.getId());
    }
    doc.saveAndClose();
  }
}

// FoldersInSpecificFolder function would return a FileIterator
function FoldersInSpecificFolder(FolderFullPath)
{
  if(FolderFullPath == '/')
  {
    // Return the FolderIterator in Root.
    return getFolder(FolderFullPath);
  }
  else
  {
    // getFolder return the FolderIterator
    var TargetFolders = getFolder(FolderFullPath);
    while (TargetFolders.hasNext())
    {
      var folder = TargetFolders.next();
      return folder.getFolders();
    }
  } 
}

// GoogleDocsInSpecificFolder function would return a FileIterator
function GoogleDocsInSpecificFolder(docName, FolderFullPath)
{
  if(FolderFullPath == '/')
  {
    // Read files in Root, getFilesByName return the FileIterator
    var RootDocs = DriveApp.getRootFolder().getFilesByName(docName);
    return RootDocs;
  }
  else
  {
    // getFolder return the FolderIterator
    var TargetFolders = getFolder(FolderFullPath);   
    while (TargetFolders.hasNext())
    {
      var folder = TargetFolders.next();
      var docFiles = folder.getFilesByName(docName);
      return docFiles;
    }
  } 
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

// getFolder function would return the FolderIterator which is locate at Path.
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