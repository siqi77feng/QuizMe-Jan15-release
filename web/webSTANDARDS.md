# Key:
1. [HTML](#html)
	* first lines
	* ordering
	* comments
  	* tags
  	* sections
  	* other
2. [CSS](#css)
  	* first lines
3. [JS](#js)
	* first lines
	* function naming

## HTML:
1. first lines
	* line 1 reads : <!DOCTYPE html>
	* line 2 reads : \<!-- fileName.html --\>
	* line 3 is empty
	* line 4 reads : \<html\>
	* line 5 reads : TAB \<head\>
	* and then it gets specific
	* 3rd to last line reads : TAB \</body\>
	* the 2nd to last line reads : \</html\>\<!-- fileName.html --\>
	* the last line is empty

2. Ordering
	* head
		* Load all meta tags
		* Load all style sheets
		* title
		* Load js file only if absolutely necessary
	* body
		* header
			- h1 header... required for google stuff
		* nav
		* div class="container"
		* footer
		* Load all other js files and traking APIs and such

3. comments

	\<!-- single line comment --\>

	note the spaces on each side of the comment

	\<!--

		Multi

		Line

		Comment

	--\>

4. tags
	* general tags:
		- \<tagtitle attribut="stuff" attribute="stuff"\>
		- Note the lack of spaces between '=' and the '<' '>' characters... this minimizes space usage
	* Special tags:
		- h_n, li, a :
			+ \<tag\>text\</tag\>
			+ Note that there are no spaces here.
		- link:
			+ \<link rel="Describe the purpose of the link" type="what kind of document is this?" href="localFilePath or website"\>
			+ Note that this has no end tage
		- div:
			+ \<div class="space separated classes in alphabetical order"\>

				filler

			\</div\>\<!-- div class="space separatedclasses in alphabetical order" --\>

5. sections:

The body section begins with :

	<body>

		<header class="mainHeader">
			<h1>The sites name i.e. QuizMe</h1>
		</header>

		more stuff... likely div separated

		<footer>

		</footer>

	</body>


6. Other
	* Script loading:
		- all js files should be loaded at the end of the body tag

## CSS:
1. ordering
  * Other and Standard
    - Clearfix
    - a interactions
    - button interactions
  * header
  * center
  * footer
2. colors
  * Use only rgba
3. file denotation

	/*

	\*	Section of css blocks

	*/

	psudo_tagName {

		key1 : value1;
		...
		keyn : valuen;

	}/* psudo_tagName */

## JS:
line 1 : # fileName.js
line 2 : # function prefix : fN

functionNameing
	should follow the function prefix and should be something related to the fileName
	e.g	
		fN_theFunctionsName
	this prevents us from statically overwriting functions by accident

