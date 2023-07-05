<template>
  <q-layout view="lHh lpR lFf">
    <q-drawer
      v-model="drawer"
      :mini="miniState"
      show-if-above
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="300"
      bordered
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
    >
      <q-list class="q-gutter-y-md q-mt-xl">
        <q-item
          active-class="bg-primary text-white text-bold"
          clickable
          v-ripple
          style="border-radius: 0 30px 30px 0"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section> Home </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container
      class="absolute full-width no-padding"
      style="height: 100vh; overflow: hidden; overflow-y: scroll"
    >
      <!-- <q-page>

      </q-page> -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MainLayout",

  setup() {
    return {
      drawer: ref(false),
      miniState: ref(true),
    };
  },
};
</script>
