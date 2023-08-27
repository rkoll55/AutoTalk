import random

labels_dict = {
    0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J',
    10: 'K', 11: 'L', 12: 'M', 13: 'N', 14: 'O', 15: 'P', 16: 'Q', 17: 'R', 18: 'S',
    19: 'T', 20: 'U', 21: 'V', 22: 'W', 23: 'X', 24: 'Y', 25: 'Z', 26: "I Love You",
    27: "Hello", 28: "Thank You", 29: "Please", 30: "I", 31: "You", 32: "Yes", 
}

def get_prompt(labels_dict):
    prompt = ""
    i = random.randint(26, len(labels_dict)-1) 
    prompt = labels_dict[i]
    return prompt


if __name__ == """__main__""":
    for i in range(10000):
        print(get_prompt(labels_dict))