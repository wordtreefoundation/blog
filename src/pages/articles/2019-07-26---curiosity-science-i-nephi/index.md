---
title: Curiosity, Data Science, and I, Nephi
date: "2019-07-26T22:00:00.000Z"
layout: post
draft: false
path: "/news/curiosity-science-i-nephi"
category: "Data Science"
tags:
  - "grep"
  - "book-of-mormon"
  - "cli"
description: "Book of Mormon Central claims that the first sentence of the Book of Mormon attests to its ancient and authentic origin. Suppose you had an alternate hypothesis, would you be able to test it using data science?"
---

## The Faithful View of "I, Nephi..."

Book of Mormon Central wrote [an article](https://knowhy.bookofmormoncentral.org/knowhy/why-does-nephi-begin-by-saying-i-nephi) about the first sentence of the Book of Mormon, "I, Nephi, having been born of goodly parents..." The author links this style of writing to ancient kings, and uses this fascinating connection with our past to lend strength to the hypothesis that the Book of Mormon's origin is ancient.

This is a wonderful, faithful hypothesis. There isn't anything wrong with it if you just want reasons to believe the Book of Mormon is holy.

One of the beautiful things about truth is that it is strengthened by inspection from multiple perspectives. Curiosity and a thirst for truth drives us to experiment with ideas, and with the powerful tools we have today, we can often investigate literary hypotheses ourselves.

## Another Hypothesis?

Let's say you have another hypothesis: that maybe the Book of Mormon was written in the 19th century, rather than miraculously translated from an ancient source. Your curiosity drives you to want to see deeply into this, and you're looking for tools. How would you go about testing this?

If the Book of Mormon were written in the 1800s, we might expect to see other books from its time with similar phrasing. Maybe "I, Nephi, having been born of goodly parents..." is a remix of language and ideas from the 1800s?

Here are several of the elements of the first verse of the Book of Mormon that lend evidence to the faithful hypothesis:

|     "I, Nephi" Faithful Hypothesis        |     "I, Nephi" Alt. Hypothesis       |
|                 :-:                       |                 :-:                  |
|  1. Kings in Moab said "I, ___, son of"   |                  ?                   |
|  2. "in my days" resonates                |                  ?                   |
|  3. Mentions both parents                 |                  ?                   |


## Getting the Data

We can get a lot of data from archive.org, which has meticulously gathered, scanned, and OCRed centuries-old books. Using [archdown]() you could download all of these books in a nice text format with header info.

Or, you could use our English Books archive, which is a handy copy of archive.org's 1650 to 1829 books: download [pre-1830 Books from Archive.org](http://data.wordtree.org/archive-org-english-books-1650-1829-asof-2019-06-24.tar.gz) as a `.tar.gz` zip file (~30 GB of data, ~137 GB uncompressed).

Once you have the data, unzip the archive:
```
$ gunzip http://data.wordtree.org/archive-org-english-books-1650-1829-asof-2019-06-24.tar.gz
```

It will create a `library/` folder in the directory you unzip it into. That `library/` folder will contain many two-letter subfolders, each containing two-letter subfolders themselves. Finally, in those subfolders, you'll find `.md` files that are text files containing the actual book contents.

Since these books are raw OCR conversions of scanned pages, the quality of the text varies quite a bit. The quality is sufficient that we can still test our hypothesis, however.

You can now search 137 GB of text, all from books written prior to the Book of Mormon's publication date!

## Experimenting with Unix Tools

If you're familiar with the `grep` command-line utility, and regular expressions, you can search precisely for any pattern you'd like. For example, let's search the library for Nephi:

```
$ grep -r 'Nephi' library/

library/cl/og/classicaljourna59unkngoog/classicaljourna59unkngoog.md:Sor, Tyrus, metropolis Phoenices, in tribu Nephihalim, Et Theo-
library/cl/og/classicalbiogra00adamgoog/classicalbiogra00adamgoog.md:^K ^arthia, which had formed king ufThehesby Nephile; who with
library/mo/nk/moderngeographyd01pink/moderngeographyd01pink.md:Nephin, fame Co. 2640 above the fea, by t!ie fame.
library/mo/nk/moderngeographyd01pink/moderngeographyd01pink.md:other names may be mentioned mount Nephin in the county of Mayo,
library/mo/51/mobot31753002153051/mobot31753002153051.md:along the mountain base from'Nephi to Willard.
library/mo/og/moderngeography00bartgoog/moderngeography00bartgoog.md:Among other names may be mentioned mount Nephin in the county
library/mo/og/moderngeography00bartgoog/moderngeography00bartgoog.md:Nephin, same Co. 3640 above the sea, by the same.
library/mo/99/mobot31753002152699/mobot31753002152699.md:(26.) On the Nephila plumipes or silk spider of South Car-Una. by
library/mc/ke/mckenneyspac18781mcke/mckenneyspac18781mcke.md:Nephi,
library/mc/ke/mckenneypacif18782mcke/mckenneypacif18782mcke.md:1'ratt Nephi. Treasurer.
library/mc/ke/mckenneypacif18782mcke/mckenneypacif18782mcke.md:Nephi I SEVIER COUNTY.
library/mc/ke/mckenneypacif18782mcke/mckenneypacif18782mcke.md:Nephi
...
```

Whoa! There's a lot of data here. More than I expected. This search yielded 734 results in about 8 minutes of searching on my PC (having an SSD hard drive helps).

A lot of the results are infix matches--"Nephi" is part of "Nephilim" and "Mount Nephin" for example. Can we tighten the search up so it doesn't show these?

```
$ grep -Er '\bNephi\b' library/
```

So now we're using a more advanced regular expression, with the `\b` word-boundary marker. This ensures that any match of "Nephi" will be just Nephi, and not Nephilim, for example. With this addition, we reduce the results to 102 matches!

```
ibrary/mo/51/mobot31753002153051/mobot31753002153051.md:along the mountain base from'Nephi to Willard.
library/mc/ke/mckenneyspac18781mcke/mckenneyspac18781mcke.md:Nephi,
library/mc/ke/mckenneypacif18782mcke/mckenneypacif18782mcke.md:1'ratt Nephi. Treasurer.
library/mc/ke/mckenneypacif18782mcke/mckenneypacif18782mcke.md:Nephi I SEVIER COUNTY.
...
library/in/54/in.ernet.dli.2015.211454/in.ernet.dli.2015.211454.md:is acted upon (Book of Mormon, II. Nephi, Ch. 2). From this
library/in/86/in.ernet.dli.2015.21086/in.ernet.dli.2015.21086.md:GodwiJnV Uva MilUnis Nephi^
library/hi/ft/historyofhebrewc01jahnuoft/historyofhebrewc01jahnuoft.md:Arabian desert; the Hagarites, Itureans (Jetur), Nephi-
library/ho/ch/holybibletransla00chalrich/holybibletransla00chalrich.md:Nephi.
library/ho/_1/holybiblecontain00brow_1/holybiblecontain00brow_1.md:many men call it Nephi.
library/ho/18/holybiblecontain00unse_18/holybiblecontain00unse_18.md:sing : but many men call it. Nephi.
library/ho/13/holybible00unse_13/holybible00unse_13.md:many men call it Nephi.
library/ho/ft/holybiblecontain00oxfouoft/holybiblecontain00oxfouoft.md:ing : but many men call it Nephi.
...
```

Funny! It looks like a reference to the Book of Mormon is in there. Well, that can't be right. We're clearly dealing with noisy data--yup, looks like archive.org mis-dated an edition of the Encyclopedia Britannica as written in 1768, when in actuality it was written after 1830.

Anyway, we can see a lot of references to Nephi here. Some of them are from the Bible... wait, the bible? It turns out Maccabees contains a reference to a place called Nephi, and many bibles back then used to contain the Apocrypha.

What if we want to search for the pattern that Book of Mormon Central is talking about, though--the "I, Nephi, having been born of goodly parents..." phrase. Could we search for that? Here's an advanced regular expression that looks for the word "I", followed by a comma, and then a capitalized word (e.g. name), followed by the words "born" and "parent(s)":

```
$ grep -2Enr '\bI\b\s*,\s*[A-Z][a-z].*\bborn\b.*\bparent' library/
```

Again, quite a few matches! Here's an interesting one:

```
```

One of the constraints of using regular expressions for search is that they tend to work best when applied to a single line of text. They can be made to work across multiple lines, but it would be nice if we could get each sentence on a single line.

Using the [ngrams](https://github.com/wordtreefoundation/ngram-tools) tool developed by WordTree, we can process text and get a normalized, lower-cased, number-free, punctuation-free version of each sentence, with once sentence per line.

For example (after you've installed it):
```
$ ngrams --normalize library/fi/og/firstbooknapole00gruagoog/firstbooknapole00gruagoog.md
```

The above should output the First Book of Napoleon, one "sentence" per line:
```
title
the first book of napoleon the tyrant of the earth
written in the th year of the world
author
modeste gruau year
...
```

Let's use this to normalize the entire library, and then we can search for our pattern within each line, knowing that each line is a sentence (or thereabouts). We'll move the normalized files into their own directory so it's easier to search just the normalized text:

```
$ find library/ -name '*.md' | parallel -j4 echo {} \; mkdir -p "norm/{//}" \; ./ngram-tools/ngrams --normalize '{}' '>' 'norm/{//}/{/.}.norm'
```

Now for the good part! Let's search our entire, normalized 17th to 19th century library, for the "I ... born of ... parents" pattern:

```
$ grep -Enr '\bi\b.*\bborn of\b.*\bparent' normalized/
```
