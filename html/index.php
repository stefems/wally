<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Bah, come back later.</title>
		<?php include("head.php"); ?>
	</head>

	<body onload="loadMore()">
		<?php include("menu.php"); ?>
		   <div class="container">
				<div class="row" id="postAreaParent">
					<!-- blog content column-->
					<div id="postArea" class="col-md-9 blogPostArea">
						
					</div>
					<!-- blog sidebar column-->
					<div class="col-md-3 blogSideBar">
						
					</div>
				</div>
				<button id="loadMoreButton" onclick="loadMore()" type="button" class="btn btn-primary">Load More!</button>
		   </div>


	</body>
	<footer>
		<?php include("footer.php"); ?>
	</footer>
</html>
