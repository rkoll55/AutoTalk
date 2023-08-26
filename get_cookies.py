import requests
response = requests.get('https://bard.google.com/')
cookie_cook = response.cookies

for cookie in cookie_cook:
    print(f'cookie.name: {cookie.name}, cookie.value: {cookie.value}, cookie.domain: {cookie.domain}')
    