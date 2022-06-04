"""
Author: Pedro Rodrigues;
Description: Retrieve weather information about Madeira 
             Island using python (Webscraping);
2022
"""
from typing import List

import requests
import datetime
import yagmail
from time import sleep
from os import system, name
from bs4 import BeautifulSoup

url = ['https://www.tempo.pt/calheta.htm', 'https://www.tempo.pt/camara-de-lobos.htm',
       'https://www.tempo.pt/funchal.htm', 'https://www.tempo.pt/machico.htm', 'https://www.tempo.pt/ponta-do-sol.htm',
       'https://www.tempo.pt/porto-moniz.htm', 'https://www.tempo.pt/ribeira-brava.htm',
       'https://www.tempo.pt/santa-cruz_madeira-l32099.htm', 'https://www.tempo.pt/santana.htm',
       'https://www.tempo.pt/sao-vicente.htm']

lugares: list[str] = ["Calheta", "Camara de Lobos", "Funchal", "Machico", "Ponta de Sol", "Porto Moniz",
                      "Ribeira Brava", "Santa Cruz", "Santana", "São Vicente"]

def connect(link):
    result = requests.get(link)
    doc = BeautifulSoup(result.text, "html.parser")
    return doc

def display(lugar, max_temp, min_temp):
    global output
    output = lugar
    MAX_SIZE = 16
    MAX_SIZE_TEMPERATURE = 10
    if len(lugar) <= MAX_SIZE:
        for space in range(MAX_SIZE - len(lugar)):
            output = output + " "
    output = output + " Max: " + max_temp
    output = output + " Min: " + min_temp
    print(output)
    output = output + "\n"


def atualTempo():
    tempBox = connect('https://www.tempo.pt/madeira-provincia.htm').find("ul", {"class": "ul-top-prediccion top-pred"})
    tempPredict = tempBox.find_all("li", {"class": "li-top-prediccion"})
    time()
    text = []
    for temperatura in tempPredict:
        lugar = temperatura.find("a", {"class": "anchors"})
        maxTemp = temperatura.find("span", {"class": "cMax changeUnitT"})
        minTemp = temperatura.find("span", {"class": "cMin changeUnitT"})
        display(str(lugar.string), str(maxTemp.string), str(minTemp.string))
        text.append(output)
    print("")
    saveToFile(text, "weather.txt")
    time()



def saveToFile(content, file):
    try:
        with open(file, 'w') as f:
            for strings in content:
                f.write(strings)
            print("Content saved with success")
    except FileExistsError as e:
        print("Error opening the file\n"+e)
    except FileNotFoundError as e:
        print("File not Found\n"+e)

# cleaning console
def clean():
    if name == 'nt':
        system('cls')
    else:
        system('clear')


def time():
    today = datetime.datetime.now()
    print(today.strftime("%Y-%m-%d %H:%M:%S.%f"))

if __name__ == '__main__':
    atualTempo()



