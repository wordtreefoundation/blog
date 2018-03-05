webpackJsonp([0x8ef2e1a3839c],{398:function(e,t){e.exports={data:{site:{siteMetadata:{title:"The WordTree Foundation",subtitle:"The WordTree Foundation studies the relationships between books, with a special interest in LDS scripture such as the Book of Mormon.",copyright:"",author:{name:"WordTree Foundation"},disqusShortname:"",url:"http://blog.wordtree.org"}},markdownRemark:{id:"/Users/duane/WordTree/wordtree.org/src/pages/articles/2015-03-29---using-textgrams-jl/index.md absPath of file >>> MarkdownRemark",html:'<p><a href="https://github.com/wordtreefoundation/TextGrams.jl">TextGrams.jl</a> is a library that we use to score the relatedness of 2 or more books based on their ngrams (i.e. phrases made up of “N” words in a row, where a useful value of N is 1 to about 4 or so).</p>\n<p>Here is a rundown of its use, from downloading books from archive.org to creating a baseline, and then comparing books.</p>\n<h3>Prerequisites</h3>\n<p>You should have <a href="http://julialang.org/downloads/">julia</a> installed, and optionally ruby for the following downloading books step.</p>\n<h3>Downloading 19th Century Books</h3>\n<p>We have a convenient Ruby library that takes care of this part—see <a href="https://github.com/wordtreefoundation/archdown">archdown</a>. If you have a working Ruby environment on your system, you should be able to install the gem and immediately begin fetching books:</p>\n<div class="gatsby-highlight">\n      <pre class="language-language-bash"><code class="language-language-bash">$ gem install archdown\n$ archdown -y 1750-1850</code></pre>\n      </div>\n<p>It will create a ‘library’ folder with many 2-letter folders inside, and another set of 2-letter folders inside those. Each book will be downloaded to the folder corresponding to the first 2 and last 2 letters of its archive.org id. For instance, <a href="https://archive.org/details/latewarbetween_00hunt">latewarbetween_00hunt</a> will download to <code>./library/la/nt/</code>. The reason we do this is there are some archive.org id prefixes (e.g. <em>jstor</em>) that have an abundant set of files associated with them, so we need a second level of folders.</p>\n<p><em>Note:</em> Downloading all books from 1750 to 1850 will probably take several days and 200 GB or so of space.</p>\n<h3>Creating a Baseline</h3>\n<p>The first thing to do once you have a lot of books is to create an ngram baseline. This is where we measure the “normal” frequency of each ngram in the English language during the period (i.e. the 19th century in our example).</p>\n<p>It’s important to create a baseline so that, later, when we find matches between books (during the comparison step below) we can weight the matches by importance—the more rare the ngrams are in English, the more “significant” the match.</p>\n<p>Let’s pick 100 books at random:</p>\n<div class="gatsby-highlight">\n      <pre class="language-language-bash"><code class="language-language-bash">find . -name \'*.txt\' | shuf -n 100 > baseline-files.txt</code></pre>\n      </div>\n<p>(<em>Note:</em> <code>shuf</code> is part of gnu core utils. On ubuntu, you can install it with <code>apt-get install coreutils</code>; and on Mac OS, <code>brew install coreutils</code>, but it will be called <code>gshuf</code> instead.)</p>\n<p>Now, let’s create a baseline with N set to 3 (i.e. this will include phrases of one, two, and three words):</p>\n<div class="gatsby-highlight">\n      <pre class="language-language-bash"><code class="language-language-bash">julia baseline.jl -n 3 `cat baseline-files.txt` > baseline.txt</code></pre>\n      </div>\n<p>Great! Now we have a baseline to feed the compare.jl script.</p>\n<h3>Comparing Books for Matching Ngrams</h3>\n<p>Let’s say we have a large text, <code>book1.txt</code> and we want to compare it with another, <code>book2.txt</code>. Here’s how:</p>\n<div class="gatsby-highlight">\n      <pre class="language-language-bash"><code class="language-language-bash">julia compare.jl -n 3 -b baseline.txt book1.txt X book2.txt</code></pre>\n      </div>\n<p>Using the baseline we calculated above, we’ll get some raw scores that might look something like this:</p>\n<table><tr><th>total_inv</th><th>total_mul</th><th>total_sqrt</th><th>sizex</th><th>sizey</th><th>namex</th><th>namey</th></tr>\n<tr><td>1.05526</td><td>14.26820</td><td>1.93123</td><td>5905</td><td>70627</td><td>book1.txt</td><td>book2.txt</td></tr>\n</table>\n<p>We’ll talk more about what these results mean below.</p>\n<p>The <code>X</code> between <code>book1.txt</code> and <code>book2.txt</code> in the command above is significant. This is a special marker that indicates all files <em>before</em> the <code>X</code> are to be matched against all files <em>after</em> the X. In our simple example, we’re just comparing one book against another, but using this <code>X</code> as a separator, it is also easy to compare all books in, say, “set A” to all books in “set B”. It might look like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-language-bash"><code class="language-language-bash">julia compare.jl -n 3 -b baseline.txt book1.txt book2.txt X bookA.txt bookB.txt</code></pre>\n      </div>\n<p>Which would compare all pairs, <code>book1 x bookA</code>, <code>book1 x bookB</code>, <code>book2 x bookA</code>, and <code>book2 x bookB</code>.</p>\n<p>Let’s say we want a little more detail—like the actual ngrams that matched between the two books, for instance. We can use the <code>-s</code> switch which is short for <code>--show-matches</code>. In addition, we can pair it with <code>-t</code> to set the threshold score for word matches. In this case, let’s make the minimum word match score <em>0.01</em>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-language-bash"><code class="language-language-bash">julia compare.jl -n 3 -b baseline.txt -v -s -t 0.01 book1.txt X book2.txt</code></pre>\n      </div>\n<p>Now we get a lot more verbose output:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">Using baseline: baseline.txt\nUsing files X: {"book1.txt"}\nUsing files Y: {"book2.txt"}\nMeasuring baseline size...\n  87097 ngrams\nelapsed time: 0.383290306 seconds (40527888 bytes allocated, 8.20% gc time)\n\nCross comparing...\nLoading book1.txt...\nLoading book2.txt...\nComparing... book1.txt x book2.txt</code></pre>\n      </div>\n<p>And there are individual ngrams listed with scores next to them:</p>\n<table>\n<tr><th>community situation</th><td>0.250</td><td>0.500</td><td>0.354</td><td>book1</td><td>book2</td></tr>\n<tr><th>health positions</th><td>0.125</td><td>0.125</td><td>0.125</td><td>book1</td><td>book2</td></tr>\n<tr><th>experienced nurse</th><td>0.083</td><td>0.167</td><td>0.118</td><td>book1</td><td>book2</td></tr>\n</table>\n<h3>Reading the Results</h3>\n<p>Let’s look again at the “total” scores we received as a summary of the strength of relatedness between book1 and book2:</p>\n<table><tr><th>total_inv</th><th>total_mul</th><th>total_sqrt</th><th>sizex</th><th>sizey</th><th>namex</th><th>namey</th></tr>\n<tr><td>1.05526</td><td>14.26820</td><td>1.93123</td><td>5905</td><td>70627</td><td>book1.txt</td><td>book2.txt</td></tr>\n</table>\n<ul>\n<li><strong>total_inv</strong>: sum total of the inverse baseline frequency of all matching ngrams.</li>\n<li><strong>total_mul</strong>: like total_inv, but whereas the numerator in total_env is always 1.0, the numerator in <strong>total_mul</strong> is the product of the count of occurrences of the ngram in document X, and the count of occurrences of the ngram in document Y.</li>\n<li><strong>total_sqrt</strong>: like total_mul, but the numerator is the square root of the product, instead of just the product.</li>\n<li><strong>sizex</strong>: the total count of words in document X.</li>\n<li><strong>sizey</strong>: the total count of words in document Y.</li>\n<li><strong>namex</strong>: the name of document X (filename).</li>\n<li><strong>namey</strong>: the name of document Y (filename).</li>\n</ul>\n<p>Why break it down in this way? i.e. why not a single number representing the score? We’re still experimenting with the best formula to represent the relatedness between books. To normalize the score, the length of the books must be taken in to account somehow. We provide several “totals” so that we can experiment with different length-normalized scores. For instance, some possibilities:</p>\n<p><code>total_inv / (sizex + sizey)</code></p>\n<p><code>total_sqrt / sqrt(sizex**2 + sizey**2)</code></p>\n<p>If you copy the output of <code>compare.jl</code> to a spreadsheet, each of these normalized scores and others can be easily experimented with.</p>\n<p>We’ve found that books with a wordcount smaller than 20k are not reliably scored using the ngram matching method. Because natural language is a constantly evolving target, people independently generate some language phrases that are, by random chance, the same as what others generate. Therefore, not all matches can be indicators of a certain relationship between books.</p>',fields:{tagSlugs:["/tags/n-gram/","/tags/book-of-mormon/","/tags/presentation/"]},frontmatter:{title:"Using TextGrams.jl",tags:["n-gram","book-of-mormon","presentation"],date:"2015-03-29T16:53:58.333Z",description:"A rundown of the use of TextGrams.jl, a library used to score the relatedness of 2 or more books based on the similarity of their ngrams."}}},pathContext:{slug:"/news/using-textgrams-jl"}}}});
//# sourceMappingURL=path---news-using-textgrams-jl-484ec8bd038bd8304636.js.map