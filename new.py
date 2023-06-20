#!/usr/bin/env python
import os
import datetime

now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

title = input("Title: ")
tags = []
for i in range(1, 100):
    t = input(f"Tag {i}:").strip()
    if not t:
        break
    tags.append(t)

ROOT = "./docs"
target = os.path.join(ROOT, *tags)
if not os.path.exists(target):
    os.makedirs(target)

fpath = os.path.join(target, f"{title.replace('/', '-').replace(' ', '_')}.md")
with open(fpath, 'w+', encoding='utf8') as f:
    f.write(f"""---
title: '{title}'
date: {now}
tags: [{', '.join(tags)}]
---

# {title}
""")

os.system(f"code {fpath}")