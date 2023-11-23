import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const authUser = ref(null)
  const router = useRouter()
  
  const errorMessage = ref('')
  const errorCodes = {
    'auth/invalid-login-credentials': 'Usuario o password incorrectos',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Password incorrecto',
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user
      }
    })
  })

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        authUser.value = user
        router.push({ name: 'admin-propiedades' })
      })
      .catch((error) => {
        errorMessage.value = errorCodes[error.code]
      })
  }

  function logout() {
    signOut(auth).then(() => {
      authUser.value = null
      router.push({ name: 'login' })
    }).catch(() => {
      
    })
  }

  const hasError = computed(() => {
    return errorMessage.value
  })

  const isAuth = computed(() => {
    return authUser.value
  })

  return {
    login,
    logout,
    errorMessage,
    hasError,
    isAuth
  }
})