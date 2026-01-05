import {
    CompletionContext,
    type Completion,
    type CompletionResult
} from '@codemirror/autocomplete'
import { syntaxTree } from '@codemirror/language'
import { xmlSpecs } from '@/files/xml_specs.ts'

const tagCompletions = (parentTag: string): Array<Completion> => {
    const completions: Array<Completion> = []
    for (const tagName in xmlSpecs) {
        if (xmlSpecs[tagName]?.parents?.includes(parentTag)) {
            completions.push({ label: tagName, info: xmlSpecs[tagName].info })
        }
    }
    return completions
}
const attributeNameCompletions = (tagName: string): Array<Completion> => {
    const completions: Array<Completion> = []
    for (const attributeName in xmlSpecs[tagName]?.attributes) {
        completions.push({
            label: attributeName,
            info: xmlSpecs[tagName].attributes[attributeName]?.info
        })
    }
    return completions
}
const attributeValueCompletions = (attributeName: string, tagName: string): Array<Completion> => {
    const completions: Array<Completion> = []
    if (xmlSpecs[tagName]?.attributes) {
        const options = xmlSpecs[tagName]?.attributes[attributeName]?.options
        for (const key in options) {
            completions.push({ label: key, info: options[key] ?? undefined })
        }
    }
    return completions
}

export const handleCompletions = (context: CompletionContext): CompletionResult | null => {
    const attributeValueBefore = context.matchBefore(/<[^>]*="\w*/)
    const attributeNameBefore = context.matchBefore(/<[^>]*\s\w*/)
    const tagBefore = context.matchBefore(/<\w*/)

    let completions: Completion[] = []
    if (attributeValueBefore) {
        const tag = /<\w+/.exec(attributeValueBefore.text)
        const attribute = /(\w+)="\w*$/.exec(attributeValueBefore.text)
        if (tag && attribute && attribute[1]) {
            completions = attributeValueCompletions(attribute[1], tag[0].slice(1))
        }
    } else if (attributeNameBefore) {
        const tag = /<\w+/.exec(attributeNameBefore.text)
        if (tag) {
            completions = attributeNameCompletions(tag[0].slice(1))
        }
    } else {
        const nodeBefore = syntaxTree(context.state).resolveInner(context.pos - 1)
        const parentBefore = context.state.sliceDoc(nodeBefore.from, context.pos - 1)
        const parentTagRegexpArray = /^<\w+/.exec(parentBefore)
        if (parentTagRegexpArray) {
            completions = tagCompletions(parentTagRegexpArray[0].slice(1))
        }
    }

    const before = attributeValueBefore || attributeNameBefore || tagBefore
    if (!context.explicit && !before) return null
    return {
        from: before ? before.to : context.pos,
        options: completions,
        validFor: /^\w*$/
    }
}
