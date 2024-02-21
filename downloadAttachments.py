

from trello import TrelloClient
import requests

personal_token = 'eaab65cdb6b3f930891953f93327e65e'
account_token = 'ATTA9890326a872fc0376b216d80d4582602fcf88703471fda6cb1b13f33b6c9702008C31C28'

client = TrelloClient(api_key=personal_token, api_secret=account_token)

board = client.get_board('619a55bb16b4572362761d0a')

headers = {
    "Authorization": f'OAuth oauth_consumer_key="{personal_token}", oauth_token="{account_token}"'
}

cards = board.all_cards()
for card in cards:
    for attachment in card.get_attachments():
        response = requests.get(attachment.url)
        file_name = attachment.url.split('/')[-1]

        if response.status_code == 200:
               with open(file_name, 'wb') as file:
                   file.write(response.content)
        else:
            print(response.status_code, response.text)
    
        break
    break