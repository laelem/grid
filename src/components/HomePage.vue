<template>
    <div v-if="isHomePage" class="fixed inset-0 bg-white flex items-stretch">
        <div class="grow place-content-center p-4 text-center">
            <h1 class="text-3xl mb-6">Bienvenue sur Grid !</h1>
            <form>
                <input
                    type="file"
                    accept="application/xml"
                    id="collectionInput"
                    class="sr-only"
                    @change="loadCollection"
                />
                <div class="flex gap-4 place-content-center">
                    <button
                        type="button"
                        class="bg-green-800 font-semibold text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-green-900"
                        @click="selectFileCollection"
                    >
                        Load personnal collection
                    </button>
                    <button
                        type="button"
                        class="bg-gray-500 font-semibold text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-600"
                        @click="loadDefaultContent"
                    >
                        Start with default content
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isHomePage = ref<boolean>(false)

const selectFileCollection = () => {
    const collectionInput = document.getElementById('collectionInput')
    if (collectionInput) {
        collectionInput.click()
    }
}

const loadDefaultContent = () => {
    isHomePage.value = false
}

const loadCollection = (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target.files

    if (files && files.length > 0) {
        const file = files[0]
        // console.log('Uploaded file:', file)

        const reader = new FileReader()
        reader.onload = () => {
            const result = reader.result
            // console.log(result)
        }
        reader.onerror = () => {
            // console.log('Error reading the file. Please try again.')
        }
        reader.readAsText(file)
        // Implement your upload logic here
    }
}
</script>
