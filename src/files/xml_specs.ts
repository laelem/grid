enum NodeType {
    Element = 'element',
    Text = 'text'
}

enum AttributeType {
    Enum = 'enum',
    Bool = 'bool'
}

interface XmlAttributeOptionListSpec {
    [key: string]: string | null
}

interface XmlBoolAttributeOptionListSpec extends XmlAttributeOptionListSpec {
    true: string | null,
    false: string | null
}

interface XmlAttributeSpec {
    info?: string,
}

interface XmlEnumAttributeSpec extends XmlAttributeSpec {
    type: AttributeType.Enum,
    options: XmlAttributeOptionListSpec
}

interface XmlBoolAttributeSpec extends XmlAttributeSpec {
    type: AttributeType.Bool,
    options?: XmlBoolAttributeOptionListSpec
}

interface XmlAttributeListSpec {
    [key: string]: XmlEnumAttributeSpec | XmlBoolAttributeSpec
}

interface XmlNodeSpec {
    info?: string,
    parents: string[],
    attributes?: XmlAttributeListSpec
}

interface XmlElementNodeSpec extends XmlNodeSpec {
    type: NodeType.Element,
    repeatable?: boolean
}

interface XmlTextNodeSpec extends XmlNodeSpec {
    type: NodeType.Text,
}

interface XmlSpecs {
    [key: string]: XmlElementNodeSpec | XmlTextNodeSpec
}

export const xmlSpecs: XmlSpecs = {
    track: {
        type: NodeType.Element,
        parents: []
    },
    title: {
        type: NodeType.Text,
        info: 'Titre du morceau',
        parents: ['track']
    },
    author: {
        type: NodeType.Text,
        info: 'Auteur du morceau',
        parents: ['track']
    },
    tempo: {
        type: NodeType.Text,
        info: 'Tempo',
        parents: ['track'],
        attributes: {
            noteValue: {
                type: AttributeType.Enum,
                info: 'Valeur de note',
                options: {
                    quarter: 'À la noire',
                    half: 'À la blanche',
                    eighth: 'À la croche'
                }
            },
            augmented: {
                type: AttributeType.Bool,
                info: 'Note pointée',
                options: {
                    true: 'Oui',
                    false: 'Non'
                }
            }
        }
    },
    contents: {
        type: NodeType.Element,
        parents: ['track']
    },
    content: {
        type: NodeType.Element,
        parents: ['contents'],
        attributes: {
            type: {
                type: AttributeType.Enum,
                info: 'Type de contenu',
                options: {
                    grid: 'Grille d\'accords'
                }
            }
        },
        repeatable: true
    }
}
