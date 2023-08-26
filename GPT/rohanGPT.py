import torch

text =  ""

stoi = {ch:i for i,ch in enumerate(sorted(list(set(text))))}
encode = lambda s: [stoi[c] for c in s]
data = torch.tensor(encode(text), dtype=torch.long)

train = text[:0.9]
test = text[0.9:]
