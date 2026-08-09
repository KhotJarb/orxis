import json
import os
import sys

locales = ['en', 'th', 'zh', 'ja', 'ko', 'es', 'id']
base_dir = 'c:/Users/Admin/Desktop/Others/AI CIs Generator/ai-cis-generator/src/i18n/locales'

def update_json(locale, new_data):
    path = os.path.join(base_dir, locale, 'docs.json')
    try:
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception:
        data = {}
    
    # recursive merge
    def merge(d, u):
        for k, v in u.items():
            if isinstance(v, dict):
                d[k] = merge(d.get(k, {}), v)
            else:
                d[k] = v
        return d
        
    data = merge(data, new_data)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write('\n')

if __name__ == '__main__':
    with open('scratch/updates.json', 'r', encoding='utf-8') as f:
        updates = json.load(f)
    for loc, data in updates.items():
        update_json(loc, data)
    print("Done updating json")
