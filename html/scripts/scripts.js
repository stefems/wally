$(document).ready(readyFunction);
let historyStack = [];

function readyFunction() {


	let postLimit = 15;
	prepareLinks();
	loadFromExternal();

	function loadFromExternal() {
		let urlElement = document.getElementById("phpURL");
		let url = urlElement.textContent;
		let testElement = document.getElementById("phpURL");
		let test = testElement.textContent;
		console.log("test: " + url);
		if (url != "") {
			console.log("loading from external");
			let fileTitle = url.substring(1);
			let fileToLoad = fileTitle + ".php";
			historyStack = [fileToLoad];
			loadPostPage(fileToLoad, false);
		}
		else {
			historyStack = [window.location.href];
			let stateObj = {location: window.location.href};
			history.pushState(stateObj, "", "/");
			console.log("not loading from external");
			loadMore("", -1);
		}
	}

	function internalLink() {
		let link = $(this).data("postpagename");
		console.log("internalLink() to " + link);
		loadPostPage(link, true)
	}

	function removeFilter() {
		$("#searchInput").val("");
		clearPosts();
		loadMore("", -1);
	}

	function setFilter(filterString) {
		filterString = filterString.replace(/ /g, '');
		$("#loadMoreButton").data("tags", filterString);
		let tagsEntered = filterString.split(",");
		clearPosts();
		loadMore(tagsEntered, -1);
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
		console.log("resetPage()");
		var stateObj = { location: window.location.href };
		history.pushState(stateObj, "", "/");
		var postPageDiv = document.getElementById("postPageElement");
		if (historyStack[historyStack.length - 1] != "http://whilefalse.io/") {
			historyStack.push("http://whilefalse.io/");
		}
		console.log("current stack: " + historyStack);
		if (historyStack[0] != "http://whilefalse.io/") {
			console.log("from external, going back");
			loadMore("", -1);
		}
		//if post page is shown, remove it, and show the post summary
		if (window.getComputedStyle(postPageDiv).getPropertyValue("display") !== "none") {
			postPageDiv.removeChild(postPageDiv.childNodes[1]);
			//post page div has been removed, now hide the post element
			$("#postPageElement").css('display', 'none');
			$("#postAreaParent").css('display', 'block');
		}
		if ($("#loadMoreButton").data("shouldshow") == "true") {
			$("#loadMoreButton").removeClass("buttonHidden");
		}
	}

	function clearPosts() {
		console.log("clearPosts()");
		//reset the counter for posts loaded
		postNumberLoaded = 0;
		//get the parent of the post area, the old post area
		var postParent = document.getElementById("postAreaParent");
		var postArea = document.getElementById("postArea");
		//create a new post area div
		var newPostArea = document.createElement("DIV");
		newPostArea.className = "blogPostArea";
		newPostArea.id = "postArea";
		//replace the div
		postParent.replaceChild(newPostArea, postArea);
		$("#loadMoreButton").removeClass("buttonHidden");
		$("#loadMoreButton").data("shouldshow", "true");
	}

	function loadMore(tags, lastPostNumberLoaded) {
		console.log(tags);
		let postLimit = 1;
		let postsLoaded = 0;
		console.log("loadMore()");
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
				posts = [].slice.call(posts);
				if (lastPostNumberLoaded != -1) {
					posts = posts.slice(lastPostNumberLoaded);
					console.log("posts getting sliced");
				}
				let finalPostNumber = 0;
				let postsRemaining = false;
				if (posts.length != 0) {
					postsRemaining = true;
				}
				let i = 0;
				console.log("posts to parse: " + posts.length);
				while (postsRemaining && (postsLoaded != postLimit) ) {
					console.log(i);
					if (i != posts.length) { 
						if (tags != "") {
							if (tagsMatch(posts[i].getElementsByTagName("tags")[0], tags) ) {
								createPostSummaryHTML(posts[i], blogPostArea);
								console.log("tagged post added " + posts[i].getElementsByTagName("postNumber")[0]);
								postsLoaded++;
							}	
						}
						else {
							createPostSummaryHTML(posts[i], blogPostArea);
							console.log("non-tagged post added " + posts[i].getElementsByTagName("postNumber")[0]);
							postsLoaded++;
						}
						finalPostNumber = +posts[i].getElementsByTagName("postNumber")[0].innerHTML;
						i++;
					}
					else {
						postsRemaining = false;
					}
				}
				console.log("final: " + finalPostNumber);
				if (postsRemaining == false) {
					console.log("all posts considered.");
					$("#loadMoreButton").data("shouldshow", "false");
					$("#loadMoreButton").addClass("buttonHidden");
				}
				$("#loadMoreButton").data("lastpostloaded", finalPostNumber);
			}
		};
		var date = new Date();
		var dateSeconds = date.getSeconds();
		var id = Math.random() * dateSeconds;
		dateSeconds = date.getSeconds();
		id *= dateSeconds;
		xhttp.open("GET", "../.xml/posts.xml?t=" + id, true);
		xhttp.send();
	}

	function loadMoreViaButton() {
		let tags = $("#loadMoreButton").data("tags").split(",");
		loadMore(tags, $("#loadMoreButton").data("lastpostloaded"));
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
			loadPostPage(postPageName, true);
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

	function loadPostPage(postPageName, shouldAddState) {
		console.log("loadPostPage()");
		console.log("history stack: " + historyStack);
		//hide the post parent, the list of post parents
		$("#postAreaParent").css('display', 'none');
		//load the data into the post page element
		$("#postPageElement").load("../postPages/" + postPageName, function() {
			$(".internalLink").click(internalLink);
		});
		//show the post page element
		$("#postPageElement").css('display', 'block');
		//maybe rename the text on the button and change the function to reset the page
		$("#loadMoreButton").addClass('buttonHidden');
		var stateObj = { location: postPageName};
		history.pushState(stateObj, "", postPageName.split(".php")[0]);
		console.log(shouldAddState);
		if (shouldAddState == true) {
			historyStack.push(postPageName);
		}
		console.log("history stack: " + historyStack);
	}

	function prepareLinks() {
		console.log("prepareLinks()");
		$("#loadMoreButton").data("shouldshow", "true");
		$('.up').click(function(){
		    $("html, body").animate({ scrollTop: 0 }, 600);
		    return false;
	 	});
	 	$('.search').click(function(){
	 		$(".close").css("display", "block");
	 		$("#searchForm").slideDown();
	 		$('.search').css("display", "none");
	 		$("#searchInput").focus();
	 	});
	 	$('.close').click(function(){
	 		$(".close").css("display", "none");
	 		$("#searchForm").slideUp();
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
	 	$("#loadMoreButton").click(loadMoreViaButton);
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
			loadPostPage(previousState, false);
		}
		else {
			console.log("state is undefined");
			console.log(window.history);
			window.history.back();
		}
	};
}