function myFunction() {
  //  The URL to the website
  var URL = "";
  DownloadWebsiteToDoc(URL,"Filename","Filepath, like //Google Apps Script//docs")
  
}

function DownloadWebsiteToDoc(URL, DriveStorageInfoDocName, DriveStorageInfoDocFullPath)
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
    
	var response = UrlFetchApp.fetch(URL, {muteHttpExceptions: true});
    var rc = response.getResponseCode();
    
    if (rc == 200) {
      var fileBlob = response.getBlob();
      DriveStorageInfoDoc.getBody().appendParagraph(fileBlob.getDataAsString());
    }
    
    DriveStorageInfoDoc.getBody().appendParagraph('\n');
    
    DriveStorageInfoDoc.saveAndClose();
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
