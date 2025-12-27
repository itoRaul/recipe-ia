<script setup>
import { ref } from 'vue'
import axios from 'axios'

const ingredients = ref('')
const recipe = ref('')
const loading = ref(false)

const generateRecipe = async () => {
  if (!ingredients.value) return alert("Digite algum ingrediente!")

  loading.value = true
  recipe.value = ''

  try {
    const ingredientsArray = ingredients.value.split(',').map(i => i.trim())

    const response = await axios.post('http://localhost:3000/api/generate_recipe', {
      ingredients: ingredientsArray
    })

    recipe.value = response.data.recipe
  } catch (error) {
    console.error(error)
    alert("Erro ao falar com o Chef IA. Verifique se o backend está rodando!")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container">
    <header>
      <h1>👨‍🍳 Chef IA</h1>
      <p>O que temos na geladeira hoje?</p>
    </header>

    <div class="input-area">
      <input 
        v-model="ingredients" 
        placeholder="ex: frango, creme de leite, batata"
        @keyup.enter="generateRecipe"
      />
      <button @click="generateRecipe" :disabled="loading">
        {{ loading ? 'Cozinhando...' : 'Gerar Receita' }}
      </button>
    </div>

    <section v-if="recipe" class="recipe-result">
      <div class="recipe-content">{{ recipe }}</div>
    </section>
  </div>
</template>

<style scoped>
.container { max-width: 600px; margin: 40px auto; padding: 20px; font-family: sans-serif; }
header { text-align: center; margin-bottom: 30px; }
.input-area { display: flex; gap: 10px; margin-bottom: 30px; }
input { flex: 1; padding: 12px; border: 1px solid #ccc; border-radius: 8px; }
button { padding: 12px 20px; background: #42b883; color: white; border: none; border-radius: 8px; cursor: pointer; }
button:disabled { background: #ccc; }
.recipe-content { background: #f4f4f4; padding: 20px; border-radius: 8px; white-space: pre-wrap; line-height: 1.6; }
</style>