import torch
import torch.nn as nn
from torch.nn import functional as F

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(device)

with open('WikiQA-test.txt', 'r', encoding='utf-8') as f:
    text = f.read()
    
#print(text)
    
chars = sorted(list(set(text)))
vocab_size = len(chars)

stoi = { ch:i for i,ch in enumerate(chars) }
itos = { i:ch for i,ch in enumerate(chars) }
encode = lambda s: [stoi[c] for c in s] # encoder: take a string, output a list of integers
decode = lambda l: ''.join([itos[i] for i in l])

data = torch.tensor(encode(text), dtype=torch.long)

n = int(0.9*len(data)) # first 90% will be train, rest val
train_data = data[:n]
val_data = data[n:]

block_size = 8
batch_size = 32

def get_batch(split):
    data = train_data if split == 'train' else val_data
    ix = torch.randint(len(data) - block_size, (batch_size,))
    x = torch.stack([data[i:i+block_size] for i in ix])
    y = torch.stack([data[i+1:i+block_size+1] for i in ix])
    return x, y


xb, yb = get_batch('train')
 
class BigramLanguageModel(nn.Module):
    
    def __init__(self, vocab_size):
        super().__init__() 
        self.token_embedding_table = nn.Embedding(vocab_size, vocab_size)
        
    def forward(self, idx, targets=None):

        # idx and targets are both (B,T) tensor of integers
        logits = self.token_embedding_table(idx) # (B,T,C)
        
        if targets is None:
            loss = None
        else:
            B, T, C = logits.shape
            logits = logits.view(B*T, C)
            targets = targets.view(B*T)
            loss = F.cross_entropy(logits, targets)

        return logits, loss
    
    def generate(self, idx, max_new_tokens):
         for _ in range(max_new_tokens):
             logits, loss = self(idx)
             logits = logits[:, -1, :]
             probs = F.softmax(logits, dim=-1)
             idx_next = torch.multinomial(probs, num_samples=1)
             idx= torch.cat((idx, idx_next), dim=1)
         return idx
         
m = BigramLanguageModel(vocab_size)
logits, loss = m(xb, yb)
print(logits)
print(loss) 
print(decode(m.generate(idx= torch.zeros((1,1), dtype= torch.long), max_new_tokens=100)[0].tolist()))