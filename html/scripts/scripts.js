var postNumberLoaded = 0;

function loadMore() {
	loadPosts(postNumberLoaded, postNumberLoaded + 15);
}
function loadMore() {
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
		for (i = postNumberLoaded; i < postNumberLoaded + 15; i++) {
			//if we're out of posts :(
			if (posts.length == i) {
				var loadMoreButton = document.getElementById("loadMoreButton");
				loadMoreButton.style.display = "none";
				break;
			}
			else {
				//get the xml post element by index and pass it
				createPostSummaryHTML(posts[i], blogPostArea);
			}
			
		}
		postNumberLoaded += 15;
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
	var postContent = document.createElement("DIV");
	var postThumb = document.createElement("IMG");
	var postTitle = document.createElement("H2");
	var postDate = document.createElement("P");
	var postDescr = document.createElement("P");
	var postURL = document.createElement("A");
	var postURLSpan = document.createElement("SPAN");
	//Setting the classes for the elements
	postRoot.className = "postSummaryRoot";
	postTitle.className = "postSummaryTitle";
	postDate.className = "postSummaryDate";
	postDescr.className = "postSummaryDescription";
	postContent.className = "postSummaryContent";
	postURLSpan.className = "postSummarySpan";
	//Assigning values to the elements
	postTitle.innerHTML = XMLPostData.getElementsByTagName("title")[0].innerHTML;
	var thumbnails = XMLPostData.getElementsByTagName("imagePath");
	if (thumbnails.length != 0) {
		postThumb.src = thumbnails[0].innerHTML;
		postThumb.className = "img-thumbnail postSummaryThumb";
		postRoot.appendChild(postThumb);
	}
	postURL.href = XMLPostData.getElementsByTagName("url")[0].innerHTML;
	console.log(postURL.href);
	postURL.appendChild(postURLSpan);
	postDate.innerHTML = XMLPostData.getElementsByTagName("date")[0].innerHTML;
	postDescr.innerHTML = XMLPostData.getElementsByTagName("summaryText")[0].innerHTML;
	var tags = XMLPostData.getElementsByTagName("tags")[0];
	tags = tags.getElementsByTagName("tag");
	//Append Content Elements to Content Div
	postContent.appendChild(postTitle);
	createTagSpan(tags, postContent);
	postContent.appendChild(postDate);
	postContent.appendChild(postDescr);
	//Append postContent to root, root to post area
	//console.log(XMLPostData.getElementsByTagName("url")[0].innerHTML);
	//postRoot.href = XMLPostData.getElementsByTagName("url")[0].innerHTML;
	postRoot.appendChild(postURL);
	postRoot.appendChild(postContent);
	postAreaElement.appendChild(postRoot);
}

function createTagSpan(tagList, contentElement) {
	var postTags = document.createElement("DIV");
	//for all of the tags in the tags element
	for (var i = 0; i < tagList.length; i++) {
		
		//get the tag value
		var currentTag = tagList[i].innerHTML;
		//create element
		var tagIcon = document.createElement("I"); 
		//switch statement to create element and assign tag class
		switch (currentTag) {
			case "Code":
				tagIcon.className = "fa fa-terminal";
				break;
			case "Career":
				tagIcon.className = "fa fa-black-tie";
				break;
			case "Humor":
				tagIcon.className = "fa fa-smile-o";
				break;
			case "Coffee":
				tagIcon.className = "fa fa-coffee";
				break;
			default:
				tagIcon.className = "fa fa-exclamation-triangle";
				break;
		}
		//append to postTags
		postTags.appendChild(tagIcon);
		postTags.className = "postSummaryTagContainer";
	}
	//append to contentElement
	contentElement.appendChild(postTags);
	
}