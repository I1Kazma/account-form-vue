<template>
  <div id="app">
    <AccountForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AccountForm from './components/AccountForm/AccountForm.vue';

export default defineComponent({
  name: 'App',
  components: { AccountForm },
});
</script>