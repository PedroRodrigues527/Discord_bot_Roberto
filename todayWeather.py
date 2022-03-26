"""
Author: Pedro Rodrigues;
Description: Retrieve weather information about Madeira 
             Island using python (Webscraping);
2022
"""

import requests
import datetime
from time import sleep
from os import system, name
from bs4 import BeautifulSoup

url = ['https://www.tempo.pt/calheta.htm','https://www.tempo.pt/camara-de-lobos.htm','https://www.tempo.pt/funchal.htm','https://www.tempo.pt/machico.htm','https://www.tempo.pt/ponta-do-sol.htm','https://www.tempo.pt/porto-moniz.htm','https://www.tempo.pt/ribeira-brava.htm','https://www.tempo.pt/santa-cruz_madeira-l32099.htm','https://www.tempo.pt/santana.htm','https://www.tempo.pt/sao-vicente.htm']

lugares = ["Calheta","Camara de Lobos","Funchal","Machico","Ponta de Sol","Porto Moniz","Ribeira Brava","Santa Cruz","Santana","São Vicente"]


def connect(link):
    url = link
    result = requests.get(url)
    doc = BeautifulSoup(result.text, "html.parser")
    return doc

def atualtemp():
    tempBox = connect('https://www.tempo.pt/madeira-provincia.htm').find("ul", {"class":"ul-top-prediccion top-pred"})
    tempPredict = tempBox.find_all("li", {"class":"li-top-prediccion"})
    
    time()
    text = []
    text.append(str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"))+"\n")
    for temperatura in tempPredict:
        lugar = temperatura.find("a", {"class":"anchors"})
        maxTemp = temperatura.find("span", {"class": "cMax changeUnitT"})
        minTemp = temperatura.find("span", {"class": "cMin changeUnitT"})
        print(str(lugar.string) + " Max: " + str(maxTemp.string) + " Min: " + str(minTemp.string))
        textStr = str(lugar.string) + " Max: " + str(maxTemp.string) + " Min: " + str(minTemp.string) + "\n";
        text.append(textStr)
    print("")
    saveToFile(text, "weather.txt")

    
def saveToFile(content, file):
    
    with open(file, 'w') as f:
        for strings in content:
            f.write(strings)
            #f.write("\n")
        print("Content saved with success")
    

def time():
    today = datetime.datetime.now()
    print (today.strftime("%Y-%m-%d %H:%M:%S"))


def execute():
    while True:
        atualtemp()
        sleep(300)



execute()
