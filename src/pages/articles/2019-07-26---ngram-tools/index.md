---
title: 'Fast N-gram Tool'
date: '2019-07-25T19:00:00Z'
layout: post
draft: false
path: '/news/ngram-tools'
category: 'Data Science'
tags:
  - 'n-gram'
description: "We've built some fast rust-based n-gram research tools for the Mac OS, Linux, or Windows command line."
---

One of our goals at WordTree Foundation is to make it easier for anyone with an interest in literary archeology to dive in and test hypotheses. If that's you, the [ngrams](https://github.com/wordtreefoundation/ngram-tools) command-line tool is something you can use to compare n-grams within books to see if small portions of any two (English) books overlap.

The basic idea is this: if two books (or authors) were inspired by a common source, or if one book (or author) was inspired by the other, then there is likely to be some unusual words or phrases that "stand out," statistically speaking.

The [ngrams](https://github.com/wordtreefoundation/ngram-tools) tool is a _very fast_ implementation of an ngram counter. It's written using the Rust programming language, which is known as one of the fastest, safest languages in today's language ecosystem. It takes [ascii](https://en.wikipedia.org/wiki/ASCII) encoded text as input, cleans it up, iterates over windows of size N (for whatever value of N you want--e.g. 4 is a reasonable window size), and then counts the N-grams.

Then, using `client / server mode` you can query for n-grams that match between two or more books.

If you're curious, this tool is similar to the [TextGrams.jl](using-textgrams-jl) tool we previously published, but uses less memory and therefore can load a larger baseline into memory on a single machine.

See the [ngram-tools](https://github.com/wordtreefoundation/ngram-tools) github page for usage details.
