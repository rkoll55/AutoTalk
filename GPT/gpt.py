from bardapi import BardCookies
import os
import requests


cookie_dict = {
    "__Secure-1PSID": "ZwiiTHYROfjKQ0M-rrUGx0jx3qwGp-vBPOixU_o9tkWqugBMbb-K_7Ztxufe-Izp7tfSlQ.",
    "__Secure-1PSIDTS": "sidts-CjIBSAxbGRLx2_d8K3Cw6GLhE3ZAgOm_doUl8Tgeb6XzJAAt-vv_kbuGuSuXklh8g2x0ExAA",
    
    # Any cookie values you want to pass session object.
}

def buildPrompt(tone, message, history)->str:
    prompt = "You are immitating a personal assistant for a user of facebook/discord/instagram respond to this message from the users friend wtih this tone "
    return prompt + tone + "and this message" + message + "here is some text history for some context" + history



def prompt(input)->str:
    bard = BardCookies(cookie_dict=cookie_dict)
    return bard.get_answer(input)

myPrompt = buildPrompt("serious", "My friends jackson is dumb what do i do", "")
print(prompt(myPrompt)['content'])