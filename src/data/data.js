
export const users = [
    {
        id: 1,
        userName: "Pepe",
        profilePicture: "Pepe.jpg"
    }
]



export const workSpaces = [
    {
        id: 1,
        name: "General",
        thumbnail: "defaultWorkSpaceImage.png",
        channels: [
            {
                id: 1,
                name: "General",
                messages: [
                    {
                        id: 1,
                        userID: 1,
                        timeStamp: "2/04/2024, 12:05",
                        content: "mensajes 1"
                    },
                    {
                        id: 2,
                        userID: 1,
                        timeStamp: "13/04/2024, 12:05",
                        content: "mensajes 2"
                    },
                    {
                        id: 3,
                        userID: 1,
                        timeStamp: "17/04/2022, 12:05",
                        content: "mensajes 3"
                    },
                    {
                        id: 4,
                        userID: 1,
                        timeStamp: "6/04/2024, 12:05",
                        content: "mensajes 4"
                    }
                ]
            },
            {
                id: 2,
                name: "Preguntas",
                messages: [
                    {
                        id: 1,
                        userID: 1,
                        timeStamp: "17/04/2024, 12:05",
                        content: "Mensaje del canal preguntas"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Consultas",
        thumbnail: "defaultWorkSpaceImage.png",
        channels: [
            {
                id: 1,
                name: "General2",
                messages: [
                    {
                        id: 1,
                        userID: 1,
                        timeStamp: "17/04/2024, 12:05",
                        content: "Este es el contenido del mensaje"
                    }
                ]
            }
        ]
    },

]