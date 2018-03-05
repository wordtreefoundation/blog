---
title: "Using TextGrams.jl"
date: "2015-03-29T16:53:58.333Z"
layout: post
draft: false
path: "/articles/using-textgrams-jl"
category: "Data Science"
tags:
  - "n-gram"
  - "book-of-mormon"
  - "presentation"
description: "A rundown of the use of TextGrams.jl, a library used to score the relatedness of 2 or more books based on the similarity of their ngrams."
---

[TextGrams.jl](https://github.com/wordtreefoundation/TextGrams.jl) is a library that we use to score the relatedness of 2 or more books based on their ngrams (i.e. phrases made up of "N" words in a row, where a useful value of N is 1 to about 4 or so).

Here is a rundown of its use, from downloading books from archive.org to creating a baseline, and then comparing books.

### Prerequisites
You should have [julia](http://julialang.org/downloads/) installed, and optionally ruby for the following downloading books step.

### Downloading 19th Century Books

We have a convenient Ruby library that takes care of this part--see [archdown](https://github.com/wordtreefoundation/archdown). If you have a working Ruby environment on your system, you should be able to install the gem and immediately begin fetching books:

```language-bash
$ gem install archdown
$ archdown -y 1750-1850
```

It will create a 'library' folder with many 2-letter folders inside, and another set of 2-letter folders inside those. Each book will be downloaded to the folder corresponding to the first 2 and last 2 letters of its archive.org id. For instance, [latewarbetween_00hunt](https://archive.org/details/latewarbetween_00hunt) will download to `./library/la/nt/`. The reason we do this is there are some archive.org id prefixes (e.g. *jstor*) that have an abundant set of files associated with them, so we need a second level of folders.

*Note:* Downloading all books from 1750 to 1850 will probably take several days and 200 GB or so of space.

### Creating a Baseline

The first thing to do once you have a lot of books is to create an ngram baseline. This is where we measure the "normal" frequency of each ngram in the English language during the period (i.e. the 19th century in our example).

It's important to create a baseline so that, later, when we find matches between books (during the comparison step below) we can weight the matches by importance--the more rare the ngrams are in English, the more "significant" the match.

Let's pick 100 books at random:
```language-bash
find . -name '*.txt' | shuf -n 100 > baseline-files.txt
```
(*Note:* `shuf` is part of gnu core utils. On ubuntu, you can install it with `apt-get install coreutils`; and on Mac OS, `brew install coreutils`, but it will be called `gshuf` instead.)

Now, let's create a baseline with N set to 3 (i.e. this will include phrases of one, two, and three words):
```language-bash
julia baseline.jl -n 3 `cat baseline-files.txt` > baseline.txt
```

Great! Now we have a baseline to feed the compare.jl script.

### Comparing Books for Matching Ngrams

Let's say we have a large text, `book1.txt` and we want to compare it with another, `book2.txt`. Here's how:

```language-bash
julia compare.jl -n 3 -b baseline.txt book1.txt X book2.txt
```

Using the baseline we calculated above, we'll get some raw scores that might look something like this:
<table><tr><th>total_inv</th><th>total_mul</th><th>total_sqrt</th><th>sizex</th><th>sizey</th><th>namex</th><th>namey</th></tr>
<tr><td>1.05526</td><td>14.26820</td><td>1.93123</td><td>5905</td><td>70627</td><td>book1.txt</td><td>book2.txt</td></tr>
</table>

We'll talk more about what these results mean below.

The `X` between `book1.txt` and `book2.txt` in the command above is significant. This is a special marker that indicates all files *before* the `X` are to be matched against all files *after* the X. In our simple example, we're just comparing one book against another, but using this `X` as a separator, it is also easy to compare all books in, say, "set A" to all books in "set B". It might look like this:

```language-bash
julia compare.jl -n 3 -b baseline.txt book1.txt book2.txt X bookA.txt bookB.txt
```

Which would compare all pairs, `book1 x bookA`, `book1 x bookB`, `book2 x bookA`, and `book2 x bookB`.

Let's say we want a little more detail--like the actual ngrams that matched between the two books, for instance. We can use the `-s` switch which is short for `--show-matches`. In addition, we can pair it with `-t` to set the threshold score for word matches. In this case, let's make the minimum word match score *0.01*:

```language-bash
julia compare.jl -n 3 -b baseline.txt -v -s -t 0.01 book1.txt X book2.txt
```

Now we get a lot more verbose output:

```
Using baseline: baseline.txt
Using files X: {"book1.txt"}
Using files Y: {"book2.txt"}
Measuring baseline size...
  87097 ngrams
elapsed time: 0.383290306 seconds (40527888 bytes allocated, 8.20% gc time)

Cross comparing...
Loading book1.txt...
Loading book2.txt...
Comparing... book1.txt x book2.txt
```

And there are individual ngrams listed with scores next to them:
<table>
<tr><th>community situation</th><td>0.250</td><td>0.500</td><td>0.354</td><td>book1</td><td>book2</td></tr>
<tr><th>health positions</th><td>0.125</td><td>0.125</td><td>0.125</td><td>book1</td><td>book2</td></tr>
<tr><th>experienced nurse</th><td>0.083</td><td>0.167</td><td>0.118</td><td>book1</td><td>book2</td></tr>
</table>

### Reading the Results

Let's look again at the "total" scores we received as a summary of the strength of relatedness between book1 and book2:
<table><tr><th>total_inv</th><th>total_mul</th><th>total_sqrt</th><th>sizex</th><th>sizey</th><th>namex</th><th>namey</th></tr>
<tr><td>1.05526</td><td>14.26820</td><td>1.93123</td><td>5905</td><td>70627</td><td>book1.txt</td><td>book2.txt</td></tr>
</table>

- __total\_inv__: sum total of the inverse baseline frequency of all matching ngrams.
- __total\_mul__: like total\_inv, but whereas the numerator in total\_env is always 1.0, the numerator in **total_mul** is the product of the count of occurrences of the ngram in document X, and the count of occurrences of the ngram in document Y.
- __total\_sqrt__: like total\_mul, but the numerator is the square root of the product, instead of just the product.
- **sizex**: the total count of words in document X.
- **sizey**: the total count of words in document Y.
- **namex**: the name of document X (filename).
- **namey**: the name of document Y (filename).

Why break it down in this way? i.e. why not a single number representing the score? We're still experimenting with the best formula to represent the relatedness between books. To normalize the score, the length of the books must be taken in to account somehow. We provide several "totals" so that we can experiment with different length-normalized scores. For instance, some possibilities:

`total_inv / (sizex + sizey)`

`total_sqrt / sqrt(sizex**2 + sizey**2)`

If you copy the output of `compare.jl` to a spreadsheet, each of these normalized scores and others can be easily experimented with.

We've found that books with a wordcount smaller than 20k are not reliably scored using the ngram matching method. Because natural language is a constantly evolving target, people independently generate some language phrases that are, by random chance, the same as what others generate. Therefore, not all matches can be indicators of a certain relationship between books.

