interface XmlNodeSpec {
    parents: string[],
    text?: string
    attributes: object
}

export const xmlSpecs = {
    track: {
        parents: []
    },
    title: {
        parents: ['track'],
        text: 'string'
    },
    author: {
        parents: ['track'],
        text: 'string'
    },
    tempo: {
        parents: ['track'],
        text: 'string',
        attributes: {
            noteValue: {
                type: 'enum',
                options: ['half', 'quarter', 'eighth'],
                autocomplete: [
                    { label: 'half', info: 'à la blanche' },
                    { label: 'quarter', info: 'à la noire' },
                    { label: 'eighth', info: 'à la croche' }
                ]
            },
            augmented: {
                type: 'bool',
                autocomplete: [
                    { label: 'true', info: 'note pointée' },
                    { label: 'false' }
                ]
            }
        }
    }
}
// track: {
//     type: 'root',
//     children: {
//         title: { type: 'text' },
//         author: { type: 'text' },
//         tempo: {
//             type: 'text',
//             attributes: {
//                 noteValue: {
//                     type: 'enum',
//                     options: ['half', 'quarter', 'eighth']
//                 },
//                 augmented: {
//                     type: 'bool',
//                     default: false
//                 }
//             }
//         },
//         contents: {
//             type: 'node',
//             children: {
//                 content: {
//                     type: 'node',
//                     repeatable: true,
//                     attributes: {
//                         type: {
//                             type: 'enum',
//                             options: ['grid']
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }


