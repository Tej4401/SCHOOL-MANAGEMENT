a=int(input())
b=int(input())
d=2
while(d!=1):
    d=b%a
    if d!=1:
        b=a
        a=d
print(a)