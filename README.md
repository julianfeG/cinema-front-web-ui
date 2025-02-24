# **Despliegue de la Aplicación Angular**

## **📌 Requisitos previos**
- Tener instalado **Node.js** y **npm**.
- Tener instalado **Angular CLI** (`npm install -g @angular/cli`).
- Acceso a un bucket S3 en AWS para el despliegue.

## **💻 Pruebas en local**
Para ejecutar el proyecto en tu máquina local:

### **1️⃣ Instalar dependencias**
```sh
npm install
```

### **2️⃣ Iniciar el servidor de desarrollo**
```sh
npm run start
```
Esto iniciará el servidor en `localhost:4200`.

### **3️⃣ Abrir la aplicación en el navegador**
Ve a:
```
http://localhost:4200
```
![Front Caminos](https://github.com/user-attachments/assets/c1ab0e03-5fb8-4701-bb85-930bff6d9a9e)

---

## **🚀 Despliegue en AWS S3**
Para desplegar la aplicación en producción, sigue estos pasos:

### **1️⃣ Construir el proyecto para producción**
```sh
ng build --configuration=production
```
Esto generará el código optimizado en la carpeta `dist/`.

### **2️⃣ Subir el contenido de `dist/` al bucket S3**
Sube todos los archivos generados en `dist/` a tu bucket S3 en AWS.

Si tienes la AWS CLI configurada, puedes hacerlo con:
```sh
aws s3 sync dist/ s3://TU_BUCKET_S3 --delete
```
Reemplaza `TU_BUCKET_S3` con el nombre de tu bucket en AWS.

---

## **🌍 Enlace de Producción**
La aplicación en producción está disponible en:

[🔗 **Clic aquí para acceder**](https://d35zwan0ksaeux.cloudfront.net/cinema/movies)

---

✨ **Ahora puedes ejecutar y desplegar tu aplicación Angular fácilmente.** 🚀

