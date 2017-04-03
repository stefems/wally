<html>
	<div class="postContainer">
		<h1>How I made it: A Twitter Bot that Recommends Bands</h1>
		<h2 class="postSummaryDate">016-03-14</h2>
		<span class="postTagSpan"><i class="fa fa-tags"></i>Music Bots Twitter Node</span>
		<div class="medium"><a class="mediumLink" href="https://medium.com/@stefmaxko/how-i-made-it-a-twitter-bot-that-recommends-bands-d4767b37764e#.sz8si8smc"><i class="fa fa-medium" aria-hidden="true"></i><span>Read</span></a></div>
		<a href="https://twitter.com/share" class="twitter-share-button twitterLink" data-show-count="false"><i class="fa fa-twitter" aria-hidden="true"></i></a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

		<img class="postImage" src="../postImages/panthermartin.jpeg" alt="pantherMartin"/>
		
		<p class="imageText">Denver band <a href="https://www.facebook.com/panthermartinband/">Panther Martin</a></p>
		
		<h2>Hold on… what's a Twitter Bot?</h2>

<p>Twitter bots come in all <a href="https://medium.com/@stefmaxko/twitter-bots-a-curated-collection-235edd07ea0b">shapes and sizes</a>, from art bots to poetry bots to spam bots to headline bots. What they share in common is that there's no human that does the posting, liking, or retweeting. All of the activity on the Twitter account is done via scheduled programs, and the responses and tweets are generated from a variety of sources all over the web. Hit the link in the sentence above to see a neat survey of some of my favorite Twitter bots.</p>

<h2>Cool, cool… so what's this about music? You had me at the music.</h2>

<p>Yeah, yeah, we're getting there. So we all discover music in a variety of ways, through word-of-mouth (pic related), through services like Spotify's discover weekly, or through music streaming via Pandora. There's also SoundCloud and bandcamp, which are my go-to's for finding music because they emulate the search for music in a record store. You've got to dig, read, and hit up the listening station, and then you go back to digging and then you listen again and then finally, finally, finally you find a few bands that you're absolutely crazy about.</p>

<img class="postImage" src="https://cdn-images-1.medium.com/max/1200/1*_vry8HlHvf3AbIKB2F_EtQ.jpeg" alt="written"/>

<p class="imageText">These are my word-of-mouth band recommendations from just the last week. (psst: listen to Gauntlet Hair and Broncho)</p>

<p>That record store process sounds laborious, I know, I know, but it's infinitely more satisfying. So. So! Instead of manually trawling through bandcamp, I made a bot to help out a little bit. You send it tagged genres, and it finds a random album, new or old, with those tags you used. No commitments, no limits, just an easy way to find albums with the genres you like. It's that simple.</p>

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://twitter.com/stefmaxko">@stefmaxko</a> <a href="https://t.co/BcUQi5lXEs">https://t.co/BcUQi5lXEs</a> <a href="https://twitter.com/hashtag/instrumental?src=hash">#instrumental</a> <a href="https://twitter.com/hashtag/hiphop?src=hash">#hiphop</a> <a href="https://twitter.com/hashtag/abstract?src=hash">#abstract</a> <a href="https://twitter.com/hashtag/boombap?src=hash">#boombap</a> <a href="https://twitter.com/hashtag/electronic?src=hash">#electronic</a> <a href="https://twitter.com/hashtag/hiphoprap?src=hash">#hiphoprap</a></p>&mdash; band bot (@thebandbot) <a href="https://twitter.com/thebandbot/status/839876922087784453">March 9, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<p>You can also use locations to find bands from certain cities or countries, and you can mix and match as many genres as you'd like. bandcamp is awesome because it also lets you listen to the album inside the tweet itself. (And inside this page! Muahahaha!)</p>

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="https://twitter.com/stefmaxko">@stefmaxko</a> <a href="https://t.co/oaJf744JdV">https://t.co/oaJf744JdV</a> <a href="https://twitter.com/hashtag/paris?src=hash">#paris</a> <a href="https://twitter.com/hashtag/newwave?src=hash">#newwave</a> <a href="https://twitter.com/hashtag/synthpop?src=hash">#synthpop</a> <a href="https://twitter.com/hashtag/punk?src=hash">#punk</a> <a href="https://twitter.com/hashtag/coldwave?src=hash">#coldwave</a> <a href="https://twitter.com/hashtag/darkfolk?src=hash">#darkfolk</a> <a href="https://twitter.com/hashtag/postpunk?src=hash">#postpunk</a></p>&mdash; band bot (@thebandbot) <a href="https://twitter.com/thebandbot/status/839574023784771584">March 8, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<h2>Nice. You're not going to get all technical are you?</h2>

<p>OH, I think it's <i>time</i>. Let's break it down into a few components:</p>
<ol>
    <li>Twitter bot basic setup and hosting</li>
    <li>"Streaming" for tweets with the bot's username</li>
    <li>Finding the band</li>
    <li>Generating the response</li>
</ol>

