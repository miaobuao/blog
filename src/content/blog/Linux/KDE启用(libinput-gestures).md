---
title: "KDE启用(libinput-gestures)"
date: 2023-07-04 13:03:06
tags: [Linux]
---

# KDE 启用(libinput-gestures)

```bash
yay -S xdotool libinput-gestures
libinput-gestures-setup autostart
usermod -aG input $USER
```

重启即可， 另可安装`gestures`， 是手势的 gui
