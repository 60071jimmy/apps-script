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

// This function performs the implementation of reading/writing a file in the specific folder.
// Usage: Set the MyDocName and the MyFolderFullPath, then just run Example function.
function Example() {
  // Set Doc file name
  var MyDocName = "TestFile6";
  
  // Set Doc file path
  var MyFolderFullPath = "/Google Apps Script/TestFiles";
  
  var DocFiles = GoogleDocsInSpecificFolder(MyDocName, MyFolderFullPath);
  
  while(DocFiles.hasNext())
  {
    var docFile = DocFiles.next();
    var docID = docFile.getId();
    var doc = DocumentApp.openById(docID);
    
    // Access the body of the document, then add a paragraph.
    doc.getBody().appendParagraph('This document was write by Google Apps Script.');
    // ADD OTHER TEXT TO DOC FILE HERE
    
    doc.saveAndClose();
    
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