<h2>You say it's a basic setup but I'm wary.</h2>

<p>It's not too hard, I promise. Others have written excellent write-ups on how to use Node.js to get the job done. Refer to those! I'll write a basic summary in case you're just curious.</p>

<p>The first thing you'll need to do is make the Twitter account and verify it with a phone number. Then you'll register the account as a Twitter application. You'll then be able to generate some API keys that we'll use later. If you're using Node.js you'll want to create a quick project, install some packages for using the Twitter API, plug in the keys, and start sending requests. You'll be able to tweet, retweet, and "stream", which is our next step we're talk about soon. Before we do that it might be a good idea to put your code onto Heroku and set it up as a worker task (because a front-end isn't necessary for this app, we just need it to be "online" and alive at all times for the "streaming.")</p>

<h2>Streaming? Streaming what?</h2>

<p>Right, so when a Twitter bot is streaming it's looking for tweets right now in the moment. If it's streaming and looking for tweets with its name in it, it can react to those tweets in real time. That's the idea. My bot needed to respond whenever someone tweeted at it, so I set the bot up to be streaming at all times.</p>

<div class="codeBlock"><code>var stream = Twitter.stream('statuses/filter', { track: "@thebandbot"});<br>
console.log("We're streaming, fam!");</code></div>

<h2>Okay, I gotchya. So now the bot is "alive" and listening for tweets that mention it?</h2>

<p>You got it! So now we need to get the hashtags the user entered in the tweet that mentioned us. Once we get those tags we'll want to determine if they're valid genres or locations. bandcamp has hundreds and hundreds of genres and locations in their tag database, so I did some web scraping to acquire most of them. Their "tags" page shows most of those tags and I just did a single page scrape for the tags I needed. Web scraping is a tricky subject area. It's the practice of using a program to read and record the content on web pages. Google does it all of the time, so it's basically fair-game, right? Not quite. Google actually temporarily banned my IP address for web scraping once.</p>

<img class="postImage" src="https://cdn-images-1.medium.com/max/1200/1*Sls8vM4m6JC0BGa3e0Y-IQ.png" alt="google"/>

<p class="imageText">Yup. Google blocked me from using Google, for doing the very same thing that made Google famous: web scraping.</p>

<p>If you load pages for carrying out scraping too often you can harm the website's servers, and some websites don't like to be scraped at <i>all</i>. If you engage in web scraping, do it with respect. I ended up evading that temporary ban because I have a VPN application that lets me modify my IP address; it's an essential tool for doing anything related to scraping on the web. I also learned how to web scrape with respect, which is probably something you'll want to do from the start…</p>

<p>Once we validate the tags we can use those to create some urls to album listings for those tags. bandcamp has a super simple system for finding album listings based on tags:</p>

<ul>
<li>bandcamp.com/tag/shoe-gaze</li>

<li>bandcamp.com/tag/ambient</li>

<li>bandcamp.com/tag/london</li>
</ul>

<p>If the genre or location is a single word, tack it onto the end of the url. If it has a space, replace the space with a hyphen. When you load the page you'll get a listing of albums with that tag. You can also go to the next page. The following pages will have a little bit of extra stuffs for the page number but it's nothing complex. I used a random number generator for picking a random page and for picking a random album on that page. This worked really well when the use only gave me one genre… but how could I find a band that had multiple genres? My first approach was to go through the listings for the first genre and randomly check if that album had the other tags as well. It often didn't… and so this approach for finding a matching album was lousy and also loaded way too many pages for scraping.</p>

<p>Round 2. I realized that if I loaded the album listing page for each tag the user tweeted and looked for duplicate albums across all of the pages I'd effectively find an album with the appropriate tags. Sometimes I'll have to load multiple pages for each tag, but that added up to a much smaller load number than the previous approach. I added a few seconds of delay between page loads to assuage the web scraping as well (I didn't want to get banned again! blegh!)</p>

<h2>Wow. So you were able to minimally scrape bandcamp in order to find an album with multiple, unique tags?</h2>

<p>Yup yup. The final part was just replying to the user with the link to the album. I parsed the tags for that album using web scraping again and put those tags in the tweet to add some extra hashtags, and that's it. I needed to have some error replies as well if the user tweeted at my bot without tags or without tags that were valid too. But besides that, the bot was working!</p>

<img class="postImage" src="https://cdn-images-1.medium.com/max/1200/1*IN9s57EXVfze5dRaazbDNA.gif" alt="alive"/>


<p class="imageText">That's me on the left.</p>

<h2>Right-o, amigo. What's next for music stuffs?</h2>

<p>Uh, yeah, hmm… Well, someone already made a kickass bot for making Spotify playlists but I think that might be my next direction. Either that or a dedicated music app for discovering local bands!</p>

<p>*queue evil laughter*</p>

<img class="postImage" src="https://cdn-images-1.medium.com/max/1200/1*X8cd9GkLU88JIsGisk3rig.gif" alt="laugh"/>

<p>Thanks for reading!</p>

	</div>
</html>