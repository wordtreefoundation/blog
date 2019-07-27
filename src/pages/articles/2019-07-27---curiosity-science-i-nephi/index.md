---
title: Curiosity, Data Science, and I, Nephi
date: '2019-07-27T22:00:00.000Z'
layout: post
draft: false
path: '/news/curiosity-science-i-nephi'
category: 'Data Science'
tags:
  - 'grep'
  - 'book-of-mormon'
  - 'cli'
description: 'Book of Mormon Central claims that the first sentence of the Book of Mormon attests to its ancient and authentic origin. Suppose you had an alternate hypothesis, would you be able to test it using data science?'
---

## The Faithful View of "I, Nephi..."

Book of Mormon Central wrote [an article](https://knowhy.bookofmormoncentral.org/knowhy/why-does-nephi-begin-by-saying-i-nephi) about the first sentence of the Book of Mormon:

> "I, Nephi, having been born of goodly parents, therefore I was taught somewhat in all the learning of my father and having seen many afflictions in the course of my days, nevertheless, having been highly favored of the Lord in all my days; yea, having had a great knowledge of the goodness and the mysteries of God, therefore I make a record of my proceedings in my days."
> <br>[1 Nephi 1:1](https://www.bookofmormonorigins.com/content/1nephi/chapter_01.html)

The author links this style of writing to ancient kings, and uses a fascinating linguistic connection to the historical past to lend strength to the hypothesis that the Book of Mormon's origin is ancient.

| "I, Nephi" Faithful Hypothesis         | "I, Nephi" Alt. Hypothesis |
| -------------------------------------- | -------------------------- |
| 1. Nephi copied style of ancient kings | &nbsp;&nbsp;&nbsp;?        |
| 2. Kings said "I, \_\_\_, son of"      | &nbsp;&nbsp;&nbsp;?        |
| 2. "in my days" resonates              | &nbsp;&nbsp;&nbsp;?        |
| 3. Nephi acknowledges both parents     | &nbsp;&nbsp;&nbsp;?        |

This is a wonderful, faithful hypothesis. There isn't anything wrong with it if you just want reasons to believe the Book of Mormon is holy.

One of the beautiful things about truth is that it is strengthened by inspection from multiple perspectives. Curiosity and a thirst for truth drives us to experiment with ideas, and with the powerful tools we have today, we can often investigate literary hypotheses ourselves.

## Another Hypothesis?

Let's say you have another hypothesis: that maybe the Book of Mormon was written in the 19th century, rather than miraculously translated from an ancient source. Your curiosity drives you to want to see deeply into this, and you're looking for tools. How would you go about testing this?

If the Book of Mormon were written in the 1800s, we might expect to see other books from its time with similar phrasing. Maybe "I, Nephi, having been born of goodly parents..." is a [remix](https://www.everythingisaremix.info/watch-the-series) of language and ideas from the 1800s?

Let's look at elements of the faithful interpretation and see if we can construct an alternative hypothesis worthy of testing:

| "I, Nephi" Faithful Hypothesis       | "I, Nephi" Alt. Hypothesis                   |
| ------------------------------------ | -------------------------------------------- |
| 1. Nephi used style of ancient kings | &nbsp;Joseph used style of 19th C. writers?  |
| 2. Kings said "I, \_\_\_, son of"    | &nbsp;19th C. authors wrote this way?        |
| 2. "in my days" resonates            | &nbsp;19th C. autobiography style resonates? |
| 3. Nephi acknowledges both parents   | &nbsp;19th C. authors mention both parents?  |

### Joseph used style of 19th C. writers?

Rather than Nephi being inspired by monumental inscriptions of ancient mesopotamian kings, could the author of the Book of Mormon (presumably Joseph) have used the style of 19th century writers? Did 19th century writers write this way?

### 19th century authors wrote with "I, [name], son of..." phrase?

Rather than Nephi using the "I, [name], son of [name]" terminology from ancient kings, could Joseph have read this in 19th century books? Did they write that way back then?

### 19th century autobiography style resonates?

Rather than Nephi using an autobiographical style that includes a record of things "in his day", could Joseph have written something like this in the 19th century? Did autobiographical texts talk about parentage, education, and religious standing?

### 19th century authors mention both parents?

Rather than Nephi deviating from the pattern of Kings mentioning fathers, could Joseph have taken inspiration from 19th century authors to mention parents in the plural? Did anyone in the 19th century attribute good to both parents?

## Getting the Data

We can get a lot of data from archive.org, which has meticulously gathered, scanned, and OCRed centuries-old books. Using [archdown](https://github.com/wordtreefoundation/bomdb) you could download all of these books in a nice text format with header info.

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
```

Some example matches:

```
Sor, Tyrus, metropolis Phoenices, in tribu Nephihalim, Et Theo-
^K ^arthia, which had formed king ufThehesby Nephile; who with
1'ratt Nephi. Treasurer.
Nephi I SEVIER COUNTY.
Nephi
...
[734 results]
```

Whoa! There's a lot of data here. More than I expected. This search yielded 734 results in about 5 minutes of searching on my PC (having an SSD hard drive helps).

A lot of the results are infix matches--"Nephi" is part of "Nephilim" and "Mount Nephin" for example. Can we tighten the search up so it doesn't show these?

```
$ grep -Er '\bNephi\b' library/
```

So now we're using a more advanced regular expression, with the `\b` word-boundary marker. This ensures that any match of "Nephi" will be just Nephi, and not Nephilim, for example. With this addition, we reduce the results to 102 matches!

```
along the mountain base from'Nephi to Willard.
Nephi,
1'ratt Nephi. Treasurer.
Nephi I SEVIER COUNTY.
...
is acted upon (Book of Mormon, II. Nephi, Ch. 2). From this
GodwiJnV Uva MilUnis Nephi^
Arabian desert; the Hagarites, Itureans (Jetur), Nephi-
Nephi.
many men call it Nephi.
...
[102 results]
```

Funny! It looks like a reference to the Book of Mormon is in there. Well, that can't be right. We're clearly dealing with noisy data--yup, looks like archive.org mis-dated an edition of the Encyclopedia Britannica as written in 1768, when in actuality it was written after 1830.

Anyway, we can see a lot of references to Nephi here. Some of them are from the Bible... wait, the bible? It turns out Maccabees contains a reference to a place called Nephi, and many bibles back then used to contain the Apocrypha.

What if we want to search for the pattern that Book of Mormon Central is talking about, though--something like "I, [so-and-so], (son or daughter) of [so-and-so]..."?

```
$ grep -A2 -E '\bI\s?,[\s]+[A-Z][a-z][a-z]' library/ \
  | grep -B2 -A2 -Ei '\b(son|daughter) of'
```

This is a more advanced regular expression, and since this is more about tools, if you'd like to understand regexps better, I'll just point you to a good [tutorial](https://www.regular-expressions.info/tutorial.html).

This search yields some interesting results, more than 100 matches, some of which I'll highlight:

> "This is the account of what I, Ibrahim, the son of Candu the merchant, have seen ; this is what I have been present at, and a witness to: where is the Malay who has seen the like that I, Ibrahim, the son of Candu, have seen since I arrived in the great country of Bengal!!"
> <br>[Journal of a Residence in India, 1812](https://archive.org/details/jouralofresidenc00mari/page/196)

> "I, Cennino, son of Andrea Cennini born in the Colle di Valdelsa, was instructed in these arts by Agnolo, son of Taddeo of Florence, my master, who learned the art from Taddeo, his father, the godson of Giotto, whose disciple he had been for twenty-four years."
> <br>[The Quarterly Review, London, 1845](https://archive.org/details/quarterlyreview15protgoog/page/n94)

> "I, Charlotte K. Sibley, of the city of Fredericksburgh, State of Virginia, do make oath that my maiden name was Charlotte Kendall ; that I was born in Sackett's Harbor, State of New York, the daughter of William Kendall and Charlotte Howard, both of the city of Boston..."
> <br>[Reports of Committees of the Senate of the United States, Washington, 1888](https://archive.org/details/unitedstatescon49offigoog/page/n1112)

> "By the favor and grace of God, I, Wahram, lord of lords, and Antipatrik, son of Grigor, a grandee of Armenia, of the race of Palhawouny, and descendant of the family of St. Grigor, the light of Armenia. In the hope in Christ I have the laid the foundations, and built this holy church Marmarachen..."
> <br>[Asiatic Journal, London, 1824](https://archive.org/details/in.ernet.dli.2015.104655/page/n365)

Could we take it a step further? What if there were 19th century books that are even more similar to the "I, Nephi, having been born of goodly parents..." phrase? Could we search for that? Here's an advanced regular expression that looks for the word "I", followed by a comma, and then a capitalized word (e.g. name), followed by the words "born" and "parent(s)" in any of the next two lines:

```
$ grep -A2 -Er '\bI,[\s]+[A-Z][a-z][a-z]' library/ \
  | grep -B2 -A2 -i 'born' \
  | grep -B2 -A2 -i 'parent'
```

Again, quite a few matches! Here are two interesting ones:

> "I, John Barnard was born at Boston, 6th Nov. 1681; descended from reputable parents, viz. John and Esther Barnard, remarkable for their piety and benevolence, who devoted me to the service of God, in the work of ministry, from my very conception and birth; and accordingly took special care to instruct me themselves in the principles of the Christian Religion, and kept me close at school to furnish my young mind with the knowledge of letters."
> <br>[Collections of the Massachusetts Historical Society, Boston, 1836, p. 178](https://archive.org/details/collectionss3v5mass/page/178)

> "I, Ingulphus, an humble servant of God, born of English parents, in the most beautiful city of London, for attaining to learning, was first put to Westminster, and after to study at Oxford, &c."
> <br>[A General collection of the best and most interesting voyages and travels in all parts of the world, Vol. 2. Philadelphia. 1810. p. 87.](https://archive.org/details/cihm_18699/page/n95)

Based on this search, it seems clear to me that an alternative hypothesis exists next to the faithful hypothesis: that the author of the Book of Mormon could have remixed 19th century language and ideas to come up with the first verse of the Book of Mormon:

## Alternate Hypothesis

John Barnard, above, employs a linguistic style that very nearly matches the first verse of 1 Nephi, and does so with remarkably similar content:

- uses "I, [name], born ... reputable parents" pattern
- honors both his parents
- connects education and schooling to parents
- speaks to his & his parents devotion to God
- the work is an autobiography
- written in 1836, and published in Boston, USA

Given that someone else wrote this way in the 19th century, in the same region as Joseph Smith, it seems plausible that the alternate hypothesis has good standing when compared to the faithful hypothesis.

If you'd like to see more connections between the Book of Mormon & 19th century literature, check out our study on [The Late War Between the United States and Great Britain](http://wordtree.org/thelatewar/).
