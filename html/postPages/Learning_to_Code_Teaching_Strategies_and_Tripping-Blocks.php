<html>
	<div class="postContainer">
		<h1>Learning to Code: Tripping Blocks and Teaching Strategies</h1>
		<h2 class="postSummaryDate">2016-09-25</h2>
		<span class="postTagSpan"><i class="fa fa-tags"></i>Coding Teaching Learning</span>
		<div class="medium"><a class="mediumLink" href="https://medium.com/@stefmaxko/learning-to-code-tripping-blocks-and-teaching-strategies-1438587bcfcd#.57vh8fjnd"><i class="fa fa-medium" aria-hidden="true"></i><span>Read</span></a></div>
		<a href="https://twitter.com/share" class="twitter-share-button twitterLink" data-show-count="false"><i class="fa fa-twitter" aria-hidden="true"></i></a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<p>Learning programming is tricky stuff. I’ve been teaching people how to code for the past few months and I absolutely love it. I get to use my scars and war stories to help people jump hurdles as quickly and painlessly as possible, but sometimes my students trip and eat shit and I’m standing there in my baby blue track suit and I’m totally baffled as to how they fell down. *Take a moment to bask in this visual feast. Add details like male-pattern balding, chewing gum, and a confused facial expression.*</p>

<p>Uh, so yeah, I wanted to learn more about how people learn how to code and I found this neat study from Tampere University in Finland. This post will share the neat bits from the study and my own interpretations as a teacher and continuous learner. I’ve added references to the page of the study referenced too.</p>

<h2>We’ll start off by talking about problem-solving.</h2>
<p>
The study identifies some common habits people have when they’re new to programming (and when they’re problem-solving in general):</p>
<ol><li>
Stopping: Getting stuck and giving up.[2]</li>
<li>
Tinkering: Getting stuck and more or less randomly trying to solve the problem without having an intelligible approach.[2]</li>
</ol>

<p>Tons of occupations involve problem-solving but I would argue that the construction of a program is the very essence of problem-solving: you’re creating rules, constructs, and abstractions to generate behaviors or outputs. The medium of programming is logic itself, and so it would follow that a student’s approach to problem-solving will manifest itself in their code and in their approaches to coding.</p>
<p>“Robins et al. [27] stated that “Given that knowledge is (assumed to be) uniformly low, it is their preexisting strategies that initially distinguish effective and ineffective novices”. Prior knowledge and practices can also be a major source of errors, especially when trying to transfer a step-by-step problem-solving solution directly from a natural language into a program.” [2]
As this quote points out, sometimes problem-solving strategies don’t translate well into strategies easily replicated in code. That’s often the hardest thing about using any new medium: the student knows what they want to achieve and can articulate how they’ll achieve it in English, but when they sit down in front of the piano or in front of the computer, they end up overwhelmed. They get mentally removed from their strategy because the medium in front of them is foreign and fails to facilitate intuitive translation. When you’re teaching students, keep in mind how they’re going about solving the problems and encourage better habits. When their plans are lost in translation, help them use comments or pseudo-code to ease the translation.</p>
<h2>The study goes on to identify groups of concepts needed to understand programming.</h2>
<p>
Separating the different aspects of coding is useful in demystifying the complex beast that is “programming.” These categories can help teachers drill down through student’s confusions and determine where exactly they’re confused. I’ve used an analogy to Lego sets to provide some visualizations of how these groups are different.</p>
<ul>
<li>Variables, functions, and other core elements. The Lego Bricks.</li>
<li>Syntax and language-specific features. How the Lego Bricks snap together without breaking.</li>
<li>Logical Flow Elements. How to connect Lego pieces into a cohesive set or item, like a bridge, for example.</li>
<li>Debugging and Testing. How to figure out why your Lego bridge sucks.</li>
<li>Reading and Understanding Code. How to look at your Lego bridge or other bridges to understand why they work better than your lousy bridge.</li>
</ul>

<h2>The study also identified some cool tripping blocks,</h2>
<p>
 (well, not so cool, but noteworthy), and I’ve added my own thoughts here too.<p>
