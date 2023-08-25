from bardapi import BardCookies

cookie_dict = {
    "__Secure-1PSID": "ZwiiTHYROfjKQ0M-rrUGx0jx3qwGp-vBPOixU_o9tkWqugBMbb-K_7Ztxufe-Izp7tfSlQ.",
    "__Secure-1PSIDTS": "sidts-CjIBSAxbGa6tmSXkZBIYnIxIrUt85Co3HjxHivYzsoKJrEY3fiUxeEYEO045HjuB3dAXyBAA",
    # Any cookie values you want to pass session object.
}

def buildPrompt(tone, message)->str:
    prompt = "You are immitating a personal assistant for a user of facebook/discord/instagram respond to this message wtih this tone "
    return prompt + tone + "and this message" + message



def prompt(input)->str:
    bard = BardCookies(cookie_dict=cookie_dict)
    return bard.get_answer(input)

myPrompt = buildPrompt("funny", "My friend Santiago is an asshole whad do i do")
print(prompt(myPrompt)['content'])