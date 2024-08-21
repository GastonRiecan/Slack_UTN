
export const users = [
    {
        id: "1",
        userName: "Gaston",
        profilePicture: "Gaston.jpg"
    },
    {
        id: "2",
        userName: "Ana",
        profilePicture: "Ana.jpg"
    },
    {
        id: "3",
        userName: "Luis",
        profilePicture: "Luis.jpg"
    },
    {
        id: "4",
        userName: "María",
        profilePicture: "Maria.jpg"
    },
    {
        id: "5",
        userName: "Carlos",
        profilePicture: "Carlos.jpg"
    }
];



export const workSpaces = [
    {
        id: "1",
        name: "Desarrollo",
        thumbnail: "devWorkspaceImage.png",
        channels: [
            {
                id: "1",
                name: "Frontend",
                messages: [
                    {
                        id: "1",
                        userID: "2",
                        timeStamp: "1/05/2024, 09:15",
                        content: "¿Cómo podemos mejorar el rendimiento de la aplicación?"
                    },
                    {
                        id: "2",
                        userID: "3",
                        timeStamp: "1/05/2024, 09:30",
                        content: "Podríamos optimizar el uso de componentes en React."
                    },
                    {
                        id: "3",
                        userID: "4",
                        timeStamp: "1/05/2024, 10:00",
                        content: "También es importante reducir las cargas innecesarias de CSS."
                    },
                    {
                        id: "4",
                        userID: "2",
                        timeStamp: "1/05/2024, 10:20",
                        content: "Voy a revisar el bundle para identificar áreas de mejora."
                    }
                ]
            },
            {
                id: "2",
                name: "Backend",
                messages: [
                    {
                        id: "1",
                        userID: "1",
                        timeStamp: "2/05/2024, 11:15",
                        content: "¿Alguien ha revisado los logs del servidor?"
                    },
                    {
                        id: "2",
                        userID: "3",
                        timeStamp: "2/05/2024, 11:30",
                        content: "Sí, encontré algunos errores de conexión que debemos abordar."
                    },
                    {
                        id: "3",
                        userID: "5",
                        timeStamp: "2/05/2024, 11:45",
                        content: "Estoy trabajando en un parche para corregirlo."
                    },
                    {
                        id: "4",
                        userID: "1",
                        timeStamp: "2/05/2024, 12:00",
                        content: "Gracias, asegúrate de hacer pruebas exhaustivas antes de implementarlo."
                    }
                ]
            },
            {
                id: "3",
                name: "DevOps",
                messages: [
                    {
                        id: "1",
                        userID: "4",
                        timeStamp: "3/05/2024, 08:30",
                        content: "Necesitamos actualizar los scripts de despliegue."
                    },
                    {
                        id: "2",
                        userID: "2",
                        timeStamp: "3/05/2024, 09:00",
                        content: "De acuerdo, estoy en ello. ¿Alguna preferencia por las versiones de herramientas?"
                    },
                    {
                        id: "3",
                        userID: "5",
                        timeStamp: "3/05/2024, 09:15",
                        content: "Prefiero mantener las versiones actuales, pero con las últimas actualizaciones de seguridad."
                    },
                    {
                        id: "4",
                        userID: "4",
                        timeStamp: "3/05/2024, 09:30",
                        content: "Perfecto, haré una prueba antes del próximo despliegue."
                    }
                ]
            }
        ]
    },
    {
        id: "2",
        name: "Marketing",
        thumbnail: "marketingWorkspaceImage.png",
        channels: [
            {
                id: "1",
                name: "Campañas",
                messages: [
                    {
                        id: "1",
                        userID: "2",
                        timeStamp: "5/05/2024, 14:00",
                        content: "¿Cuándo lanzaremos la próxima campaña de email?"
                    },
                    {
                        id: "2",
                        userID: "3",
                        timeStamp: "5/05/2024, 14:10",
                        content: "El viernes a las 10 AM, ¿todos de acuerdo?"
                    },
                    {
                        id: "3",
                        userID: "1",
                        timeStamp: "5/05/2024, 14:15",
                        content: "Sí, está alineado con nuestro calendario de marketing."
                    },
                    {
                        id: "4",
                        userID: "4",
                        timeStamp: "5/05/2024, 14:20",
                        content: "Perfecto, estamos listos para lanzar."
                    }
                ]
            },
            {
                id: "2",
                name: "Redes Sociales",
                messages: [
                    {
                        id: "1",
                        userID: "3",
                        timeStamp: "6/05/2024, 09:30",
                        content: "Los posts para el Día del Padre están listos."
                    },
                    {
                        id: "2",
                        userID: "4",
                        timeStamp: "6/05/2024, 09:40",
                        content: "¿Podemos programar las publicaciones para mañana?"
                    },
                    {
                        id: "3",
                        userID: "2",
                        timeStamp: "6/05/2024, 09:50",
                        content: "Sí, ya está todo programado."
                    },
                    {
                        id: "4",
                        userID: "5",
                        timeStamp: "6/05/2024, 10:00",
                        content: "¡Genial, buen trabajo equipo!"
                    }
                ]
            },
            {
                id: "3",
                name: "Análisis",
                messages: [
                    {
                        id: "1",
                        userID: "1",
                        timeStamp: "7/05/2024, 11:00",
                        content: "¿Cómo van las métricas de la última campaña?"
                    },
                    {
                        id: "2",
                        userID: "5",
                        timeStamp: "7/05/2024, 11:15",
                        content: "Estamos viendo un aumento del 20% en la conversión."
                    },
                    {
                        id: "3",
                        userID: "3",
                        timeStamp: "7/05/2024, 11:30",
                        content: "Necesitamos un análisis más profundo para entender los resultados."
                    },
                    {
                        id: "4",
                        userID: "2",
                        timeStamp: "7/05/2024, 11:45",
                        content: "Voy a preparar un informe detallado para la reunión de mañana."
                    }
                ]
            }
        ]
    },
    {
        id: "3",
        name: "Soporte",
        thumbnail: "supportWorkspaceImage.png",
        channels: [
            {
                id: "1",
                name: "Consultas Técnicas",
                messages: [
                    {
                        id: "1",
                        userID: "4",
                        timeStamp: "8/05/2024, 13:20",
                        content: "Un cliente está teniendo problemas con el inicio de sesión."
                    },
                    {
                        id: "2",
                        userID: "5",
                        timeStamp: "8/05/2024, 13:30",
                        content: "Voy a revisar los logs para ver qué ocurre."
                    },
                    {
                        id: "3",
                        userID: "3",
                        timeStamp: "8/05/2024, 13:45",
                        content: "Parece que es un problema de cookies, ¿puedes confirmar?"
                    },
                    {
                        id: "4",
                        userID: "4",
                        timeStamp: "8/05/2024, 14:00",
                        content: "Sí, estoy corrigiéndolo ahora mismo."
                    }
                ]
            },
            {
                id: "2",
                name: "Reembolsos",
                messages: [
                    {
                        id: "1",
                        userID: "2",
                        timeStamp: "9/05/2024, 10:00",
                        content: "Un cliente solicita un reembolso por un cobro duplicado."
                    },
                    {
                        id: "2",
                        userID: "1",
                        timeStamp: "9/05/2024, 10:15",
                        content: "Verifiqué la transacción, el reembolso es válido."
                    },
                    {
                        id: "3",
                        userID: "3",
                        timeStamp: "9/05/2024, 10:30",
                        content: "Procesando el reembolso ahora."
                    },
                    {
                        id: "4",
                        userID: "5",
                        timeStamp: "9/05/2024, 10:45",
                        content: "Reembolso completado, informé al cliente."
                    }
                ]
            },
            {
                id: "3",
                name: "Sugerencias",
                messages: [
                    {
                        id: "1",
                        userID: "4",
                        timeStamp: "10/05/2024, 11:00",
                        content: "Un cliente sugirió mejorar la interfaz del panel de control."
                    },
                    {
                        id: "2",
                        userID: "2",
                        timeStamp: "10/05/2024, 11:15",
                        content: "Podemos agregar eso al backlog de desarrollo."
                    },
                    {
                        id: "3",
                        userID: "3",
                        timeStamp: "10/05/2024, 11:30",
                        content: "De acuerdo, es una buena idea."
                    },
                    {
                        id: "4",
                        userID: "5",
                        timeStamp: "10/05/2024, 11:45",
                        content: "Voy a documentar la sugerencia para futuras actualizaciones."
                    }
                ]
            }
        ]
    },
    {
        id: "4",
        name: "Diseño",
        thumbnail: "designWorkspaceImage.png",
        channels: [
            {
                id: "1",
                name: "UX/UI",
                messages: [
                    {
                        id: "1",
                        userID: "3",
                        timeStamp: "12/05/2024, 15:00",
                        content: "Necesitamos repensar el diseño de la página principal."
                    },
                    {
                        id: "2",
                        userID: "4",
                        timeStamp: "12/05/2024, 15:15",
                        content: "Podríamos simplificar la navegación y mejorar la experiencia de usuario."
                    },
                    {
                        id: "3",
                        userID: "1",
                        timeStamp: "12/05/2024, 15:30",
                        content: "Voy a preparar algunos mockups con nuevas ideas."
                    },
                    {
                        id: "4",
                        userID: "5",
                        timeStamp: "12/05/2024, 15:45",
                        content: "Excelente, agendemos una reunión para revisar los mockups."
                    }
                ]
            },
            {
                id: "2",
                name: "Prototipos",
                messages: [
                    {
                        id: "1",
                        userID: "2",
                        timeStamp: "13/05/2024, 10:00",
                        content: "El prototipo del nuevo dashboard está listo."
                    },
                    {
                        id: "2",
                        userID: "5",
                        timeStamp: "13/05/2024, 10:15",
                        content: "Voy a revisarlo y dar feedback."
                    },
                    {
                        id: "3",
                        userID: "3",
                        timeStamp: "13/05/2024, 10:30",
                        content: "Asegurémonos de que sea fácil de usar."
                    },
                    {
                        id: "4",
                        userID: "1",
                        timeStamp: "13/05/2024, 10:45",
                        content: "De acuerdo, tomaré en cuenta sus comentarios."
                    }
                ]
            },
            {
                id: "3",
                name: "Gráficos",
                messages: [
                    {
                        id: "1",
                        userID: "4",
                        timeStamp: "14/05/2024, 12:00",
                        content: "Necesitamos nuevos gráficos para la campaña de verano."
                    },
                    {
                        id: "2",
                        userID: "2",
                        timeStamp: "14/05/2024, 12:15",
                        content: "Voy a trabajar en algunos conceptos."
                    },
                    {
                        id: "3",
                        userID: "3",
                        timeStamp: "14/05/2024, 12:30",
                        content: "¿Podemos enfocarnos en colores vibrantes y frescos?"
                    },
                    {
                        id: "4",
                        userID: "5",
                        timeStamp: "14/05/2024, 12:45",
                        content: "Sí, compartiré algunos bocetos mañana."
                    }
                ]
            }
        ]
    },
    {
        id: "5",
        name: "Recursos Humanos",
        thumbnail: "hrWorkspaceImage.png",
        channels: [
            {
                id: "1",
                name: "Contrataciones",
                messages: [
                    {
                        id: "1",
                        userID: "2",
                        timeStamp: "15/05/2024, 09:00",
                        content: "Estamos en la última etapa del proceso de contratación para el puesto de desarrollador."
                    },
                    {
                        id: "2",
                        userID: "4",
                        timeStamp: "15/05/2024, 09:15",
                        content: "Genial, ¿cuál es el siguiente paso?"
                    },
                    {
                        id: "3",
                        userID: "3",
                        timeStamp: "15/05/2024, 09:30",
                        content: "La última entrevista es mañana, después revisaremos las referencias."
                    },
                    {
                        id: "4",
                        userID: "1",
                        timeStamp: "15/05/2024, 09:45",
                        content: "Perfecto, mantengamos el proceso en marcha."
                    }
                ]
            },
            {
                id: "2",
                name: "Capacitación",
                messages: [
                    {
                        id: "1",
                        userID: "5",
                        timeStamp: "16/05/2024, 11:00",
                        content: "La sesión de capacitación sobre nuevas políticas se llevará a cabo la próxima semana."
                    },
                    {
                        id: "2",
                        userID: "2",
                        timeStamp: "16/05/2024, 11:15",
                        content: "¿Podemos enviar un recordatorio a todo el personal?"
                    },
                    {
                        id: "3",
                        userID: "4",
                        timeStamp: "16/05/2024, 11:30",
                        content: "Ya he enviado el correo a todos."
                    },
                    {
                        id: "4",
                        userID: "3",
                        timeStamp: "16/05/2024, 11:45",
                        content: "Gracias, nos aseguraremos de que todos asistan."
                    }
                ]
            },
            {
                id: "3",
                name: "Beneficios",
                messages: [
                    {
                        id: "1",
                        userID: "1",
                        timeStamp: "17/05/2024, 14:00",
                        content: "Estamos revisando los beneficios de salud para el próximo año."
                    },
                    {
                        id: "2",
                        userID: "3",
                        timeStamp: "17/05/2024, 14:15",
                        content: "Sería bueno incluir un plan de bienestar mental."
                    },
                    {
                        id: "3",
                        userID: "4",
                        timeStamp: "17/05/2024, 14:30",
                        content: "Estoy de acuerdo, es algo que muchos empleados han solicitado."
                    },
                    {
                        id: "4",
                        userID: "5",
                        timeStamp: "17/05/2024, 14:45",
                        content: "Voy a investigar opciones y traer propuestas."
                    }
                ]
            }
        ]
    }
];
