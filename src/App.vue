<template>
    <div class="relative">
        <div class="flex flex-col h-svh">
            <nav class="row-span-full bg-gray-900">
                <a href="/" class="flex px-4 py-2 text-gray-100">
                    <span class="text-xl font-semibold whitespace-nowrap">Grid</span>
                </a>
            </nav>
            <div class="grow flex flex-row overflow-hidden">
                <div id="codeContent"
                     class="basis-1/2 text-lg h-full overflow-auto grow cursor-text"></div>
                <div v-if="currentTrack" id="result"
                     class="basis-1/2 bg-white p-4 overflow-y-scroll ">
                    <GridTrack :track="currentTrack" />
                </div>
            </div>
        </div>

        <Transition
            enter-active-class="duration-300 ease-out"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
        >
            <HomePage />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import './styles/global.css'
import { onMounted, ref } from 'vue'
import defaultContent from './files/default_content.xml?raw'
import { EditorState } from '@codemirror/state'
import { ViewUpdate } from '@codemirror/view'
import { EditorView, basicSetup } from 'codemirror'
import { xml } from '@codemirror/lang-xml'
import { oneDarkTheme } from '@codemirror/theme-one-dark'
import { autocompletion } from '@codemirror/autocomplete'
import '@fontsource/noto-music'
import { parseXml } from '@/lib/parser.ts'
import { serializeTrackFromXmlDoc, type Track } from '@/lib/serializer.ts'
import GridTrack from '@/components/GridTrack.vue'
import HomePage from '@/components/HomePage.vue'
import { handleCompletions } from '@/lib/autocomplete.ts'

const currentTrack = ref<Track | null>()

const generateResult = (xmlString: string): void => {
    console.log('generation result...')
    const parser = new DOMParser()
    const xmlDocument = parser.parseFromString(xmlString, 'application/xml')
    const errorNode = xmlDocument.querySelector('parsererror')
    if (errorNode) {
        console.log('XML invalid')
    } else {
        console.log('XML valid')
        const xmlDocObject = parseXml(xmlDocument)
        currentTrack.value = serializeTrackFromXmlDoc(xmlDocument)
    }
}

const myTheme = EditorView.theme({
    '&': {
        height: '100%'
    },
    '.cm-editor': { height: '100%' },
    '.cm-content, .cm-gutter': { minHeight: '50%' }
}, { dark: true })


const state = EditorState.create({
    doc: defaultContent,
    extensions: [
        basicSetup,
        xml(),
        EditorView.lineWrapping,
        EditorView.updateListener.of((view: ViewUpdate) => {
            if (view.docChanged) {
                generateResult(view.state.doc.text.join(''))
            }
        }),
        autocompletion({ override: [handleCompletions] }),
        oneDarkTheme,
        myTheme
    ]
})


onMounted(() => {

    const view = new EditorView({
        state: state,
        parent: document.getElementById('codeContent') || document.body
    })

    const xmlString = view.state.doc.text.join('')
    generateResult(xmlString)
})
</script>
