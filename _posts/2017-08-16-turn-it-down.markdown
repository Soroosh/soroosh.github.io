---
layout: post
title:  "Turn it down"
date:   2017-08-16 07:59:02 +0200
categories: ["The Hacker"]
tags: [automation, python]
excerpt_separator: <!--more-->
---
When I watch TV at nights, I often don’t pay attention on the volume. To avoid angry neighbours, I wrote a python script to turn the volume down on my smart TV. The most difficult part of this task was to find some kind information on the TV API because there is no public documentation.<!--more--> Here is the script for a Philips TV
{% highlight python linenos%}
import requests
import json
 
try:
    r = requests.get('http://[TV_IP]:1925/1/audio/volume')
    if r.json()["current"]<10 and not r.json()["muted"]:
        requests.post('http://[TV_IP]:1925/1/audio/volume', 
            data = json.dumps({'current':10}))
except OSError:
    exit
{% endhighlight %}
It requests volume information (line 5) and checks if the volume is above 10 and not muted (line 6). If so it will reduce the volume to 10 (line 7). Exceptions need to be caught if the TV is not reachable/ TV is off (line 9). A cron job runs the script every night at 10pm. Create the cron job with `crontab -e` and add  
`00 22 * * * [path to script]`  
A nice side effect is a visual and audible yet inconspicuous notification for when it turns 10 pm.
