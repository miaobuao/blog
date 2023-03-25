import re
import os

for i in os.listdir("./docs/posts"):
    with open(f"./docs/posts/{i}", 'r', encoding="utf8") as f:
        text = f.read().split("---")[1].strip()
        title = re.match(r"title:(.+)", text)[1].strip()
        title = eval(title)
    try:
        os.rename(f"./docs/posts/{i}", f"./docs/posts/{title}.md")
    except:pass