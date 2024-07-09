from pyradios import RadioBrowser

rb = RadioBrowser()

search_term = input("Input Station Name: ")

search_result = rb.search(name=search_term)

for result in search_result:
    print(f'Station Name = {result["name"]}')
    print(f'Station URL = {result["url"]}')
    print(f'Categories = {result["tags"]}')
    print(f'Logo = {result["favicon"]}')