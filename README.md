# Cliente Web REST (HTML5 & JavaScript) - Gestión de Productos

Este repositorio contiene la interfaz web moderna desarrollada con **HTML5, Bootstrap 5 y JavaScript vanilla** (`async/await` y `fetch API`), diseñada para interactuar y consumir los servicios de la API RESTful de **Gestión de Productos**.

---

## Arquitectura e Integración

La aplicación actúa como la capa cliente frontend consumiendo la API RESTful expuesta por el servidor en Spring Boot:

```text
[ Cliente Web (HTML / JS) ] --- ( Peticiones HTTP / JSON ) ---> [ API REST (Spring Boot) ] ---> [ Base de Datos ]
