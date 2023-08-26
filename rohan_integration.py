from bardapi import BardCookies

cookie_dict = {
    "__Secure-1PSID": "ZQjbB8Tv4pPTQN9R8dMhug5bJP1cbKAiKWHwEajDntIOreuqueWDEQltFyd_YT6VupOnQw.",
    "__Secure-1PSIDTS": "sidts-CjEBSAxbGds4U66yLDoj_bpdnXBDvkcQeCtyZlMuTUim_3FMTFliaIs60skjPKy_7mKcEAA",
    # Any cookie values you want to pass session object.
}

def buildPrompt(tone, message)->str:
    prompt = "You are immitating a personal assistant for a user of facebook/discord/instagram respond to this message wtih this tone"
    return prompt + tone + "and this message" + message



def prompt(input)->str:
    bard = BardCookies(cookie_dict=cookie_dict)
    return bard.get_answer(input)

myPrompt = buildPrompt("funny", "Please say moo")
print(prompt(myPrompt)['content'])