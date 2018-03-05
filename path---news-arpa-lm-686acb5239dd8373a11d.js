webpackJsonp([0xe87f48c4f16b],{394:function(e,t){e.exports={data:{site:{siteMetadata:{title:"The WordTree Foundation",subtitle:"The WordTree Foundation studies the relationships between books, with a special interest in LDS scripture such as the Book of Mormon.",copyright:"",author:{name:"WordTree Foundation"},disqusShortname:"",url:"http://blog.wordtree.org"}},markdownRemark:{id:"/Users/duane/WordTree/wordtree.org/src/pages/articles/2014-01-11---arpa-lm/index.md absPath of file >>> MarkdownRemark",html:'<p>Language Models are a better way of comparing phrase probabilities than n-gram frequencies.</p>\n<p>At the WordTree Foundation, we’re exploring ways of mapping the similarities and influences among various books, with the Book of Mormon of special interest in this exploration. In the past, we’ve shown raw unconditional probabilities to be an interesting (albeit limited) way of scoring similarities among books. Our online publication of <a href="http://wordtreefoundation.github.io/thelatewar/">A Comparison of The Book of Mormon and The Late War</a> was the result of that original research.</p>\n<p>I started off today thinking I’d be able to transform the <a href="https://github.com/canadaduane/TextGrams.jl">previous n-gram library</a> we wrote in the Julia programming language over to KenLM, a very fast Language Model generator. Instead, I ended up spending most of the day learning about language models and data formats. I thought I’d pass along some of this information and any insights I’ve had.</p>\n<p>First, a Language Model is far better than the pure N-gram (unconditional) probabilities we’ve been using at the WordTree Foundation up to this point. In particular, language models have a notion of <em>conditional probability</em> which makes assessing probabilities of word occurrences in a text more accurate.</p>\n<p>When I take a text like the Book of Mormon and pass it through <a href="https://kheafield.com/code/kenlm/">KenLM</a>’s “lmplz” processor, it generates a file called an ARPA file. The ARPA file format looks like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code class="language-none">\\data\\\nngram 1=5776\nngram 2=55566\n\n\\1-grams:\n-4.7039757 <unk> 0\n0 <s> -1.505814\n-4.554822 </s> 0\n-1.7441652 the -1.075229\n-2.4278247 book -1.6445116\n-1.6198214 of -1.2298658\n-3.932976 mormon -0.52456135\n-1.452003 . -4.009832\n-2.7216232 an -0.6389431\n-3.7242882 account -0.75844955\n…\n\n\\2-grams:\n-0.000042455064 . </s>\n-1.9652246 <s> the\n-0.5145896 of the\n-1.5662498 mormon the\n-1.7051648 written the\n-0.30002946 by the\n-1.6727574 hand the\n-0.429893 upon the\n-2.2684872 plates the\n-1.6545775 taken the\n-0.3712691 from the\n…\n\n\\end\\</code></pre>\n      </div>\n<p>It wasn’t obvious to me at first what these negative numbers were. It turns out they are <em>log probabilities</em> in base 10. In other words, rather than saying “the chance of seeing ‘the’ is 0.018023”, the ARPA format uses <code>-1.7441652</code> which means take “10” and raise it to the power of “-1.7441652” to get the probability (i.e. 0.018023). This form of representation for probabilities is usually more compact because probabilities can get very small (e.g. rather than writing “0.000000478630092” we can just write <code>-6.32</code>). In addition, as a <em>log</em> value, they naturally represent order of magnitude more prominently.</p>\n<p>In an ARPA file, the unigrams (1-grams) are <em>unconditional probabilities</em> while the N-grams with N of 2 or larger are <em>conditional probabilities</em>. In other words, when we see “-1.7441652 the” in the 1-grams section, it is simply the log probability that the word <code>the</code> will show up in the language, i.e. in mathematical notation, <strong>P</strong>(<em>the</em>), or “Probability of <code>the</code>”. But in the 2-grams section, when we see “-0.5145896 of the”, this is the probability that <code>the</code> will show up after <code>of</code>, i.e. in mathematical notation, <strong>P</strong>(<em>the</em>|<em>of</em>), or “Probability of <code>the</code> given <code>of</code>”.</p>\n<p>There are three “special” words in a language model: <strong>&#x3C;s></strong>, <strong>&#x3C;/s></strong>, and <strong>&#x3C;unk></strong>. The <strong>&#x3C;s></strong> denotes the beginning of a sentence, and the <strong>&#x3C;/s></strong> denotes the end of a sentence. This differs from our original study where we had no concept of beginnings and ends of sentences—we just ignored sentence boundaries. The <strong>&#x3C;unk></strong> special word means “unknown” and is used in the language model to represent the probability of a word not in the model (I believe this is also known as “out of vocabulary” or OOV).</p>\n<p>By using conditional probabilities, queries for phrases will result in probabilities that more accurately reflect the frequency or rarity of that phrase. Ultimately, this will lead to a more accurate scoring algorithm when comparing books and trying to uncover non-obvious relationships or influences among texts.</p>',fields:{tagSlugs:["/tags/n-gram/","/tags/book-of-mormon/"]},frontmatter:{title:"Understanding ARPA and Language Models",tags:["n-gram","book-of-mormon"],date:"2014-01-11T19:00:00.000Z",description:"I started off today thinking I’d be able to transform a previous n-gram library we wrote in the Julia programming language over to KenLM, a very fast Language Model generator. Instead, I ended up spending most of the day learning about language models and data formats. I thought I’d pass along some of this information and any insights I’ve had."}}},pathContext:{slug:"/news/arpa-lm"}}}});
//# sourceMappingURL=path---news-arpa-lm-686acb5239dd8373a11d.js.map