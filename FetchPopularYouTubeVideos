function FetchPopularYouTubeVideos() {
  const stripEmojis = (str) =>
  str
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .replace(/\s+/g, ' ')
    .trim();

  
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
  var activeSheet = spreadSheet.getActiveSheet()
  

 // var header=[['video_id','title','description','publish_time','category','tags','channel_title','duration','views','likes','comments_count']];
 // activeSheet.getRange(1,1,header.length,header[0].length).setValues(header);
  var categories = YouTube.VideoCategories.list("snippet,id",{regionCode:"PK"})
  //var i = 2; 2021-01, 2021-02
 // var i = 702; 2021-02, 2021-03
  //var i = 1384 ; 2021-03, 2021-04 ; 24 videos removed
 // var i = 2046 ; 2021-04; 2021-05 ; 2745-2046: total ; 2745-2723 videos removed
 // var i = 2724 ; 2021-05; 2021-06 ; 2724- 3423
  //var i = 3424  : 2021-06 - 2021-07  ; 3424 - 4123
 //  var i = 4124 : 2021-07 - 2021-08  ; 4124 - 4823
 //  var i= 4824 ; 2021-08 - 2021-09  ; 4824 - 5523
 //var i = 5524 ; 2021-09 - 2021-10 ; 5524 - 6223
 //var i = 6224 ; 2021-10 - 2021-11; 6224 - 6923
 //var i = 6924 ;  2021-11 - 2021-11;6924-7623
 
 /** 2022 */
 //var i = 7624     01-02; 8323
 //var i = 8324;      02-03; 9023
 //var i = 9024;        03-04; 9723
 //var i = 9724; 04,05; 10423
 //var i = 10424 ; 05-06;11123
 //var i = 11124  ; 06-07; 11823
 //var i = 11824 ; 07-08; 12523
 //var i = 12524 ; 08-09; 13223
 // var i = 13224 ; 09-10; 13223
 //var i = 13924 ; 10-11; 14623
  //var i= 14624 ; 11;12; 15323

  /** 2023 */ 
  //var i = 15324 ; 01-01; 15-01
  //var i = 16024 ; 15-01; 01-02
  //var i = 16724 ;15-02; 28-02
 // var i = 17424   ; 01-02; 15-02
  //var i = 18124 ; 28-02; 15-03
  //var i= 18824 ; 
  //  var i = 19488 ; 31-03; 15-04
   // var i = 20171 ; 15-04 ; 30 -04
   // var i = 20871   ; 30 -04; 15-05
   // var i = 21571   ; 15-05 ;25- 05 
   // var i = 22269 ; 25-05; 05-06
    var i = 22969
  categories.items.forEach((item)=> {
     var search = YouTube.Search.list("snippet,id",{regionCode:"PK", maxResults: 50, location: "30.3753,69.3451",
      locationRadius: "500km" ,
      relevanceLanguage: "en",
      order: "viewCount",
      type: [
        "video"
      ],
      videoCategoryId: item.id,
       publishedAfter:"2023-06-05T00:00:00Z",
       publishedBefore:"2023-06-15T00:00:00Z"},
     );
     
     if(search.items.length){
      var results = search.items.map((searchItem)=>[searchItem.id.videoId,stripEmojis(searchItem.snippet.title).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') ,searchItem.snippet.description?stripEmojis(searchItem.snippet.description.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')):'No Description',searchItem.snippet.publishedAt,item.snippet.title])
      
      var ids= results.map((id)=>id[0]).join(",");
     

      var stats = YouTube.Videos.list("snippet,contentDetails,statistics",{id:ids})

      var videoStats = stats.items.map((item)=>[item.snippet.tags?item.snippet.tags.join("|"):'No Tag',stripEmojis(item.snippet.channelTitle).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),item.contentDetails.duration,item.statistics.viewCount,item.statistics.likeCount?item.statistics.likeCount:0,item.statistics.commentCount?item.statistics.commentCount:0])
    
      activeSheet.getRange(i,1,results.length,results[0].length).setValues(results);
      activeSheet.getRange(i,6,videoStats.length,videoStats[0].length).setValues(videoStats);
      i = i+results.length;
     }else{
       Logger.log(`no results for category${item.snippet.title}`);
     }
    });
}

