<template>
  <h2>Composition API VUE3 JS</h2>
  <div style="padding: 0px 15px">
    <h4>Using VUEX Store Here</h4>
    <p style="padding: 0px 10px">Count Variable of store : {{ count }}</p>
    <div
      style="
        display: flex;
        flex-direction: row;
        width: 20%;
        justify-content: space-between;
      "
    >
      <button @click="incrementCount">Increment</button>
    </div>
    <div>
      <h4>Using VUEX Store User Property Here</h4>
      <div v-if="user">
        <li v-for="(value, key) in user" :key="key">{{ key }} : {{ value }}</li>
        <p
          style="
            padding-top: 10px;
            color: blueviolet;
            font-weight: 700;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
              'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            font-size: larger;
          "
        >
          Change User Property
        </p>
        <select v-model="changeUser.key" style="width: 120px">
          <option v-for="(value, key) in user" :value="key">{{ key }}</option>
        </select>
        <input
          :type="userInputType"
          style="width: 200px"
          :disabled="changeUser.key === null"
          v-model="changeUser.value"
        />
        <button @click="updateUser">Update User</button>
      </div>
      <div v-else>No User Property Found.</div>
    </div>
    <p style="padding: 0px 10px">X : {{ api.x }}</p>
    <div
      style="
        display: flex;
        flex-direction: row;
        width: 20%;
        justify-content: space-between;
      "
    >
      <button @click="api.x++">Increment</button>
      <button @click="api.x--">Decrement</button>
    </div>
    <p style="padding: 5px 10px">Y : {{ api.y }}</p>
    <div
      style="
        display: flex;
        flex-direction: row;
        width: 20%;
        justify-content: space-between;
      "
    >
      <button @click="api.y++">Increment</button>
      <button @click="api.y--">Decrement</button>
    </div>
    <h4>Author Name : {{ author.name }}</h4>
    <p>Published Books : {{ publishedBooks }}</p>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const count = computed(() => store.state.count);
const incrementCount = computed(() => store.commit("increment"));
const user = computed(() => store.state.user);
let changeUser = ref({
  key: null,
  value: null,
});
const updateUser = computed(() =>
  store.commit("updateUser", {
    key: changeUser.value.key,
    value: changeUser.value.value,
  })
);
const userInputType = computed(() => {
  const value = user.value[changeUser.value.key];
  const valueType = typeof value;
  if (valueType === "number") return "number";
  else return "text";
});
const api = ref({ x: 0, y: 0 });
const author = reactive({
  name: "John Doe",
  books: ["foo", "bar"],
});
const publishedBooks = computed(() => {
  return author.books.length > 0 ? "Yes" : "No";
});
watch(
  () => api.value.x + api.value.y,
  (sum) => {
    console.log(`sum of x and y is : ${api.value.x + api.value.y}`);
  }
);
</script>

<style scoped>
h2 {
  width: 100%;
  text-align: center;
}
</style>
