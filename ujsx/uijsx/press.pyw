

from pynput.keyboard import Key, Controller
import time

kb = Controller()

x = 24
while(x >0):
    time.sleep(0.06)
    kb.press('f')
    kb.release('f')
    x = x-1