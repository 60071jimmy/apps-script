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

// This function performs the implementation of analyzing the usage of the Google Drive.
// Usage: Set the DriveStorageInfoDocName, and the DriveStorageInfoDocFullPath, then just run Example function.
// Notice: The DriveStorageInfoDocName can't be as same as the folder name.
function Example() {
  // Set Doc file name.
  var DriveStorageInfoDocName = "DriveStorageInfoDoc";
  
  // Set Doc file path.
  var DriveStorageInfoDocFullPath = "//Google Apps Script//TestFiles//DriveStorageInfo";
  
  // Run CreateDriveStorageInfo function in first time.
  CreateDriveStorageInfo(DriveStorageInfoDocName, DriveStorageInfoDocFullPath);
  
  UpdateDriveStorageInfo(DriveStorageInfoDocName, DriveStorageInfoDocFullPath);
}

function UpdateDriveStorageInfo(DriveStorageInfoDocName, DriveStorageInfoDocFullPath)
{
  var DocFiles = GoogleDocsInSpecificFolder(DriveStorageInfoDocName, DriveStorageInfoDocFullPath);
  while(DocFiles.hasNext())
  {
    var docFile = DocFiles.next();
    var docID = docFile.getId();
    var DriveStorageInfoDoc = DocumentApp.openById(docID);
    
	var currentdate = new Date(); 
	var datetime = "Last Sync: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
	DriveStorageInfoDoc.getBody().appendParagraph(datetime);
  
	DriveStorageInfoDoc.getBody().appendParagraph('');
  
	// Get Google Drive Storage Limit in Byte
	var GDriveStorageLimitByte = DriveApp.getStorageLimit();
  
	var GDriveStorageLimitKByte = GDriveStorageLimitByte / 1024;
	var GDriveStorageLimitMByte = GDriveStorageLimitKByte / 1024;
	var GDriveStorageLimitGByte = GDriveStorageLimitMByte / 1024;
	var GDriveStorageLimitTByte = GDriveStorageLimitGByte / 1024;
  
	// Get Google Drive Storage Used in Byte
	var GDriveStorageUsedByte = DriveApp.getStorageUsed();
  
	var GDriveStorageUsedKByte = GDriveStorageUsedByte / 1024;
	var GDriveStorageUsedMByte = GDriveStorageUsedKByte / 1024;
	var GDriveStorageUsedGByte = GDriveStorageUsedMByte / 1024;
	var GDriveStorageUsedTByte = GDriveStorageUsedGByte / 1024;
  
	// Write Google Drive storage info to file
	DriveStorageInfoDoc.getBody().appendParagraph('getStorageLimit:' + GDriveStorageLimitByte + 'Byte');
	DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageLimitKByte + 'KByte');
	DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageLimitMByte + 'MByte');
	DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageLimitGByte + 'GByte');
	DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageLimitTByte + 'TByte');
  
	DriveStorageInfoDoc.getBody().appendParagraph('');
  
	DriveStorageInfoDoc.getBody().appendParagraph('getStorageUsed:' + GDriveStorageUsedByte + 'Byte');
	DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageUsedKByte + 'KByte');
	DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageUsedMByte + 'MByte');
	DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageUsedGByte + 'GByte');
	DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageUsedTByte + 'TByte');
    
    DriveStorageInfoDoc.getBody().appendParagraph('\n');
    
    DriveStorageInfoDoc.saveAndClose();
  }
}

function CreateDriveStorageInfo(DriveStorageInfoDocName, DriveStorageInfoDocFullPath)
{
  // Write SpecificFolder to Doc file.
  var docCreatedID = CreateGoogleDocInSpecificFolder(DriveStorageInfoDocName, DriveStorageInfoDocFullPath);
  var DriveStorageInfoDoc = DocumentApp.openById(docCreatedID);
  
  var currentdate = new Date(); 
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  DriveStorageInfoDoc.getBody().appendParagraph(datetime);
  
  DriveStorageInfoDoc.getBody().appendParagraph('');
  
  // Get Google Drive Storage Limit in Byte
  var GDriveStorageLimitByte = DriveApp.getStorageLimit();
  
  var GDriveStorageLimitKByte = GDriveStorageLimitByte / 1024;
  var GDriveStorageLimitMByte = GDriveStorageLimitKByte / 1024;
  var GDriveStorageLimitGByte = GDriveStorageLimitMByte / 1024;
  var GDriveStorageLimitTByte = GDriveStorageLimitGByte / 1024;
  
  // Get Google Drive Storage Used in Byte
  var GDriveStorageUsedByte = DriveApp.getStorageUsed();
  
  var GDriveStorageUsedKByte = GDriveStorageUsedByte / 1024;
  var GDriveStorageUsedMByte = GDriveStorageUsedKByte / 1024;
  var GDriveStorageUsedGByte = GDriveStorageUsedMByte / 1024;
  var GDriveStorageUsedTByte = GDriveStorageUsedGByte / 1024;
  
  // Write Google Drive storage info to file
  DriveStorageInfoDoc.getBody().appendParagraph('getStorageLimit:' + GDriveStorageLimitByte + 'Byte');
  DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageLimitKByte + 'KByte');
  DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageLimitMByte + 'MByte');
  DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageLimitGByte + 'GByte');
  DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageLimitTByte + 'TByte');
  
  DriveStorageInfoDoc.getBody().appendParagraph('');
  
  DriveStorageInfoDoc.getBody().appendParagraph('getStorageUsed:' + GDriveStorageUsedByte + 'Byte');
  DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageUsedKByte + 'KByte');
  DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageUsedMByte + 'MByte');
  DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageUsedGByte + 'GByte');
  DriveStorageInfoDoc.getBody().appendParagraph('=' + GDriveStorageUsedTByte + 'TByte');
  
  DriveStorageInfoDoc.getBody().appendParagraph('\n');
  
  DriveStorageInfoDoc.saveAndClose();
}

// This function performs the implementation of creating the file of the list of folders in the specific folder.
function ListFoldersInSpecificFolder(ListDocName, ListDocFullPath, SpecificFolder)
{
  var DocFiles = GoogleDocsInSpecificFolder(ListDocName, ListDocFullPath);
  
  while(DocFiles.hasNext())
  {
    var docFile = DocFiles.next();
    var docID = docFile.getId();
    var doc = DocumentApp.openById(docID);
    
    var Folders = FoldersInSpecificFolder(SpecificFolder);
    
    var SubFoldersCount = 0;
    
    // Counter would count the writing times of doc.
    // if there are lots data to write, it would save doc file first, then re-open the doc file.
    var Counter = 0;
    while(Folders.hasNext())
    {
      var Folder = Folders.next();
      // Access the body of the document, then add a paragraph.
      if(SpecificFolder == '//')
      {
        doc.getBody().appendParagraph(SpecificFolder + Folder.getName() + '\t' + Folder.getId());
      }
      else
      {
        doc.getBody().appendParagraph(SpecificFolder + '//' + Folder.getName() + '\t' + Folder.getId());
      }
      
      SubFoldersCount = SubFoldersCount + 1;
      
      Counter = Counter + 1;
      if(Counter > 10)
      {
        doc.saveAndClose();
        doc = DocumentApp.openById(docID);
        Counter = 0;
      }
      
    }
    doc.saveAndClose();
  }
  return SubFoldersCount;
}

// FoldersInSpecificFolder function would return a FileIterator
function FoldersInSpecificFolder(FolderFullPath)
{
  if(FolderFullPath == "//")
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
  if(FolderFullPath == "//")
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
  if(FolderFullPath == "//")
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
  var arr = Path.split("//");
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