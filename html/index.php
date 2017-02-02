<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Bah, come back later.</title>
		<?php include("head.php"); ?>
		<?php include("routing.php"); ?>
	</head>
	<body>
		<div class="container">
			<div class="menuContainer">
				<div class="titleDiv">
					<h1 id="desktopTitle">While False</h1>
					<a name="desktopTitle" style="display:none"></a>
					<i id="searchDesktop" class="fa fa-search fa-2x search" aria-hidden="true"></i>
					<!-- TODO: Random phrase below title on load?-->
						<form id="searchForm">
							<input id="searchInput" type="text" placeholder="java, humor, machine-learning">
							<i id="closeSearch" class="fa fa-times-circle fa-2x close" aria-hidden="true"></i>
						</form>
				</div>
			</div>
			<div id="postContainer">
				<div id="postAreaParent">
					<!-- blog content column-->
					<div id="postArea" class="blogPostArea">
						<!-- POSTS LOAD HERE -->
					</div>
					<button id="loadMoreButton" type="button" class="btn btn-primary" data-tags="" data-lastpostloaded="" data-shouldshow="true">Load More!</button>
				</div>
				<div id="postPageElement">
					<!-- ACTUAL POST LOADS HERE -->
				</div>
			</div>
		</div>
		<div class="footer">
			<!--<i id="searchMobile" class="fa fa-search fa-5x search" aria-hidden="true"></i>-->
			<i id="upDesktop" class="fa fa-arrow-up fa-3x up" aria-hidden="" ></i>
			<!--<i id="upMobile" class="fa fa-arrow-up fa-5x up" aria-hidden="true" ></i>-->
		</div>
	</body>
	<script src="scripts/jquery.js"></script>
	<script src="scripts/scripts.js"></script>
</html>
