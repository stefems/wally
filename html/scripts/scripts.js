function loadRecent() {
	var blogPostArea = document.getElementById("postArea");
	var xhttp = new XMLHttpRequest();
	var xmlDoc, txt, postRoot, posts;
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		xmlDoc = this.responseXML;
		postRoot = xmlDoc.getElementsByTagName("postList")[0];
		//TODO PERFORMANCE: Is it okay to get all of the posts
		//  like this and only use the first few?
		posts = xmlDoc.getElementsByTagName("postSummary");
		//Only run the recent ones
		for (i = 0; i < 15; i++) {
			//get the xml post element by index and pass it
			createPostSummaryHTML(posts[i], blogPostArea);
		}
    }
  };
  var date = new Date();
  var dateSeconds = date.getSeconds();
  var id = Math.random() * dateSeconds;
  dateSeconds = date.getSeconds();
  id *= dateSeconds;
  xhttp.open("GET", "../xml/posts.xml?t=" + id, true);
  xhttp.send();
}

function createPostSummaryHTML(XMLPostData, postAreaElement) {
	var postRoot = document.createElement("DIV");
	var postThumb = document.createElement("IMG");
	var postTitle = document.createElement("H2");
	var postDate = document.createElement("P");
	var postDescr = document.createElement("P");
	postRoot.className = "postSummaryRoot";
	postTitle.className = "postSummaryTitle";
	postDate.className = "postSummaryDate";
	postDescr.className = "postSummaryDescription";
	
	postTitle.innerHTML = XMLPostData.getElementsByTagName("title")[0].innerHTML;
	var thumbnails = XMLPostData.getElementsByTagName("imagePath");
	if (thumbnails.length != 0) {
		postThumb.src = thumbnails[0].innerHTML;
		postThumb.className = "img-thumbnail postSummaryThumb";
		postRoot.appendChild(postThumb);
	}
	postDate.innerHTML = XMLPostData.getElementsByTagName("date")[0].innerHTML;
	postDescr.innerHTML = XMLPostData.getElementsByTagName("summaryText")[0].innerHTML;
	
	postRoot.appendChild(postTitle);
	postRoot.appendChild(postDate);
	postRoot.appendChild(postDescr);
	postAreaElement.appendChild(postRoot);
	
	



}