<ol>
<li>
Initializing variables is more confusing to students than updating or testing them. I think this might be because we give variables bogus values at initialization simply so that the variable isn’t null. Perhaps teachers need to explain why the values given at initialization are given, and how and why that value won’t end up interfering with our code. [3]
</li>
<li>
“Bugs within loops and conditionals, and also variables that are updated “behind the scenes” like iterators.” [3] Making it clear to students through visualizations when things are happening behind the scenes is essential, and make sure they draw out these visualizations to help them better understand the connections and when the iterators or lines of code are executed. Tracing out code is a valuable skill that learners of code need to be able to do as soon as possible.</li>
<li>“Expressions that look very similar but are evaluated differently, like the string “123” and the number 123 cause confusions because they obviously look the same and require a degree of detail to distinguish between.” [4] Understanding the different data types is a hassle, and it doesn’t help students if they’re not always thinking about code being literal. Humans don’t always think literally or even perceive things literally. It’s important to stress the literal nature of code to students and how they might want to look through things slowly in case they miss double quotes or other syntactical elements that are essential in correctly understanding code. In my own experience I’ve also seen that students get caught up on string literals versus variables and how variables or conditions get “evaluated” or converted into data at runtime. I like to use the browser inspector console to show how things are evaluated to students. Working in the code and then executing all of it at once doesn’t exactly allow for the easiest demonstration of the smaller details.</li>
<li>“Sometimes the approach to solve a program is wrong, and sometimes the implementation of the approach is wrong and approach itself is right. This is the “distinction between the model of the program as it was intended, and the model of the program, as it actually is.”[5] Students need to understand this distinction because it’s a fundamental aspect of programming and problem solving.

<li>I hate to break to it teachers out there, but Object Orientation doesn’t really make sense, despite the countless car analogies. “One of the claims for an object-oriented approach has been that it is the natural way of conceptualizing real-world problems. However, studies do not seem to support that [27]. Rist even suggests that object-oriented programming adds the complexity of class structure to a procedural system [26].” [5] Here’s an excerpt from the study that further talks about OO vs procedural languages: “Wiedenbeck et al. [31] studied students’ comprehension of procedural and object-oriented small programs. They used programs that were functionally similar, but written either in Pascal/C or C++. Students in two comparison groups studied the programs and then answered questions that tested their understanding of different features and states of the program. The results showed that the distributed nature of control flow and “hidden” actions (e.g. constructor or destructor calls) made it more difficult for novices to form a mental representation of an OO program than of a corresponding procedural program. The class structure of the OO program made it a bit easier to understand program entities [30], but especially program flow and data flow issues were easier to understand from a procedural program.”[5] This observation would argue that if you’re going to teach OO concepts, make sure the students have a solid procedural understanding first. Using visualizations to demonstrate connections between the classes and creation of objects might also be useful given that OO models have lots of moving parts.
</li>
<li>
Commenting is tricky too, despite it being seemingly straightforward. Students have a hard time “creating meaningful comments for the programs, often students just wrote a comment verbally describing the operation of a single code statement.”[6] This is also a larger issue among programmers in general: many argue that if people coded with greater clarity, comments wouldn’t even be necessary. While that sounds a bit idealistic, I would argue that comments are a great way to help summarize your already clear code to give the reader a gist as they skim through the lines. This article provides an interesting alternative to my opinion in that it encourages the replacement of comments with more detailed variable names and uses methods to further inform the actions being carried out. The gist of the article can be summarized by this quote: “I’d make the argument that trying to write code in a way that the code expresses the intent rather than relying on comments causes you to structure code in a better way which results in more cohesive classes and a better overall structure.” An interesting take. When we get back to the aspects of learning in relation to commenting, I’d encourage teachers to show examples of good comments. What is a good comment? Well, that's a post for another day.</li>
<li>
A final tripping block is understanding concepts and being able to apply those concepts. This hearkens back to the lost in translation discussion. “A student can learn to explain and understand a programming concept, e.g., what does a pointer mean, but still fails to use it appropriately in a program.”[4] “Even when they know how to solve the problem by hand, they have trouble translating it into an equivalent computer program.”[4] The solution the researchers took was to introduce programming elements in problem-specific scenarios to establish more of a context for the programming elements the students couldn’t seem to remember. This is called problem-based learning and there’s also some more intense stuff with problem-based learning where the problems are rather substantial and the students break into groups in order to tackle them. The point here is that programming is all about being able to apply the concepts and knowing when they’re needed. Using problems and small, sample-focused demonstrations can help give students a context for when and how concepts are applied.</li>

<p>Phew.</p>
<p>Oof.</p>
<p>Geeze.</p>
<p>We’ve covered a lot here. I guess the takeaways are these: understand your students’ problem-solving approaches, be able to identify precisely where they’re confused, anticipate what concepts will confuse them and why, and use examples and problems to ingrain and contextualize the concepts. Get out there and teach!</p>
	</div>
</html>