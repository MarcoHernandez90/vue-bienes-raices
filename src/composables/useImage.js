import { ref as storageRef } from "firebase/storage"
import { uid } from "uid"
import { computed } from "vue"
import { useFirebaseStorage, useStorageFile } from "vuefire"

export default function useImage() {
  // storage es el composable para manejar el servicio de Storage de Firebase
  const storage = useFirebaseStorage()
  /* storageRefPath guarda el path del archivo que vamos a subir (con todo y
    nombre) y se le tiene que asignar el servicio de storage que utilizaremos */
  const storageRefPath = storageRef(storage, `/propiedades/${uid()}.jpg`)
  /* useStorageFile es un composable que nos da la funcionalidad para subir el
    archivo y recibir retroalimentación sobre el proceso */
  const {
    url,
    upload
    /* uploadProgress,
    uploadError,
    uploadTask, */
  } = useStorageFile(storageRefPath)

  function uploadImage(e) {
    const data = e.target.files[0]

    if (data) {
      upload(data)
    }
  }

  const image = computed(() => {
    return url.value ? url.value : null
  })

  return {
    url,
    uploadImage,
    image
  }
}