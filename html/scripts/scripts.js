/* remove me! */
var postNumberLoaded = 0;

function onMobileTagClick(tagSelected) {
	resetPage();
	//get the element
	var tagIcon = tagSelected.childNodes[1];
	//if the tag is marked, remove the mark
	if (tagIcon.className.includes("marked")) {
		tagIcon.className = tagIcon.className.split("marked")[0];
		//modify the parent too
		tagSelected.style.backgroundColor = "white";
	}
	//else if the tag is not marked, mark it
	else {
		tagIcon.className += " marked";
		tagSelected.style.backgroundColor = "grey";
	}
	refreshPosts();
}

function resetPage() {
	var postPageDiv = document.getElementById("postPageElement");
	//if post page is shown, remove it, and show the post summary
	if (window.getComputedStyle(postPageDiv).getPropertyValue("display") !== "none") {
		postPageDiv.removeChild(postPageDiv.childNodes[0]);
		$("#postAreaParent").css('display', 'block');
	}
}

/*TODO: Phase out the number system and only use the strikethrough quality */
var onMenuTagClick = ( function () {
	
	var tagList = {Code:-1, Coffee:-1, Humor:-1, Career:-1};

	return function(tagSelected) {
		resetPage();
		var tagsSelected = 0;
		//determine number of tags selected(==1)
		Object.keys(tagList).forEach(function (key) {
			if (tagList[key] === 1) {
				tagsSelected += 1;
			}
		});
		//if tag is -1, meaning neutral state, meaning strike out others, set them to 0, set him to 1
		if (tagList[tagSelected] === -1) {
			//set the value to 1
			tagList[tagSelected] = 1;
			//set others to 0, mark the selected tag
			Object.keys(tagList).forEach(function (key) {
				if (tagSelected !== key) {
					tagList[key] = 0;
					document.getElementById(key).style.setProperty("text-decoration", "line-through");
				}
			});		
		}
		//else if tag is 0, and not last guy to be added, meaning it shouldnt be struck through, should be 1
		else if ( (tagList[tagSelected] === 0) && ((tagsSelected < 3)) ){
			tagList[tagSelected] = 1;
			document.getElementById(tagSelected).style.setProperty("text-decoration", "none");
		}
		// else if tag is 1 and not last, set to 0 and strike out
		else if ( (tagList[tagSelected] === 1) && (tagsSelected > 1) ) {
			tagList[tagSelected] = 0;
			document.getElementById(tagSelected).style.setProperty("text-decoration", "line-through");
		}
		//else if tag is 1 and last, or if tag is 0 and last, reset to neutral
		else if ( ((tagList[tagSelected] === 1) && (tagsSelected === 1)) || ((tagList[tagSelected] === 0) && (tagsSelected === 3)) ) {
			Object.keys(tagList).forEach(function (key) {
				tagList[key] = -1;
				document.getElementById(key).style.setProperty("text-decoration", "none");
			});
		}
		refreshPosts();
		return tagList;
	}
})();

function getSelectedTagsViaMenu() {
	console.log("calling getSelectedTagsViaMenu()");
	var tagList = [];
	var menuItems = [];
	var isMobile = false;
	if (window.getComputedStyle(document.getElementsByClassName("mobileFooter")[0]).getPropertyValue("display") !== "none") {
		console.log("is mobile");
		isMobile = true;
	}
	if (isMobile) {
		menuItems = document.getElementsByClassName("marked");
		//loop through the marked elements and get/modify their ids
		for (var i = 0; i < menuItems.length; i++) {
			tagList.push(menuItems[i].id.split("Mobile")[0]);
		}
		//if the mobile list is empty
		if (menuItems.length === 0){
			tagList = ['Coffee', 'Code', 'Humor', 'Career'];
		}
	}
	else {
		menuItems = document.querySelectorAll('.menuDiv, .menuDivEnd');
		//loop through the elements and determine what is not striked
		for (var i = 0; i < 4; i++) {
			var tagStyle = menuItems[i].getAttribute("style");
			if (tagStyle === null) {
				tagList.push(menuItems[i].getAttribute("id"));
			}
			else if (tagStyle.includes("none")) {
				tagList.push(menuItems[i].getAttribute("id"));
			}
		}
	}
	return tagList;
}

function getPostsByTag(postElements) {
	var newPostList = [];
	var tags = getSelectedTagsViaMenu();
	//go through the postElements and remove those without the matching tags
	for (var i = 0; i < postElements.length; i++) {
		//get the tags of the xml element
		var XMLtags = postElements[i].getElementsByTagName("tag");
		//go through the tags of the xml element and see if they exist in the tag listStyleType
		for (var j = 0; j < XMLtags.length; j++) {
			//if the current xml tag in the list of selected tags
			if (tags.indexOf(XMLtags[j].innerHTML) !== -1 ) {
				newPostList.push(postElements[i]);
				break;
			}
		}
	}
	return newPostList;
}

function refreshPosts() {
	console.log("calling refreshPosts()");
	//reset the counter for posts loaded
	postNumberLoaded = 0;
	//get the parent of the post area, the old post area
	var postParent = document.getElementById("postAreaParent");
	var postArea = document.getElementById("postArea");
	//create a new post area div
	var newPostArea = document.createElement("DIV");
	newPostArea.className = "col-md-9 blogPostArea";
	newPostArea.id = "postArea";
	//replace the div
	postParent.replaceChild(newPostArea, postArea);
	var loadMoreButton = document.getElementById("loadMoreButton");
	loadMoreButton.style.display = "block";
	//call load more
	loadMore();
}

function loadMore() {
	console.log("calling loadMore()");
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
			posts = getPostsByTag(posts);
			//Only run the recent ones TODO Asynchronous JS?
			for (i = postNumberLoaded; i < postNumberLoaded + 15; i++) { 
				//if we're out of posts :(
				if (posts.length === i) {
					var loadMoreButton = document.getElementById("loadMoreButton");
					loadMoreButton.style.display = "none";
					break;
				}
				else {
					//if the postXML has the right tag
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
	var postPageName = XMLPostData.getElementsByTagName("url")[0].innerHTML
	postURLSpan.onclick = function () {
		loadPostPage(postPageName);
	};
	postTitle.innerHTML = XMLPostData.getElementsByTagName("title")[0].innerHTML;
	var thumbnails = XMLPostData.getElementsByTagName("imagePath");
	if (thumbnails.length != 0) {
		postThumb.src = thumbnails[0].innerHTML;
		postThumb.className = "img-thumbnail postSummaryThumb";
		postRoot.appendChild(postThumb);
	}
	//postURL.href = XMLPostData.getElementsByTagName("url")[0].innerHTML;
	//postURL.appendChild(postURLSpan);
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
	//postRoot.href = XMLPostData.getElementsByTagName("url")[0].innerHTML;
	//postRoot.appendChild(postURL);
	postRoot.appendChild(postURLSpan);
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

function loadPostPage(postPageName) {
	//hide the post parent
	$("#postAreaParent").css('display', 'none');
	//load the data into the post page element
	$("#postPageElement").load("../postPages/" + postPageName);
	//show the post page element
	$("#postPageElement").css('display', 'block');
}