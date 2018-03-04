---
title: "DIY Mosiah Priority with BomDB"
date: "2015-04-17T22:35:19.569Z"
layout: post
draft: false
path: "/diy-mosiah-priority"
category: "Data Science"
tags:
  - "tools"
  - "book-of-mormon"
description: "We recently created BomDB as a tool for Book of Mormon researchers. This post shows how to use it to replicate some of the analysis that led to the Mosiah Priority hypothesis. This is especially for you if you like to do-it-yourself for the sake of skeptical inquiry."
---

We recently created [BomDB](https://github.com/wordtreefoundation/bomdb) as a tool for Book of Mormon researchers. This post shows how to use it to replicate some of the analysis that led to the Mosiah Priority hypothesis. This is especially for you if you like to do-it-yourself for the sake of skeptical inquiry.

Brent Metcalfe wrote a seminal chapter of New Approaches to the Book of Mormon in 1993 called [The Priority of Mosiah](http://signaturebookslibrary.org/new-approaches-to-the-book-of-mormon-10/). In it, he convincingly shows that Mosiah was written _first_, prior to 1st Nephi, and one of the techniques used was a simple wordcount of the occurrences of "wherefore" and "therefore" throughout the Book of Mormon.

We can use [BomDB](https://github.com/wordtreefoundation/bomdb) (a command-line tool and Ruby gem that contains several editions of the Book of Mormon) to replicate Metcalfe's work and even further it.

First, let's get some raw data to work with. We'll count up the number of "wherefore" and "therefore" occurrences in each book of the Book of Mormon, and print it out as text:

```language-ruby
require 'bomdb' # version 0.6.2
require 'json'

q = BomDB::Query.new(exclude: 'Bible')

data = q.books.map do |book, content|
  wordcount = content.scan(/ +/).size
  wh = content.scan(/wherefore/i).size.to_f / wordcount
  th = content.scan(/therefore/i).size.to_f / wordcount
  [book, wh, th]
end

labels, wherefores, therefores = data.transpose
puts "Labels: #{labels.to_json}"
puts "Wherefores: #{wherefores.to_json}"
puts "Therefores: #{wherefores.to_json}"
```

Note that the `BomDB::Query` above handily excludes Biblical chapters and verses from our analysis using `exclude: 'Bible-OT'`. Next, we iterate over each book and divide the number of times we see 'wherefore' by the total number of words in the book (e.g. 1 Nephi). We do the same for 'therefore'. Finally, `transpose` takes our array-of-arrays and turns it back in to 3 arrays: the labels, the normalized 'wherefore' counts, and the normalized 'therefore' counts.

Here's what the output looks like:

```
Labels: ["1 Nephi","2 Nephi","Jacob","Enos",
  "Jarom","Omni","Words of Mormon","Mosiah",
  "Alma","Helaman","3 Nephi","4 Nephi","Mormon",
  "Ether","Moroni"]
Wherefores: [0.00426,0.00705,0.00581,0.00515,0.00411,0.00429,
  0.00579,0.0,4.0e-05,0.0,0.00012,0.0,0.0,0.00378,0.00627]
Therefores: [0.00426,0.00705,0.00581,0.00515,0.00411,0.00429,
  0.00579,0.0,4.0e-05,0.0,0.00012,0.0,0.0,0.00378,0.00627]
```

It would be easier to understand this data if we could chart it, so let's do that using [Highcharts](http://www.highcharts.com/).

Since we'll be doing more than comparing 'wherefore' and 'therefore', let's make a method that compares any number of words and their frequencies. Basically, this is a generalized version of the code above (note, this requires Ruby 2.1 or above):

```language-ruby
def compare_frequencies(words:, group_by: :books, range: nil)
  BomDB::Query.new(range: range, exclude: 'Bible-OT').
  send(group_by).map do |heading, content|
    wordcount = content.scan(/ +/).size
    frequencies = words.map do |word|
      content.scan(/\b#{word}\b/i).size.to_f / wordcount
    end
    [group_by == :chapters ? heading[1] : heading] + frequencies
  end.transpose
end
```

Now, we can give it a set of words, and we get the same thing as above:

```language-ruby
compare_frequencies(["wherefore", "therefore"])
```

Additionally, we need a method that turns our data into a javascript chart using Highcharts:

```language-ruby
def make_chart(words:, group_by: :books, range: nil,
  title: "Chart", subtitle: nil, labels: [], xtitle: nil, ytitle: nil,
  tooltip: ' occurrences per word', placeholder: 'PLACEHOLDER', height: 400)
  labels, *data = compare_frequencies(words: words, group_by: group_by, range: range)

  series = words.zip(data).map do |word, datapoints|
    { name: word, data: datapoints }
  end

  {
    chart: {
        renderTo: placeholder,
        height: height
    },
    title: {
        text: title,
        x: -20
    },
    subtitle: {
        text: subtitle,
        x: -20
    },
    xAxis: {
        categories: labels,
        title: {
            text: xtitle
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ytitle
        }
    },
    tooltip: {
        valueSuffix: tooltip
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: series
  }
end
```

Lastly, a helper method to generate the embedded script tags for this blog:

```language-ruby
def script_chart(**args)
  "<script>" +
    "var div = document.createElement('div'), " +
        "script = document.scripts[document.scripts.length - 1]; " +
    "script.parentElement.insertBefore(div, script); " +
    "new Highcharts.Chart(" + 
      make_chart(**args).to_json.gsub('"PLACEHOLDER"', 'div') +
    ");</script>"
end
```

When we string this together,

```language-ruby
puts script_chart(
  title: "Wherefores & Therefores Per Word",
  subtitle: "in the Book of Mormon",
  xtitle: "Books in the Book of Mormon",
  ytitle: "Normalized Word Count",
  words: ["wherefore", "therefore"]
)
```


Here's what we get:

<script>var div = document.createElement('div'), script = document.scripts[document.scripts.length - 1]; script.parentElement.insertBefore(div, script); new Highcharts.Chart({"chart":{"renderTo":div,"height":400},"title":{"text":"Wherefores & Therefores Per Word","x":-20},"subtitle":{"text":"in the Book of Mormon","x":-20},"xAxis":{"categories":["1 Nephi","2 Nephi","Jacob","Enos","Jarom","Omni","Words of Mormon","Mosiah","Alma","Helaman","3 Nephi","4 Nephi","Mormon","Ether","Moroni"],"title":{"text":"Books in the Book of Mormon"}},"yAxis":{"min":0,"title":{"text":"Normalized Word Count"}},"tooltip":{"formatter":function() { return "" + this.point.count + " occurrences / " + this.point.total + " total words" }},"legend":{"layout":"vertical","align":"right","verticalAlign":"middle","borderWidth":0},"series":[{"name":"wherefore","data":[{"total":23570,"count":101,"y":0.004285108188375053},{"total":18905,"count":130,"y":0.006876487701666226},{"total":9125,"count":53,"y":0.005808219178082192},{"total":1165,"count":6,"y":0.005150214592274678},{"total":730,"count":3,"y":0.00410958904109589},{"total":1398,"count":6,"y":0.004291845493562232},{"total":864,"count":5,"y":0.005787037037037037},{"total":30223,"count":0,"y":0.0},{"total":85236,"count":3,"y":3.519639588906096e-05},{"total":20522,"count":0,"y":0.0},{"total":24538,"count":1,"y":4.0753117613497433e-05},{"total":1947,"count":0,"y":0.0},{"total":9446,"count":0,"y":0.0},{"total":16678,"count":63,"y":0.0037774313466842546},{"total":6117,"count":38,"y":0.006212195520680072}]},{"name":"therefore","data":[{"total":23570,"count":13,"y":0.0005515485787017395},{"total":18905,"count":6,"y":0.0003173763554615181},{"total":9125,"count":1,"y":0.00010958904109589041},{"total":1165,"count":0,"y":0.0},{"total":730,"count":0,"y":0.0},{"total":1398,"count":0,"y":0.0},{"total":864,"count":0,"y":0.0},{"total":30223,"count":122,"y":0.004036660821228865},{"total":85236,"count":288,"y":0.0033788540053498522},{"total":20522,"count":63,"y":0.003069876230386902},{"total":24538,"count":85,"y":0.003464014997147282},{"total":1947,"count":5,"y":0.0025680534155110425},{"total":9446,"count":22,"y":0.0023290281600677537},{"total":16678,"count":26,"y":0.0015589399208538195},{"total":6117,"count":0,"y":0.0}]}]});</script>

Ether is really interesting. It's the only book that has a substantial number of 'wherefores' **and** 'therefores'. If the Book of Mormon had two or more authors, perhaps we would expect one author to be favoring 'wherefore', and another author favoring 'therefore', and so we would expect a clean break. On the other hand, if there is one author (i.e. Joseph Smith) whose vocabulary and word preference is changing over time, we'd expect a smooth transition.

Using our `compare_frequencies` method above, let's generate a chart and zoom in on Ether:

```language-ruby
puts script_chart(
  range: 'Ether 1-15',
  group_by: :chapters,
  title: "Wherefores & Therefores Per Word in Ether",
  subtitle: "in the Book of Mormon",
  xtitle: "Chapters in Ether",
  ytitle: "Normalized Word Count",
  words: ["wherefore", "therefore"]
)
```

Here's what it looks like:

<script>var div = document.createElement('div'), script = document.scripts[document.scripts.length - 1]; script.parentElement.insertBefore(div, script); new Highcharts.Chart({"chart":{"renderTo":div,"height":400},"title":{"text":"Wherefores & Therefores Per Word in Ether","x":-20},"subtitle":{"text":"in the Book of Mormon","x":-20},"xAxis":{"categories":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],"title":{"text":"Chapters in Ether"}},"yAxis":{"min":0,"title":{"text":"Normalized Word Count"}},"tooltip":{"formatter":function() { return "" + this.point.count + " occurrences / " + this.point.total + " total words" }},"legend":{"layout":"vertical","align":"right","verticalAlign":"middle","borderWidth":0},"series":[{"name":"wherefore","data":[{"total":903,"count":0,"y":0.0},{"total":1373,"count":2,"y":0.0014566642388929353},{"total":1257,"count":3,"y":0.002386634844868735},{"total":888,"count":2,"y":0.0022522522522522522},{"total":223,"count":1,"y":0.004484304932735426},{"total":1048,"count":1,"y":0.0009541984732824427},{"total":918,"count":6,"y":0.006535947712418301},{"total":1228,"count":6,"y":0.004885993485342019},{"total":1427,"count":4,"y":0.002803083391730904},{"total":1418,"count":6,"y":0.004231311706629055},{"total":763,"count":2,"y":0.002621231979030144},{"total":1543,"count":15,"y":0.009721322099805573},{"total":1226,"count":6,"y":0.004893964110929853},{"total":1137,"count":4,"y":0.003518029903254178},{"total":1312,"count":5,"y":0.0038109756097560975}]},{"name":"therefore","data":[{"total":903,"count":3,"y":0.0033222591362126247},{"total":1373,"count":2,"y":0.0014566642388929353},{"total":1257,"count":7,"y":0.005568814638027049},{"total":888,"count":3,"y":0.0033783783783783786},{"total":223,"count":1,"y":0.004484304932735426},{"total":1048,"count":3,"y":0.0028625954198473282},{"total":918,"count":1,"y":0.0010893246187363835},{"total":1228,"count":1,"y":0.0008143322475570033},{"total":1427,"count":3,"y":0.002102312543798178},{"total":1418,"count":0,"y":0.0},{"total":763,"count":0,"y":0.0},{"total":1543,"count":1,"y":0.0006480881399870382},{"total":1226,"count":0,"y":0.0},{"total":1137,"count":0,"y":0.0},{"total":1312,"count":1,"y":0.0007621951219512195}]}]});</script>


According to Metcalfe, Ether was dictated in late May 1829. It looks like this was the period of time when Joseph began preferring 'wherefore' over 'therefore'. Indeed, if you look at the Book of Commandments, a similar pattern appears (see Metcalfe's chapter).

What about other words? Metcalfe mentions 'whoso' and 'whosoever'. Let's check these out:

```language-ruby
puts script_chart(
  title: "Whosos & Whosoevers Per Word",
  subtitle: "in the Book of Mormon",
  xtitle: "Books in the Book of Mormon",
  ytitle: "Normalized Word Count",
  words: ["whoso\\b", "whosoever"]
)
```
And the resulting chart:

<script>var div = document.createElement('div'), script = document.scripts[document.scripts.length - 1]; script.parentElement.insertBefore(div, script); new Highcharts.Chart({"chart":{"renderTo":div,"height":400},"title":{"text":"Whosos & Whosoevers Per Word","x":-20},"subtitle":{"text":"in the Book of Mormon","x":-20},"xAxis":{"categories":["1 Nephi","2 Nephi","Jacob","Enos","Jarom","Omni","Words of Mormon","Mosiah","Alma","Helaman","3 Nephi","4 Nephi","Mormon","Ether","Moroni"],"title":{"text":"Books in the Book of Mormon"}},"yAxis":{"min":0,"title":{"text":"Normalized Word Count"}},"tooltip":{"formatter":function() { return "" + this.point.count + " occurrences / " + this.point.total + " total words" }},"legend":{"layout":"vertical","align":"right","verticalAlign":"middle","borderWidth":0},"series":[{"name":"whoso","data":[{"total":23570,"count":5,"y":0.00021213406873143826},{"total":18905,"count":3,"y":0.00015868817773075905},{"total":9125,"count":1,"y":0.00010958904109589041},{"total":1165,"count":0,"y":0.0},{"total":730,"count":0,"y":0.0},{"total":1398,"count":0,"y":0.0},{"total":864,"count":0,"y":0.0},{"total":30223,"count":0,"y":0.0},{"total":85236,"count":0,"y":0.0},{"total":20522,"count":1,"y":4.8728194133125426e-05},{"total":24538,"count":15,"y":0.0006112967642024615},{"total":1947,"count":0,"y":0.0},{"total":9446,"count":3,"y":0.0003175947491001482},{"total":16678,"count":11,"y":0.0006595515049766159},{"total":6117,"count":2,"y":0.00032695765898316167}]},{"name":"whosoever","data":[{"total":23570,"count":0,"y":0.0},{"total":18905,"count":0,"y":0.0},{"total":9125,"count":0,"y":0.0},{"total":1165,"count":0,"y":0.0},{"total":730,"count":0,"y":0.0},{"total":1398,"count":0,"y":0.0},{"total":864,"count":0,"y":0.0},{"total":30223,"count":21,"y":0.0006948350593918538},{"total":85236,"count":30,"y":0.0003519639588906096},{"total":20522,"count":9,"y":0.00043855374719812884},{"total":24538,"count":5,"y":0.00020376558806748716},{"total":1947,"count":0,"y":0.0},{"total":9446,"count":1,"y":0.00010586491636671607},{"total":16678,"count":0,"y":0.0},{"total":6117,"count":0,"y":0.0}]}]});</script>

Between 3rd Nephi and Mormon, a clear inversion occurs--whereas 'whosoever' was the most common synonym beginning in Mosiah, by Moroni, 'whoso' has completely taken its place, and the trend continues into 1st & 2nd Nephi, as well as Jacob. If we took the hypothesis that 1st Nephi was authored before Mosiah, it would be hard to explain the prevalence of whoso, then its complete absence, then its return.

Let's take a look at 3rd Nephi by "zooming in":

<script>var div = document.createElement('div'), script = document.scripts[document.scripts.length - 1]; script.parentElement.insertBefore(div, script); new Highcharts.Chart({"chart":{"renderTo":div,"height":400},"title":{"text":"Whosos & Whosoevers Per Word in 3rd Nephi","x":-20},"subtitle":{"text":null,"x":-20},"xAxis":{"categories":[1,2,3,4,5,6,7,8,9,10,11,12,15,16,17,18,19,20,21,23,26,27,28,29,30],"title":{"text":"Chapters in 3rd Nephi"}},"yAxis":{"min":0,"title":{"text":"Normalized Word Count"}},"tooltip":{"formatter":function() { return "" + this.point.count + " occurrences / " + this.point.total + " total words" }},"legend":{"layout":"vertical","align":"right","verticalAlign":"middle","borderWidth":0},"series":[{"name":"whoso","data":[{"total":1333,"count":0,"y":0.0},{"total":768,"count":0,"y":0.0},{"total":1354,"count":0,"y":0.0},{"total":1513,"count":0,"y":0.0},{"total":929,"count":0,"y":0.0},{"total":1193,"count":0,"y":0.0},{"total":1133,"count":0,"y":0.0},{"total":869,"count":0,"y":0.0},{"total":966,"count":2,"y":0.002070393374741201},{"total":843,"count":1,"y":0.0011862396204033216},{"total":1434,"count":6,"y":0.0041841004184100415},{"total":397,"count":0,"y":0.0},{"total":727,"count":1,"y":0.001375515818431912},{"total":829,"count":0,"y":0.0},{"total":871,"count":0,"y":0.0},{"total":1346,"count":2,"y":0.0014858841010401188},{"total":1229,"count":0,"y":0.0},{"total":1371,"count":0,"y":0.0},{"total":956,"count":0,"y":0.0},{"total":414,"count":0,"y":0.0},{"total":779,"count":0,"y":0.0},{"total":1285,"count":2,"y":0.0015564202334630351},{"total":1450,"count":1,"y":0.000689655172413793},{"total":396,"count":0,"y":0.0},{"total":129,"count":0,"y":0.0}]},{"name":"whosoever","data":[{"total":1333,"count":0,"y":0.0},{"total":768,"count":0,"y":0.0},{"total":1354,"count":0,"y":0.0},{"total":1513,"count":0,"y":0.0},{"total":929,"count":0,"y":0.0},{"total":1193,"count":0,"y":0.0},{"total":1133,"count":0,"y":0.0},{"total":869,"count":0,"y":0.0},{"total":966,"count":1,"y":0.0010351966873706005},{"total":843,"count":0,"y":0.0},{"total":1434,"count":0,"y":0.0},{"total":397,"count":0,"y":0.0},{"total":727,"count":0,"y":0.0},{"total":829,"count":0,"y":0.0},{"total":871,"count":0,"y":0.0},{"total":1346,"count":1,"y":0.0007429420505200594},{"total":1229,"count":0,"y":0.0},{"total":1371,"count":0,"y":0.0},{"total":956,"count":2,"y":0.0020920502092050207},{"total":414,"count":1,"y":0.0024154589371980675},{"total":779,"count":0,"y":0.0},{"total":1285,"count":0,"y":0.0},{"total":1450,"count":0,"y":0.0},{"total":396,"count":0,"y":0.0},{"total":129,"count":0,"y":0.0}]}]});</script>


There's no clear trend-line up or down. Many of these verses are taken from the New Testament, where the language of Jesus is borrowed. It's interesting to see that in the Book of Mormon, Jesus uses 'whoso' and 'whosoever' interchangeably:

```language-bash
bomdb show --search 'whoso' '3 Nephi 1-30'
```

<p><span style="color:#9fa01c">3 Nephi</span><span style="color:#050505">
</span><span style="color:#2fb41d">9</span><span style="color:#050505">:</span><span style="color:#2fe71a">14</span><span style="color:#050505">
Yea, verily I say unto you: If ye will come unto me, ye shall have
eternal life. Behold, mine arm of mercy is extended towards you. And
</span><span style="color:#b42419;font-weight:bold">whoso</span><span style="color:#050505">ever
will come, him will I receive. And blessed are they which cometh unto
me.</span></p>
<p><span style="color:#9fa01c">3 Nephi</span><span style="color:#050505">
</span><span style="color:#2fb41d">9</span><span style="color:#050505">:</span><span style="color:#2fe71a">20</span><span style="color:#050505">
And ye shall offer for a sacrifice unto me a broken heart and a
contrite spirit. And </span><span style="color:#b42419;font-weight:bold">whoso</span><span style="color:#050505">
cometh unto me with a broken heart and a contrite spirit, him will I
baptize with fire and with the Holy Ghost, even as the Lamanites
because of their faith in me at the time of their conversion were
baptized with fire and with the Holy Ghost--and they knew it not.</span></p>

...

**Note:** I will spare you the 29 verses in 3rd Nephi that mention "whoso", but if you'd like to see all references, by all means run the command above.


What about Mormon?

<script>var div = document.createElement('div'), script = document.scripts[document.scripts.length - 1]; script.parentElement.insertBefore(div, script); new Highcharts.Chart({"chart":{"renderTo":div,"height":400},"title":{"text":"Whosos & Whosoevers Per Word in Mormon","x":-20},"subtitle":{"text":null,"x":-20},"xAxis":{"categories":[1,2,3,4,5,6,7,8,9],"title":{"text":"Chapters in Mormon"}},"yAxis":{"min":0,"title":{"text":"Normalized Word Count"}},"tooltip":{"formatter":function() { return "" + this.point.count + " occurrences / " + this.point.total + " total words" }},"legend":{"layout":"vertical","align":"right","verticalAlign":"middle","borderWidth":0},"series":[{"name":"whoso","data":[{"total":704,"count":0,"y":0.0},{"total":1262,"count":0,"y":0.0},{"total":938,"count":0,"y":0.0},{"total":823,"count":0,"y":0.0},{"total":1067,"count":0,"y":0.0},{"total":908,"count":0,"y":0.0},{"total":451,"count":0,"y":0.0},{"total":1719,"count":2,"y":0.0011634671320535194},{"total":1566,"count":1,"y":0.0006385696040868455}]},{"name":"whosoever","data":[{"total":704,"count":0,"y":0.0},{"total":1262,"count":0,"y":0.0},{"total":938,"count":0,"y":0.0},{"total":823,"count":0,"y":0.0},{"total":1067,"count":0,"y":0.0},{"total":908,"count":0,"y":0.0},{"total":451,"count":0,"y":0.0},{"total":1719,"count":0,"y":0.0},{"total":1566,"count":1,"y":0.0006385696040868455}]}]});</script>


There are 2 'whoso's in chapter 8, and 1 'whoso' and 1 'whosoever' in chapter 9. These occur when Moroni begins speaking.

Here's another interesting one we found. Searching for occurrences of 'House of Israel', the Book of Mormon distributes them in a similar fashion as 'wherefore' and 'whoso':

```language-ruby
puts script_chart(
  title: "'House of Israel' Per Word",
  subtitle: "in the Book of Mormon",
  xtitle: "Books in the Book of Mormon",
  ytitle: "Normalized Word Count",
  words: ["house of israel"]
)
```

<script>var div = document.createElement('div'), script = document.scripts[document.scripts.length - 1]; script.parentElement.insertBefore(div, script); new Highcharts.Chart({"chart":{"renderTo":div,"height":400},"title":{"text":"'House of Israel' Per Word","x":-20},"subtitle":{"text":"in the Book of Mormon","x":-20},"xAxis":{"categories":["1 Nephi","2 Nephi","Jacob","Enos","Jarom","Omni","Words of Mormon","Mosiah","Alma","Helaman","3 Nephi","4 Nephi","Mormon","Ether","Moroni"],"title":{"text":"Books in the Book of Mormon"}},"yAxis":{"min":0,"title":{"text":"Normalized Word Count"}},"tooltip":{"formatter":function() { return "" + this.point.count + " occurrences / " + this.point.total + " total words" }},"legend":{"layout":"vertical","align":"right","verticalAlign":"middle","borderWidth":0},"series":[{"name":"house of israel","data":[{"total":23570,"count":35,"y":0.001484938481120068},{"total":18905,"count":19,"y":0.0010050251256281408},{"total":9125,"count":5,"y":0.000547945205479452},{"total":1165,"count":0,"y":0.0},{"total":730,"count":0,"y":0.0},{"total":1398,"count":0,"y":0.0},{"total":864,"count":0,"y":0.0},{"total":30223,"count":0,"y":0.0},{"total":85236,"count":0,"y":0.0},{"total":20522,"count":0,"y":0.0},{"total":24538,"count":37,"y":0.001507865351699405},{"total":1947,"count":0,"y":0.0},{"total":9446,"count":11,"y":0.0011645140800338768},{"total":16678,"count":5,"y":0.0002997961386257345},{"total":6117,"count":1,"y":0.00016347882949158083}]}]});</script>

Here again, it looks like the phrase "House of Israel" was first encountered in 3rd Nephi, and then favored through Moroni, 1st and 2nd Nephi, and finally Jacob. Its absence from Enos to Helaman is hard to explain without a dictation order that starts somewhere after Jacob and before 3rd Nephi.

If you have ideas to test, or want to replicate this work, give [BomDB](https://github.com/wordtreefoundation/bomdb) a try!

**Note** 2015-04-18: These charts were including data from verses in 3 Nephi that were borrowed from the New Testament (ch. 12, 13, 14). Those data points have now been fixed.
