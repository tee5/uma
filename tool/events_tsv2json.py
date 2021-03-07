#!python3
# coding: utf-8

import os.path
import sys
import csv
import json

def main():
    if len(sys.argv) == 1:
        print("コマンドライン引数がありません")
        sys.exit()
    
    tsv_filename = sys.argv[1]
    if not os.path.isfile(tsv_filename):
        print("コマンドライン引数がファイル名ではありません")
        sys.exit()

    with open("events.tsv", "r", encoding="utf-8") as f:
        reader = csv.reader(f, dialect="excel-tab")
        events = []
        for i, row in enumerate(reader):
            if i == 0:
                # skip header row
                continue
            event = {}

            card = {
                "type": row[0],
                "name": row[1],
                "rank": row[2]
            }

            if card["rank"][0] == "星":
                rank = int(card["rank"][1])
                card["rank"] = ("★" * rank) + ("☆" * (5 - rank))
            
            event["card"] = card
            event["title"] = row[3]
            options = []
            column_offset = 4
            for i in range(0, 10, 2):
                i += column_offset
                if row[i]:
                    options.append({
                        "text": row[i],
                        "result": row[i+1]
                    })
            event["options"] = options
            events.append(event)
    with open("events.json", "w", encoding="utf-8") as f:
        json.dump(events, f, ensure_ascii=False, sort_keys=True, indent=2, separators=(',', ': '))

if __name__ == "__main__":
    main()
