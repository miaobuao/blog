#!/usr/bin/fish

read -l -p "echo 'Title: '" title
set -l tags ()
while test -n $(string trim $(read -p "echo 'Tags: '" tag), $tag)
    set -a tags $tag
end

set -l script_path (dirname (status --current-filename))
set -l tgt_path $script_path"/docs/src/"$(string join "/" $tags)
set -l doc_path $tgt_path"/"$title".md"
mkdir -p $tgt_path

echo -e "---
title: $title
date: $(date '+%Y-%m-%d %H:%M:%S')
tags: [$(string join ',' $tags)]
---

# $title\n" > $doc_path

code $script_path
code $doc_path