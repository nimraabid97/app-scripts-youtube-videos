function scrapeCommentsWithoutReplies(){
  let commentsRange= 174911;
  let privateComments = false;
  let numberofPrivateComments = 420;
  const stripEmojis = (str) =>
  str
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .replace(/\s+/g, ' ')
    .trim();
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  for (let i = 2; i<=22968; i++){
  //  console.log(commentsRange);
     var result=[['vide_id','comment_text','Likes','Reply Count']];
  var vid = ss.getSheets()[0].getRange(i,1).getValue();
  var category = ss.getSheets()[0].getRange(i,5).getValue();
 // console.log(vid);
//  console.log(vid);
  var nextPageToken=undefined;
 
  while(1){
    privateComments = false;
    try{  
       var data = YouTube.CommentThreads.list('snippet', {videoId: vid, maxResults: 100, pageToken: nextPageToken});
              nextPageToken=data.nextPageToken
   // console.log(nextPageToken);
   if(data.items.length>50){
    data.items.length = 50;
   }
    for (var row=0; row<data.items.length; row++) {
      let likeCount = data.items[row].snippet.topLevelComment.snippet.likeCount?data.items[row].snippet.topLevelComment.snippet.likeCount : 0;
      let totalReplyCount =  data.items[row].snippet.totalReplyCount? data.items[row].snippet.totalReplyCount :0;
      // strip emojis
      let commentText = stripEmojis(data.items[row].snippet.topLevelComment.snippet.textDisplay);
      // remove special characters
       commentText = commentText.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
       // remove numbers
       commentText = commentText.replace(/[0-9]/g, '')
      // convert to lower case
       commentText = commentText.toLowerCase();
      // console.log(`comment Text: ${commentText}`);
       if(commentText.length){
        result.push([vid,
                  commentText,
                   likeCount,
                   totalReplyCount]);
       }
      
    }
   // if(nextPageToken =="" || typeof nextPageToken === "undefined"){
      break;
   // }
    }catch(e) {
      console.log(e);
      privateComments = true;
      break;
    }
  

    
   
  }
    if(privateComments){
      numberofPrivateComments = numberofPrivateComments +1;
      console.log(vid);
      console.log('private comments');
      console.log(category);
      categories[category] = categories[category]+1;
      result.push([vid,
                  'Private Comments',
                   0,
                   0]);
       
    }
     result.shift();
     if(result.length){
        ss.getSheets()[1].getRange(commentsRange, 1,result.length,4).setValues(result);
      commentsRange = commentsRange + result.length;
     }else{
       result.push([vid,
                  'No Comments',
                   0,
                   0]);
      ss.getSheets()[1].getRange(commentsRange, 1,result.length,4).setValues(result);
      commentsRange = commentsRange+result.length;

     
     }
     
      console.log('numberofPrivateComments');
      console.log(numberofPrivateComments);
     
  

  }
 
}
