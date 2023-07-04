#!/usr/bin/fish

read -l -p "echo 'Title: '" title
set -l tags ()
while test -n $(string trim $(read -p "echo 'Tags: '" tag), $tag)
    set -a tags $tag
end

set script_path (dirname (status --current-filename))
set tgt_path $script_path"/docs/"$(string join "/" $tags)

mkdir -p $tgt_path

echo -e "---
title: $title
date: $(date)
tags: [$(string join ',' $tags)]
---

# $title\n" > $tgt_path"/"$title".md"

code $script_path
