---
date: 2023-3-28
---

# pymongo 在$project 时判断数组是否含有某个元素

判断 `roll` 中是否存在`_uid`:

```python
cls.event.aggregate([
    {
    "$project": {
        "xxx" : 1,
        "joined": {
            '$cond': {
                'if': { "$in": [_uid, "$roll"] },
                "then": True,
                "else": False
            }
        }
    }
    },
    { "$sort": { '_id': -1 } }
])
```

注意点: project操作不可以是exlude模式, 否则会报错

```txt
Cannot use expression other than $meta in exclusion projection
```
