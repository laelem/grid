const xmlObject: XmlDocObject = { root: [] }

export const parseXml = (doc: XMLDocument) => {
    parseElement(doc.documentElement, xmlObject.root)
    return xmlObject
}

interface AttributeObject {
    readonly name: string,
    readonly text: string
}

interface TagObject {
    readonly name: string,
    text: string | null,
    children: Array<this>
    attributes: Array<AttributeObject>
}

export interface XmlDocObject {
    root: Array<TagObject>
}

const parseElement = (element: Element, childrenArray: Array<TagObject>) => {
    const tagObject: TagObject = {
        name: element.tagName,
        attributes: [],
        text: null,
        children: []
    }
    for (const attribute of element.attributes) {
        const attributeObject: AttributeObject = {
            name: attribute.name,
            text: attribute.textContent
        }
        tagObject.attributes.push(attributeObject)
    }
    if (element.childElementCount > 0) {
        for (const child of element.children) {
            parseElement(child, tagObject.children)
        }
    } else {
        tagObject.text = element.innerHTML
    }
    childrenArray.push(tagObject)
}
