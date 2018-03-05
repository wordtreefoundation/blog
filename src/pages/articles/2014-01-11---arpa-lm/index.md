---
title: Understanding ARPA and Language Models
date: "2014-01-11T19:00:00.000Z"
layout: post
draft: false
path: "/articles/arpa-lm"
category: "Data Science"
tags:
  - "n-gram"
  - "book-of-mormon"
description: "I started off today thinking I’d be able to transform a previous n-gram library we wrote in the Julia programming language over to KenLM, a very fast Language Model generator. Instead, I ended up spending most of the day learning about language models and data formats. I thought I’d pass along some of this information and any insights I’ve had."
---

Language Models are a better way of comparing phrase probabilities than n-gram frequencies.

At the WordTree Foundation, we’re exploring ways of mapping the similarities and influences among various books, with the Book of Mormon of special interest in this exploration. In the past, we’ve shown raw unconditional probabilities to be an interesting (albeit limited) way of scoring similarities among books. Our online publication of [A Comparison of The Book of Mormon and The Late War](http://wordtreefoundation.github.io/thelatewar/) was the result of that original research.

I started off today thinking I’d be able to transform the [previous n-gram library](https://github.com/canadaduane/TextGrams.jl) we wrote in the Julia programming language over to KenLM, a very fast Language Model generator. Instead, I ended up spending most of the day learning about language models and data formats. I thought I’d pass along some of this information and any insights I’ve had.

First, a Language Model is far better than the pure N-gram (unconditional) probabilities we’ve been using at the WordTree Foundation up to this point. In particular, language models have a notion of _conditional probability_ which makes assessing probabilities of word occurrences in a text more accurate.

When I take a text like the Book of Mormon and pass it through [KenLM](https://kheafield.com/code/kenlm/)’s “lmplz” processor, it generates a file called an ARPA file. The ARPA file format looks like this:

```
\data\
ngram 1=5776
ngram 2=55566

\1-grams:
-4.7039757 <unk> 0
0 <s> -1.505814
-4.554822 </s> 0
-1.7441652 the -1.075229
-2.4278247 book -1.6445116
-1.6198214 of -1.2298658
-3.932976 mormon -0.52456135
-1.452003 . -4.009832
-2.7216232 an -0.6389431
-3.7242882 account -0.75844955
…

\2-grams:
-0.000042455064 . </s>
-1.9652246 <s> the
-0.5145896 of the
-1.5662498 mormon the
-1.7051648 written the
-0.30002946 by the
-1.6727574 hand the
-0.429893 upon the
-2.2684872 plates the
-1.6545775 taken the
-0.3712691 from the
…

\end\
```

It wasn’t obvious to me at first what these negative numbers were. It turns out they are _log probabilities_ in base 10. In other words, rather than saying “the chance of seeing ‘the’ is 0.018023", the ARPA format uses `-1.7441652` which means take “10" and raise it to the power of “-1.7441652" to get the probability (i.e. 0.018023). This form of representation for probabilities is usually more compact because probabilities can get very small (e.g. rather than writing “0.000000478630092" we can just write `-6.32`). In addition, as a _log_ value, they naturally represent order of magnitude more prominently.

In an ARPA file, the unigrams (1-grams) are _unconditional probabilities_ while the N-grams with N of 2 or larger are _conditional probabilities_. In other words, when we see “-1.7441652 the” in the 1-grams section, it is simply the log probability that the word `the` will show up in the language, i.e. in mathematical notation, **P**(_the_), or “Probability of `the`”. But in the 2-grams section, when we see “-0.5145896 of the”, this is the probability that `the` will show up after `of`, i.e. in mathematical notation, **P**(_the_|_of_), or “Probability of `the` given `of`”.

There are three “special” words in a language model: **&lt;s>**, **&lt;/s>**, and **&lt;unk>**. The **&lt;s>** denotes the beginning of a sentence, and the **&lt;/s>** denotes the end of a sentence. This differs from our original study where we had no concept of beginnings and ends of sentences&mdash;we just ignored sentence boundaries. The **&lt;unk>** special word means “unknown” and is used in the language model to represent the probability of a word not in the model (I believe this is also known as “out of vocabulary” or OOV).

By using conditional probabilities, queries for phrases will result in probabilities that more accurately reflect the frequency or rarity of that phrase. Ultimately, this will lead to a more accurate scoring algorithm when comparing books and trying to uncover non-obvious relationships or influences among texts.

