<?php
	/*
	The following function will strip the script name from URL i.e.  http://www.something.com/search/book/fitzgerald will become /search/book/fitzgerald
	*/
	function getCurrentUri()
	{
		$basepath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
		$uri = substr($_SERVER['REQUEST_URI'], strlen($basepath));
		if (strstr($uri, '?')) $uri = substr($uri, 0, strpos($uri, '?'));
		$uri = '/' . trim($uri, '/');
		return $uri;
	}

	$base_url = getCurrentUri();
	if ($base_url != "/") {
		//echo "<p id='phpURL' style='display: none;'>" . $base_url . "</p>";
		echo "<p id='phpURL' style='display: none;'>" . $base_url . "</p>";
	}
	else {
		echo "<p id='phpURL' style='display: none;'></p>";
	}

?>