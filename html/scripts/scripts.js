$(document).ready(readyFunction);

	/* remove me! */
	var postNumberLoaded = 0;
function readyFunction() {
	prepareLinks();
	loadMore();

	function removeFilter() {
		$("#searchInput").val("");
		refreshPosts();
		loadMore();
	}

	function setFilter(filterString){
		//splice the string on commas
		filterString = filterString.replace(/ /g, '');
		let tagsEntered = filterString.split(",");
		refreshPosts();
		loadMore(tagsEntered);
	}

	function tagsMatch(postElement, tags) {
		let postTags = postElement.getElementsByTagName("tag");
		//loop through postTags and perform lookup in tags on each
		for (let i = 0; i < postTags.length; i++) {
			for (let j = 0; j < tags.length; j++) {
				if (postTags[i].innerHTML.toLowerCase() == tags[j].toLowerCase()) {
					return true;
				}
			}
		}
		return false;
	}

	function resetPage() {
		var stateObj = { location: window.location.href };
		history.pushState(stateObj, "", "/");
		var postPageDiv = document.getElementById("postPageElement");

		//if post page is shown, remove it, and show the post summary
		if (window.getComputedStyle(postPageDiv).getPropertyValue("display") !== "none") {
			postPageDiv.removeChild(postPageDiv.childNodes[1]);
			//post page div has been removed, now hide the post element
			$("#postPageElement").css('display', 'none');
			$("#postAreaParent").css('display', 'block');
		}
	}

	function refreshPosts() {
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
	}

	function loadMore(tags) {
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
				//Only run the recent ones TODO Asynchronous JS?
				for (i = postNumberLoaded; i < postNumberLoaded + 15; i++) { 
					//if we're out of posts :(
					if (posts.length === i) {
						var loadMoreButton = document.getElementById("loadMoreButton");
						loadMoreButton.style.display = "none";
						break;
					}
					else {
						if (typeof tags != "undefined") {
							if (tagsMatch(posts[i].getElementsByTagName("tags")[0], tags) ) {
								createPostSummaryHTML(posts[i], blogPostArea);
							}	
						}
						else {
							createPostSummaryHTML(posts[i], blogPostArea);
						}
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
		var tagsIcon = document.createElement("I");
		var postTitle = document.createElement("H2");
		var postDate = document.createElement("P");
		var postDescr = document.createElement("P");
		var postURL = document.createElement("A");
		var postURLSpan = document.createElement("SPAN");
		var postTagSpan = document.createElement("SPAN");
		//Setting the classes for the elements
		postRoot.className = "postSummaryRoot";
		postTitle.className = "postSummaryTitle";
		postDate.className = "postSummaryDate";
		postDescr.className = "postSummaryDescription";
		postContent.className = "postSummaryContent";
		postURLSpan.className = "postSummarySpan";
		postTagSpan.className = "postTagSpan";
		tagsIcon.className = "fa fa-tags";
		//Assigning values to the elements
		var postPageName = XMLPostData.getElementsByTagName("url")[0].innerHTML;
		postTitle.innerHTML = XMLPostData.getElementsByTagName("title")[0].innerHTML;
		postURLSpan.onclick = function () {
			loadPostPage(postPageName, postTitle.innerHTML.replace( / /g, "-"), true);
		};
		//postURL.href = XMLPostData.getElementsByTagName("url")[0].innerHTML;
		//postURL.appendChild(postURLSpan);
		postDate.innerHTML = XMLPostData.getElementsByTagName("date")[0].innerHTML;
		postDescr.innerHTML = XMLPostData.getElementsByTagName("summaryText")[0].innerHTML;
		var tags = XMLPostData.getElementsByTagName("tags")[0];
		tags = tags.getElementsByTagName("tag");
		postTagSpan.appendChild(tagsIcon);
		for (let i = 0; i < tags.length; i++) {
			postTagSpan.appendChild(document.createTextNode(tags[i].innerHTML + " "));
		}
		//Append Content Elements to Content Div
		postContent.appendChild(postTitle);
		postContent.appendChild(postTagSpan);
		postContent.appendChild(postDate);
		postContent.appendChild(postDescr);
		//Append postContent to root, root to post area
		//postRoot.href = XMLPostData.getElementsByTagName("url")[0].innerHTML;
		//postRoot.appendChild(postURL);
		postRoot.appendChild(postURLSpan);
		postRoot.appendChild(postContent);
		postAreaElement.appendChild(postRoot);
	}

	function loadPostPage(postPageName, postTitle, shouldAddState) {
		//hide the post parent, the list of post parents
		$("#postAreaParent").css('display', 'none');
		//load the data into the post page element
		$("#postPageElement").load("../postPages/" + postPageName);
		//show the post page element
		$("#postPageElement").css('display', 'block');
		//maybe rename the text on the button and change the function to reset the page
		$("#loadMoreButton").css('display', 'none');
		var stateObj = { location: postPageName};
		history.pushState(stateObj, "", "/posts/" + postPageName);
		if (shouldAddState == true) {
			historyStack.push(postPageName);
		}
		console.log("adding to history stack: " + historyStack);
	}

	function prepareLinks() {
		$('.up').click(function(){
		    $("html, body").animate({ scrollTop: 0 }, 600);
		    return false;
	 	});
	 	$('.search').click(function(){
	 		$("#searchBar").slideDown();
	 		$('.search').css("display", "none");
	 		$("#searchInput").focus();
	 	});
	 	$('.close').click(function(){
	 		$("#searchBar").slideUp();
	 		$('.search').css("display", "inline");
	 		removeFilter();
	 	});
	 	/*$( "#searchInput" ).on("change paste keyup", function() {
	 		//event.preventDefault();
	 		setFilter($( "#searchInput" ).val());
	 	});*/
	 	$("#searchForm").on("submit", function() {
	 		$("#searchInput").blur();
	 		setFilter($( "#searchInput").val());
	 		return false;
	 	});
	 	$("#loadMoreButton").click(loadMore);
	 	$("#desktopTitle").click(resetPage);

	}
	window.onpopstate = function(event) {
		console.log("popstate triggered");
		console.log("current stack: " + historyStack);
		var previousState = historyStack[historyStack.length - 2];
		console.log("previous state: " + previousState);
		historyStack.splice(-1,1)
		console.log("trimmed stack: " + historyStack);
		//get state event and load the url
		if ( previousState == "http://whilefalse.io/") {
			console.log("going home!");
			resetPage();
		}
		else if (typeof previousState != "undefined"){
			console.log("going to page: " + previousState);
			loadPostPage(previousState, '', false);
		}
		else {
			console.log("state is undefined");
			console.log(window.history);
			window.history.back();
		}
	};
}



let historyStack = [window.location.href];

