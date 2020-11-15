import gspread
from google.oauth2.service_account import Credentials

scopes = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]

credentials = Credentials.from_service_account_file(
    'namkeen-1605295049597-233838148291.json',
    scopes=scopes
)

gc = gspread.authorize(credentials)
# sh = gc.create('Namkeen')
# sh.share("namkeenbytes@gmail.com","user","writer")
wks = gc.open("Namkeen").sheet1
# wks.update('A1', [[11, 21], [31, 41]])
wks.append_row([111, 211])
print("hello")