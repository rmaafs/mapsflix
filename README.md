# Mapsflix
Simple aplicación móvil en React Native para ver series/películas de forma privada.

---

#### Series

La aplicación necesita un JSON principal para leer las series disponibles.
Al configurar el JSON, se debe poner la ruta en mapsflix-config.json, no importa si es local o en línea en un servidor.

Ejemplo del formato de este JSON:

    [
		{
      	"id": 1,//ID
      	"name": "Bob Esponja",//Nombre de la serie
     	 "description": "Temporada 1",//Descripción
      	"img": "https://localhost/miniaturas/bobEsponja1.png",//Miniatura
      	"caps": 41,//Cuantos capítulos tiene
     	 "url_capitulos": "https://localhost/bobEsponja/1/capitulos.json"//Donde se encuentra el JSON que contiene los capítulos
   	 },
    	{
      	"id": 2,
      	"name": "Death Note",
      	"description": "Temporada 1",
     	 "img": "https://localhost/miniaturas/deathNote1.png",
     	 "caps": 37,
      	"url_capitulos": "https://localhost/deathNote/1/capitulos.json"
   	 }
	 ]

---

#### Capítulos
Después, por cada serie, el campo `"url_capitulos"` vemos que apunta a un JSON, el formato de ese JSON nuevo debe tener todos los capítulos, por ejemplo:

    [
    	{
        	"id": 1,//ID
        	"nombre": "Se busca ayuda",//Nombre del capítulo
        	"time": 546334,//Tiempo que dura
        	"size": "21 MB",//Tamaño del archivo
        	"screenSize": "480 X 360",//Tamaño de la imagen
        	"url": "https://localhost/bobEsponja/1/01-Se busca ayuda.mp4"//URL donde se encuentra el video
    	},
   	 {
        	"id": 2,
        	"nombre": "La aspiradora",
        	"time": 214667,
        	"size": "8.2 MB",
       	 "screenSize": "480 X 360",
        	"url": "https://localhost/bobEsponja/1/02-La aspiradora.mp4"
   	 }
	]
